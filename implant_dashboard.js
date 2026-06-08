/* implant_dashboard.js — Project: Monitoring proporsi kasus Implant Gigi
   Native ECharts, baca window.IMPLANT_ROWS. Dipanggil: window.renderImplantProject(hostEl) */
(function () {
  var TIER_COLOR = { simple: '#22A06B', moderate: '#E8A317', complex: '#E2603F', rahang: '#B23A48', 'Tanpa tier': '#9AA5B1' };
  var TAG_COLOR = { '🔥 HOT': '#E2603F', '🟡 WARM': '#E8A317', '🗓️ NEED FU': '#2D7FF9', '👻 GHOSTED': '#8893A2' };
  var TIERS = ['simple', 'moderate', 'complex', 'rahang'];
  var TAGS = ['🔥 HOT', '🟡 WARM', '🗓️ NEED FU', '👻 GHOSTED'];
  var FILT = { groupLoc: [], loc: [], tag: [], hilang: [], implan: [], from: '', to: '' };
  var TAB = 'overview';
  var clinicalStage = 'chat';
  var CH = {};

  function isLight() { return document.body.classList.contains('light-theme'); }
  function pc(a, b) { return b ? Math.round(100 * a / b) + '%' : '—'; }
  function uniq(i) { var s = {}; (window.IMPLANT_ROWS || []).forEach(function (r) { if (r[i] !== '') s[r[i]] = 1; }); return Object.keys(s).sort(); }
  function inSel(v, sel) { return sel.length === 0 || sel.indexOf(v) >= 0; }

  function rowsF(ignoreTag) {
    return (window.IMPLANT_ROWS || []).filter(function (r) {
      if (!inSel(r[1], FILT.groupLoc)) return false;
      if (!inSel(r[2], FILT.loc)) return false;
      if (!ignoreTag && FILT.tag.length && (r[4] !== 1 || !inSel(r[5], FILT.tag))) return false;
      if (FILT.hilang.length && !inSel(r[7], FILT.hilang)) return false;
      if (FILT.implan.length && !inSel(r[8], FILT.implan)) return false;
      if (FILT.from && r[0] < FILT.from) return false;
      if (FILT.to && r[0] > FILT.to) return false;
      return true;
    });
  }
  function agg(rows) {
    var a = { total: rows.length, active: 0, prospect: 0, booking: 0, tag: {}, tagBook: {} };
    TAGS.forEach(function (t) { a.tag[t] = 0; a.tagBook[t] = 0; });
    rows.forEach(function (r) {
      if (r[3]) a.active++; if (r[4]) a.prospect++; if (r[6]) a.booking++;
      if (r[4] && a.tag[r[5]] !== undefined) { a.tag[r[5]]++; if (r[6]) a.tagBook[r[5]]++; }
    });
    return a;
  }
  function ec(id, opt) {
    var el = document.getElementById(id); if (!el) return;
    if (CH[id]) { CH[id].dispose(); }
    CH[id] = echarts.init(el, isLight() ? null : 'dark');
    opt.backgroundColor = 'transparent';
    CH[id].setOption(opt);
    requestAnimationFrame(function () { CH[id].resize(); });
  }
  function txt() { return isLight() ? '#243B53' : '#cbd5e1'; }

  var STYLE = '<style id="imp-style">' +
    /* ── base ── */
    '.imp{font-family:inherit;color:var(--t1,inherit);background:var(--bg,transparent)}' +

    /* ── filter bar ── */
    '.imp .fb{display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;' +
      'background:var(--imp-bar,rgba(127,127,127,.06));' +
      'border:1px solid var(--imp-bor,rgba(127,127,127,.18));' +
      'border-radius:10px;padding:9px 11px;margin:0 0 14px}' +

    /* ── filter label & dropdown ── */
    '.imp .f{position:relative}.imp .f>label{display:block;font-size:9px;letter-spacing:.05em;text-transform:uppercase;color:var(--t3,#888);margin-bottom:3px}' +
    '.imp .dd{min-width:120px;border:1px solid var(--imp-bor,rgba(127,127,127,.25));border-radius:7px;padding:6px 9px;cursor:pointer;font-size:12px;display:flex;justify-content:space-between;gap:8px;background:var(--imp-dd,transparent);color:inherit}' +
    '.imp .dd[disabled]{opacity:.4;pointer-events:none}' +
    '.imp .pn{position:absolute;top:100%;left:0;margin-top:4px;background:var(--imp-popup,var(--bg,#1b1b1f));border:1px solid var(--imp-bor,rgba(127,127,127,.3));border-radius:8px;box-shadow:0 8px 22px rgba(0,0,0,.15);padding:6px;max-height:230px;overflow:auto;z-index:50;display:none;min-width:160px}' +
    '.imp .pn.open{display:block}.imp .pn label{display:flex;gap:7px;align-items:center;padding:5px 7px;border-radius:6px;cursor:pointer;font-size:12px;white-space:nowrap;color:inherit}' +

    /* ── date inputs & buttons ── */
    '.imp input[type=date]{border:1px solid var(--imp-bor,rgba(127,127,127,.25));border-radius:7px;padding:5px 8px;font-size:12px;background:var(--imp-dd,transparent);color:inherit;font-family:inherit}' +
    '.imp .ibtn{border:1px solid var(--imp-bor,rgba(127,127,127,.25));border-radius:7px;padding:6px 11px;font-size:12px;cursor:pointer;background:var(--imp-dd,transparent);color:inherit}' +
    '.imp .cnt{font-size:12px;color:var(--t3,#888);margin-left:auto;align-self:center}' +

    /* ── tabs ── */
    '.imp .tabs{display:flex;gap:4px;border-bottom:1px solid var(--imp-bor,rgba(127,127,127,.2));margin-bottom:16px}' +
    '.imp .tab{padding:8px 15px;cursor:pointer;font-size:13px;color:var(--t3,#888);border-bottom:2px solid transparent;margin-bottom:-1px}' +
    '.imp .tab.on{color:var(--act,#0ea5e9);border-bottom-color:var(--act,#0ea5e9)}' +
    '.imp .pane{display:none}.imp .pane.on{display:block}' +

    /* ── KPI cards ── */
    '.imp .kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-bottom:16px}' +
    '.imp .kpi{background:var(--imp-card,rgba(127,127,127,.06));border:1px solid var(--imp-bor,rgba(127,127,127,.15));border-radius:10px;padding:12px 14px}' +
    '.imp .kpi .l{font-size:10px;letter-spacing:.04em;text-transform:uppercase;color:var(--t3,#888)}' +
    '.imp .kpi .n{font-size:25px;font-weight:700;margin-top:2px}.imp .kpi .s{font-size:11px;color:var(--act,#0ea5e9);margin-top:2px}' +

    /* ── content cards ── */
    '.imp .card{background:var(--imp-card,rgba(127,127,127,.04));border:1px solid var(--imp-bor,rgba(127,127,127,.15));border-radius:10px;padding:13px 15px;margin-bottom:16px}' +
    '.imp .card h4{font-size:13px;font-weight:600;margin:0 0 2px}.imp .card .sub{font-size:11px;color:var(--t3,#888);margin:0 0 8px}' +
    '.imp .g2{display:grid;grid-template-columns:1fr 1fr;gap:16px}@media(max-width:860px){.imp .g2{grid-template-columns:1fr}}' +
    '.imp .grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}@media(max-width:860px){.imp .grid4{grid-template-columns:repeat(2,1fr)}}' +
    '.imp .piecap{font-size:11px;font-weight:600;text-align:center}.imp .piecap span{display:block;font-weight:400;font-size:10px;color:var(--t3,#888)}' +

    /* ── tables ── */
    '.imp table.t{width:100%;border-collapse:collapse;font-size:12px}.imp table.t th,.imp table.t td{padding:6px 9px;border-bottom:1px solid var(--imp-bor,rgba(127,127,127,.15));text-align:right}' +
    '.imp table.t th:first-child,.imp table.t td:first-child{text-align:left}.imp table.t th{color:var(--t3,#888);font-weight:500;font-size:10px;text-transform:uppercase}' +
    '.imp .lg{display:flex;gap:13px;flex-wrap:wrap;font-size:11px;color:var(--t3,#888);margin-top:8px}.imp .lg i{width:11px;height:11px;border-radius:3px;display:inline-block;margin-right:5px;vertical-align:-1px}' +

    /* ── segment buttons ── */
    '.imp .seg{display:inline-flex;border:1px solid var(--imp-bor,rgba(127,127,127,.25));border-radius:8px;overflow:hidden}' +
    '.imp .seg button{padding:6px 13px;background:transparent;color:var(--t3,#888);border:none;border-right:1px solid var(--imp-bor,rgba(127,127,127,.25));cursor:pointer;font-size:12px;font-family:inherit}' +
    '.imp .seg button:last-child{border-right:none}.imp .seg button.on{background:var(--act,#0ea5e9);color:#fff;font-weight:600}' +
    '.imp .segw{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:14px}.imp .segn{font-size:11px;color:var(--t3,#888)}' +

    /* ── matrix ── */
    '.imp table.mtx td.cell{text-align:center}.imp table.mtx td.diag{outline:2px solid var(--act,#0ea5e9);outline-offset:-2px}.imp table.mtx .pct{display:block;font-size:9px;color:var(--t3,#888);margin-top:1px}' +

    /* ── LIGHT THEME overrides — VSCode Light palette ── */
    'body.light-theme .imp .fb{background:#f3f3f3;border-color:#e8e8e8}' +
    'body.light-theme .imp .dd{background:#ffffff;border-color:#d4d4d4;color:#1e1e1e}' +
    'body.light-theme .imp input[type=date]{background:#ffffff;border-color:#d4d4d4;color:#1e1e1e}' +
    'body.light-theme .imp .ibtn{background:#ffffff;border-color:#d4d4d4;color:#1e1e1e}' +
    'body.light-theme .imp .pn{background:#ffffff;border-color:#d4d4d4;box-shadow:0 4px 14px rgba(0,0,0,.10)}' +
    'body.light-theme .imp .kpi{background:#ffffff;border-color:#e8e8e8}' +
    'body.light-theme .imp .card{background:#ffffff;border-color:#e8e8e8}' +
    'body.light-theme .imp table.t th,body.light-theme .imp table.t td{border-color:#e8e8e8}' +
    'body.light-theme .imp .tabs{border-color:#e8e8e8}' +
    'body.light-theme .imp .seg{border-color:#d4d4d4}' +
    'body.light-theme .imp .seg button{border-color:#d4d4d4;color:#616161}' +
    '</style>';

  function ddHtml(id, label, vals, key) {
    var h = '<div class="f"><label>' + label + '</label><div class="dd" id="dd_' + id + '"><span id="lb_' + id + '">Semua</span><span>▾</span></div><div class="pn" id="pn_' + id + '">';
    vals.forEach(function (v) { h += '<label><input type="checkbox" value="' + String(v).replace(/"/g, '&quot;') + '" data-id="' + id + '" data-key="' + key + '">' + v + '</label>'; });
    return h + '</div></div>';
  }

  window.renderImplantProject = function (host) {
    var meta = window.IMPLANT_META || { total: (window.IMPLANT_ROWS || []).length, periode: '' };
    if (!window.IMPLANT_ROWS) { host.innerHTML = '<div style="padding:30px;color:#e24b4a">implant_data.js belum dimuat.</div>'; return; }
    host.innerHTML = STYLE + '<div class="imp">' +
      '<div class="phead"><h1>Monitoring proporsi kasus Implant Gigi</h1><div style="font-size:12px;color:var(--t3,#888)">' + meta.periode + ' · ' + meta.total + ' client</div></div>' +
      '<div class="fb" id="imp_fb"></div><div class="tabs" id="imp_tabs"></div>' +
      '<div class="pane on" data-p="overview"><div class="kpis" id="k_ov"></div><div class="g2">' +
        '<div class="card"><h4>Funnel cohort</h4><p class="sub">Chat → Active → Prospect → Booking</p><div id="c_funnel" style="height:260px"></div></div>' +
        '<div class="card"><h4>Sumber booking per tag</h4><p class="sub">Hampir semua booking dari HOT</p><div id="c_btag" style="height:260px"></div></div>' +
      '</div><div class="card"><h4>Konversi antar tahap</h4><div id="t_conv"></div></div></div>' +
      '<div class="pane" data-p="sankey"><div class="kpis" id="k_sk"></div><div class="card"><h4>Aliran tier klinis: Chat → Active → Prospect → Booking</h4><p class="sub">Tiap pita = client, warna = Implan Tier, abu-abu = drop-off. Hover lihat jumlah + persen.</p><div id="c_sankey" style="height:520px"></div><div class="lg" id="sk_lg"></div><div id="sk_tb" style="margin-top:12px"></div></div></div>' +
      '<div class="pane" data-p="prospect"><div class="kpis" id="k_pr"></div><div class="g2">' +
        '<div class="card"><h4>Komposisi tag prospect</h4><div id="c_donut" style="height:250px"></div></div>' +
        '<div class="card"><h4>Jumlah & booking-rate per tag</h4><div id="c_tagrate" style="height:250px"></div></div>' +
      '</div><div class="card"><h4>Performa per lokasi</h4><p class="sub">Top 15, diurutkan booking</p><div id="t_loc"></div></div></div>' +
      '<div class="pane" data-p="clinical">' +
        '<div class="segw"><div class="seg" id="cl_seg">' +
          '<button data-s="chat" class="on">Chat</button><button data-s="active">Active</button><button data-s="prospect">Prospect</button><button data-s="booking">Booking</button>' +
        '</div><span class="segn" id="cl_note"></span></div>' +
        '<div class="kpis" id="k_cl"></div>' +
        '<div class="card"><h4>Komposisi Hilang Tier per tahap funnel</h4><p class="sub">Setelah buang yang tidak jawab. Tampil semua tahap sekaligus (tidak ikut toggle di atas) biar pergeseran mix kelihatan.</p>' +
          '<div class="grid4">' +
            '<div><div class="piecap" id="pl_chat">Chat</div><div id="c_pie_chat" style="height:155px"></div></div>' +
            '<div><div class="piecap" id="pl_active">Active</div><div id="c_pie_active" style="height:155px"></div></div>' +
            '<div><div class="piecap" id="pl_prospect">Prospect</div><div id="c_pie_prospect" style="height:155px"></div></div>' +
            '<div><div class="piecap" id="pl_booking">Booking</div><div id="c_pie_booking" style="height:155px"></div></div>' +
          '</div><div class="lg" id="pie_lg"></div></div>' +
        '<div class="card"><h4>Konversi Prospect → Booking per Hilang Tier</h4><p class="sub">Batang = jumlah prospect (volume), garis = %PB, garis putus-putus = rata-rata. Dasar Hilang Tier. Tidak ikut toggle tahap. Batang pendek = sampel kecil.</p><div id="c_pbtier" style="height:280px"></div></div>' +
        '<div class="g2">' +
          '<div class="card"><h4>Distribusi tier: Hilang vs Implan</h4><div id="c_tpair" style="height:260px"></div></div>' +
          '<div class="card"><h4>Booking per Implan Tier</h4><div id="c_bimp" style="height:260px"></div></div>' +
        '</div><div class="card"><h4>Matriks transisi: Hilang Tier → Implan Tier</h4><div id="t_mtx"></div></div></div>' +
      '</div>';

    document.getElementById('imp_fb').innerHTML =
      ddHtml('gl', 'Group Loc', uniq(1), 'groupLoc') + ddHtml('lc', 'Lokasi', uniq(2), 'loc') +
      '<div class="f"><label>Dari tgl</label><input type="date" id="imp_from"></div>' +
      '<div class="f"><label>Sampai tgl</label><input type="date" id="imp_to"></div>' +
      ddHtml('tg', 'Prospect Tag', TAGS, 'tag') + ddHtml('ht', 'Hilang Tier', TIERS, 'hilang') + ddHtml('it', 'Implan Tier', TIERS, 'implan') +
      '<button class="ibtn" id="imp_reset">Reset</button><span class="cnt" id="imp_cnt"></span>';
    var tabs = [['overview', 'Overview'], ['sankey', 'Tier Flow'], ['prospect', 'Prospects & Tags'], ['clinical', 'Komposisi Tier']];
    document.getElementById('imp_tabs').innerHTML = tabs.map(function (t, i) { return '<div class="tab' + (i === 0 ? ' on' : '') + '" data-t="' + t[0] + '">' + t[1] + '</div>'; }).join('');

    var fb = document.getElementById('imp_fb');
    fb.addEventListener('click', function (e) { var d = e.target.closest('.dd'); if (d) { var id = d.id.slice(3); var p = document.getElementById('pn_' + id); var op = p.classList.contains('open'); host.querySelectorAll('.pn').forEach(function (x) { x.classList.remove('open'); }); if (!op) p.classList.add('open'); } });
    fb.addEventListener('change', function (e) {
      var c = e.target;
      if (c.type === 'checkbox') {
        [['gl', 'groupLoc'], ['lc', 'loc'], ['tg', 'tag'], ['ht', 'hilang'], ['it', 'implan']].forEach(function (p) {
          var sel = []; host.querySelectorAll('#pn_' + p[0] + ' input:checked').forEach(function (x) { sel.push(x.value); });
          FILT[p[1]] = sel; document.getElementById('lb_' + p[0]).textContent = sel.length ? sel.length + ' dipilih' : 'Semua';
        });
        draw();
      }
      if (c.id === 'imp_from') { FILT.from = c.value; draw(); }
      if (c.id === 'imp_to') { FILT.to = c.value; draw(); }
    });
    document.getElementById('imp_reset').onclick = function () {
      FILT = { groupLoc: [], loc: [], tag: [], hilang: [], implan: [], from: '', to: '' };
      host.querySelectorAll('#imp_fb input[type=checkbox]').forEach(function (x) { x.checked = false; });
      document.getElementById('imp_from').value = ''; document.getElementById('imp_to').value = '';
      ['gl', 'lc', 'tg', 'ht', 'it'].forEach(function (id) { document.getElementById('lb_' + id).textContent = 'Semua'; });
      draw();
    };
    document.getElementById('imp_tabs').addEventListener('click', function (e) {
      var t = e.target.closest('.tab'); if (!t) return; TAB = t.getAttribute('data-t');
      host.querySelectorAll('.tab').forEach(function (x) { x.classList.toggle('on', x === t); });
      host.querySelectorAll('.pane').forEach(function (p) { p.classList.toggle('on', p.getAttribute('data-p') === TAB); });
      tagDis(); draw();
    });
    document.getElementById('cl_seg').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return; clinicalStage = b.getAttribute('data-s');
      this.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); });
      drawCl();
    });
    window.addEventListener('resize', function () { Object.keys(CH).forEach(function (k) { if (CH[k]) CH[k].resize(); }); });
    tagDis(); draw();
    function tagDis() { var cohort = (TAB === 'overview' || TAB === 'sankey'); var d = document.getElementById('dd_tg'); if (d) { if (cohort) d.setAttribute('disabled', ''); else d.removeAttribute('disabled'); } }
  };

  function kc(l, n, s) { return '<div class="kpi"><div class="l">' + l + '</div><div class="n">' + n + '</div><div class="s">' + (s || '') + '</div></div>'; }

  function draw() {
    var base = rowsF(false);
    document.getElementById('imp_cnt').textContent = 'menampilkan ' + base.length + ' client';
    if (TAB === 'overview') drawOv();
    else if (TAB === 'sankey') drawSk();
    else if (TAB === 'prospect') drawPr();
    else if (TAB === 'clinical') drawCl();
  }

  function drawOv() {
    var rows = rowsF(true), a = agg(rows);
    document.getElementById('k_ov').innerHTML =
      kc('Total chat', a.total, '') + kc('Active', a.active, pc(a.active, a.total) + ' dari total') +
      kc('Prospect', a.prospect, pc(a.prospect, a.active) + ' dari active') + kc('Booking', a.booking, pc(a.booking, a.prospect) + ' dari prospect') +
      kc('HOT → booking', a.tagBook['🔥 HOT'], pc(a.tagBook['🔥 HOT'], a.tag['🔥 HOT']) + ' konversi') + kc('Overall close', a.booking, pc(a.booking, a.total) + ' dari chat');
    ec('c_funnel', { grid: { left: 80, right: 30, top: 10, bottom: 20 }, tooltip: { trigger: 'axis' }, xAxis: { type: 'value' }, yAxis: { type: 'category', data: ['Booking', 'Prospect', 'Active', 'Chat'] },
      series: [{ type: 'bar', data: [{ value: a.booking, itemStyle: { color: '#1F4E79' } }, { value: a.prospect, itemStyle: { color: '#5B7A99' } }, { value: a.active, itemStyle: { color: '#9FB3C8' } }, { value: a.total, itemStyle: { color: '#CBD6E2' } }], label: { show: true, position: 'right', color: txt() } }] });
    ec('c_btag', { grid: { left: 40, right: 20, top: 10, bottom: 30 }, tooltip: {}, xAxis: { type: 'category', data: TAGS.map(short) }, yAxis: { type: 'value' },
      series: [{ type: 'bar', data: TAGS.map(function (t) { return { value: a.tagBook[t], itemStyle: { color: TAG_COLOR[t] } }; }), label: { show: true, position: 'top', color: txt() } }] });
    var r = function (n, i, o) { return '<tr><td>' + n + '</td><td>' + i + '</td><td>' + o + '</td><td>' + pc(o, i) + '</td></tr>'; };
    document.getElementById('t_conv').innerHTML = '<table class="t"><tr><th>Tahap</th><th>Masuk</th><th>Keluar</th><th>Konversi</th></tr>' +
      r('Chat → Active', a.total, a.active) + r('Active → Prospect', a.active, a.prospect) + r('Prospect → Booking', a.prospect, a.booking) + r('Overall', a.total, a.booking) + '</table>';
  }
  function short(t) { return t.replace(/[^A-Za-z ]/g, '').trim(); }

  function drawSk() {
    var rows = rowsF(true), total = rows.length;
    var L = {}; function add(x, y) { var k = x + '@@' + y; L[k] = (L[k] || 0) + 1; }
    rows.forEach(function (r) {
      var t = TIERS.indexOf(r[8]) >= 0 ? r[8] : 'Tanpa tier';
      if (r[6]) { add('Chat·' + t, 'Active·' + t); add('Active·' + t, 'Prospect·' + t); add('Prospect·' + t, 'Booking·' + t); }
      else if (r[4]) { add('Chat·' + t, 'Active·' + t); add('Active·' + t, 'Prospect·' + t); add('Prospect·' + t, 'Berhenti di prospect'); }
      else if (r[3]) { add('Chat·' + t, 'Active·' + t); add('Active·' + t, 'Berhenti di active'); }
      else add('Chat·' + t, 'Berhenti di chat');
    });
    var nodes = {}, links = [];
    Object.keys(L).forEach(function (k) { var p = k.split('@@'); links.push({ source: p[0], target: p[1], value: L[k] }); nodes[p[0]] = 1; nodes[p[1]] = 1; });
    var nodeArr = Object.keys(nodes).map(function (n) {
      var color = n.indexOf('Berhenti') === 0 ? '#9AA5B1' : (TIER_COLOR[n.split('·')[1]] || '#9AA5B1');
      var label = n.indexOf('Berhenti') === 0 ? n.replace('Berhenti di ', 'Berhenti: ') : (n.split('·')[0] + ' · ' + n.split('·')[1]);
      return { name: n, itemStyle: { color: color }, label: { formatter: label, color: txt() } };
    });
    if (!links.length) { document.getElementById('c_sankey').innerHTML = '<p style="padding:20px;color:#888">Tidak ada data untuk filter ini.</p>'; document.getElementById('sk_tb').innerHTML = ''; return; }
    ec('c_sankey', {
      tooltip: {
        trigger: 'item', triggerOn: 'mousemove',
        formatter: function (p) {
          if (p.dataType === 'edge') { return p.data.source.replace('·', ' ') + ' → ' + p.data.target.replace('·', ' ') + '<br><b>' + p.data.value + '</b> client (' + Math.round(100 * p.data.value / total) + '% dari total)'; }
          var v = p.value || 0; return p.name.replace('·', ' ') + '<br><b>' + v + '</b> client (' + Math.round(100 * v / total) + '%)';
        }
      },
      series: [{ type: 'sankey', emphasis: { focus: 'adjacency' }, nodeGap: 10, data: nodeArr, links: links,
        lineStyle: { color: 'source', opacity: 0.45 }, label: { fontSize: 11 } }]
    });
    var leg = [['simple', 'simple (1-2 gigi)'], ['moderate', 'moderate (3-4)'], ['complex', 'complex (5-8)'], ['rahang', 'rahang (≥9 / se-rahang)'], ['Tanpa tier', 'Tanpa tier (blm/tdk terbaca)']];
    document.getElementById('sk_lg').innerHTML = leg.map(function (x) { return '<span><i style="background:' + TIER_COLOR[x[0]] + '"></i>' + x[1] + '</span>'; }).join('') + '<span><i style="background:#9AA5B1"></i>berhenti di tahap ini</span>';
    var stages = [['Chat', function () { return true; }], ['Active', function (r) { return r[3]; }], ['Prospect', function (r) { return r[4]; }], ['Booking', function (r) { return r[6]; }]];
    var tcol = TIERS.concat('Tanpa tier');
    var h = '<table class="t"><tr><th>Tahap</th>' + tcol.map(function (c) { return '<th>' + c + '</th>'; }).join('') + '<th>Total</th></tr>';
    stages.forEach(function (st) {
      var sub = rows.filter(st[1]), cnt = {}; tcol.forEach(function (c) { cnt[c] = 0; });
      sub.forEach(function (r) { cnt[TIERS.indexOf(r[8]) >= 0 ? r[8] : 'Tanpa tier']++; });
      var tot = sub.length;
      h += '<tr><td>' + st[0] + '</td>' + tcol.map(function (c) { return '<td>' + cnt[c] + (tot ? ' (' + Math.round(100 * cnt[c] / tot) + '%)' : '') + '</td>'; }).join('') + '<td><b>' + tot + '</b></td></tr>';
    });
    document.getElementById('sk_tb').innerHTML = '<p class="sub" style="margin:8px 0 4px">Komposisi tier per tahap (persen = porsi di tahap itu)</p>' + h + '</table>';
    var bImp = {}; TIERS.forEach(function (t) { bImp[t] = 0; }); var a = agg(rows);
    rows.forEach(function (r) { if (r[6] && TIERS.indexOf(r[8]) >= 0) bImp[r[8]]++; });
    document.getElementById('k_sk').innerHTML = kc('Booking simple', bImp.simple, pc(bImp.simple, a.booking) + ' dari booking') + kc('Booking complex+rahang', bImp.complex + bImp.rahang, pc(bImp.complex + bImp.rahang, a.booking) + ' (high value)') + kc('Active ber-tier', rows.filter(function (r) { return r[3] && r[8]; }).length, 'kelengkapan skor');
  }

  function drawPr() {
    var rows = rowsF(false), a = agg(rows);
    document.getElementById('k_pr').innerHTML = kc('GHOSTED', a.tag['👻 GHOSTED'], pc(a.tag['👻 GHOSTED'], a.prospect) + ' dari prospect') + kc('HOT', a.tag['🔥 HOT'], '') + kc('NEED FU', a.tag['🗓️ NEED FU'], 'backlog follow-up') + kc('WARM stall', a.tag['🟡 WARM'] - a.tagBook['🟡 WARM'], 'warm blm booking');
    ec('c_donut', { tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' }, legend: { bottom: 0, textStyle: { color: txt() } },
      series: [{ type: 'pie', radius: ['45%', '70%'], center: ['50%', '45%'], data: TAGS.map(function (t) { return { name: short(t), value: a.tag[t], itemStyle: { color: TAG_COLOR[t] } }; }), label: { color: txt() } }] });
    ec('c_tagrate', { grid: { left: 45, right: 45, top: 30, bottom: 30 }, tooltip: { trigger: 'axis' }, legend: { top: 0, textStyle: { color: txt() } },
      xAxis: { type: 'category', data: TAGS.map(short) }, yAxis: [{ type: 'value', name: 'Prospect' }, { type: 'value', name: '%', max: 100 }],
      series: [{ name: 'Prospect', type: 'bar', data: TAGS.map(function (t) { return a.tag[t]; }), itemStyle: { color: '#9FB3C8' } },
        { name: 'Booking rate %', type: 'line', yAxisIndex: 1, data: TAGS.map(function (t) { return a.tag[t] ? Math.round(100 * a.tagBook[t] / a.tag[t]) : 0; }), itemStyle: { color: '#1F4E79' } }] });
    var byLoc = {};
    rows.forEach(function (r) { var L = r[2]; if (!byLoc[L]) byLoc[L] = { g: r[1], c: 0, a: 0, p: 0, h: 0, b: 0 }; var o = byLoc[L]; o.c++; if (r[3]) o.a++; if (r[4]) o.p++; if (r[4] && r[5] === '🔥 HOT') o.h++; if (r[6]) o.b++; });
    var arr = Object.keys(byLoc).map(function (L) { var o = byLoc[L]; o.loc = L; return o; }).sort(function (x, y) { return y.b - x.b || y.p - x.p; }).slice(0, 15);
    var h = '<table class="t"><tr><th>Lokasi</th><th>Group</th><th>Chat</th><th>Active</th><th>Prospect</th><th>HOT</th><th>Booking</th><th>Rate</th></tr>';
    arr.forEach(function (o) { h += '<tr><td>' + o.loc + '</td><td>' + o.g + '</td><td>' + o.c + '</td><td>' + o.a + '</td><td>' + o.p + '</td><td>' + o.h + '</td><td>' + o.b + '</td><td>' + pc(o.b, o.p) + '</td></tr>'; });
    document.getElementById('t_loc').innerHTML = h + '</table>';
  }

  function clinicalRows() {
    var rows = rowsF(false);
    if (clinicalStage === 'active') return rows.filter(function (r) { return r[3]; });
    if (clinicalStage === 'prospect') return rows.filter(function (r) { return r[4]; });
    if (clinicalStage === 'booking') return rows.filter(function (r) { return r[6]; });
    return rows;
  }
  function capit(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function accRGB() {
    var c = (getComputedStyle(document.body).getPropertyValue('--act') || '#0ea5e9').trim();
    var m = c.match(/^#?([0-9a-fA-F]{6})$/);
    if (m) { var n = parseInt(m[1], 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
    var rm = c.match(/(\d+)\D+(\d+)\D+(\d+)/); if (rm) return [+rm[1], +rm[2], +rm[3]];
    return [14, 165, 233];
  }

  function drawCl() {
    drawHilangPies();
    drawPBTier();
    var rows = clinicalRows();
    var H = {}, I = {}, bImp = {}; TIERS.forEach(function (t) { H[t] = 0; I[t] = 0; bImp[t] = 0; });
    var mtx = {}; TIERS.forEach(function (a) { mtx[a] = {}; TIERS.forEach(function (b) { mtx[a][b] = 0; }); });
    rows.forEach(function (r) {
      if (TIERS.indexOf(r[7]) >= 0) H[r[7]]++; if (TIERS.indexOf(r[8]) >= 0) I[r[8]]++;
      if (r[6] && TIERS.indexOf(r[8]) >= 0) bImp[r[8]]++;
      if (TIERS.indexOf(r[7]) >= 0 && TIERS.indexOf(r[8]) >= 0) mtx[r[7]][r[8]]++;
    });
    var sumH = 0, sumI = 0, sumB = 0; TIERS.forEach(function (t) { sumH += H[t]; sumI += I[t]; sumB += bImp[t]; });
    var totM = 0, tetap = 0; TIERS.forEach(function (a) { tetap += mtx[a][a]; TIERS.forEach(function (b) { totM += mtx[a][b]; }); });
    var turun = totM - tetap;
    var hiVal = I.complex + I.rahang;
    var mode = TIERS.reduce(function (a, b) { return I[b] > I[a] ? b : a; });
    document.getElementById('cl_note').textContent = 'Tahap ' + capit(clinicalStage) + ' · ' + rows.length + ' client · ' + sumI + ' ber-tier implan';
    document.getElementById('k_cl').innerHTML =
      kc('Ber-tier implan', sumI, 'dari ' + rows.length + ' client') +
      kc('Tier dominan', mode, I[mode] + ' (' + pc(I[mode], sumI) + ')') +
      kc('High value', hiVal, pc(hiVal, sumI) + ' complex+rahang') +
      kc('Turun tier', turun, pc(turun, totM) + ' rencana < hilang');
    ec('c_tpair', {
      grid: { left: 45, right: 20, top: 30, bottom: 30 }, tooltip: { trigger: 'axis' }, legend: { top: 0, textStyle: { color: txt() } },
      xAxis: { type: 'category', data: TIERS }, yAxis: { type: 'value' },
      series: [
        { name: 'Hilang', type: 'bar', data: TIERS.map(function (t) { return H[t]; }), itemStyle: { color: '#9FB3C8' }, label: { show: true, position: 'top', color: txt(), fontSize: 9, formatter: function (p) { return p.value + '\n' + pc(p.value, sumH); } } },
        { name: 'Implan', type: 'bar', data: TIERS.map(function (t) { return I[t]; }), itemStyle: { color: '#1F4E79' }, label: { show: true, position: 'top', color: txt(), fontSize: 9, formatter: function (p) { return p.value + '\n' + pc(p.value, sumI); } } }
      ]
    });
    ec('c_bimp', {
      grid: { left: 40, right: 20, top: 16, bottom: 30 }, tooltip: {}, xAxis: { type: 'category', data: TIERS }, yAxis: { type: 'value' },
      series: [{ type: 'bar', data: TIERS.map(function (t) { return { value: bImp[t], itemStyle: { color: TIER_COLOR[t] } }; }), label: { show: true, position: 'top', color: txt(), fontSize: 9, formatter: function (p) { return p.value + '\n' + pc(p.value, sumB); } } }]
    });
    var maxC = 1; TIERS.forEach(function (a) { TIERS.forEach(function (b) { if (mtx[a][b] > maxC) maxC = mtx[a][b]; }); });
    var acc = accRGB();
    function bgc(v) { if (!v) return 'transparent'; return 'rgba(' + acc[0] + ',' + acc[1] + ',' + acc[2] + ',' + (0.10 + 0.55 * v / maxC).toFixed(2) + ')'; }
    var h = '<table class="t mtx"><tr><th>Hilang &#8595; / Implan &#8594;</th>' + TIERS.map(function (c) { return '<th>' + c + '</th>'; }).join('') + '<th>Total</th></tr>';
    TIERS.forEach(function (a) {
      var tot = 0; TIERS.forEach(function (b) { tot += mtx[a][b]; });
      var cells = TIERS.map(function (b) { var v = mtx[a][b], cls = 'cell' + (a === b ? ' diag' : ''); var inner = v ? ('<b>' + v + '</b>' + (tot ? '<span class="pct">' + Math.round(100 * v / tot) + '%</span>' : '')) : ''; return '<td class="' + cls + '" style="background:' + bgc(v) + '">' + inner + '</td>'; }).join('');
      h += '<tr><td>' + a + '</td>' + cells + '<td><b>' + tot + '</b></td></tr>';
    });
    h += '</table>';
    h += '<p class="sub" style="margin:10px 0 0;line-height:1.5">Baca per baris: dari pasien yang <b>hilang</b> di tier tertentu, rencana <b>implan</b>-nya jatuh ke tier mana. Kotak diagonal = tier tetap; sel di kirinya = turun tier (rencana lebih ringan dari yang hilang). Warna makin pekat = makin banyak client. <b>Tetap ' + tetap + ' (' + pc(tetap, totM) + ') &middot; turun ' + turun + ' (' + pc(turun, totM) + ')</b>.</p>';
    document.getElementById('t_mtx').innerHTML = h;
  }

  function drawHilangPies() {
    var base = rowsF(false);
    var stages = [['chat', 'Chat', function (r) { return true; }], ['active', 'Active', function (r) { return r[3]; }], ['prospect', 'Prospect', function (r) { return r[4]; }], ['booking', 'Booking', function (r) { return r[6]; }]];
    stages.forEach(function (st) {
      var sub = base.filter(st[2]); var cnt = {}; TIERS.forEach(function (t) { cnt[t] = 0; });
      sub.forEach(function (r) { if (TIERS.indexOf(r[7]) >= 0) cnt[r[7]]++; });
      var tot = TIERS.reduce(function (s, t) { return s + cnt[t]; }, 0);
      document.getElementById('pl_' + st[0]).innerHTML = st[1] + '<span>' + tot + ' ber-tier</span>';
      ec('c_pie_' + st[0], {
        tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
        series: [{ type: 'pie', radius: ['42%', '72%'], center: ['50%', '50%'],
          data: TIERS.map(function (t) { return { name: t, value: cnt[t], itemStyle: { color: TIER_COLOR[t] } }; }),
          label: { show: true, formatter: '{d}%', color: txt(), fontSize: 9 }, labelLine: { length: 4, length2: 4 } }]
      });
    });
    document.getElementById('pie_lg').innerHTML = TIERS.map(function (t) { return '<span><i style="background:' + TIER_COLOR[t] + '"></i>' + t + '</span>'; }).join('');
  }

  function drawPBTier() {
    var base = rowsF(false);
    var P = {}, B = {}; TIERS.forEach(function (t) { P[t] = 0; B[t] = 0; });
    base.forEach(function (r) { if (TIERS.indexOf(r[7]) < 0) return; if (r[4]) P[r[7]]++; if (r[6]) B[r[7]]++; });
    var totP = 0, totB = 0; TIERS.forEach(function (t) { totP += P[t]; totB += B[t]; });
    var avg = totP ? Math.round(100 * totB / totP) : 0;
    ec('c_pbtier', {
      grid: { left: 45, right: 45, top: 30, bottom: 30 }, tooltip: { trigger: 'axis' }, legend: { top: 0, textStyle: { color: txt() } },
      xAxis: { type: 'category', data: TIERS },
      yAxis: [{ type: 'value', name: 'Prospect' }, { type: 'value', name: '%PB', max: 100 }],
      series: [
        { name: 'Prospect', type: 'bar', data: TIERS.map(function (t) { return P[t]; }), itemStyle: { color: '#9FB3C8' } },
        { name: '%PB', type: 'line', yAxisIndex: 1, data: TIERS.map(function (t) { return P[t] ? Math.round(100 * B[t] / P[t]) : 0; }), itemStyle: { color: '#1F4E79' }, lineStyle: { width: 3 }, symbolSize: 7, label: { show: true, position: 'top', color: txt(), fontSize: 9, formatter: '{c}%' }, markLine: { symbol: 'none', data: [{ yAxis: avg }], lineStyle: { color: '#9aa0a6', type: 'dashed' }, label: { formatter: 'rata ' + avg + '%', color: txt(), fontSize: 9 } } }
      ]
    });
  }
})();
