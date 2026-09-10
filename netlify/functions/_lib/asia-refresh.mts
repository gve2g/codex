import { getDatabase } from "@netlify/database";
import { fetchText, htmlToText } from "./http.mts";
import { ASIA_SOURCES, type SourceDefinition } from "./sources.mts";

async function markSource(db:any, source:SourceDefinition, ok:boolean, hash?:string, error?:string) {
  if (ok) await db.sql`UPDATE sources SET last_checked_at=NOW(),last_success_at=NOW(),health='healthy',failure_count=0,last_hash=${hash||null},last_error=NULL,parser_version=${source.parserVersion},monitoring_mode=${source.monitoringMode},last_changed_at=CASE WHEN last_hash IS DISTINCT FROM ${hash||null} THEN NOW() ELSE last_changed_at END WHERE id=${source.id}`;
  else await db.sql`UPDATE sources SET last_checked_at=NOW(),failure_count=failure_count+1,health=CASE WHEN failure_count>=2 THEN 'failing' ELSE 'degraded' END,last_error=${error||"Unknown fetch error"},parser_version=${source.parserVersion},monitoring_mode=${source.monitoringMode} WHERE id=${source.id}`;
}
async function updateSystem(db:any,id:string,status:string,label:string,detail:string){
  await db.sql`UPDATE systems SET status=${status},status_label=${label},status_detail=${detail},last_checked_at=NOW() WHERE id=${id}`;
}
async function verifyEvent(db:any,id:string){await db.sql`UPDATE events SET last_verified_at=NOW(),updated_at=NOW() WHERE id=${id}`;}
async function resolveEvent(db:any,id:string){await db.sql`UPDATE events SET resolved_at=COALESCE(resolved_at,NOW()),status='resolved',updated_at=NOW(),last_verified_at=NOW() WHERE id=${id} AND resolved_at IS NULL`;}

const TW_EVENT_START = new Date('2026-09-13T04:00:00Z');
const TW_EVENT_END = new Date('2026-09-13T11:30:00Z');

function parseTaiwanShutdownHeadlines(plain:string){
  return [...plain.matchAll(/([^\n]{0,80}(?:停機|暫停服務|系統異常)[^\n]{0,120})\s+(20\d{2}-\d{2}-\d{2})/g)]
    .map(m=>({title:m[1].replace(/\s+/g,' ').trim(),date:m[2]}));
}

async function refreshTaiwan(db:any, source:SourceDefinition, html:string){
  const plain=htmlToText(html);
  if(!/新聞稿/.test(plain)||!/關務署/.test(plain)) throw new Error('Taiwan Customs news listing structure not recognized');
  const known=/115年9月13日12時00分至19時30分停機/.test(plain);
  const now=new Date();
  const shutdowns=parseTaiwanShutdownHeadlines(plain);
  const unknownNewer=shutdowns.find(x=>x.date>'2026-09-01' && !/115年9月13日12時00分至19時30分停機/.test(x.title));

  if(unknownNewer){
    await updateSystem(db,source.system,'unknown','New shutdown notice detected',`Taiwan Customs has published a newer system shutdown/service notice that requires parser review: ${unknownNewer.title}`);
    return;
  }

  if(known){
    await verifyEvent(db,'tw-customs-shutdown-20260913');
    if(now>=TW_EVENT_START && now<TW_EVENT_END){
      await updateSystem(db,source.system,'maintenance','Major scheduled shutdown','Taiwan Customs is within its published 13 September operational-host shutdown window. Core customs and Single Window services are unavailable until 19:30 local time unless work finishes early.');
    }else if(now<TW_EVENT_START){
      await updateSystem(db,source.system,'clear','Major maintenance upcoming','Taiwan Customs has scheduled a broad operational-host shutdown for 13 September, 12:00–19:30 local time.');
    }else{
      await resolveEvent(db,'tw-customs-shutdown-20260913');
      await updateSystem(db,source.system,'clear','No active tracked shutdown','The tracked 13 September shutdown window has ended. This is bulletin monitoring, not a continuous heartbeat.');
    }
  }else{
    await updateSystem(db,source.system,'unknown','Status needs review','The Taiwan Customs news listing loaded, but the tracked shutdown notice was not found.');
  }
}

function parseE2mMemoNumbers(plain:string){
  return [...plain.matchAll(/mistg\s+memo\s+(\d+)-2026\s+\|?\s*E2M\s+System\s+Advisory/gi)]
    .map(m=>Number(m[1])).filter(Number.isFinite).sort((a,b)=>b-a);
}

async function refreshPhilippines(db:any,source:SourceDefinition,html:string){
  const plain=htmlToText(html);
  if(!/Memoranda 2026/i.test(plain)||!/E2M System Advisory/i.test(plain)) throw new Error('BOC memoranda page structure or E2M advisory entries not recognized');
  const numbers=parseE2mMemoNumbers(plain);
  if(!numbers.length) throw new Error('No 2026 E2M system advisory memo parsed');
  const latest=numbers[0];
  if(latest>11){
    await updateSystem(db,source.system,'unknown','New E2M advisory published',`The Bureau of Customs has published a newer E2M System Advisory (MISTG memo ${latest}-2026). Timing and impact require extraction from the official advisory before TradeStatus assigns an outage state.`);
  }else{
    await updateSystem(db,source.system,'clear','No recent advisory','The latest E2M System Advisory found in the 2026 Bureau of Customs memorandum index is MISTG memo 11-2026. This is bulletin monitoring, not a heartbeat check.');
  }
}

async function due(db:any,force:boolean){
  if(force)return ASIA_SOURCES;
  const rows=await db.sql`SELECT id,last_checked_at,poll_interval_minutes FROM sources WHERE id IN ('tw-customs-news','ph-boc-e2m')`;
  const byId=new Map(rows.map((r:any)=>[r.id,r]));const now=Date.now();
  return ASIA_SOURCES.filter(s=>{const r:any=byId.get(s.id);return !r?.last_checked_at||now-new Date(r.last_checked_at).getTime()>=Number(r.poll_interval_minutes||s.pollMinutes)*60000*.9;});
}

export async function refreshAsiaSources(force=false){
  const db=getDatabase();const sources=await due(db,force);if(!sources.length)return[{source:'asia-scheduler',ok:true,skipped:true}];
  const results=await Promise.allSettled(sources.map(async source=>{try{const {text,hash}=await fetchText(source.url,12000);if(source.adapter==='tw_customs')await refreshTaiwan(db,source,text);else if(source.adapter==='ph_e2m')await refreshPhilippines(db,source,text);else throw new Error(`Unknown Asia adapter: ${source.adapter}`);await markSource(db,source,true,hash);return{source:source.id,ok:true};}catch(error){const message=error instanceof Error?error.message:String(error);await markSource(db,source,false,undefined,message);throw new Error(`${source.id}: ${message}`);}}));
  return results.map((r,i)=>r.status==='fulfilled'?r.value:{source:sources[i].id,ok:false,error:r.reason instanceof Error?r.reason.message:String(r.reason)});
}
