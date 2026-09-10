import { getDatabase } from "@netlify/database";
import { fetchText, htmlToText } from "./http.mts";
import { REGIONAL_SOURCES, type SourceDefinition } from "./sources.mts";

async function markSource(db:any, source:SourceDefinition, ok:boolean, hash?:string, error?:string) {
  if (ok) await db.sql`UPDATE sources SET last_checked_at=NOW(),last_success_at=NOW(),health='healthy',failure_count=0,last_hash=${hash||null},last_error=NULL,parser_version=${source.parserVersion},monitoring_mode=${source.monitoringMode},last_changed_at=CASE WHEN last_hash IS DISTINCT FROM ${hash||null} THEN NOW() ELSE last_changed_at END WHERE id=${source.id}`;
  else await db.sql`UPDATE sources SET last_checked_at=NOW(),failure_count=failure_count+1,health=CASE WHEN failure_count>=2 THEN 'failing' ELSE 'degraded' END,last_error=${error||"Unknown fetch error"},parser_version=${source.parserVersion},monitoring_mode=${source.monitoringMode} WHERE id=${source.id}`;
}

async function updateSystem(db:any,id:string,status:string,label:string,detail:string){
  await db.sql`UPDATE systems SET status=${status},status_label=${label},status_detail=${detail},last_checked_at=NOW() WHERE id=${id}`;
}
async function verifyEvent(db:any,id:string){await db.sql`UPDATE events SET last_verified_at=NOW(),updated_at=NOW() WHERE id=${id}`;}
async function resolveEvent(db:any,id:string){await db.sql`UPDATE events SET resolved_at=COALESCE(resolved_at,NOW()),status='resolved',updated_at=NOW(),last_verified_at=NOW() WHERE id=${id} AND resolved_at IS NULL`;}

async function upsertEvent(db:any,event:{id:string;systemId:string;countryCode:string;countryName:string;region:string;eventType:string;severity:string;title:string;summary:string;impact:string;workaround:string;startsAt:string;endsAt?:string|null;allDay?:boolean;sourceName:string;sourceUrl:string;}){
  await db.sql`INSERT INTO events (id,system_id,country_code,country_name,region,event_type,status,severity,confidence,title,summary,operational_impact,workaround,starts_at,ends_at,all_day,source_name,source_url,source_tier,last_verified_at,fingerprint)
  VALUES (${event.id},${event.systemId},${event.countryCode},${event.countryName},${event.region},${event.eventType},'upcoming',${event.severity},'official',${event.title},${event.summary},${event.impact},${event.workaround},${event.startsAt},${event.endsAt||null},${event.allDay||false},${event.sourceName},${event.sourceUrl},1,NOW(),${event.id})
  ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title,summary=EXCLUDED.summary,operational_impact=EXCLUDED.operational_impact,workaround=EXCLUDED.workaround,starts_at=EXCLUDED.starts_at,ends_at=EXCLUDED.ends_at,all_day=EXCLUDED.all_day,last_verified_at=NOW(),updated_at=NOW(),resolved_at=NULL`;
}

function hour12(value:number, meridiem:string){const h=value%12;return meridiem.toLowerCase()==='pm'?h+12:h;}
function zonedLocalToUtc(year:number,month:number,day:number,hour:number,minute:number,timeZone:string){
  let guess=Date.UTC(year,month-1,day,hour,minute);
  for(let i=0;i<2;i+=1){
    const parts=new Intl.DateTimeFormat('en-US',{timeZone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date(guess));
    const get=(type:string)=>Number(parts.find(p=>p.type===type)?.value||0);
    const represented=Date.UTC(get('year'),get('month')-1,get('day'),get('hour'),get('minute'));
    guess-=represented-Date.UTC(year,month-1,day,hour,minute);
  }
  return new Date(guess);
}
const MONTH_NAMES:Record<string,number>={january:1,february:2,march:3,april:4,may:5,june:6,july:7,august:8,september:9,october:10,november:11,december:12};
function parseNzMaintenanceWindows(plain:string,now=new Date()){
  const output:Array<{start:Date;end:Date;note:string}>=[];
  const pattern=/(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s+(\d{1,2})(?:st|nd|rd|th)\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+from\s+(\d{1,2})(?::(\d{2}))?(am|pm)\s+to\s+(\d{1,2})(?::(\d{2}))?(am|pm)([^.]{0,220})/gi;
  for(const match of plain.matchAll(pattern)){
    const [,dayRaw,monthRaw,sHour,sMin,sMer,eHour,eMin,eMer,noteRaw]=match;
    const year=now.getUTCFullYear(),month=MONTH_NAMES[monthRaw.toLowerCase()];
    const start=zonedLocalToUtc(year,month,+dayRaw,hour12(+sHour,sMer),+(sMin||0),'Pacific/Auckland');
    let end=zonedLocalToUtc(year,month,+dayRaw,hour12(+eHour,eMer),+(eMin||0),'Pacific/Auckland');
    if(end<=start)end=new Date(end.getTime()+86400000);
    output.push({start,end,note:noteRaw.replace(/\s+/g,' ').trim()});
  }
  return output;
}
function nzSundayMaintenanceActive(now=new Date()){
  const parts=new Intl.DateTimeFormat('en-US',{timeZone:'Pacific/Auckland',weekday:'short',hour:'2-digit',hourCycle:'h23'}).formatToParts(now);
  const weekday=parts.find(p=>p.type==='weekday')?.value;
  const hour=Number(parts.find(p=>p.type==='hour')?.value||-1);
  return weekday==='Sun'&&hour>=2&&hour<4;
}
function frenchJournalDate(plain:string){
  const months:Record<string,number>={janvier:1,fevrier:2,février:2,mars:3,avril:4,mai:5,juin:6,juillet:7,aout:8,août:8,septembre:9,octobre:10,novembre:11,decembre:12,décembre:12};
  const m=plain.match(/Journal des anomalies au\s+(\d{1,2})\s+([A-Za-zÀ-ÿ]+)\s+(\d{4})/i);
  if(!m)return null;const month=months[m[2].toLowerCase()];if(!month)return null;return new Date(Date.UTC(+m[3],month-1,+m[1]));
}
function idTime(d:Date){return d.toISOString().slice(0,16).replace(/[-:T]/g,'');}

async function refreshNz(db:any,source:SourceDefinition,html:string){
  const plain=htmlToText(html);
  if(!/Current TSW status/i.test(plain))throw new Error('New Zealand TSW status page structure not recognized');
  const operational=/TSW is operational\.?/i.test(plain);
  const routine=/Every Sunday\s+from 2am to 4am\s+Routine Maintenance/i.test(plain);
  if(!routine)throw new Error('New Zealand TSW recurring-maintenance wording not found');
  await verifyEvent(db,'nz-tsw-sunday-maint-20260913');
  const now=new Date();
  const windows=parseNzMaintenanceWindows(plain,now).filter(w=>w.end>now&&w.start.getTime()<now.getTime()+60*86400000);
  for(const w of windows){
    await upsertEvent(db,{id:`nz-tsw-maint-${idTime(w.start)}`,systemId:source.system,countryCode:'NZ',countryName:'New Zealand',region:'Asia-Pacific',eventType:'scheduled_maintenance',severity:/no anticipated outage/i.test(w.note)?'limited':'moderate',title:'Trade Single Window scheduled maintenance',summary:/no anticipated outage/i.test(w.note)?'New Zealand Customs has scheduled TSW maintenance; no outage is anticipated, but lodgement responses may be delayed.':'New Zealand Customs has scheduled a Trade Single Window maintenance window.',impact:/no anticipated outage/i.test(w.note)?'Lodgement responses may be delayed during the window.':'TSW availability may be affected during the published maintenance window.',workaround:'Plan time-sensitive lodgements around the published window and monitor the official TSW status page.',startsAt:w.start.toISOString(),endsAt:w.end.toISOString(),sourceName:'New Zealand Customs Service — Current TSW status',sourceUrl:source.url});
  }
  const activeOneOff=windows.find(w=>w.start<=now&&now<w.end);
  if(nzSundayMaintenanceActive(now))await updateSystem(db,source.system,'maintenance','Routine maintenance','TSW is within its published Sunday 02:00–04:00 New Zealand maintenance window.');
  else if(activeOneOff)await updateSystem(db,source.system,'maintenance','Scheduled maintenance','TSW is within a published maintenance window; consult the official status page for expected impact.');
  else if(operational)await updateSystem(db,source.system,'operational','Operational','New Zealand Customs explicitly reports that TSW is operational.');
  else await updateSystem(db,source.system,'unknown','Status needs review','The TSW status page loaded but did not contain the expected operational statement.');
}

async function refreshFrance(db:any,source:SourceDefinition,html:string){
  const plain=htmlToText(html);
  if(!/DELTA IE/i.test(plain)||!/Journal des anomalies/i.test(plain))throw new Error('DELTA IE anomaly journal structure not recognized');
  const activeCount=[...plain.matchAll(/En cours de (?:traintement|traitement)/gi)].length;
  const journalDate=frenchJournalDate(plain)||new Date();
  if(activeCount>0){
    await upsertEvent(db,{id:'fr-delta-ie-active-anomalies',systemId:source.system,countryCode:'FR',countryName:'France',region:'Europe',eventType:'system_incident',severity:'moderate',title:'DELTA IE active technical anomalies',summary:`French Customs currently lists ${activeCount} DELTA IE import technical ${activeCount===1?'anomaly':'anomalies'} as still under treatment.`,impact:'Some import declarations or release-related messages may require workarounds documented by French Customs.',workaround:'Consult the official anomaly journal for the affected declaration flow and prescribed workaround.',startsAt:journalDate.toISOString(),allDay:true,sourceName:'Direction générale des douanes — DELTA IE import anomaly journal',sourceUrl:source.url});
    await updateSystem(db,source.system,'degraded','Active technical anomalies',`French Customs lists ${activeCount} DELTA IE import technical ${activeCount===1?'anomaly':'anomalies'} as under treatment.`);
  }else{
    await resolveEvent(db,'fr-delta-ie-active-anomalies');
    await updateSystem(db,source.system,'clear','No active listed anomaly','No DELTA IE import anomaly is currently marked as under treatment in the official journal. This is operations-page monitoring, not a full heartbeat.');
  }
}

async function refreshHongKong(db:any,source:SourceDefinition,html:string){
  const plain=htmlToText(html);
  if(!/Trade Single Window/i.test(plain)||!/System Notice/i.test(plain))throw new Error('Hong Kong TSW homepage status block not recognized');
  const noNotice=/System Notice\s+No system notice/i.test(plain);
  if(noNotice)await updateSystem(db,source.system,'clear','No system notice','Hong Kong Trade Single Window currently displays “No system notice” on its official homepage. This is an official notice signal, not a full component heartbeat.');
  else{
    const m=plain.match(/System Notice\s+(.{1,400}?)\s+Application for trade documents/i);
    const detail=m?.[1]?.replace(/\s+/g,' ').trim()||'The official Trade Single Window homepage contains a current system notice.';
    await updateSystem(db,source.system,'degraded','System notice active',detail);
  }
}

async function due(db:any,force:boolean){
  if(force)return REGIONAL_SOURCES;
  const rows=await db.sql`SELECT id,last_checked_at,poll_interval_minutes FROM sources WHERE id IN ('nz-customs-tsw','fr-delta-ie-import','hk-tsw-home')`;
  const byId=new Map(rows.map((r:any)=>[r.id,r]));const now=Date.now();
  return REGIONAL_SOURCES.filter(s=>{const r:any=byId.get(s.id);return !r?.last_checked_at||now-new Date(r.last_checked_at).getTime()>=Number(r.poll_interval_minutes||s.pollMinutes)*60000*.9;});
}

export async function refreshRegionalSources(force=false){
  const db=getDatabase();const sources=await due(db,force);if(!sources.length)return[{source:'regional-scheduler',ok:true,skipped:true}];
  const results=await Promise.allSettled(sources.map(async source=>{try{const {text,hash}=await fetchText(source.url,12000);if(source.adapter==='nz_tsw')await refreshNz(db,source,text);else if(source.adapter==='fr_delta_ie')await refreshFrance(db,source,text);else if(source.adapter==='hk_tsw')await refreshHongKong(db,source,text);else throw new Error(`Unknown regional adapter: ${source.adapter}`);await markSource(db,source,true,hash);return{source:source.id,ok:true};}catch(error){const message=error instanceof Error?error.message:String(error);await markSource(db,source,false,undefined,message);throw new Error(`${source.id}: ${message}`);}}));
  return results.map((r,i)=>r.status==='fulfilled'?r.value:{source:sources[i].id,ok:false,error:r.reason instanceof Error?r.reason.message:String(r.reason)});
}
