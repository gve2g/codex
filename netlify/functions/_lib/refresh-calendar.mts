import { getDatabase } from "@netlify/database";
import { fetchText, htmlToText } from "./http.mts";
import { CALENDAR_SOURCES, type SourceDefinition } from "./sources.mts";

const MONTHS: Record<string, number> = { january:1,february:2,march:3,april:4,may:5,june:6,july:7,august:8,september:9,october:10,november:11,december:12 };

async function markSource(db: any, source: SourceDefinition, ok: boolean, hash?: string, error?: string) {
  if (ok) await db.sql`UPDATE sources SET last_checked_at=NOW(),last_success_at=NOW(),health='healthy',failure_count=0,last_hash=${hash||null},last_error=NULL,parser_version=${source.parserVersion},monitoring_mode=${source.monitoringMode},last_changed_at=CASE WHEN last_hash IS DISTINCT FROM ${hash||null} THEN NOW() ELSE last_changed_at END WHERE id=${source.id}`;
  else await db.sql`UPDATE sources SET last_checked_at=NOW(),health=CASE WHEN failure_count>=2 THEN 'failing' ELSE 'degraded' END,failure_count=failure_count+1,last_error=${error||"Unknown fetch error"},parser_version=${source.parserVersion},monitoring_mode=${source.monitoringMode} WHERE id=${source.id}`;
}

async function updateSystem(db:any,id:string,status:string,label:string,detail:string){await db.sql`UPDATE systems SET status=${status},status_label=${label},status_detail=${detail},last_checked_at=NOW() WHERE id=${id}`;}

async function upsertCalendarEvent(db:any,event:{id:string;startsAt:string;endsAt:string;title:string;summary:string;sourceUrl:string}){
  await db.sql`INSERT INTO events (id,system_id,country_code,country_name,region,event_type,status,severity,confidence,title,summary,operational_impact,workaround,starts_at,ends_at,all_day,source_name,source_url,source_tier,last_verified_at,fingerprint) VALUES (${event.id},'ca-cbsa-commercial','CA','Canada','Americas','scheduled_maintenance_notice','upcoming','info','official',${event.title},${event.summary},'CBSA says EDI, eManifest and CERS portal clients should plan for scheduled maintenance; exact times are communicated by bulletin closer to each outage.','Submit time-sensitive electronic data ahead of the outage and follow CBSA System Outage Contingency Plan instructions if an outage is active.',${event.startsAt},${event.endsAt},TRUE,'Canada Border Services Agency — Scheduled outages',${event.sourceUrl},1,NOW(),${event.id}) ON CONFLICT (id) DO UPDATE SET starts_at=EXCLUDED.starts_at,ends_at=EXCLUDED.ends_at,summary=EXCLUDED.summary,last_verified_at=NOW(),updated_at=NOW(),resolved_at=NULL`;
}

function parseCanadaSchedule(plain:string){
  const yearMatch=plain.match(/Scheduled maintenance outages for\s+(20\d{2})/i); if(!yearMatch)return[];
  const year=Number(yearMatch[1]); const section=plain.split(yearMatch[0])[1]?.split(/Page details/i)[0]||"";
  const matches=[...section.matchAll(/(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2})(?:\s+to\s+(\d{1,2}))?/gi)];
  return matches.map(m=>{const month=MONTHS[m[1].toLowerCase()],startDay=Number(m[2]),endDay=Number(m[3]||m[2]);return{start:new Date(Date.UTC(year,month-1,startDay)),end:new Date(Date.UTC(year,month-1,endDay+1)),label:`${m[1]} ${startDay}${m[3]?`–${endDay}`:""}`};});
}

async function runAdapter(db:any,source:SourceDefinition,text:string){
  const plain=htmlToText(text);
  if(!/Scheduled outages:\s*EDI and select portals/i.test(plain))throw new Error("CBSA scheduled-outages page structure not recognized");
  const schedule=parseCanadaSchedule(plain); if(schedule.length<10)throw new Error("CBSA annual outage schedule could not be parsed confidently");
  const now=new Date(); const future=schedule.filter(w=>w.end>now&&w.start.getTime()<now.getTime()+150*86400000);
  for(const window of future){const ymd=window.start.toISOString().slice(0,10).replaceAll('-','');await upsertCalendarEvent(db,{id:`ca-cbsa-maint-${ymd}`,startsAt:window.start.toISOString(),endsAt:window.end.toISOString(),title:`CBSA EDI / eManifest / CERS scheduled maintenance — ${window.label}`,summary:`CBSA lists ${window.label}, 2026 as a scheduled maintenance outage period for EDI, eManifest and CERS portal clients. Exact times are provided separately by bulletin.`,sourceUrl:source.url});}
  const activeDate=schedule.find(w=>w.start<=now&&now<w.end);
  await updateSystem(db,source.system,'clear',activeDate?'Scheduled outage date':'Published schedule',activeDate?'Today falls within a CBSA scheduled maintenance date for EDI, eManifest and CERS. Exact outage timing must be confirmed in the latest Commercial Client Bulletin.':'CBSA publishes annual maintenance dates for EDI, eManifest and CERS. This schedule feed is not a live system heartbeat.');
}

async function dueSources(db:any,force=false){if(force)return CALENDAR_SOURCES;const rows=await db.sql`SELECT id,last_checked_at,poll_interval_minutes FROM sources`;const byId=new Map(rows.map((r:any)=>[r.id,r]));const now=Date.now();return CALENDAR_SOURCES.filter(source=>{const row:any=byId.get(source.id);return !row?.last_checked_at||now-new Date(row.last_checked_at).getTime()>=Number(row.poll_interval_minutes||source.pollMinutes)*60000*.9;});}

export async function refreshCalendarSources(force=false){const db=getDatabase();const due=await dueSources(db,force);if(!due.length)return[{source:'calendar-scheduler',ok:true,skipped:true,reason:'No calendar sources due'}];const results=await Promise.allSettled(due.map(async source=>{try{const{text,hash}=await fetchText(source.url);await runAdapter(db,source,text);await markSource(db,source,true,hash);return{source:source.id,ok:true};}catch(error){const message=error instanceof Error?error.message:String(error);await markSource(db,source,false,undefined,message);throw new Error(`${source.id}: ${message}`);}}));return results.map((r,i)=>r.status==='fulfilled'?r.value:{source:due[i].id,ok:false,error:r.reason instanceof Error?r.reason.message:String(r.reason)});}
