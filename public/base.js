window.TS = (() => {
  const state = { data: null, filter: "all" };
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => [...document.querySelectorAll(sel)];
  const FLAGS = { GB: "🇬🇧", SG: "🇸🇬", DE: "🇩🇪", AU: "🇦🇺", IE: "🇮🇪", NL: "🇳🇱", BE: "🇧🇪", US: "🇺🇸", JP: "🇯🇵", KR: "🇰🇷", IN: "🇮🇳", PA: "🇵🇦", CA: "🇨🇦", BR: "🇧🇷", ZA: "🇿🇦", NZ: "🇳🇿", FR: "🇫🇷", HK: "🇭🇰", TW: "🇹🇼", PH: "🇵🇭" };
  const SEVERITY_ORDER = { major: 4, moderate: 3, limited: 2, info: 1 };
  const SIGNAL_LABELS = {
    official_status: "Live status", published_schedule: "Published schedule",
    official_notice: "Official notice", official_bulletin: "Official bulletin",
    official_operations: "Operations feed", secondary_status: "Secondary status"
  };
  const TYPE_LABELS = { customs: "Customs", port: "Port", canal: "Canal", biosecurity: "Biosecurity" };

  function lifecycle(event, now = new Date()) {
    if (event.resolved_at) return "resolved";
    const start = new Date(event.starts_at);
    const end = event.ends_at ? new Date(event.ends_at) : null;
    if (start > now) return "upcoming";
    if (end && end <= now) return "resolved";
    return "active";
  }
  function expandRecurring(events, now = new Date()) {
    const floor = now.getTime() - 21 * 86400000;
    const ceiling = now.getTime() + 60 * 86400000;
    const out = [];
    for (const event of events) {
      if (event.recurrence !== "FREQ=WEEKLY;BYDAY=SU") { out.push(event); continue; }
      const base = new Date(event.starts_at).getTime();
      const duration = event.ends_at ? new Date(event.ends_at).getTime() - base : 0;
      for (let start = base, n = 0; start <= ceiling; start += 7 * 86400000, n += 1) {
        const end = duration ? start + duration : null;
        if ((end || start) < floor) continue;
        out.push({ ...event, id: `${event.id}-r${n}`, starts_at: new Date(start).toISOString(), ends_at: end ? new Date(end).toISOString() : null, resolved_at: null, recurrence: null, recurrence_source: event.id });
      }
    }
    return out;
  }
  function displayEvents() { return expandRecurring(state.data.events).map((e) => ({ ...e, status: lifecycle(e) })); }
  function ago(iso) {
    if (!iso) return "not yet checked";
    const ms = Date.now() - new Date(iso).getTime();
    if (ms < 0) return "just now";
    const mins = Math.floor(ms / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins} min ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} hr${hours === 1 ? "" : "s"} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }
  function shortDate(iso, allDay = false) {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("en", allDay ? {
      month: "short", day: "numeric", year: d.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined, timeZone: "UTC"
    } : { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(d);
  }
  function localRange(event) {
    if (event.all_day) return shortDate(event.starts_at, true);
    const start = shortDate(event.starts_at);
    if (!event.ends_at) return `${start} · until further notice`;
    const end = new Date(event.ends_at);
    const startDate = new Date(event.starts_at);
    const sameDay = startDate.toLocaleDateString() === end.toLocaleDateString();
    const endText = new Intl.DateTimeFormat("en", sameDay ? { hour: "numeric", minute: "2-digit" } : {
      month: "short", day: "numeric", hour: "numeric", minute: "2-digit"
    }).format(end);
    return `${start} – ${endText}`;
  }
  function formatTime(iso) {
    return new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit", timeZoneName: "short" }).format(new Date(iso));
  }
  function labelEventType(type) {
    const labels = { system_incident: "System incident", port_constraint: "Port constraint", scheduled_maintenance: "Maintenance", system_cutover: "System change", canal_constraint: "Canal constraint" };
    return labels[type] || type.replaceAll("_", " ");
  }
  function deriveSystem(system, events) {
    const checked = system.last_checked_at ? new Date(system.last_checked_at).getTime() : 0;
    const freshnessMs = Number(system.freshness_minutes || 1440) * 60000;
    if (!checked || Date.now() - checked > freshnessMs) {
      return { ...system, status: "unknown", status_label: "Status unavailable", status_detail: "The monitored source is stale or has not been checked within its freshness window." };
    }
    const active = events.filter((e) => e.system_id === system.id && e.severity !== "info" && e.status === "active" && (!e.last_verified_at || Date.now() - new Date(e.last_verified_at).getTime() <= freshnessMs))
      .sort((a,b) => (SEVERITY_ORDER[b.severity] || 0) - (SEVERITY_ORDER[a.severity] || 0));
    if (!active.length) return system;
    const top = active[0];
    if (top.event_type === "scheduled_maintenance") return { ...system, status: "maintenance", status_label: "Maintenance", status_detail: top.summary };
    if (top.severity === "major") return { ...system, status: "outage", status_label: "Major disruption", status_detail: top.summary };
    return { ...system, status: "degraded", status_label: system.status === "degraded" ? system.status_label : "Operational constraint", status_detail: top.summary };
  }
  function capitalize(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ""; }
  function escapeHtml(value="") { return String(value).replace(/[&<>'"]/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c])); }
  function safeUrl(url) { try { const u = new URL(url); return ["http:","https:"].includes(u.protocol) ? u.href : "#"; } catch { return "#"; } }

  return { state, $, $$, FLAGS, SEVERITY_ORDER, SIGNAL_LABELS, TYPE_LABELS, lifecycle, expandRecurring, displayEvents, ago, shortDate, localRange, formatTime, labelEventType, deriveSystem, capitalize, escapeHtml, safeUrl };
})();
