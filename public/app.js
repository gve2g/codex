(() => {
  const T = window.TS;
  const { state, $, $$, displayEvents, deriveSystem, FLAGS, capitalize, escapeHtml } = T;

  function setupControls() {
    $$(".filter").forEach((btn) => btn.addEventListener("click", () => {
      $$(".filter").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active"); state.filter = btn.dataset.filter;
      T.renderSystems(state.data.systems.map((s) => deriveSystem(s, displayEvents())));
    }));
    $("#dialogClose").addEventListener("click", () => $("#detailDialog").close());
    $("#calendarClose").addEventListener("click", () => $("#calendarDialog").close());
    $("#show30").addEventListener("click", () => { T.renderCalendar30(); $("#calendarDialog").showModal(); });
    $("#searchToggle").addEventListener("click", () => { $("#searchPanel").hidden = false; $("#globalSearch").focus(); });
    $("#searchClose").addEventListener("click", () => { $("#searchPanel").hidden = true; });
    $("#globalSearch").addEventListener("input", renderSearch);
    document.addEventListener("keydown", (e) => {
      if (e.key === "/" && !["INPUT","TEXTAREA"].includes(document.activeElement.tagName)) { e.preventDefault(); $("#searchPanel").hidden = false; $("#globalSearch").focus(); }
      if (e.key === "Escape" && !$("#searchPanel").hidden) $("#searchPanel").hidden = true;
    });
  }
  function renderSearch() {
    const q = $("#globalSearch").value.trim().toLowerCase(); if (!q) { $("#searchResults").innerHTML = ""; return; }
    const systems = state.data.systems.filter((s) => `${s.name} ${s.short_name} ${s.country_name} ${s.authority} ${s.system_type}`.toLowerCase().includes(q)).slice(0,5);
    const events = displayEvents().filter((e) => `${e.title} ${e.summary} ${e.country_name} ${e.event_type}`.toLowerCase().includes(q)).slice(0,5);
    const hits = [...systems.map((s) => ({ type:"system", id:s.id, title:`${FLAGS[s.country_code] || "🌐"} ${s.short_name}`, meta:`${s.country_name} · ${s.status_label}` })), ...events.map((e) => ({ type:"event", id:e.id, title:`${FLAGS[e.country_code] || "🌐"} ${e.title}`, meta:`${e.country_name} · ${capitalize(e.status)}` }))];
    $("#searchResults").innerHTML = hits.length ? hits.map((h) => `<button class="search-hit" data-search-type="${h.type}" data-search-id="${h.id}"><strong>${escapeHtml(h.title)}</strong><small>${escapeHtml(h.meta)}</small></button>`).join("") : `<div class="empty-state">No match in current coverage.</div>`;
    $$(".search-hit").forEach((hit) => hit.addEventListener("click", () => { $("#searchPanel").hidden = true; hit.dataset.searchType === "system" ? T.openSystem(hit.dataset.searchId) : T.openEvent(hit.dataset.searchId); }));
  }
  async function load() {
    setupControls(); let data;
    try { const res = await fetch("/api/status", { cache: "no-store" }); if (!res.ok) throw new Error(`API ${res.status}`); data = await res.json(); }
    catch { const res = await fetch("/data/fallback.json", { cache: "no-store" }); data = await res.json(); data.mode = "launch_dataset"; }
    state.data = data; T.render();
  }
  load().catch((error) => { console.error(error); $("#freshness").textContent = "TradeStatus could not load its data feed."; $("#activeEvents").innerHTML = `<div class="empty-state">Data feed unavailable. Please use the linked authority sources for operational decisions.</div>`; });
})();
