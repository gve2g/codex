(() => {
  const T = window.TS;
  const { state, $, FLAGS, SEVERITY_ORDER, SIGNAL_LABELS, TYPE_LABELS, displayEvents, ago, shortDate, localRange, formatTime, labelEventType, deriveSystem, escapeHtml } = T;

  function sourceBadge(event) {
    return event.confidence === "official" ? `<span class="badge official">Official source</span>` : `<span class="badge reported">Reported source</span>`;
  }
  function activeCard(event) {
    return `<article class="incident" data-event-id="${event.id}" tabindex="0" role="button" aria-label="Open details: ${escapeHtml(event.title)}">
      <div class="incident-inner"><div class="severity-bar ${event.severity}"></div><div class="incident-body">
        <div class="incident-top"><span class="flag" aria-hidden="true">${FLAGS[event.country_code] || "🌐"}</span><span class="country">${escapeHtml(event.country_name)}</span>${sourceBadge(event)}</div>
        <h3>${escapeHtml(event.title)}</h3><p>${escapeHtml(event.summary)}</p>
        <div class="incident-meta"><span>${labelEventType(event.event_type)} · ${event.severity}</span><span>${escapeHtml(localRange(event))}</span></div>
      </div></div></article>`;
  }
  function upcomingItem(event) {
    const d = new Date(event.starts_at);
    const mon = d.toLocaleDateString("en", { month: "short" });
    const day = d.toLocaleDateString("en", { day: "numeric" });
    return `<div class="upcoming-item" data-event-id="${event.id}" tabindex="0" role="button">
      <div class="date-tile"><div class="mon">${mon}</div><div class="day">${day}</div></div>
      <div><div class="upcoming-title">${FLAGS[event.country_code] || "🌐"} ${escapeHtml(event.title)}</div><div class="upcoming-meta">${escapeHtml(event.country_name)} · ${event.all_day ? "All day / timing not specified" : formatTime(event.starts_at)} · ${event.confidence === "official" ? "Official" : "Reported"}</div></div>
    </div>`;
  }
  function render() {
    const events = displayEvents();
    const systems = state.data.systems.map((s) => deriveSystem(s, events));
    const active = events.filter((e) => e.status === "active").sort((a,b) => (SEVERITY_ORDER[b.severity] || 0) - (SEVERITY_ORDER[a.severity] || 0) || new Date(b.starts_at) - new Date(a.starts_at));
    const horizon7 = Date.now() + 7 * 86400000;
    const upcoming = events.filter((e) => e.status === "upcoming" && new Date(e.starts_at).getTime() <= horizon7).sort((a,b) => new Date(a.starts_at) - new Date(b.starts_at));
    const resolved = events.filter((e) => e.status === "resolved").sort((a,b) => new Date(b.resolved_at || b.ends_at || b.starts_at) - new Date(a.resolved_at || a.ends_at || a.starts_at)).slice(0,6);
    const metrics = { major: active.filter((e) => e.severity === "major").length, active: active.length, upcoming: upcoming.length, systems: systems.length };
    $("#metrics").innerHTML = [[metrics.major,"Major disruptions"],[metrics.active,"Active constraints"],[metrics.upcoming,"Next 7 days"],[metrics.systems,"Systems monitored"]].map(([v,l]) => `<div class="metric"><div class="metric-value">${v}</div><div class="metric-label">${l}</div></div>`).join("");
    $("#activeEvents").innerHTML = active.length ? active.map(activeCard).join("") : `<div class="empty-state">No active constraints are present in the currently monitored sources. Coverage is still limited; this is not a statement that global trade is disruption-free.</div>`;
    $("#upcomingEvents").innerHTML = upcoming.length ? upcoming.map(upcomingItem).join("") : `<div class="empty-state">No confirmed events in the next seven days.</div>`;
    $("#resolvedEvents").innerHTML = resolved.length ? resolved.map((e) => `<article class="resolved-card" data-event-id="${e.id}" tabindex="0" role="button"><div class="resolved-date">${FLAGS[e.country_code] || "🌐"} ${escapeHtml(e.country_name)} · ${escapeHtml(shortDate(e.resolved_at || e.ends_at || e.starts_at, Boolean(e.all_day)))}</div><h3>${escapeHtml(e.title)}</h3><p>${escapeHtml(e.summary)}</p></article>`).join("") : `<div class="empty-state">Resolved incidents will appear here as history accumulates.</div>`;
    renderSystems(systems); renderCoverage(systems); renderFreshness(systems); T.bindDetailTriggers();
  }
  function renderSystems(systems) {
    const filtered = state.filter === "all" ? systems : systems.filter((s) => s.system_type === state.filter);
    $("#systemRows").innerHTML = filtered.map((s) => `<tr data-system-id="${s.id}" tabindex="0"><td><span class="flag" aria-hidden="true">${FLAGS[s.country_code] || "🌐"}</span> ${escapeHtml(s.country_name)}</td><td><span class="system-name">${escapeHtml(s.short_name)}</span><span class="system-sub">${escapeHtml(TYPE_LABELS[s.system_type] || s.system_type)} · ${escapeHtml(s.authority)}</span></td><td><span class="status-pill ${escapeHtml(s.status)}">${escapeHtml(s.status_label)}</span></td><td><span class="signal">${escapeHtml(SIGNAL_LABELS[s.signal_basis] || s.signal_basis || "Source monitor")}</span></td><td><span class="signal">${ago(s.last_checked_at)}</span></td><td class="row-arrow">→</td></tr>`).join("");
    T.bindDetailTriggers();
  }
  function renderCoverage(systems) {
    const groups = new Map();
    for (const s of systems) { if (!groups.has(s.country_name)) groups.set(s.country_name, { code: s.country_code, systems: [] }); groups.get(s.country_name).systems.push(s.short_name); }
    $("#coverageCopy").textContent = `${groups.size} economies and ${systems.length} systems are in the launch monitor. Coverage expands only after a source has a reliable authority, parser and stale-data rule.`;
    $("#coverageList").innerHTML = [...groups.entries()].sort((a,b) => a[0].localeCompare(b[0])).map(([country, info]) => `<div class="coverage-country"><span>${FLAGS[info.code] || "🌐"} ${escapeHtml(country)}</span><span>${escapeHtml(info.systems.join(" · "))}</span></div>`).join("");
  }
  function renderFreshness(systems) {
    const times = systems.map((s) => s.last_checked_at).filter(Boolean).map((v) => new Date(v).getTime()).filter(Number.isFinite);
    const latest = times.length ? new Date(Math.max(...times)) : null;
    const oldest = times.length ? new Date(Math.min(...times)) : null;
    const mode = state.data.mode === "live" ? "Automated monitor" : "Launch dataset";
    const suffix = latest ? `latest verification ${ago(latest.toISOString())}` : "source checks pending";
    $("#freshness").innerHTML = `<span class="pulse"></span> ${mode} · ${suffix}${oldest && Date.now() - oldest.getTime() > 7 * 86400000 ? " · some sources stale" : ""}`;
  }
  Object.assign(T, { render, renderSystems });
})();
