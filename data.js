/*
 * ─────────────────────────────────────────────────────────────
 *  GROWTH OPS HUB — data.js
 *  Ini satu-satunya file yang perlu lo edit untuk update konten.
 *
 *  TIPE BLOCK YANG TERSEDIA:
 *  { type: "text",    html: "<p>...</p>" }
 *  { type: "heading", text: "Judul Section" }
 *  { type: "alert",   level: "info|warn|ok|err", html: "..." }
 *  { type: "kpi",     items: [{ label, value, note }] }
 *  { type: "steps",   items: [{ title, desc, note }] }
 *  { type: "diagram", code: `flowchart LR\n A-->B` }
 *  { type: "chart",   height: 280, config: { // ECharts config } }
 *  { type: "network", height: 420, layout: "breadthfirst", elements: { nodes, edges } }
 *  { type: "table",   columns: [...], rows: [[...]] }
 *  { type: "embed",   url: "https://...", height: 500 }
 *  { type: "image",   src: "assets/images/nama.png", caption: "..." }
 *
 *  CATATAN:
 *  - blocks: []  → akan tampil "Belum ada konten" (placeholder)
 *  - Node network: tambahkan type:"source" atau type:"output" untuk warna berbeda
 *  - Diagram pakai Mermaid syntax: https://mermaid.js.org/intro/
 *  - Chart pakai ECharts config: https://echarts.apache.org/examples/
 * ─────────────────────────────────────────────────────────────
 */

// Helper: template kosong per tim (untuk tim yang belum diisi)
function _empty() {
  return {
    Overview: { blocks: [] },
    "Business Flow": {
      Input: { blocks: [] },
      "Proses Utama": { blocks: [] },
      "Output & Handover": { blocks: [] },
      "Exception & Eskalasi": { blocks: [] }
    },
    Operasional: {
      "Aktivitas Harian": { blocks: [] },
      "Tools & Sistem": { blocks: [] },
      "Rules & Kebijakan": { blocks: [] },
      SOP: { blocks: [] }
    },
    "Data & Pipeline": {
      "Data Sources": { blocks: [] },
      "Flow Diagram": { blocks: [] },
      "Transformasi & Formula": { blocks: [] },
      "Output Data": { blocks: [] }
    },
    "Dashboard & Laporan": {
      "Laporan Rutin": { blocks: [] },
      Dashboard: { blocks: [] }
    },
    "KPI & Metrics": {
      "KPI Utama": { blocks: [] },
      "Target & Cara Ukur": { blocks: [] }
    }
  };
}

// ── CS BLOCKS GENERATOR ───────────────────────────────────────
// Dipanggil dengan: _csBlocks('rata') / _csBlocks('tanam') / _csBlocks('vinir')
function _csBlocks(brand) {
  var bUp = brand.toUpperCase();

  var bc = {
    rata: {
      reportPagi: 'Daily Report Pagi RATA',
      reportSameday: '[RATA] Daily Report Sameday 2025',
      reportInternal: null,
      hasBlast: false,
      hasBarantum: false,
      hasIntSplit: false,
      samedaySheets: 'Detailchat',
      prevChat: 'prev_chat',
      colabPagi: 'https://colab.research.google.com/drive/1L6ezsLjohBgDeU1ULVTpg5j4BMDA3S_I',
      colabSore: 'https://colab.research.google.com/drive/1dC9XmxQrP2sOSIKsz-Gymsrx29CoxrXm',
      samedayUrl: 'https://docs.google.com/spreadsheets/d/1M-0-Q5AtgbOVfYKE9uuESOteACLO2MODwQIZBoZcbzY',
      csDashUrl: 'https://docs.google.com/spreadsheets/d/1dAAA9N_VGonFLyxu5n2-afk8-9zfE6kX6cFTYdXBHaQ/edit#gid=537799047',
      dapurInfobibUrl: 'https://docs.google.com/spreadsheets/d/1ltO2lZhD4cSX3lfo2NRijltG_HRR5EHC17kHyOKTaWU/edit'
    },
    tanam: {
      reportPagi: 'Daily Report Pagi TANAM',
      reportSameday: '[TANAM] Daily Report Sameday 2025',
      reportInternal: '[TANAM] Daily Report Sameday Internal 2025',
      hasBlast: true,
      hasBarantum: true,
      hasIntSplit: true,
      samedaySheets: 'Detailchat, Barantum, Import Call',
      prevChat: 'prev_chat_tanam',
      colabPagi: 'https://colab.research.google.com/drive/1L6ezsLjohBgDeU1ULVTpg5j4BMDA3S_I',
      colabSore: 'https://colab.research.google.com/drive/1dC9XmxQrP2sOSIKsz-Gymsrx29CoxrXm',
      samedayUrl: 'https://docs.google.com/spreadsheets/d/1OPH1baesJVI1bnBrv0bHjRuRB6SHugQJGhxEf_nSuqI',
      samedayNonIntUrl: 'https://docs.google.com/spreadsheets/d/TANAM_NON_INT_ID',
      csDashUrl: 'https://docs.google.com/spreadsheets/d/1YeA9oVGCxRhSkSD4tIxhM1kw9BO3MMJxgCkDY7LQaq4/edit?gid=1642881588#gid=1642881588',
      dapurInfobibUrl: 'https://docs.google.com/spreadsheets/d/1l1p4nKbqLg9uHlBFUfiUFVwg1mO2Q7CoGKhk7zcmUb4/edit'
    },
    vinir: {
      reportPagi: 'Daily Report Pagi VINIR',
      reportSameday: '[VINIR] Daily Report Sameday 2025',
      reportInternal: null,
      hasBlast: false,
      hasBarantum: true,
      hasIntSplit: false,
      samedaySheets: 'Detailchat, Import Call',
      prevChat: 'prev_chat_vinir',
      colabPagi: 'https://colab.research.google.com/drive/1L6ezsLjohBgDeU1ULVTpg5j4BMDA3S_I',
      colabSore: 'https://colab.research.google.com/drive/1dC9XmxQrP2sOSIKsz-Gymsrx29CoxrXm',
      samedayUrl: 'https://docs.google.com/spreadsheets/d/1nhtAiaHiCri3ES14R6_cHoF_hGhFTzs6Bq3kkXQKOMo',
      csDashUrl: 'https://docs.google.com/spreadsheets/d/1iFOIgGMcWUg4tJIVrZ2DPSryUvtBH0sisSjt90sbU3s/edit#gid=2075321257',
      dapurInfobibUrl: 'https://docs.google.com/spreadsheets/d/1pDZhEnnm41PVbHBtZpGVywmQ7q-WyzeG29QQQ8Fl5Ec/edit'
    }
  }[brand];

  var blastNote = bc.hasBlast
    ? '<li><strong>Blast Analysis TANAM</strong> — efektivitas blast WA (konsultasi1): dikirim, dilihat, direspons</li>'
    : '';
  var barantumNote = bc.hasBarantum
    ? '<li><strong>Barantum CDR</strong> — log telepon CS ke customer (ANSWERED / NO ANSWER / FAILED)</li>'
    : '';
  var intSplitNote = bc.hasIntSplit
    ? '<li><strong>Split Internal vs Non-Internal</strong> — Internal = klinik sendiri, Non-Internal = B2B + luar kota</li>'
    : '';
  var reportInternalRow = bc.reportInternal
    ? '              [bc.reportInternal, bUp + \' Internal\', \'Detailchat, Barantum, Import Call\', \'TANAM Internal klinik sendiri\'],'
    : '';

  var diagramCode = [
    'flowchart TD',
    '    subgraph SRC ["SOURCE"]',
    '        INF1["Infobip\\nDetailed Messages\\n(semua WA per baris)"]',
    '        INF2["Infobip\\nConversations\\n(Queue & Tags)"]',
    '        INF3["Infobip People\\n(loctanam — enrichment lokasi)"]',
    bc.hasBarantum ? '        BAR["Barantum CDR\\n(log telepon)"]' : '',
    '        GS["GSheets py_reader\\n(prev_chat, at_dict, cs_name\\nquiz, DM IG)"]',
    '    end',
    '    subgraph PREP ["PERSIAPAN (manual oleh Analyst)"]',
    '        DL["Download file ke lokal\\n+ upload ke Google Drive rawdata"]',
    '        CLN["Bersihkan kolom template\\n(hapus data run sebelumnya)"]',
    '    end',
    '    subgraph PROC ["PROSES Python (Google Colab)"]',
    '        PY["Run script Python\\n(daily_report_pagi.ipynb\\ndaily_report_sore.ipynb)"]',
    '        OUT["Output Excel\\n(newchat, detailchat\\nagent, attribution)"]',
    '    end',
    '    subgraph TMPL ["TEMPLATE (GSheets per brand)"]',
    '        GROW["[Growth] Sameday Data\\n(Detailchat, import_newchat\\nindex, GenAI)"]',
    '        BRAND["' + bc.reportSameday + '\\n(sheets: ' + bc.samedaySheets + ')"]',
    '    end',
    '    REPORT["Report dikirim ke\\ngrup leader WA"]',
    '    INF1 -->|"Download manual\\nAnalyst"| DL',
    '    INF2 -->|"Download manual\\nAnalyst"| DL',
    bc.hasBarantum ? '    BAR -->|"Download manual\\nAnalyst"| DL' : '',
    '    GS -->|"Read by script"| PY',
    '    DL --> CLN',
    '    DL --> PY',
    '    PY --> OUT',
    '    OUT -->|"Copy-paste\\nke template"| GROW',
    '    OUT -->|"Copy-paste\\nke template"| BRAND',
    '    INF2 -->|"Copy col F,L\\n(Queue, Tags) manual"| BRAND',
    bc.hasBlast ? '    INF3 -->|"Copy col AI,AJ,AK\\n(GenAI location)"| GROW' : '',
    '    GROW --> REPORT',
    '    BRAND --> REPORT'
  ].filter(function (x) { return x; }).join('\n');

  return {
    Overview: {
      blocks: [
        {
          type: 'alert', level: 'info',
          html: '<strong>CS ' + bUp + '</strong> — Layer <em>Acquisition-Qualification</em> dalam Growth funnel. CS menerima new chat dari WA (lead hasil marketing), mengkualifikasi, dan mendorong ke booking. KPI utama: <strong>Booking</strong>.'
        },
        {
          type: 'text',
          html: '<p>Posisi dalam funnel: <strong>Ads → Chat (WA) → [CS Handle] → Booking → SCH</strong>. Marketing menghasilkan chat masuk, tapi CS yang bertanggung jawab mengkonversi chat jadi booking. Volume chat = urusan Marketing; kualitas handling + booking rate = urusan CS.</p>'
        },
        {
          type: 'kpi',
          items: [
            { label: 'KPI Utama', value: 'Booking', note: 'Jumlah booking confirmed dari new chat' },
            { label: 'Chat → Booking Rate', value: '~45%', note: 'Dari 100 prospect, ~45 booking (PB 45%)' },
            { label: 'Report Harian', value: '3x', note: 'Pagi (07:00), Siang (13:00), Sore (17:00)' },
            { label: 'Sumber Lead', value: 'FB, IG, TikTok, DM IG, Quiz, Free Text', note: 'Semua channel masuk via WA' }
          ]
        }
      ]
    },

    'Business Flow': {
      Input: {
        blocks: [
          { type: 'heading', text: 'Sumber Lead Masuk ke CS ' + bUp },
          {
            type: 'table',
            columns: ['Channel', 'Keterangan', 'Tracking'],
            rows: [
              ['Paid Ads (FB/IG/TikTok)', 'Lead dari iklan berbayar, paling besar volume', 'Attribution S1/S2/S3 via at_dict'],
              ['DM Instagram Organik', 'Lead dari DM IG tanpa iklan', 'Ditandai di sheet DM IG (py_reader)'],
              ['Quiz Smile Assessment', 'Lead aktif mengisi quiz online', 'Nomor tersimpan di sheet quiz (py_reader)'],
              ['Free Text / Referral', 'Chat langsung, referral dari pasien lain', 'Tidak ada tracking khusus']
            ]
          },
          {
            type: 'diagram',
            code: [
              'flowchart LR',
              '  A["Paid Ads\\nFB / IG / TikTok"] --> W',
              '  B["DM Instagram\\nOrganik"] --> W',
              '  C["Quiz Smile\\nAssessment"] --> W',
              '  D["Free Text /\\nReferral"] --> W',
              '  W["WA ' + bUp + '"] --> CB["Chatbot\\n(Filter)"]',
              '  CB -->|"Active chat\\n(lolos filter)"| CS["CS Agent\\nHandling"]',
              '  CB -->|"Drop /\\nnon-active"| X["Tidak dilanjutkan"]'
            ].join('\n')
          },
          {
            type: 'alert', level: 'warn',
            html: '<strong>Catatan:</strong> Volume chat masuk adalah KPI Marketing, bukan CS. CS bertanggung jawab atas kualitas handling — dari active chat yang lolos filter sampai jadi booking.'
          }
        ]
      },

      'Proses Utama': {
        blocks: [
          { type: 'heading', text: 'Proses CS: dari Chat ke Booking' },
          {
            type: 'steps',
            items: [
              {
                title: 'Chat Active masuk ke agen',
                desc: 'Chatbot meloloskan chat → masuk ke antrian agen CS. Jam operasional 08:00–23:00. Response time diukur dari chat masuk sampai agen pertama kali balas.'
              },
              {
                title: 'Qualification & Handling',
                desc: 'CS mengkualifikasi: intent perawatan, kebutuhan pasien, kemampuan finansial, dan eligibilitas produk. Proses ini dilakukan via WA chat.'
              },
              {
                title: 'Tagging Wajib',
                desc: 'Setelah setiap interaksi, CS wajib memberi tag di sistem:\n• HOT — siap booking, tinggal jadwal\n• WARM — tertarik tapi perlu follow up\n• NEED FU — belum responsif, perlu difollow\n• GHOSTED — tidak merespons sama sekali\n• NP (No Prospect) — bukan target/tidak relevan'
              },
              {
                title: 'Push Booking + DP',
                desc: 'Lead HOT/WARM didorong untuk booking dengan DP. CS input booking ke sistem (Dynamic CRM / Simplybook). Booking confirmed = output utama CS.'
              },
              {
                title: 'Handover ke SCH',
                desc: 'Booking confirmed → handover ke SCH untuk penjadwalan dan reminder kunjungan. CS tidak terlibat lagi kecuali ada eskalasi dari pasien.'
              }
            ]
          },
          {
            type: 'diagram',
            code: [
              'flowchart TD',
              '  A["Chat Active\\nmasuk agen"] --> B["Qualification\\n& Handling"]',
              '  B --> C{Tag}',
              '  C -- HOT/WARM --> D["Push Booking + DP"]',
              '  C -- NEED FU --> E["Queue\\nFollow Up"]',
              '  C -- GHOSTED/NP --> F(["End — No Action"])',
              '  D --> G{Booking\\nConfirmed?}',
              '  G -- Ya --> H(["Handover ke SCH ✅"])',
              '  G -- Tidak --> E',
              '  E -->|"Follow up\\nberikutnya"| B'
            ].join('\n')
          }
        ]
      },

      'Output & Handover': {
        blocks: [
          { type: 'heading', text: 'Output & Handover CS ' + bUp },
          {
            type: 'alert', level: 'ok',
            html: '<strong>Output CS:</strong> Booking confirmed + DP tercatat di sistem booking (Simplybook/Dynamic CRM) → siap dihandover ke SCH untuk penjadwalan kunjungan pertama.'
          },
          {
            type: 'table',
            columns: ['Output', 'Ke Tim', 'Keterangan'],
            rows: [
              ['Booking confirmed (jadwal visit)', 'SCH', 'SCH set reminder dan koordinasi jadwal'],
              ['Tag prospect (HOT/WARM/NP/dll)', 'Tim CS', 'Ditag langsung oleh agen CS untuk klasifikasi kualitas lead']
            ]
          }
        ]
      },

      'Exception & Eskalasi': {
        blocks: [
          { type: 'heading', text: 'Exception & Eskalasi' },
          {
            type: 'alert', level: 'warn',
            html: '<strong>Isu Umum CS:</strong> (1) Chat tidak ter-assign ke agen → cek queue & jam operasional. (2) Booking tapi pasien tidak datang → eskalasi ke SCH untuk follow-up. (3) Lead kembali chat setelah lama → cek histori di prev_chat, treat as return chat. (4) Refund request → eskalasi ke SPV/AE.'
          }
        ]
      }
    },

    Operasional: {
      'Aktivitas Harian': {
        blocks: [
          { type: 'heading', text: 'Aktivitas Harian — Tim Analyst (Support CS)' },
          {
            type: 'table',
            columns: ['Waktu', 'Aktivitas', 'Keterangan'],
            rows: [
              ['06:30', 'Download Infobip Detailed (full day kemarin)', 'Data 00:00–23:59 kemarin — semua WA'],
              ['06:45', 'Upload ke Google Drive rawdata', 'Folder: /MyDrive/rawdata/'],
              ['07:00', 'Run script Python pagi (Google Colab)', 'daily_report_pagi.ipynb → Runtime → Run All'],
              ['07:15', 'Copy-paste hasil ke template per brand', bc.reportPagi + ' — sheets: detailchat, newchat'],
              ['07:30', 'Update prev_chat dengan new chat kemarin', 'Append new chat kemarin ke ' + bc.prevChat],
              ['07:45', 'Send report pagi ke grup leader', 'Audience: SPV CS, Leader Sales' + (bc.hasBlast ? ', Tim TANAM' : '')],
              ['12:30', 'Download Infobip Detailed + Conversations (sd 13:00)', 'Data 00:00–13:00 hari ini'],
              ['12:30', bc.hasBarantum ? 'Download Barantum CDR' : '—', bc.hasBarantum ? 'Report > CDR > Spreadsheet > Download' : 'RATA tidak tracking CDR'],
              ['13:00', 'Run script Python siang', 'daily_report_sore.ipynb'],
              ['13:15', 'Copy-paste hasil + Queue/Tags dari conversations (col F, L → col P, Q)', 'Manual merge conversations ke newchat_rata/tanam'],
              ['13:30', 'Send report siang ke grup leader', 'Audience: Marketing + CS'],
              ['(Ulangi) 16:30–17:30', 'Run report sore (data sd 17:00)', 'Sama dengan proses siang, periode data diperluas']
            ]
          },
          {
            type: 'alert', level: 'info',
            html: '<strong>Tips paralel:</strong> Saat script Python sedang running (±5 menit), langsung lakukan update GenAI, Barantum, dan Import_Call secara paralel — keduanya tidak bergantung pada hasil script.'
          }
        ]
      },

      'Tools & Sistem': {
        blocks: [
          { type: 'heading', text: 'Tools & Sistem — CS ' + bUp },
          {
            type: 'text',
            html: '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px">'
              + '<a href="' + bc.csDashUrl + '" target="_blank" style="display:inline-flex;align-items:center;gap:6px;padding:8px 14px;background:var(--b2);border:1px solid var(--sep);border-radius:6px;color:var(--t1);text-decoration:none;font-size:12px;font-weight:600">📊 CS Dashboard ' + bUp + ' ↗</a>'
              + '<a href="' + bc.dapurInfobibUrl + '" target="_blank" style="display:inline-flex;align-items:center;gap:6px;padding:8px 14px;background:var(--b2);border:1px solid var(--sep);border-radius:6px;color:var(--t1);text-decoration:none;font-size:12px;font-weight:600">🔗 [Dapur] Tarikan Infobib ' + bUp + ' ↗</a>'
              + '</div>'
          },
          {
            type: 'embed',
            url: bc.csDashUrl.replace('/edit', '/preview'),
            height: 480
          },
          {
            type: 'table',
            columns: ['Tool', 'Fungsi', 'Siapa Pakai'],
            rows: [
              ['Infobip (WA Business API)', 'Platform WA — semua chat CS + laporan detailed & conversations', 'CS Agent, Analyst'],
              ['Infobip Analyze / Report', 'Export data: Detailed, Conversations, People (loctanam)', 'Analyst'],
              bc.hasBarantum ? ['Barantum', 'CDR log telepon CS ke customer (ANSWERED/NO ANSWER/FAILED)', 'CS Agent, Analyst'] : ['—', '—', '—'],
              ['Google Colab (Python)', 'Pengolahan raw data harian → output laporan per brand', 'Analyst'],
              ['[Growth] Sameday Data', 'Template master lintas brand (Detailchat, import_newchat, index, GenAI)', 'Analyst'],
              [bc.reportSameday, 'Template laporan sameday ' + bUp, 'Analyst, SPV CS'],
              ['GSheets py_reader', 'Master data: prev_chat, at_dict, cs_name, quiz, DM IG', 'Analyst'],
              ['Dynamic CRM / Simplybook', 'Input booking, tracking jadwal pasien', 'CS Agent, SCH']
            ].filter(function (r) { return r[0] !== '—'; })
          }
        ]
      },

      'Rules & Kebijakan': { blocks: [] },
      SOP: { blocks: [] }
    },

    'Data & Pipeline': {
      'Data Sources': {
        blocks: [
          { type: 'heading', text: 'Data Sources — CS ' + bUp },
          {
            type: 'table',
            columns: ['File / Source', 'Asal', 'Frekuensi Download', 'Dipakai Untuk'],
            rows: [
              ['Infobip Detailed Messages', 'Infobip → Analyze → Report → Detailed → WA', 'Harian (pagi + siang + sore)', 'New chat, response time, seen rate, blast analysis'],
              ['Infobip Conversations', 'Infobip → Analyze → Report → Conversations → WA', 'Harian (siang + sore)', 'Queue & Tags per conversation'],
              bc.hasBlast ? ['Infobip People (loctanam)', 'Infobip → Analyze → Persons → Advance Filter', 'Harian', 'Enrichment lokasi TANAM (Kategori, Kota, Lokasi)'] : ['—', '—', '—', '—'],
              bc.hasBarantum ? ['Barantum CDR', 'Barantum → Report → CDR → Spreadsheet', 'Harian (siang + sore)', 'Log telepon CS ke customer'] : ['—', '—', '—', '—'],
              ['prev_chat / ' + bc.prevChat, 'GSheets py_reader (diupdate manual harian)', 'Dibaca script setiap run', 'Deteksi new vs return chat'],
              ['at_dict', 'GSheets py_reader', 'On-demand', 'Kamus attribution iklan (S1/S2/S3)'],
              ['cs_name', 'GSheets py_reader', 'On-demand', 'Mapping nama agen CS aktif'],
              ['quiz / DM IG', 'GSheets py_reader', 'On-demand', 'Identifikasi nomor dari Quiz dan DM Instagram']
            ].filter(function (r) { return r[0] !== '—'; })
          },
          {
            type: 'alert', level: 'warn',
            html: '<strong>prev_chat harus selalu diupdate!</strong> Setelah setiap run laporan, new chat hari itu di-append manual ke ' + bc.prevChat + '. Kalau tidak diupdate, new chat kemarin akan dihitung sebagai new chat lagi hari berikutnya → angka inflated.'
          }
        ]
      },

      'Flow Diagram': {
        blocks: [
          { type: 'heading', text: 'Pipeline Data CS ' + bUp + ' — Alur dari Source ke Laporan' },
          { type: 'diagram', code: diagramCode },
          {
            type: 'alert', level: 'info',
            html: '<strong>Catatan penting:</strong> Seluruh proses bersifat <em>manual</em> — download, upload, run script, copy-paste, update prev_chat, dan send report dilakukan oleh Tim Analyst setiap hari. Tidak ada automasi penuh saat ini. Queue & Tags dari file conversations di-copy manual ke kolom P, Q di template.'
          }
        ]
      },

      'Prospect Chain': {
        blocks: [
          { type: 'heading', text: 'Prospect Data Chain — CS ' + bUp + ' ke Growth Dashboard' },
          {
            type: 'alert', level: 'info',
            html: '<strong>Prospect</strong> di Growth Dashboard = <strong>Prospect ALL</strong> (New + Return). Data prospect mengalir dari Infobip → [Dapur] Tarikan Infobib → CS Dashboard (qa, RC, prospect_cal) → Growth Dashboard sheet prospek_' + brand + '. Rantai ini panjang — putus di titik mana pun = prospect count salah.'
          },
          {
            type: 'diagram',
            code: [
              'flowchart TD',
              '    subgraph INFOBIP ["SUMBER — Infobip"]',
              '        INF["Infobip People\\nExport prospek ' + bUp + '\\n(People-YYYY_MM_DD.xlsx)"]',
              '    end',
              '    subgraph DAPUR ["[Dapur] Tarikan Infobib ' + bUp + '"]',
              '        PY["Python Preprocessing\\ncleansing + fix typo"]',
              '        OK["Sheet: OK\\n(landing zone)\\ncol A: First Chat\\ncol I: Prospect Tagging"]',
              '    end',
              '    subgraph CSDASH ["[' + bUp + '] CS Dashboard Daily Report 2026"]',
              '        PI["Sheet: Prospek Infobib\\nIMPORTRANGE dari [Dapur]\\ncol A: First Chat\\ncol I: Prospect Tagging"]',
              '        QA["Sheet: qa\\ncol B: Date (FILTER dari Prospek Infobib)\\ncol C: Client Number\\ncol D: Prospect Status\\n(XLOOKUP dari Prospek Infobib col I)"]',
              '        RC["Sheet: RC\\nReturn Chat data\\ncol J: PROSPEK_RETURN\\ncol O: Status"]',
              '        PC["Sheet: prospect_cal\\ncol D: Prospek New\\ncol F: Prospek Return\\ncol I: Prospek ALL = D + F"]',
              '    end',
              '    subgraph DASH ["[GROWTH] NEW DASHBOARD.xlsx"]',
              '        PT["Sheet: prospek_' + brand + '\\nIMPORTRANGE dari prospect_cal col I"]',
              '        AGG["Sheet: ' + bUp + '\\nrow 10: Prospect\\n=SUMIFS(prospek_' + brand + ')"]',
              '    end',
              '    INF -->|"Export\\n+ Python clean"| PY',
              '    PY -->|"Paste ke\\nSheet OK"| OK',
              '    OK -->|"IMPORTRANGE\\ncol A, I"| PI',
              '    PI -->|"FILTER date>=2026\\n+ SORT"| QA',
              '    PI -->|"XLOOKUP col I\\n(prospect status)"| QA',
              '    QA -->|"COUNTIFS\\nD=Prospek\\nN≠LOST"| PC',
              '    RC -->|"COUNTIFS\\nJ=PROSPEK_RETURN\\nO≠LOST"| PC',
              '    PC -->|"IMPORTRANGE\\ncol I"| PT',
              '    PT -->|"SUMIFS"| AGG'
            ].join('\n')
          },
          { type: 'heading', text: 'Formula Detail — Prospect Calculation' },
          {
            type: 'table',
            columns: ['Metric', 'Sheet', 'Formula', 'Catatan'],
            rows: [
              ['Prospek New (col D)', 'prospect_cal', '=COUNTIFS(qa!$D:$D,"Prospek",qa!$B:$B,A2,qa!$N:$N,"<>*LOST*")', 'Hitung prospek baru per hari, exclude LOST status'],
              ['Prospek Return (col F)', 'prospect_cal', '=COUNTIFS(RC!$A:$A,A2,RC!$D:$D,"<>",RC!$J:$J,"PROSPEK_RETURN",RC!$O:$O,"<>*LOST*")', 'Hitung return chat yang jadi prospek, exclude LOST'],
              ['Prospek ALL (col I)', 'prospect_cal', '=F2+D2', 'Total = Return + New'],
              ['qa col B (Date)', 'qa', '=IFERROR(SORT(FILTER(Prospek Infobib!A2:B, B2:B<>"", A2:A>=DATE(2026,1,1)),1,TRUE),"")', 'Date + Client dari Prospek Infobib, sorted'],
              ['qa col D (Status)', 'qa', '=ARRAYFORMULA(XLOOKUP(C2:C,Prospek Infobib!B:B,Prospek Infobib!I:I,"Prospek"))', 'Lookup prospect tagging, default="Prospek"'],
              ['Prospek Infobib col A', 'Prospek Infobib', '=IMPORTRANGE("[Dapur] Tarikan Infobib","Pagi!A:B")', 'First Chat date + Client Number'],
              ['Prospek Infobib col I', 'Prospek Infobib', '=IMPORTRANGE("[Dapur] Tarikan Infobib","Pagi!U:U")', 'Prospect Tagging']
            ]
          },
          {
            type: 'table',
            columns: ['Hop', 'Sistem / File', 'Kolom Kunci', 'Koneksi ke Hop Berikut', 'Risiko Putus'],
            rows: [
              ['1 — INFOBIP', 'Infobip CRM → Export People-YYYY_MM_DD.xlsx', 'col = Nomor, First Chat, Prospect Tagging', 'Download manual → upload ke GDrive rawdata/', 'Export terlambat atau tidak dilakukan'],
              ['2 — PYTHON', 'Google Colab daily_report_pagi.ipynb · [Dapur] Tarikan Infobib ' + bUp, 'Cleaning typo + tagging new/return + at_dict attribution', 'Paste hasil ke Sheet OK col A (First Chat) col I (Prospect Tagging)', 'at_dict tidak di-update → prospect untagged'],
              ['3 — DAPUR', '[Dapur] Tarikan Infobib · Sheet: OK', 'col A = First Chat, col I = Prospect Tagging', 'IMPORTRANGE ke [' + bUp + '] CS Dashboard sheet Prospek Infobib', 'IMPORTRANGE quota habis → #REF error'],
              ['4 — CS DASHBOARD', '[' + bUp + '] CS Dashboard · Sheet: Prospek Infobib → qa → prospect_cal', 'prospect_cal col D = New · col F = Return · col I = ALL', 'IMPORTRANGE col I ke [GROWTH] sheet prospek_' + brand, 'Formula XLOOKUP/FILTER gagal jika format tanggal berubah'],
              ['5 — GROWTH DASHBOARD', '[GROWTH] NEW DASHBOARD · Sheet: prospek_' + brand, 'IMPORTRANGE dari prospect_cal col I', 'SUMIFS → ' + bUp + ' row 10 (Prospect)', 'IMPORTRANGE permission expired → data 0'],
              ['6 — OUTPUT', '[GROWTH] NEW DASHBOARD · Sheet: ' + bUp + ' · row 10', 'Angka final Prospect ALL yang tampil di dashboard', 'Hub Dashboard Growth → KPI card Prospect', '—']
            ]
          },
          {
            type: 'alert', level: 'warn',
            html: '<strong>Chain ini sangat fragile:</strong> (1) Jika Tarikan Infobib tidak di-update → prospect tagging stale. (2) Jika IMPORTRANGE quota habis → data berhenti. (3) Jika Python preprocessing typo fix gagal → PROSPEK vs PROSPECT mismatch → count salah. (4) First Chat di Sheet OK harus dikecualikan saat delete karena historis.'
          }
        ]
      },

      'Transformasi & Formula': {
        blocks: [
          { type: 'heading', text: 'Logika Utama Script Python' },
          {
            type: 'steps',
            items: [
              {
                title: 'Load & Clean Raw Data',
                desc: 'Load file Detailed .xlsx → filter TYPING_INDICATOR (bukan pesan nyata) → identifikasi nomor client vs nomor brand (logika: From=brand_no → client=To; From=lain → client=From) → filter DJI/Sky (nomor non-pasien dari API eksternal).'
              },
              {
                title: 'Deteksi New vs Return Chat',
                desc: 'Join data dengan ' + bc.prevChat + ' per brand. Nomor yang tidak ada di histori → new chat. Nomor yang sudah ada → return chat. Output: kolom "new" di dataframe per brand.'
              },
              {
                title: 'Attribution S1/S2/S3',
                desc: 'Matching text pesan awal dengan at_dict → mapping ke channel (FB/IG/TikTok), creative, dan label S1/S2/S3. Output: kolom attribution di newchat_rata/tanam/vinir.'
              },
              {
                title: 'Response Time per Agen',
                desc: 'Hitung waktu dari pesan inbound pertama customer sampai reply pertama agen (agent_type = CS). Output: kolom resp_time per conversation.'
              },
              {
                title: 'Seen Rate (Laporan Pagi)',
                desc: 'Hitung % pesan outbound CS yang memiliki nilai di kolom Seen At (sudah dibaca). Hanya dihitung di laporan pagi.'
              },
              bc.hasBlast ? {
                title: 'Blast Analysis TANAM',
                desc: 'Load data blast konsultasi1 dari Infobip Moments → hitung: jumlah dikirim, jumlah Seen, jumlah Replied. Hanya laporan pagi TANAM.'
              } : null,
              bc.hasBlast ? {
                title: 'Location Analysis TANAM',
                desc: 'Load data people loctanam (kolom AI=Kategori, AJ=Kota, AK=Lokasi) → join dengan new chat → output ke sheet GenAI di [Growth] Sameday Data.'
              } : null
            ].filter(function (x) { return x; })
          }
        ]
      },

      'Output Data': {
        blocks: [
          { type: 'heading', text: 'Output & Template Files' },
          {
            type: 'table',
            columns: ['File Template', 'Sheet', 'Konten', 'Penerima'],
            rows: (function () {
              var rows = [
                ['[Growth] Sameday Data', 'Detailchat, import_newchat, index, GenAI', 'Data master lintas brand harian', 'Analyst, semua tim'],
                [bc.reportPagi, 'detailchat, newchat_' + brand, 'Laporan evaluasi CS kemarin', 'SPV CS, Leader Sales' + (bc.hasBlast ? ', Tim TANAM' : '')],
                [bc.reportSameday, bc.samedaySheets, 'Laporan real-time hari berjalan', 'Marketing, CS, Leader']
              ];
              if (bc.reportInternal) {
                rows.push([bc.reportInternal, bc.samedaySheets, 'Khusus TANAM Internal (klinik sendiri)', 'SPV CS TANAM']);
              }
              return rows;
            })()
          },
          {
            type: 'heading', text: 'Link File'
          },
          {
            type: 'text',
            html: '<div style="display:flex;gap:10px;flex-wrap:wrap;">' +
              '<a href="' + bc.samedayUrl + '" target="_blank" style="display:inline-flex;flex-direction:column;gap:3px;padding:12px 16px;background:var(--sur);border:1px solid var(--bor);border-radius:10px;text-decoration:none;color:var(--t1);box-shadow:var(--shadow-sm);min-width:200px;max-width:280px;" onmouseover="this.style.borderColor=\'#3b82f6\'" onmouseout="this.style.borderColor=\'#334155\'">' +
              '<span style="font-size:10px;text-transform:uppercase;letter-spacing:.5px;color:#94a3b8">&#128196; Google Sheets</span>' +
              '<span style="font-weight:600;font-size:13px;">' + bc.reportSameday + '</span>' +
              '<span style="font-size:11px;color:#64748b">Buka template sameday</span></a>' +
              '<a href="' + bc.colabSore + '" target="_blank" style="display:inline-flex;flex-direction:column;gap:3px;padding:12px 16px;background:var(--sur);border:1px solid var(--bor);border-radius:10px;text-decoration:none;color:var(--t1);box-shadow:var(--shadow-sm);min-width:200px;max-width:280px;" onmouseover="this.style.borderColor=\'#f59e0b\'" onmouseout="this.style.borderColor=\'#f59e0b44\'">' +
              '<span style="font-size:10px;text-transform:uppercase;letter-spacing:.5px;color:#f59e0b">&#9881; Google Colab</span>' +
              '<span style="font-weight:600;font-size:13px;">daily_report_sore.ipynb</span>' +
              '<span style="font-size:11px;color:#64748b">Script Python siang/sore</span></a>' +
              '<a href="' + bc.colabPagi + '" target="_blank" style="display:inline-flex;flex-direction:column;gap:3px;padding:12px 16px;background:var(--sur);border:1px solid var(--bor);border-radius:10px;text-decoration:none;color:var(--t1);box-shadow:var(--shadow-sm);min-width:200px;max-width:280px;" onmouseover="this.style.borderColor=\'#f59e0b\'" onmouseout="this.style.borderColor=\'#f59e0b44\'">' +
              '<span style="font-size:10px;text-transform:uppercase;letter-spacing:.5px;color:#f59e0b">&#9881; Google Colab</span>' +
              '<span style="font-weight:600;font-size:13px;">daily_report_pagi.ipynb</span>' +
              '<span style="font-size:11px;color:#64748b">Script Python laporan pagi</span></a>' +
              '</div>'
          }
        ]
      },


      'Daily Report Pagi': {
        blocks: [
          { type: 'heading', text: 'Daily Report Pagi — Alur Pipeline' },
          {
            type: 'alert', level: 'info',
            html: '<strong>Daily Report Pagi</strong> dijalankan setiap pagi oleh Tim Analyst. Satu script Python menghasilkan laporan evaluasi CS untuk Rata, Tanam, dan Vinir sekaligus.'
          },
          {
            type: 'diagram',
            code: `flowchart TD
      DL["📥 Download Harian dari Infobib\nDetailed Messages .xlsx\nConversations .xlsx\n(+ Barantum CDR untuk Tanam)"]
      DL --> UP["☁️ Upload ke GDrive\nrawdata/ folder"]
      UP --> PREP["📋 Buka template Daily Report Pagi Brand\nHapus kolom data sesuai panduan\n(detailchat, newchat, index_other, dll)\nCek Pyreader: prev_chat = H-1"]
      PREP --> PY["⚙️ Run Python — Google Colab\ndaily_report_pagi.ipynb\nGanti nama file input + output di script"]
      PY --> OUT["📁 Output\ndailyreport_ddmmyyyy_pagi.xlsx"]
      OUT --> SH1["sheet: main\nSeluruh raw chat detail\ndate, client, Send At, Text,\nService Name, Agent, Resp Time, Flags"]
      OUT --> SH2["sheet: newchat_rata / tanam / vinir\nNew chat per brand\n(belum pernah chat sebelumnya)\nText, Send At, User Name, client, Queue"]
      OUT --> SH3["sheet: rata/tanam/vinir_possible\nKandidat Return Chat per brand\n(WhatsApp Inbound yang return)"]
      OUT --> SH4["sheet: takeout_rata / takeout_tanam\nOpt-out / takeout chats"]
      OUT --> SH5["sheet: agent_tanam\nMapping agent CS per client Tanam"]
      SH1 --> COPY["✂️ Copy-paste manual ke Daily Report Pagi Brand\ndetailchat + newchat + index_other\nFormat tanggal, Resp Time, Flag as plain text"]
      SH2 --> COPY
      COPY --> QUEUE["📌 Copy Queue dari Conversations\nke kolom P/Q sheet newchat template\nPanjangkan rumus kolom lainnya"]
      QUEUE --> DASH["📊 Update CS Dashboard Brand\nProspect, Chat counts, Response Time"]
      COPY --> RC["🔁 sheet index_rcrata / indexrctanam / index_rvinir\n→ Lanjut ke alur Return Chat RC"]`
          },
          {
            type: 'table',
            columns: ['Sheet Output', 'Isi', 'Dipakai Untuk'],
            rows: [
              ['main', 'Semua raw chat (filter: nomor WA brand saja)', 'Source utama semua proses hilir'],
              ['newchat_rata / tanam / vinir', 'New chat per brand — belum pernah chat sebelumnya', 'Update Daily Report Pagi, deteksi new lead'],
              ['rata/tanam/vinir_possible', 'Inbound WA yang berpotensi jadi RC kandidat', 'Input awal proses Return Chat'],
              ['takeout_rata / tanam', 'Chat opt-out atau takeout', 'Monitoring churn'],
              ['agent_tanam', 'Mapping agent CS → client Tanam hari ini', 'Evaluasi distribusi beban CS']
            ]
          },
          {
            type: 'alert', level: 'warn',
            html: '<strong>Pyreader wajib dicek sebelum run!</strong> Pastikan data terakhir di sheet <code>prev_chat</code>, <code>prev_chat_tanam</code>, <code>prev_chat_vinir</code> adalah H-1. Kalau stale → new chat kemarin dihitung dua kali → angka inflated.'
          }
        ]
      },

      'Tarikan Infobib': {
        blocks: [
          { type: 'heading', text: 'Tarikan Infobib — Alur Data per Brand' },
          {
            type: 'alert', level: 'info',
            html: '<strong>[Dapur] Tarikan Infobib</strong> adalah GSheets per brand yang menyimpan data People (prospek) hasil cleansing dari Infobib. Sheet <strong>OK</strong> adalah landing zone — kolom <strong>First Chat wajib dikecualikan</strong> saat delete karena berisi histori pertama chat.'
          },
          {
            type: 'diagram',
            code: `flowchart TD
      SEG["🔍 Login Infobib\nSegment > View Profile\nPilih produk: Prospek BRAND\nCentang nomor > Export"]
      SEG --> EXP["📥 File People Export\nPeople-YYYY_MM_DD-timestamp_brand.xlsx\nVolume: ~10k (Vinir) hingga ~120k rows (Tanam)"]
      EXP --> UPT["☁️ Upload ke GDrive\nrawdata/tarikan_infobib/"]
      UPT --> PY2["⚙️ Run Python\npreprosessing_tarikan_infobib_brand.ipynb"]
      PY2 --> CLN["🧹 Cleansing per Brand\nTANAM: keep 27 kolom brand sendiri\nRATA: keep 6 kolom (Number 1, First Agent,\nProspect Tagging, Prospect Type,\nStatus Akhir, Follow Up Plan)\nVINIR: keep 6 kolom (sama dengan RATA format)"]
      CLN --> FIX["🔧 Fix Typo Otomatis\nProspect Tagging: PROSPECT→PROSPEK,\nPROSPEK RETURN→PROSPEK_RETURN,\nNo Prospek→NO PROSPEK\nProspect Type: HOT/WARM/GHOSTED/NEED FU\n(normalisasi ke format emoji standar)\nStatus Akhir: PAID/BOOKED/LOST\n(normalisasi ke ✅/❌ standar)"]
      FIX --> FILT["🚿 Filter\nExclude: null dan LS\ndari kolom Prospect Tagging"]
      FILT --> FOUT["📁 Output: brand_clean.xlsx\nHasil Preprocessing Tarikan Infobib/"]
      FOUT --> OPEN["📂 Buka [Dapur] Tarikan Infobib BRAND\n(3 file GSheets terpisah per brand)"]
      OPEN --> DELOK["🗑️ Sheet OK — Delete Data\nDELETE semua baris existing\n⚠️ KECUALI kolom First Chat\n(First Chat = histori, tidak ada di output Python)"]
      DELOK --> PASTE2["📋 Paste Hasil Python ke Sheet OK\n(kolom First Chat tetap terjaga)"]
      PASTE2 --> DONE2["✅ Sheet OK Updated\nData prospek aktif brand siap digunakan"]`
          },
          {
            type: 'table',
            columns: ['Brand', 'GSheets [Dapur]', 'Kolom Dipertahankan', 'Volume'],
            rows: [
              ['TANAM', '[Dapur] Tarikan Infobib', 'Number 1, First Agent TANAM, Follow Up Plan TANAM, Last Reply Time, Prospect Tagging TANAM, Prospect Type TANAM, Status Akhir TANAM, Reason/Notes, Shift Origin, Tanam-Kategori, Tanam-Kota, Tanam-Lokasi (27 kolom)', '~120k rows'],
              ['RATA', '[Dapur] Tarikan Infobib RATA', 'Number 1, First Agent RATA, Prospect Tagging RATA, Prospect Type RATA, Status Akhir RATA, Follow Up Plan RATA (6 kolom)', '~106k rows'],
              ['VINIR', '[Dapur] Tarikan Infobib VINIR', 'Number 1, First Agent VINIR, Prospect Tagging VINIR, Prospect Type VINIR, Status Akhir VINIR, Follow Up Plan VINIR (6 kolom)', '~10k rows']
            ]
          },
          {
            type: 'alert', level: 'warn',
            html: '<strong>Kenapa First Chat dikecualikan saat delete?</strong> Kolom First Chat berisi tanggal pertama kali nomor tersebut chat — data historis yang tidak ada di output Python. Kalau ikut terhapus saat refresh, histori hilang permanen dan tidak bisa dikembalikan.'
          }
        ]
      },

      'Return Chat (RC)': {
        blocks: [
          { type: 'heading', text: 'Return Chat (RC) — Flow per Brand' },
          {
            type: 'alert', level: 'info',
            html: '<strong>Return Chat</strong> = customer yang pernah chat sebelumnya dan kembali chat lagi. Diproses harian setelah update sales. Filter akhir konsisten: <strong>hapus baris Lead Time 1–7 hari DAN Status No Booking</strong>. Yang tersisa = RC actionable.'
          },
          {
            type: 'diagram',
            code: `flowchart TD
      SRC["📋 Sumber RC Kandidat\nDari Daily Report Pagi Brand\nsheet index_rcrata (Rata)\nsheet indexrctanam (Tanam)\nsheet index_rvinir (Vinir)"]

      SRC --> BR{"Brand?"}

      BR -->|"TANAM"| T1["Copy seluruh data\ndari sheet indexrctanam\nDaily Report Pagi Tanam"]
      BR -->|"VINIR"| V1["Copy data dari\nsheet index_rvinir\nDaily Report Pagi Vinir"]
      BR -->|"RATA"| R1["Copy client + date\n(kolom P, Q)\ndari index_rcrata"]

      T1 --> T2["Paste ke Tab RC\n[TANAM] CS Dashboard\nDaily Report 2026"]
      V1 --> V2["Paste ke Tab RC\n[VINIR] CS Dashboard\nDaily Report"]

      R1 --> R2["Paste ke sheet Return Chat\nDIALY NEW CHAT\n(untuk kalkulasi Lead Time)"]
      R2 --> R3["Dapat Lead Time\ndari DAILY NEW CHAT"]
      R3 --> R4["Copy client – Group City (kolom P–W)\npaste ke [CS] Return Chat\nsheet raw data"]
      R4 --> R5["Paste Lead Time (kolom D)\nke [CS] Return Chat raw data"]
      R5 --> R6["Pindah ke\n[RATA] CS Dashboard 2026\nTab RC"]

      T2 --> FLT["🔍 Filter Tab RC\nLead Time = 1–7 hari\nDAN Status = No Booking"]
      V2 --> FLT
      R6 --> FLT

      FLT --> DELD["🗑️ DELETE baris hasil filter\n(RC tidak actionable)"]
      DELD --> FINAL["✅ Final RC di CS Dashboard\nYang tersisa:\n• Lead Time di luar 1–7 hari, ATAU\n• Lead Time 1–7 hari + sudah Booking"]

      FINAL -->|"RATA only"| QA["RC Shortcall →\n[RATA] NEW QA Score CS 2025\nTab Active Return\n(untuk proses QA)"]
      FINAL -->|"VINIR only"| VQA["Copy kolom QRS →\n[VINIR] Active Tag\nsheet Return\n(untuk QA/monitoring)"]`
          },
          {
            type: 'table',
            columns: ['Brand', 'Sheet Sumber', 'Extra Step', 'Destinasi Akhir', 'Post-RC QA'],
            rows: [
              ['TANAM', 'indexrctanam — Daily Report Pagi Tanam', '—', '[TANAM] CS Dashboard Tab RC', '—'],
              ['RATA', 'index_rcrata — Daily Report Pagi Rata', 'Via DAILY NEW CHAT untuk kalkulasi Lead Time', '[RATA] CS Dashboard Tab RC', 'RC Shortcall → QA Score Tab Active Return'],
              ['VINIR', 'index_rvinir — Daily Report Pagi Vinir', '—', '[VINIR] CS Dashboard Tab RC', 'Copy QRS → Active Tag sheet Return → QA']
            ]
          },
          {
            type: 'alert', level: 'warn',
            html: '<strong>Logic Filter RC (semua brand):</strong> DELETE baris yang memenuhi <em>kedua</em> kondisi: <strong>(1) Lead Time = 1–7 hari</strong> DAN <strong>(2) Status = No Booking</strong>. RC yang dipertahankan = lead time di luar rentang itu, atau sudah ada booking walau lead time pendek. RATA punya extra step via DAILY NEW CHAT karena kalkulasi Lead Time-nya berbeda dari Tanam/Vinir.'
          }
        ]
      },

    },

    'Dashboard & Laporan': {
      'Laporan Rutin': {
        blocks: [
          { type: 'heading', text: 'Laporan Rutin CS — 3x per Hari' },
          {
            type: 'table',
            columns: ['Laporan', 'Waktu', 'Data', 'Fitur Khusus', 'Audience'],
            rows: [
              ['Daily Report Pagi', '07:00 WIB', 'Full day kemarin (00:00–23:59)', 'Seen rate, ' + (bc.hasBlast ? 'Blast TANAM, ' : '') + 'filter DJI/Sky', 'SPV CS, Leader Sales' + (bc.hasBlast ? ', Tim TANAM' : '')],
              ['Daily Report Siang', '13:00 WIB', 'Hari berjalan (00:00–13:00)', 'Attribution S1/S2/S3, Queue, Tags, ' + (bc.hasBlast ? 'Lokasi TANAM' : 'response time'), 'Marketing, CS, Leader'],
              ['Daily Report Sore', '17:00 WIB', 'Hari berjalan (00:00–17:00)', 'Sama dengan siang, data lebih lengkap', 'Marketing, CS, Leader']
            ]
          },
          {
            type: 'alert', level: 'info',
            html: '<strong>Perbedaan Pagi vs Siang/Sore:</strong> Laporan pagi adalah <em>evaluasi retrospektif</em> (kemarin) — ada seen rate dan blast analysis. Laporan siang/sore adalah <em>monitoring real-time</em> (hari ini) — ada attribution S1/S2/S3 dan Queue dari conversations.'
          }
        ]
      },
      Dashboard: {
        blocks: [
          { type: 'heading', text: 'Dashboard & Template Files CS ' + bUp },
          {
            type: 'text',
            html: '<div style="display:flex;gap:10px;flex-wrap:wrap;">'
              + '<a href="' + bc.csDashUrl + '" target="_blank" style="display:inline-flex;flex-direction:column;gap:4px;padding:14px 18px;background:var(--sur);border:1.5px solid var(--bor);border-radius:12px;text-decoration:none;color:var(--t1);box-shadow:var(--shadow-sm);min-width:200px;max-width:300px;transition:border-color .15s;" onmouseover="this.style.borderColor=\'#3b82f6\'" onmouseout="this.style.borderColor=\'\'">'
              + '<span style="font-size:10px;text-transform:uppercase;letter-spacing:.6px;color:#94a3b8;font-weight:600;">&#128202; Google Sheets</span>'
              + '<span style="font-weight:700;font-size:13.5px;">CS Dashboard ' + bUp + '</span>'
              + '<span style="font-size:11.5px;color:#64748b;">KPI harian CS ' + bUp + ' ↗</span></a>'
              + '<a href="https://docs.google.com/spreadsheets/d/16NUOVWGRoiUmNaT6kKGIs9LWheT7ih5Gb2ednamKouk" target="_blank" style="display:inline-flex;flex-direction:column;gap:4px;padding:14px 18px;background:var(--sur);border:1.5px solid var(--bor);border-radius:12px;text-decoration:none;color:var(--t1);box-shadow:var(--shadow-sm);min-width:200px;max-width:300px;transition:border-color .15s;" onmouseover="this.style.borderColor=\'#3b82f6\'" onmouseout="this.style.borderColor=\'\'">'
              + '<span style="font-size:10px;text-transform:uppercase;letter-spacing:.6px;color:#94a3b8;font-weight:600;">&#128196; Google Sheets</span>'
              + '<span style="font-weight:700;font-size:13.5px;">[Growth] Sameday Data</span>'
              + '<span style="font-size:11.5px;color:#64748b;">Master template lintas brand ↗</span></a>'
              + '<a href="' + bc.samedayUrl + '" target="_blank" style="display:inline-flex;flex-direction:column;gap:4px;padding:14px 18px;background:var(--sur);border:1.5px solid var(--bor);border-radius:12px;text-decoration:none;color:var(--t1);box-shadow:var(--shadow-sm);min-width:200px;max-width:300px;transition:border-color .15s;" onmouseover="this.style.borderColor=\'#3b82f6\'" onmouseout="this.style.borderColor=\'\'">'
              + '<span style="font-size:10px;text-transform:uppercase;letter-spacing:.6px;color:#94a3b8;font-weight:600;">&#128196; Google Sheets</span>'
              + '<span style="font-weight:700;font-size:13.5px;">' + bc.reportSameday + '</span>'
              + '<span style="font-size:11.5px;color:#64748b;">Sameday template ' + bUp + ' ↗</span></a>'
              + '</div>'
          }
        ]
      }
    },

    'KPI & Metrics': {
      'KPI Utama': {
        blocks: [
          { type: 'heading', text: 'KPI Utama CS ' + bUp },
          {
            type: 'kpi',
            items: [
              { label: 'Booking', value: 'KPI #1', note: 'Jumlah booking confirmed dari new chat — output utama CS' },
              { label: '% Chat → Booking (PB)', value: '~45%', note: 'Dari prospect, target 45% jadi booking (PB 45%)' },
              { label: 'Response Time', value: 'SLA cepat', note: 'Waktu pertama agen balas setelah chat masuk' },
              { label: 'Seen Rate (outbound)', value: 'Dipantau', note: '% pesan outbound CS yang sudah dibaca — diukur di laporan pagi' },
              { label: 'New Chat Volume', value: 'Harian', note: 'Total new chat per brand per hari — dari Infobip Detailed' },
              { label: 'Active Chat (handled)', value: 'Dipantau', note: 'Chat yang sudah ada agen vs belum (blank User Name)' }
            ]
          }
        ]
      },
      'Target & Cara Ukur': {
        blocks: [
          { type: 'heading', text: 'Cara Ukur Metrik CS' },
          {
            type: 'table',
            columns: ['Metrik', 'Cara Hitung', 'Sumber Data'],
            rows: [
              ['Booking', 'Count booking confirmed dari Simplybook/CRM per hari', 'Simplybook / Dynamic CRM'],
              ['% Chat → Booking', 'Booking / New Chat (%)', 'Infobip Detailed + CRM'],
              ['Response Time', 'Timestamp agen reply pertama − timestamp pesan inbound pertama', 'Infobip Detailed (Send At)'],
              ['Seen Rate', '% pesan outbound yang punya Seen At (tidak null)', 'Infobip Detailed (Seen At) — laporan pagi'],
              ['New Chat', 'Nomor yang tidak ada di prev_chat = new chat', 'Infobip Detailed + prev_chat GSheets'],
              ['Active Chat', 'Chat dengan User Name terisi (ada agen assigned)', 'Infobip Conversations (Agent Name)']
            ]
          }
        ]
      },
      'Kamus Metrics': {
        blocks: [
          { type: 'heading', text: 'Kamus Metrics CS \u2014 Definisi, Source & Cara Hitung' },
          {
            type: 'alert', level: 'info',
            html: '<strong>Kamus lengkap semua metrik CS</strong> \u2014 definisi operasional bisnis, cara hitung, asal flow data, source data raw, dan di mana metrik ini dikonsumsi. Gunakan search di homepage untuk cari metric spesifik (contoh: ketik &ldquo;definisi new chat&rdquo;, &ldquo;source data prospect&rdquo;, &ldquo;cara hitung seen rate&rdquo;).'
          },
          {
          type: 'table',
          columns: ['Metric', 'Definisi Singkat', 'Source Data Utama', 'Dipakai Di'],
          rows: [
            ['New Chat', 'Nomor WA pertama kali chat (tidak ada di prev_chat)', 'Infobip Detailed + prev_chat GSheets', 'Daily Report, CS Dashboard, Growth Dashboard'],
            ['Return Chat (RC)', 'Nomor yang pernah chat, kembali hari ini', 'Infobip Detailed + prev_chat + First Chat (Tarikan Infobib)', 'CS Dashboard Tab RC'],
            ['Lead Time RC', 'Jarak hari First Chat → RC. Filter: 1–7 hari AND No Booking = delete', 'Tarikan Infobib (First Chat) + Daily Report Pagi', 'Filter RC processing'],
            ['Prospect New', 'New Chat dengan Prospect Tagging = PROSPEK, belum LOST', 'Infobip People Export → Python → [Dapur] Tarikan Infobib → CS Dashboard qa + prospect_cal', 'Growth Dashboard row Prospect'],
            ['Prospect Return', 'RC dengan Prospect Tagging = PROSPEK_RETURN, belum LOST', 'CS Dashboard Tab RC + Tarikan Infobib', 'Growth Dashboard row Prospect'],
            ['Prospect ALL', 'Prospect New + Prospect Return', 'prospect_cal CS Dashboard', 'Growth Dashboard — denominator Booking Rate'],
            ['Booking', 'Jadwal kunjungan confirmed + DP. KPI utama CS', 'Dynamic CRM / Simplybook', 'SCH, CS KPI Utama, Growth Dashboard'],
            ['Chat to Booking Rate (PB%)', 'Booking / Prospect ALL x 100%. Target ~45%', 'CRM + prospect_cal', 'CS KPI reporting, evaluasi manajemen'],
            ['Response Time', 'Waktu chat inbound pertama → reply pertama agen', 'Infobip Detailed (Send At)', 'Daily Report 3x, CS Dashboard, evaluasi agen'],
            ['Seen Rate', '% pesan outbound CS yang sudah dibaca customer', 'Infobip Detailed (Seen At)', 'Daily Report Pagi saja'],
            ['Attribution S1/S2/S3', 'Label sumber iklan (Campaign/AdSet/Creative) per new chat', 'Infobip Detailed (Text) + at_dict GSheets', 'Daily Report Siang/Sore, Sameday template'],
            ['Prospect Type (HOT/WARM/dll)', 'Klasifikasi kesiapan beli prospek oleh agen CS', 'Infobip Conversations Tags + Tarikan Infobib', 'RC queue, CS Dashboard tracking'],
            ['Queue', 'Label antrian shift/kategori handling di Infobip', 'Infobip Conversations (Queue column)', 'Sameday template kolom P, CS Dashboard'],
            ['Active Chat', 'Chat yang sudah di-assign ke agen (User Name terisi)', 'Infobip Conversations (Agent Name)', 'CS operational monitoring real-time'],
            ['Blast Sent/Seen/Replied', '(TANAM only) Metrik blast WA via Infobip Moments', 'Infobip Moments/Campaigns data', 'Daily Report Pagi TANAM saja']
          ]
        },
          { type: 'heading', text: 'Detail Per Metric' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">💬 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">New Chat</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Nomor WA yang pertama kali chat — belum pernah ada di histori sebelumnya (tidak ada di prev_chat brand).</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Lead baru yang baru pertama kali engage via WA. Ini output langsung dari marketing. Volume new chat = efektivitas iklan — BUKAN KPI CS. CS bertanggung jawab atas kualitas handling, bukan volumenya.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\\">COUNT(nomor di Infobip Detailed hari ini) WHERE nomor NOT IN prev_chat</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>Script Python daily_report_pagi/sore.ipynb — join Infobip Detailed dengan prev_chat GSheets (py_reader)</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Infobip Detailed Messages (.xlsx) + prev_chat GSheets (py_reader)</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>Daily Report Pagi Brand (sheet newchat_{brand}), CS Dashboard, Growth Dashboard</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">🔁 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Return Chat (RC)</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Nomor WA yang sudah pernah chat sebelumnya dan kembali chat lagi hari ini.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Lead lama yang re-engage. Lebih warm dari new chat. Perlu dinilai Lead Time-nya — RC dengan Lead Time 1–7 hari AND masih No Booking kemungkinan masih dalam siklus aktif dihandle, jadi tidak dimasukkan ke RC queue (di-delete).</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\\">COUNT(nomor di Infobip Detailed hari ini) WHERE nomor IN prev_chat</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>Daily Report Pagi → sheet index_rc{brand} → RC Dashboard (filter Lead Time 1–7 + No Booking = delete)</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Infobip Detailed Messages + prev_chat GSheets + First Chat (dari Tarikan Infobib / [Dapur])</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>CS Dashboard Tab RC, QA Score (RATA), Active Tag sheet Return (VINIR)</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">📅 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Lead Time RC</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Jarak hari antara First Chat (kapan pertama kali chat) dan tanggal Return Chat hari ini.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Seberapa lama lead dormant sebelum balik lagi. Filter RC: Lead Time 1–7 hari AND No Booking = masih dalam siklus CS aktif → di-delete dari RC list agar tidak double-counting. Lead Time > 7 hari = cold return.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\\">Date RC - Date First Chat (hari). RATA: via sheet DAILY NEW CHAT. TANAM/VINIR: dari index rc sheet langsung</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>RC Processing — RATA punya extra step via DAILY NEW CHAT untuk kalkulasi Lead Time</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Tarikan Infobib / [Dapur] (First Chat) + Daily Report Pagi (Date RC)</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>Filter RC processing — baris Lead Time 1–7 AND Status No Booking → DELETE</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">🟢 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Prospect New</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>New Chat yang dikualifikasi CS sebagai prospek aktif (Prospect Tagging = PROSPEK) dan belum berstatus LOST.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Metrik kualitas funnel CS: bukan semua new chat jadi prospek. Hanya yang sudah dikualifikasi agen dan punya potensi lanjut ke booking. Turun bisa berarti: kualitas lead marketing buruk, atau CS underqualifying.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\\">COUNTIFS(qa!D=Prospek, qa!N not LOST) per tanggal di sheet prospect_cal</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>Infobip People Export → Python preprocessing → [Dapur] Tarikan Infobib Sheet OK → IMPORTRANGE ke CS Dashboard (Prospek Infobib) → XLOOKUP ke qa → COUNTIFS di prospect_cal col D</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Infobip People Export (.xlsx via Infobip Segments) → Python → [Dapur] Tarikan Infobib GSheets</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>prospect_cal col D → Growth Dashboard sheet prospek_{brand} col I (IMPORTRANGE) → Growth Dashboard row Prospect</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">🔵 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Prospect Return</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Return Chat yang Prospect Tagging-nya = PROSPEK_RETURN di Tarikan Infobib dan belum berstatus LOST.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Lead lama yang kembali dan masih aktif dalam pipeline CS sebagai prospek. Mengukur re-activation rate — berapa persen RC yang masih warm dan berpotensi booking.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\\">COUNTIFS(RC!A=tanggal, RC!D not empty, RC!J=PROSPEK_RETURN, RC!O not LOST) di prospect_cal col F</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>RC processing → CS Dashboard Tab RC → COUNTIFS oleh prospect_cal</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>CS Dashboard Tab RC (sheet RC) + Tarikan Infobib (Prospect Tagging column J)</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>prospect_cal col F → Growth Dashboard sheet prospek_{brand} col I (IMPORTRANGE)</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">🟡 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Prospect ALL</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Total prospek aktif = Prospect New + Prospect Return untuk hari/periode yang sama.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Ukuran total pipeline aktif CS. Ini angka yang masuk ke Growth Dashboard sebagai Prospect. Semua downstream metrics (Booking Rate, dll) menggunakan angka ini sebagai denominator.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\\">=D+F di prospect_cal (Prospect New + Prospect Return)</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>Kalkulasi di sheet prospect_cal CS Dashboard</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>prospect_cal GSheets (CS Dashboard per brand)</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>Growth Dashboard sheet prospek_{brand} (IMPORTRANGE col I) → Growth Dashboard row Prospect → denominator Booking Rate</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">📋 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Booking</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Konfirmasi jadwal kunjungan pasien ke klinik, biasanya disertai pembayaran DP.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Gate terpenting antara CS dan SCH — komitmen nyata pasien untuk datang. KPI utama CS. Booking tanpa DP lebih berisiko no-show. CS bertanggung jawab mendorong booking sampai confirmed dan DP terbayar.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\\">COUNT(booking confirmed per hari) dari CRM/Simplybook per brand</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>CS Handling → Push Booking → Input CRM/Simplybook → Handover ke SCH</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Dynamic CRM / Simplybook (input manual oleh CS Agent)</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>CS KPI Utama, SCH Queue (penjadwalan kunjungan), Growth Dashboard row Booking</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">📈 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Chat to Booking Rate (PB%)</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Persentase dari Prospect ALL yang akhirnya melakukan booking.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Efektivitas CS mengkonversi prospek jadi komitmen kunjungan. Target ~45%. Turun bisa berarti: kualitas lead buruk (marketing), handling CS lemah, hambatan di pricing/produk, atau DP terlalu tinggi.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\\">Booking / Prospect ALL x 100%</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>Calculated metric — dihitung di laporan/dashboard, tidak ada script khusus</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Booking (CRM) + Prospect ALL (prospect_cal)</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>CS KPI reporting, evaluasi mingguan manajemen, coaching agen</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">⏱️ METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Response Time</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Waktu dari chat inbound pertama customer sampai agen CS pertama kali membalas.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Kecepatan CS merespons lead. Sangat time-sensitive — lead WA yang tidak direspons dalam beberapa menit sering drop atau pindah kompetitor. SLA internal biasanya kurang dari 5 menit untuk hot hours (09:00–20:00).</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\\">MIN(Send At agen reply pertama) - MIN(Send At customer inbound pertama) per conversation</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>Script Python daily_report.ipynb — logika berdasarkan Send At dan From/To per conversation</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Infobip Detailed Messages (kolom Send At, From, To, Type/Direction)</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>Daily Report Harian (3x), CS Dashboard, evaluasi performance agen</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">👁️ METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Seen Rate</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Persentase pesan outbound CS yang sudah dibaca customer (kolom Seen At tidak kosong).</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Indikator seberapa banyak pesan CS benar-benar sampai dan dibaca. Seen Rate rendah bisa berarti: salah waktu kirim, konten tidak menarik, atau nomor tidak aktif. HANYA dihitung di laporan pagi (data kemarin, full day) karena Seen At diisi dengan delay oleh Infobip.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\\">COUNT(outbound WHERE Seen At NOT NULL) / COUNT(total outbound) x 100%</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>Script Python daily_report_pagi.ipynb saja — tidak tersedia di laporan siang/sore</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Infobip Detailed Messages (kolom Seen At, From = nomor WA brand)</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>Daily Report Pagi saja — tidak muncul di laporan siang/sore</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">🎯 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Attribution S1 / S2 / S3</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Label hierarki sumber iklan: S1 = Campaign level, S2 = Ad Set level, S3 = Ad/Creative level.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Tracking efektivitas spending iklan per channel, per campaign, dan per creative untuk alokasi budget marketing. Memungkinkan marketing tahu iklan mana yang paling efisien menghasilkan lead berkualitas.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\\">Pattern matching teks pesan pertama customer dengan at_dict (kamus attribution di py_reader) → assign S1/S2/S3</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>Script Python (attribution processing) — at_dict dikelola manual di GSheets py_reader, harus diupdate setiap ada campaign baru</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Infobip Detailed Messages (kolom Text pesan inbound pertama) + at_dict GSheets (py_reader)</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>Daily Report Siang/Sore, [Brand] Sameday template (breakdown per channel untuk Marketing)</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">🏷️ METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Prospect Type — HOT / WARM / NEED FU / GHOSTED / NP</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Klasifikasi kualitas dan kesiapan beli prospek oleh agen CS via tagging di Infobip Conversations.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Segmentasi pipeline CS: HOT = siap booking tinggal set jadwal (prioritas utama). WARM = tertarik tapi perlu pertimbangan. NEED FU = belum responsif butuh follow up aktif. GHOSTED = tidak merespons sama sekali. NP (No Prospect) = tidak relevan atau bukan target produk.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\\">Manual tagging oleh agen CS di Infobip per conversation setelah setiap interaksi</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>Infobip Conversations (Tags field) → Tarikan Infobib (Prospect Type column) → CS Dashboard</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Infobip Conversations (Tags field) + Tarikan Infobib (Prospect Type column per brand)</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>RC queue prioritization, Tarikan Infobib daily tracking, CS Dashboard evaluasi konversi per tag</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">📬 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Queue (Antrian)</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Label antrian penanganan di Infobip yang menunjukkan shift/waktu/kategori chat ditangani CS.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Tracking distribusi beban kerja CS per shift dan per kategori. Membantu identifikasi bottleneck (antrian penuh di jam tertentu) dan evaluasi kapasitas CS.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\\">Langsung dari kolom Queue di Infobip Conversations — di-copy manual ke kolom P template Sameday</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>Infobip Conversations → copy manual oleh Analyst ke template Sameday (kolom P/Q)</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Infobip Conversations (kolom Queue)</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>Sameday template kolom P, CS Dashboard monitoring beban kerja</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">✅ METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Active Chat</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Chat yang sudah di-assign ke agen CS (kolom User Name / Agent Name tidak kosong di Infobip).</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Gap antara total incoming chat dan active chat = chat yang masih waiting/unhandled. Kalau gap besar berarti ada bottleneck atau kekurangan agen di jam itu.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\\">COUNT(conversations WHERE Agent Name IS NOT NULL) dari Infobip Conversations</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>Infobip Conversations — data real-time per sesi download</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Infobip Conversations (kolom Agent Name / User Name)</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>CS operational monitoring real-time, evaluasi distribusi beban agen</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">📣 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Blast Sent / Seen / Replied</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Metrik blast WA marketing ke lead TANAM via Infobip Moments: jumlah terkirim, dibaca, dan direspons.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Efektivitas campaign blast WA untuk re-engagement lead TANAM. Replied Rate = indikator kualitas konten — blast yang direspons berarti relevan. Digunakan untuk optimasi timing, konten, dan segmen blast.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\\">COUNT dari Infobip Moments per campaign blast: Sent, Seen (Seen At not null), Replied</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>Script Python daily_report_pagi.ipynb TANAM saja — load dari Infobip Moments/Campaigns data</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Infobip Moments / Campaigns data (BUKAN Infobip Detailed Messages)</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>Daily Report Pagi TANAM saja</span></div><div style=\"margin-top:10px;padding:8px 12px;background:rgba(245,158,11,.08);border-radius:6px;font-size:12px;color:#92400e;\"><strong>Brand Note:</strong> Hanya tersedia untuk brand TANAM. RATA dan VINIR tidak menggunakan blast WA.</div></div>' }
        ]
      }
    }
  };
}
// ── END CS BLOCKS ─────────────────────────────────────────────

// ── SCH BLOCKS GENERATOR ──────────────────────────────────────
// Dipanggil dengan: _schBlocks('rata') / _schBlocks('tanam') / _schBlocks('vinir')
// Struktur pipeline sama untuk semua brand — brand-specific di bagian DAPUR & Dashboard
function _schBlocks(brand) {
  var bUp = brand.toUpperCase();

  var bc = {
    rata: {
      dapur: '[DAPUR] RATA SCH Scheduled & Visit',
      dashboard: '[RATA] Scheduling Dashboard',
      dashUrl: null,
      npSheet: 'np rata',
      salesReport: 'Smile RATA Sales Report',
      reminderFile: '[RATA] Reminder & Recall New',
      convList: 'RATA CONVERSION LIST - 2025'
    },
    tanam: {
      dapur: '[DAPUR] TANAM SCH Scheduled & Visit v2',
      dashboard: '[TANAM] Scheduling Dashboard',
      dashUrl: 'https://docs.google.com/spreadsheets/d/1T4m3VVYzghbXqpObxhmWGJorADCnUoc0RIWH7UXlg34/edit?gid=321902749#gid=321902749',
      npSheet: 'np tanam',
      salesReport: 'Smile Tanam Sales Report 2025',
      reminderFile: '[TANAM] Reminder & Recall New',
      convList: 'TANAM CONVERSION LIST - 2025'
    },
    vinir: {
      dapur: '[DAPUR] VINIR SCH Scheduled & Visit',
      dashboard: '[VINIR] Scheduling Dashboard',
      dashUrl: null,
      npSheet: 'np vinir',
      salesReport: 'Smile VINIR Sales Report',
      reminderFile: '[VINIR] Reminder & Recall New',
      convList: 'VINIR CONVERSION LIST - 2025'
    }
  }[brand];

  var diagramCode = [
    'flowchart TD',
    '    subgraph SRC ["SOURCE — Data Asal"]',
    '        SB1["Simplybook Internal\\nhttps://rata.secure.simplybook.asia"]',
    '        SB2["Simplybook B2B\\nhttps://mitrarata.secure.simplybook.asia"]',
    '        EXT1["' + bc.salesReport + '\\n(Tim TC — data booking & performance)"]',
    '        EXT2["' + bc.reminderFile + '\\n(sheet: Reminder)"]',
    '        EXT3["' + bc.convList + '\\n(Tim TC — sheet: Database Pasien)"]',
    '    end',
    '    subgraph UPLOAD ["UPLOAD & PROSES"]',
    '        GU1["[GROWTH] Manual Update\\nSimplybook RATA\\n(sheet: Worksheet)"]',
    '        GU2["[GROWTH] Manual Update\\nSimplybook B2B\\n(sheet: Worksheet)"]',
    '        GH["[GROWTH] Hasil Upload\\nSimplybook Manual\\n(Gabungan Final)"]',
    '    end',
    '    subgraph DB ["DATABASE"]',
    '        DB1["[DB] Simplybook Raw 2026-Present\\n(sheet: Manual Automate)"]',
    '        DB2["(sheet: simplybook raw)\\nbackup formula"]',
    '    end',
    '    subgraph MIR ["MIRROR & SPLIT per Brand"]',
    '        M0["mirror simply np 2026\\n(sc raw simplybook)"]',
    '        MTA["np tanam"]',
    '        MRA["np rata"]',
    '        MVI["np vinir"]',
    '    end',
    '    subgraph DAPUR ["DAPUR — ' + bc.dapur + '"]',
    '        D1["sheet: simply"]',
    '        D2["sheet: booking"]',
    '        D3["sheet: reminder"]',
    '        D4["sheet: visit"]',
    '        D5["sheet: index\\n(location grouping)"]',
    '        D6["sheet: raw internal"]',
    '    end',
    '    DASH["DASHBOARD — ' + bc.dashboard + '\\n(sheet: Scheduled & Visit)"]',
    '    SB1 -->|"Export .xlsx\\nTim Analyst"| GU1',
    '    SB2 -->|"Export .xlsx\\nTim Analyst"| GU2',
    '    GU1 -->|"AppScript:\\nSave Database"| GH',
    '    GU2 -->|"AppScript:\\nSave Database"| GH',
    '    GH --> DB1',
    '    DB1 --- DB2',
    '    DB1 --> M0',
    '    M0 --> MTA',
    '    M0 --> MRA',
    '    M0 --> MVI',
    '    MTA -->|"sheet: simply"| D1',
    '    EXT1 -->|"IMPORTRANGE"| D2',
    '    EXT2 -->|"IMPORTRANGE"| D3',
    '    EXT3 -->|"IMPORTRANGE"| D4',
    '    D1 --> D6',
    '    D2 --> D6',
    '    D3 --> D6',
    '    D4 --> D6',
    '    D5 --> D6',
    '    D6 --> DASH'
  ].join('\n');

  return {
    Overview: {
      blocks: [
        {
          type: 'text',
          html: '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px"><a href="#" target="_blank" style="display:inline-flex;align-items:center;gap:6px;padding:8px 14px;background:var(--sur);border:1px solid var(--bor);border-radius:10px;color:var(--t1);text-decoration:none;font-size:13px;font-weight:600;box-shadow:var(--shadow-sm);">&#128202; ' + bc.dashboard + ' &#8599;</a></div>'
        },
        {
          type: 'alert', level: 'info',
          html: '<strong>SCH ' + bUp + '</strong> — Tim <em>Scheduling</em> bertugas memastikan pasien yang sudah booking benar-benar datang visit. Core job: <strong>reminder</strong> sebelum jadwal dan koordinasi reschedule. KPI utama: Visit rate & % Booking→Visit.'
        },
        {
          type: 'text',
          html: '<p>Posisi SCH dalam funnel: <strong>CS → (Booking) → SCH → (Visit) → TC</strong>. SCH menerima "handover" dari CS berupa jadwal booking, lalu tugasnya memastikan pasien hadir. Data pipeline (Simplybook → GSheet → Dashboard) dikelola oleh Tim Analyst sebagai support operasional.</p>'
        },
        {
          type: 'kpi',
          items: [
            { label: 'KPI Utama', value: 'Visit', note: 'Jumlah pasien yang benar-benar datang visit' },
            { label: '% Booking → Visit', value: 'Target: ~58%', note: 'Berapa % dari yang booking akhirnya visit' },
            { label: '% Cancellation', value: 'Dipantau', note: 'Target cancel dijaga seminimal mungkin' },
            { label: 'Brand Coverage', value: 'All Brand', note: 'RATA, TANAM, VINIR — pipeline data terpisah per brand' }
          ]
        }
      ]
    },

    'Business Flow': {
      Input: {
        blocks: [
          { type: 'heading', text: 'Sumber Data Masuk (Input)' },
          {
            type: 'table',
            columns: ['Source', 'Tipe Update', 'Diupdate Oleh', 'Keterangan'],
            rows: [
              ['Simplybook Internal', 'Export Manual .xlsx', 'Tim Analyst', 'Filter: bulan ini s/d 4 bulan ke depan (capture jadwal upcoming)'],
              ['Simplybook B2B', 'Export Manual .xlsx', 'Tim Analyst', 'Filter: bulan ini s/d akhir tahun (capture seluruh pipeline B2B)'],
              [bc.salesReport, 'IMPORTRANGE (auto)', 'Tim TC', 'Data booking, tanggal, & agent TC — Free Booking + Sales sheet'],
              [bc.reminderFile, 'IMPORTRANGE (auto)', 'Tim SCH', 'Tracking reminder WA — sheet: Reminder'],
              [bc.convList, 'IMPORTRANGE (auto)', 'Tim TC', 'Data conversion/visit pasien — sheet: Database Pasien']
            ]
          },
          {
            type: 'alert', level: 'warn',
            html: '<strong>⚠ Export Simplybook bersifat manual.</strong> Tim Analyst wajib export setiap hari kerja — keterlambatan export akan menyebabkan data pipeline tertinggal dan dashboard SCH tidak akurat.'
          }
        ]
      },
      'Proses Utama': {
        blocks: [
          { type: 'heading', text: 'Alur Proses Utama SCH (8 Langkah)' },
          {
            type: 'steps',
            items: [
              {
                title: '1. Export dari Simplybook',
                desc: 'Tim Analyst buka Simplybook → Menu Report → set filter tanggal (Internal: bulan ini s/d +4 bulan | B2B: bulan ini s/d akhir tahun) → Export as Excel (.xlsx)'
              },
              {
                title: '2. Import ke GSheet Manual Update',
                desc: 'Tim Analyst upload file .xlsx ke [GROWTH] Manual Update Simplybook RATA (Internal) atau B2B. Pilih opsi "Replace Spreadsheet" agar data masuk ke sheet "Worksheet" secara otomatis.'
              },
              {
                title: '3. AppScript: Save Database',
                desc: 'Di GSheet Manual Update, klik menu "User Action" → "Save Database". AppScript berjalan: membersihkan tanda "+" di kolom H (nomor telepon), lalu salin data ke [GROWTH] Hasil Upload Simplybook Manual (sheet: Hasil Upload Rata / Hasil Upload B2B).'
              },
              {
                title: '4. Pengolahan di Hasil Upload',
                desc: 'Sheet "Pengolahan Data 1 Rata" memproses data internal → menghasilkan "Final Rata". Sheet "Pengolahan Data 1 B2B" → "Final B2B". Keduanya digabung ke sheet "Gabungan Final". Pastikan tipe data (terutama tanggal/waktu) sudah sesuai.'
              },
              {
                title: '5. Push ke Database Utama',
                desc: '"Gabungan Final" digunakan di [DB] simplybook Raw 2026-Present (sheet: Manual Automate). Sheet "simplybook raw" adalah backup otomatis via formula QUERY yang filter data non-null dari Manual Automate.'
              },
              {
                title: '6. Mirror & Split per Brand',
                desc: 'Data dari DB masuk ke "mirror simply np [2026]" (sheet: sc raw simplybook) → dipisahkan per brand ke sheet: np tanam, np rata, np vinir. Pemisahan menggunakan informasi service yang ada di sheet "index".'
              },
              {
                title: '7. Masuk ke DAPUR Brand',
                desc: 'Data ' + bUp + ' dari mirror (sheet: ' + bc.npSheet + ') masuk ke sheet "simply" di ' + bc.dapur + '. Bersamaan, data booking dari Sales Report, reminder, dan visit di-pull otomatis via IMPORTRANGE dari source masing-masing.'
              },
              {
                title: '8. Output: Scheduling Dashboard',
                desc: 'Sheet "raw internal" di DAPUR mengompilasi semua data (simply + booking + visit + reminder + index) → menjadi sumber untuk ' + bc.dashboard + ' (sheet: Scheduled & Visit) sebagai output monitoring final.'
              }
            ]
          }
        ]
      },
      'Output & Handover': {
        blocks: [
          { type: 'heading', text: 'Output & Handover' },
          {
            type: 'table',
            columns: ['Output', 'File / Sheet', 'Penerima', 'Frekuensi'],
            rows: [
              ['Dashboard Scheduling', bc.dashboard + ' → Scheduled & Visit', 'Team Lead SCH, Manager Growth', 'Real-time (formula auto-refresh)'],
              ['Database Master Simplybook', '[DB] simplybook Raw → Manual Automate', 'Tim Analyst, Semua tim', 'Harian (setelah agent upload)'],
              ['Data Split per Brand', 'mirror simply np → ' + bc.npSheet, 'DAPUR masing-masing brand', 'Mengikuti update DB']
            ]
          }
        ]
      },
      'Exception & Eskalasi': {
        blocks: [
          { type: 'heading', text: 'Exception & Eskalasi' },
          {
            type: 'alert', level: 'warn',
            html: '<strong>Isu Umum:</strong> (1) Export Simplybook terlambat → dashboard gap. (2) IMPORTRANGE error "Ref" → cek permission akses GSheet source. (3) AppScript gagal → cek apakah file target berubah nama/ID. (4) Data duplikat di Gabungan Final → cek logika Pengolahan Data 1.'
          }
        ]
      }
    },

    Operasional: {
      'Aktivitas Harian': {
        blocks: [
          { type: 'heading', text: 'Aktivitas Harian — Tim SCH' },
          {
            type: 'steps',
            items: [
              { title: 'Cek Jadwal Booking Hari Ini', desc: 'Buka Dashboard Scheduling → lihat daftar pasien yang dijadwalkan visit hari ini dan beberapa hari ke depan.' },
              { title: 'Kirim Reminder ke Pasien', desc: 'Hubungi pasien (WA/call) sesuai jadwal. Catat hasil reminder di sheet Reminder.' },
              { title: 'Update Data Visit', desc: 'Koordinasi dengan klinik — konfirmasi pasien yang datang vs no-show. Update data visit sesuai aktual.' },
              { title: 'Tindak Lanjut No-Show / Cancel', desc: 'Pasien cancel atau no-show: lakukan reschedule atau eskalasi ke CS untuk follow-up ulang.' },
              { title: 'Verifikasi Dashboard', desc: 'Pastikan data di Dashboard Scheduling sudah mencerminkan kondisi aktual hari ini.' }
            ]
          }
        ]
      },
      'Tools & Sistem': {
        blocks: [
          { type: 'heading', text: 'Tools & Akses' },
          {
            type: 'table',
            columns: ['Tool / Sistem', 'Fungsi', 'Akses'],
            rows: [
              ['Simplybook Internal', 'Booking system utama — diakses Tim Analyst untuk export data', 'https://rata.secure.simplybook.asia/v2/r/'],
              ['Simplybook B2B', 'Booking system mitra/B2B — diakses Tim Analyst untuk export data', 'https://mitrarata.secure.simplybook.asia/v2/r/'],
              ['[GROWTH] Manual Update Simplybook', 'Staging upload data export — dikelola Tim Analyst', 'GSheet — via link'],
              ['[GROWTH] Hasil Upload Simplybook Manual', 'Pengolahan & konsolidasi — dikelola Tim Analyst', 'GSheet — via link'],
              ['[DB] simplybook Raw 2026-Present', 'Database master semua brand', 'GSheet — via link'],
              ['mirror simply np [2026]', 'Split data per brand', 'GSheet — via link'],
              [bc.dapur, 'Analisis & agregasi SCH ' + bUp, 'GSheet — via link'],
              [bc.dashboard, 'Dashboard monitoring SCH ' + bUp, 'GSheet — via link'],
              ['Google Apps Script', 'Automate upload (Save Database)', 'Built-in di GSheet Manual Update']
            ]
          }
        ]
      },
      'Rules & Kebijakan': { blocks: [] },
      SOP: { blocks: [] }
    },

    'Data & Pipeline': {
      'Data Sources': {
        blocks: [
          { type: 'heading', text: 'Data Sources — SCH ' + bUp + ' Pipeline' },
          {
            type: 'table',
            columns: ['File / GSheet', 'Sheet Kunci', 'Role dalam Pipeline', 'Diupdate Oleh'],
            rows: [
              ['Simplybook Internal', '(export .xlsx)', 'Source awal booking internal', 'Tim Analyst (manual harian)'],
              ['Simplybook B2B', '(export .xlsx)', 'Source awal booking B2B/mitra', 'Tim Analyst (manual harian)'],
              ['[GROWTH] Manual Update Simplybook RATA', 'Worksheet', 'Staging import Simplybook Internal', 'Tim Analyst'],
              ['[GROWTH] Manual Update Simplybook B2B', 'Worksheet', 'Staging import Simplybook B2B', 'Tim Analyst'],
              ['[GROWTH] Hasil Upload Simplybook Manual', 'Hasil Upload Rata, Hasil Upload B2B, Pengolahan Data 1, Final Rata, Final B2B, Gabungan Final', 'Pengolahan & konsolidasi upload', 'AppScript otomatis'],
              ['[DB] simplybook Raw 2026-Present', 'Manual Automate, simplybook raw', 'Database master semua data Simplybook', 'Formula dari Gabungan Final'],
              ['mirror simply np [2026]', 'sc raw simplybook, np tanam, np rata, np vinir, index', 'Split data per brand berdasarkan service', 'Formula otomatis'],
              [bc.dapur, 'simply, booking, reminder, visit, index, raw internal', 'Agregasi & analisis SCH ' + bUp, 'Formula + manual agent'],
              [bc.salesReport, 'Free Booking ' + bUp + ', SALES ' + bUp + '/SMILE', 'Data booking, tanggal, & agent TC', 'Tim TC'],
              [bc.reminderFile, 'Reminder', 'Tracking reminder WA pasien', 'Tim SCH'],
              [bc.convList, 'Database Pasien', 'Data conversion/visit pasien (milik TC)', 'Tim TC'],
              [bc.dashboard, 'Scheduled & Visit (+ 30 sheet lainnya)', 'Output dashboard monitoring final', 'Formula otomatis dari DAPUR']
            ]
          },
          {
            type: 'alert', level: 'info',
            html: '<strong>Catatan Arsitektur:</strong> Pipeline ini bersifat <em>linear</em> — data mengalir satu arah: Simplybook → GSheet Manual → DB → Mirror → DAPUR → Dashboard. Setiap node adalah GSheet terpisah yang terhubung via formula IMPORTRANGE atau AppScript.'
          }
        ]
      },

      'Flow Diagram': {
        blocks: [
          { type: 'heading', text: 'Data Pipeline Diagram — SCH ' + bUp },
          { type: 'diagram', code: diagramCode },
          {
            type: 'table',
            columns: ['Hop', 'Sistem / File', 'Aksi', 'Kolom Kunci', 'Output / Metric'],
            rows: [
              ['1 — SIMPLYBOOK', 'Simplybook (' + bUp + ') · B2B Internal', 'Export .xlsx harian + agent input manual', 'Tanggal booking, Nama, Klinik, Status', 'Raw booking data'],
              ['2 — GROWTH MANUAL UPDATE', '[GROWTH] MANUAL UPDATE · sheet Worksheet', 'Agent SCH klik User Action → Save Database (AppScript)', 'col H = Nomor telepon (strip "+")', '[GROWTH] Hasil Upload Simplybook Manual → raw_sch_' + brand],
              ['3 — MIRROR SIMPLY NP', 'mirror simply np [2026] · sheet ' + bc.npSheet, 'IMPORTRANGE otomatis dari [DB] Simplybook Raw', 'col B = Tgl Booking, col C = Klinik, col F = Nama', 'Data bersih per brand'],
              ['4 — DAPUR SCH', bc.dapur + ' · sheet simply + booking + reminder + visit', 'IMPORTRANGE dari Sales Report (Free Booking + DP) + reminder + visit', 'col B = Tgl, booking sheet = merge FB+DP', 'sr_fb_' + brand + ' = source Booking count Growth Dashboard'],
              ['5 — DAPUR raw internal', bc.dapur + ' · sheet raw internal', 'Kompilasi otomatis: simply + booking + visit + reminder + index', 'Semua kolom pipeline SCH', 'Dashboard SCH · sheet Scheduled & Visit'],
              ['6 — GROWTH DASHBOARD', '[GROWTH] NEW DASHBOARD · ' + bUp + ' row 12', 'COUNTIFS(sr_fb_' + brand + ', tanggal, periode)', 'Booking count MTD', 'Metric Booking di Hub Dashboard Growth']
            ]
          },
          {
            type: 'alert', level: 'info',
            html: '<strong>Cara baca:</strong> Panah <code>--&gt;</code> = data flow otomatis (formula/IMPORTRANGE). Panah dengan label <em>Manual SCH / AppScript</em> = memerlukan aksi manual dari agent. Node yang diarsir adalah file GSheet terpisah.'
          }
        ]
      },

      'Transformasi & Formula': {
        blocks: [
          { type: 'heading', text: 'AppScript: Save Database' },
          {
            type: 'text',
            html: '<p>Script berjalan saat agent SCH klik <strong>User Action → Save Database</strong> di GSheet Manual Update. Fungsi: ambil data sheet "Worksheet", bersihkan tanda "+" di kolom H (nomor telepon), salin ke [GROWTH] Hasil Upload Simplybook Manual.</p><pre style="background:#1e293b;color:#e2e8f0;padding:1rem;border-radius:8px;overflow-x:auto;font-size:11.5px;line-height:1.6;"><code>var sourceSpreadsheetID = "1spQcTH0f03EsA6p8P-LlyMeAdWE2G6tocCCu9Ueg-SE";\nvar sourceWorksheetName = "Worksheet";\nvar targetSpreadsheetID = "1yjkRQByTLC8ziLui8Slve3In_c55ygWfAE585NZZTf0";\nvar targetWorksheetName = "Hasil Upload Rata";\n\nfunction UploadData() {\n  var src = SpreadsheetApp.openById(sourceSpreadsheetID)\n                          .getSheetByName(sourceWorksheetName);\n  var data = src.getDataRange().getValues();\n\n  // Bersihkan tanda "+" di kolom H (index 7) — nomor telepon\n  for (var i = 0; i &lt; data.length; i++) {\n    if (data[i][7]) {\n      data[i][7] = data[i][7].toString().replace(/\\+/g, \'\');\n    }\n  }\n\n  var dst = SpreadsheetApp.openById(targetSpreadsheetID)\n                          .getSheetByName(targetWorksheetName);\n  dst.getRange(1, 1, data.length, data[0].length).setValues(data);\n}\n\nfunction onOpen() {\n  SpreadsheetApp.getUi()\n    .createMenu(\'User Action\')\n    .addItem(\'Save Database\', \'UploadData\')\n    .addToUi();\n}</code></pre>'
          },
          { type: 'heading', text: 'Formula Backup Database' },
          {
            type: 'text',
            html: '<p>Sheet <strong>simplybook raw</strong> di [DB] adalah backup otomatis dari Manual Automate — menggunakan QUERY untuk filter data non-null di kolom F (nama client):</p><pre style="background:#1e293b;color:#e2e8f0;padding:1rem;border-radius:8px;overflow-x:auto;font-size:11.5px;"><code>=QUERY(\'Manual Automate\'!A2:Z,\n"Select A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X\n where F is not Null")</code></pre>'
          },
          { type: 'heading', text: 'Formula IMPORTRANGE — Booking (dari Sales Report)' },
          {
            type: 'text',
            html: '<p>Sheet <strong>booking</strong> di DAPUR menggabungkan dua sumber dari ' + bc.salesReport + ' — "Free Booking" dan "Sales" sheet — difilter dari 2026 dan diurutkan by tanggal:</p><pre style="background:#1e293b;color:#e2e8f0;padding:1rem;border-radius:8px;overflow-x:auto;font-size:11.5px;"><code>=QUERY(\n {\n  FILTER(\n   {\n    IMPORTRANGE("https://docs.google.com/spreadsheets/d/1Rgr...",\n                "Free Booking TANAM!B2:H"),\n    IMPORTRANGE("https://docs.google.com/spreadsheets/d/1Rgr...",\n                "Free Booking TANAM!N2:N")\n   },\n   IMPORTRANGE("...","Free Booking TANAM!C2:C") &gt;= DATE(2026,1,1)\n  );\n  QUERY(\n   { IMPORTRANGE("...","SALES TANAM/SMILE!A:AA") },\n   "SELECT Col7,Col1,Col2,Col4,Col5,Col15,Col27,Col17\n    WHERE Col8 CONTAINS \'TANAM\'\n    AND Col1 &gt;= date \'2026-01-01\'",\n   0\n  )\n },\n "SELECT * ORDER BY Col2 ASC", 0\n)</code></pre>'
          },
          { type: 'heading', text: 'Formula IMPORTRANGE — Reminder & Visit' },
          {
            type: 'text',
            html: '<p>Sheet <strong>reminder</strong> di DAPUR — pull dari ' + bc.reminderFile + ' sheet Reminder:</p><pre style="background:#1e293b;color:#e2e8f0;padding:0.8rem;border-radius:8px;font-size:11.5px;"><code>=IMPORTRANGE("1ZVMpxUWAD1EsPv5dhmapCgznrHNE_uzCt7s2Mcvebmg","Reminder!A21016:c")</code></pre><p style="margin-top:1rem">Sheet <strong>visit</strong> di DAPUR — pull dari ' + bc.convList + ' sheet Database Pasien:</p><pre style="background:#1e293b;color:#e2e8f0;padding:0.8rem;border-radius:8px;font-size:11.5px;"><code>=IMPORTRANGE("1TP7P97iKL_8E6YCsz4BksPz-3pK9fp4PCNqhtj3PHtM","Database Pasien!B8884:B")</code></pre>'
          }
        ]
      },

      'Output Data': {
        blocks: [
          { type: 'heading', text: 'Output Data SCH ' + bUp },
          {
            type: 'table',
            columns: ['File Output', 'Sheet', 'Konten', 'Update'],
            rows: [
              [bc.dashboard, 'Scheduled & Visit', 'Data jadwal dan visit terintegrasi ' + bUp, 'Real-time (formula)'],
              [bc.dapur, 'raw internal', 'Gabungan: simply + booking + visit + reminder + index', 'Real-time (IMPORTRANGE)'],
              ['[DB] simplybook Raw 2026', 'Manual Automate', 'Data live dari Gabungan Final (semua brand)', 'Saat agent run AppScript'],
              ['[DB] simplybook Raw 2026', 'simplybook raw', 'Backup non-null dari Manual Automate', 'Otomatis via formula'],
              ['mirror simply np [2026]', bc.npSheet, 'Data Simplybook yang sudah difilter untuk ' + bUp, 'Otomatis dari DB']
            ]
          },
          {
            type: 'alert', level: 'ok',
            html: '<strong>Note:</strong> Dashboard ' + bUp + ' hanya berisi data brand ' + bUp + '. Brand RATA, TANAM, dan VINIR masing-masing punya file Dashboard dan DAPUR terpisah dengan <em>struktur dan proses yang identik</em>.'
          },
          { type: 'heading', text: 'Link Akses — ' + bc.dapur },
          {
            type: 'text',
            html: '<div style="display:flex;gap:10px;flex-wrap:wrap;">' +
              '<a href="#" target="_blank" style="display:inline-flex;flex-direction:column;gap:3px;padding:12px 16px;background:var(--sur);border:1px solid var(--bor);border-radius:10px;text-decoration:none;color:var(--t1);box-shadow:var(--shadow-sm);min-width:220px;max-width:300px;" onmouseover="this.style.borderColor=\'#22c55e\'" onmouseout="this.style.borderColor=\'#334155\'">' +
              '<span style="font-size:10px;text-transform:uppercase;letter-spacing:.5px;color:#94a3b8">&#128196; Google Sheets</span>' +
              '<span style="font-weight:600;font-size:13px;">' + bc.dapur + '</span>' +
              '<span style="font-size:11px;color:#64748b">sheet: raw internal — update URL di data.js</span></a>' +
              '<a href="#" target="_blank" style="display:inline-flex;flex-direction:column;gap:3px;padding:12px 16px;background:var(--sur);border:1px solid var(--bor);border-radius:10px;text-decoration:none;color:var(--t1);box-shadow:var(--shadow-sm);min-width:220px;max-width:300px;" onmouseover="this.style.borderColor=\'#22c55e\'" onmouseout="this.style.borderColor=\'#334155\'">' +
              '<span style="font-size:10px;text-transform:uppercase;letter-spacing:.5px;color:#94a3b8">&#128202; Google Sheets</span>' +
              '<span style="font-weight:600;font-size:13px;">' + bc.dashboard + '</span>' +
              '<span style="font-size:11px;color:#64748b">sheet: Scheduled &amp; Visit — update URL di data.js</span></a>' +
              '</div>'
          }
        ]
      }
    },

    'Dashboard & Laporan': {
      'Laporan Rutin': { blocks: [] },
      Dashboard: {
        blocks: [
          { type: 'heading', text: bc.dashboard },
          {
            type: 'alert', level: 'info',
            html: 'Dashboard utama tim SCH ' + bUp + '. Sheet <strong>Scheduled & Visit</strong> menampilkan data booking dan visit terintegrasi hasil pipeline dari DAPUR → raw internal.'
          },
          {
            type: 'text',
            html: '<p>File ini memiliki banyak sheet (contoh: TANAM punya 32 sheet). Sheet utama yang dimonitor tim adalah <strong>Scheduled &amp; Visit</strong> yang merupakan output final dari seluruh pipeline. Sheet lain bersifat helper, backup, atau breakdown analitik.</p>'
              + '<div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;">'
              + (bc.dashUrl
                ? '<a href="' + bc.dashUrl + '" target="_blank" style="display:inline-flex;flex-direction:column;gap:4px;padding:14px 18px;background:var(--sur);border:1.5px solid var(--bor);border-radius:12px;text-decoration:none;color:var(--t1);box-shadow:var(--shadow-sm);min-width:200px;max-width:300px;transition:border-color .15s;" onmouseover="this.style.borderColor=\'#3b82f6\'" onmouseout="this.style.borderColor=\'\'">' +
                '<span style="font-size:10px;text-transform:uppercase;letter-spacing:.6px;color:#94a3b8;font-weight:600;">&#128202; Google Sheets</span>' +
                '<span style="font-weight:700;font-size:13.5px;">' + bc.dashboard + '</span>' +
                '<span style="font-size:11.5px;color:#64748b;">Scheduling dashboard ' + bUp + ' ↗</span></a>'
                : '<span style="font-size:12px;color:#94a3b8;padding:8px 0;">&#128279; URL dashboard belum tersedia — minta ke leader</span>')
              + '</div>'
          }
        ]
      }
    },

    'KPI & Metrics': {
      'KPI Utama': {
        blocks: [
          { type: 'heading', text: 'KPI Utama SCH ' + bUp },
          {
            type: 'kpi',
            items: [
              { label: 'Visit', value: 'KPI #1', note: 'Jumlah pasien yang benar-benar datang ke klinik — output utama SCH' },
              { label: 'Show Rate', value: '60–80%', note: 'Visit / Total Booking. Efektivitas SCH mengkonversi booking jadi kunjungan nyata' },
              { label: 'No Show Rate', value: 'Dipantau', note: 'Target rendah. Setiap no show = slot klinik terbuang' },
              { label: 'Reminder Coverage', value: 'Harian', note: '% pasien upcoming yang sudah di-remind — tracking di Reminder & Recall per brand' },
              { label: 'Booking Pipeline', value: 'Upcoming', note: 'Total booking aktif yang perlu dijadwal + direminder. Monitor via sheet Scheduled & Visit' }
            ]
          },
          {
            type: 'alert', level: 'info',
            html: '<strong>Posisi SCH dalam funnel:</strong> CS menghasilkan Booking → <strong>[SCH handle]</strong> → Visit → Conversion (Buy/Cash In). SCH adalah jembatan antara komitmen (booking) dan aksi nyata (datang ke klinik). Kualitas reminder dan follow-up SCH langsung berdampak ke Visit dan revenue.'
          }
        ]
      },
      'Target & Cara Ukur': {
        blocks: [
          { type: 'heading', text: 'Target & Cara Ukur — SCH ' + bUp },
          {
            type: 'table',
            columns: ['Metrik', 'Target / Benchmark', 'Cara Hitung', 'Sumber Data'],
            rows: [
              ['Visit', 'Sesuai target bulanan per brand', 'COUNT(status Visit di Database Pasien per hari/bulan)', 'Database Pasien (Tim TC) → Conversion List → DAPUR sheet visit'],
              ['Show Rate', '60–80% (varies per brand & segment)', 'Visit / (Visit + No Show + Cancel) × 100%', 'DAPUR sheet visit + booking → SCH Dashboard'],
              ['No Show Rate', 'Seminimal mungkin — target < 20%', 'No Show / Total Booking × 100%', 'Database Pasien → DAPUR'],
              ['DP Rate', 'Semakin tinggi semakin baik', 'Booking dengan DP / Total Booking × 100%', 'Simplybook / CRM (field DP)'],
              ['Reminder Coverage', '100% pasien H-1 & H kunjungan', 'COUNT(reminder terkirim) / COUNT(upcoming visits) × 100%', '[Brand] Reminder & Recall New → DAPUR sheet reminder'],
              ['Reschedule Rate', 'Monitor — tidak ada target kaku', 'Reschedule / Total Booking × 100%', 'Simplybook + Database Pasien']
            ]
          },
          {
            type: 'alert', level: 'warn',
            html: '<strong>Cara baca Show Rate yang benar:</strong> Show Rate rendah tidak selalu salah SCH — bisa jadi kualitas lead CS kurang committed. Analisis harus dibedakan: Show Rate untuk booking dengan DP vs tanpa DP, booking regular vs Free Booking, dan lead time pendek vs panjang.'
          }
        ]
      },
      'Kamus Metrics': {
        blocks: [
          { type: 'heading', text: 'Kamus Metrics SCH \u2014 Definisi, Source & Cara Hitung' },
          {
            type: 'alert', level: 'info',
            html: '<strong>Kamus lengkap semua metrik SCH</strong> \u2014 definisi operasional bisnis, cara hitung, asal flow data, source data raw, dan di mana metrik ini dikonsumsi. SCH mengukur efektivitas konversi Booking \u2192 Visit. Ketik di search: &ldquo;definisi visit&rdquo;, &ldquo;source data no show&rdquo;, &ldquo;cara hitung show rate&rdquo;.'
          },
          {
          type: 'table',
          columns: ['Metric', 'Definisi Singkat', 'Source Data Utama', 'Dipakai Di'],
          rows: [
            ['Booking (SCH View)', 'Booking confirmed dari CS yang diterima SCH untuk dijadwalkan', 'Simplybook Internal + B2B (.xlsx export harian)', 'SCH Dashboard, DAPUR booking, Growth Dashboard'],
            ['Scheduled (Upcoming)', 'Booking aktif dengan tanggal visit ke depan — pipeline SCH saat ini', 'Simplybook Internal + B2B', 'SCH Dashboard, capacity planning klinik'],
            ['Visit', 'Pasien benar-benar datang ke klinik sesuai jadwal. KPI utama SCH', 'Database Pasien via Conversion List (Tim TC)', 'SCH Dashboard, Growth Dashboard row Visit'],
            ['No Show', 'Booking yang pasiennya tidak datang tanpa konfirmasi sebelumnya', 'Database Pasien via Conversion List (Tim TC)', 'SCH Dashboard, evaluasi efektivitas reminder'],
            ['Show Rate', 'Visit / Total Booking x 100%. KPI efektivitas SCH', 'DAPUR sheet visit + booking', 'SCH Dashboard, evaluasi mingguan'],
            ['Cancel', 'Booking dibatalkan — ada konfirmasi sebelumnya (beda dari No Show)', 'Database Pasien via Conversion List (Tim TC)', 'SCH Dashboard, analisis churn pre-visit'],
            ['Reschedule', 'Booking yang jadwalnya diubah ke tanggal lain', 'Simplybook + Database Pasien', 'SCH Dashboard, capacity planning'],
            ['DP (Down Payment)', 'Pembayaran awal sebagai tanda komitmen pasien untuk datang', 'Simplybook / Dynamic CRM (field DP)', 'SCH Dashboard, Retention pipeline segmentasi DP'],
            ['DP Rate', '% booking dengan DP terbayar. DP tinggi = pipeline lebih sehat', 'Simplybook / CRM → DAPUR', 'SCH Dashboard, evaluasi kualitas booking CS'],
            ['Reminder Sent', 'Reminder WA/telepon ke pasien H-1 atau H kunjungan', '[Brand] Reminder & Recall New GSheets', 'DAPUR reminder, SCH Dashboard, korelasi Show Rate'],
            ['Lead Time Booking→Visit', 'Jarak hari booking → visit. Pendek = Show Rate lebih tinggi', 'Simplybook (tanggal booking + jadwal visit)', 'Analisis Show Rate per lead time, strategi reminder'],
            ['Free Booking', 'Booking tanpa DP dari program promo atau B2B — Show Rate lebih rendah', 'Simplybook B2B + flag Free Booking', 'SCH Dashboard breakdown, analisis Show Rate per segment'],
            ['First Visit vs Return Visit', 'First = pasien baru ke klinik. Return = pasien ulang', 'Database Pasien via Conversion List (Tim TC)', 'Growth Dashboard Visit breakdown, Retention cohort M0-M3+']
          ]
        },
          { type: 'heading', text: 'Detail Per Metric' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">📋 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Booking (SCH View)</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Booking confirmed dari CS yang diterima SCH untuk dijadwalkan — tercatat di Simplybook Internal atau B2B.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Dari perspektif SCH, booking adalah input kerja: setiap booking = 1 pasien yang perlu dijadwal, direminder, dan dipastikan datang. Volume booking di SCH harus match dengan output CS — kalau beda, ada booking yang tidak ter-sync.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\\">COUNT(booking di Simplybook per hari/periode) — dari export Simplybook Internal + B2B</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>CS Handling → Push Booking → Input CS ke CRM/Simplybook → Export oleh Tim Analyst → Pipeline DAPUR → Dashboard SCH</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Simplybook Internal (.xlsx export) + Simplybook B2B (.xlsx export) → [GROWTH] Manual Update Simplybook</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>SCH Dashboard (Scheduled & Visit), DAPUR sheet booking, Growth Dashboard row Booking</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">📅 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Scheduled (Upcoming)</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Jumlah booking yang sudah tercatat di Simplybook dengan tanggal kunjungan ke depan — belum lewat tanggalnya.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Pipeline aktif SCH. Angka ini menunjukkan beban kerja SCH saat ini dan beberapa hari/minggu ke depan. Digunakan untuk perencanaan kapasitas klinik dan prioritas reminder.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\\">COUNT(booking di Simplybook WHERE tanggal visit >= hari ini)</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>Export Simplybook (filter: bulan ini s/d 4 bulan ke depan untuk Internal, s/d akhir tahun untuk B2B)</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Simplybook Internal + Simplybook B2B (.xlsx manual export harian oleh Tim Analyst)</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>SCH Dashboard (Scheduled & Visit), perencanaan kapasitas klinik, prioritasi reminder SCH</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">✅ METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Visit</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Pasien yang benar-benar datang ke klinik sesuai jadwal booking yang tercatat.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Output utama SCH — membuktikan bahwa booking terkonversi menjadi kunjungan nyata. Visit = pasien hadir di klinik dan interaksi dimulai. KPI utama SCH. Visit yang tinggi menunjukkan kualitas reminder dan follow-up SCH yang baik.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\\">COUNT(booking dengan status Visit/Hadir di Database Pasien atau Simplybook)</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>Booking → Reminder → Pasien datang → Status diupdate ke Visit di Database Pasien (Tim TC) → DAPUR sheet visit</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Database Pasien via Conversion List (Tim TC) — IMPORTRANGE ke DAPUR sheet visit</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>SCH Dashboard (Scheduled & Visit row Visit), Growth Dashboard row Visit, Conversion pipeline denominator</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">❌ METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">No Show</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Booking yang pasiennya tidak datang pada waktu yang dijadwalkan tanpa konfirmasi pembatalan sebelumnya.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Indikator efektivitas reminder SCH. No Show tinggi = pasien tidak ter-remind dengan baik, atau kualitas lead dari CS kurang committed. Setiap no show = slot klinik terbuang. SCH bertanggung jawab meminimasi no show melalui reminder proaktif.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\\">COUNT(booking dengan status No Show / tidak hadir di Database Pasien)</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>Pasien tidak datang → status diupdate No Show di Database Pasien (Tim TC) → ditarik ke DAPUR sheet visit</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Database Pasien via Conversion List (Tim TC) — IMPORTRANGE ke DAPUR</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>SCH Dashboard, evaluasi efektivitas reminder, coaching SCH, laporan mingguan</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">📊 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Show Rate</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Persentase booking yang berhasil hadir (Visit) dari total booking yang dijadwalkan.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>KPI efektivitas SCH dalam mengkonversi booking jadi kunjungan nyata. Target bervariasi per brand — umumnya 60–80%. Turun bisa berarti: reminder tidak efektif, jadwal terlalu jauh, atau kualitas lead CS rendah. Perlu dibedakan Show Rate untuk booking reguler vs free booking.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\\">Visit / (Visit + No Show + Cancel) x 100% — atau Visit / Total Booking x 100%</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>Calculated metric dari data DAPUR sheet visit + booking</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Database Pasien (Visit/No Show/Cancel status) via Conversion List → DAPUR</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>SCH Dashboard, evaluasi mingguan, Growth Dashboard calculated metric</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">🚫 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Cancel</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Booking yang dibatalkan — oleh pasien (tidak jadi datang) atau oleh klinik (jadwal berubah).</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Dibedakan dari No Show: Cancel ada konfirmasi/pemberitahuan sebelumnya, No Show tidak ada. Cancel tinggi bisa berarti: jadwal yang ditawarkan tidak cocok, atau pasien berubah pikiran setelah booking. Cancel by klinik = ada masalah kapasitas/operasional.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\\">COUNT(booking dengan status Cancel/Batal di Database Pasien)</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>Pasien atau klinik batalkan → status diupdate Cancel di Database Pasien → DAPUR</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Database Pasien via Conversion List (Tim TC)</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>SCH Dashboard, laporan efektivitas follow-up, analisis churn sebelum visit</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">🔄 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Reschedule</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Booking yang jadwal kunjungannya diubah ke tanggal/waktu lain atas permintaan pasien atau klinik.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Reschedule tidak hilang dari pipeline — tetap dihitung sebagai booking aktif dengan tanggal baru. Reschedule tinggi bisa berarti: jadwal yang ditetapkan CS tidak cocok, atau pasien belum fully committed. SCH perlu tracking reschedule karena bisa mempengaruhi akurasi capacity planning.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\\">COUNT(booking dengan status Reschedule/rescheduled, atau booking yang tanggalnya diubah di Simplybook)</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>Perubahan jadwal di Simplybook → re-export → pipeline DAPUR → update status di Dashboard</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Simplybook Internal/B2B (perubahan jadwal) + Database Pasien</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>SCH Dashboard, capacity planning klinik, analisis pola reschedule</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">💰 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">DP (Down Payment)</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Pembayaran awal yang dilakukan pasien sebelum atau saat booking sebagai komitmen untuk datang.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>DP adalah sinyal komitmen paling kuat dari pasien — booking dengan DP jauh lebih kecil kemungkinan no-show dibanding tanpa DP. CS mendorong DP saat booking, SCH memverifikasi status DP saat reminder. Booking tanpa DP = high-risk no show.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\\">STATUS DP di sistem booking — ada atau tidak ada DP terbayar per booking</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>CS Agent input DP info saat booking → dicatat di Simplybook/CRM → ditarik ke DAPUR → SCH Dashboard</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Simplybook / Dynamic CRM (field DP) → DAPUR pipeline → SCH Dashboard</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>SCH Dashboard (kolom DP status), Retention pipeline (DP grouping: DP < 30% vs DP 30%+), prioritasi reminder</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">💳 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">DP Rate</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Persentase booking yang disertai DP terbayar dari total booking.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Mengukur seberapa banyak pasien yang memberikan komitmen finansial. DP Rate tinggi = pipeline lebih sehat karena pasien sudah invested. Turun bisa berarti: CS tidak push DP dengan cukup, atau threshold DP terlalu tinggi untuk segment tertentu.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\\">COUNT(booking dengan DP terbayar) / COUNT(total booking) x 100%</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>Calculated metric dari data Simplybook/CRM</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Simplybook / Dynamic CRM (DP status) → DAPUR pipeline → SCH Dashboard</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>SCH Dashboard, evaluasi kualitas booking CS, Retention pipeline segmentasi</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">🔔 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Reminder Sent</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Reminder WA atau telepon yang dikirim/dilakukan SCH kepada pasien sebelum tanggal kunjungan.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Output aktivitas utama harian SCH. Reminder yang efektif adalah kunci menurunkan No Show. SCH mengirim reminder H-1 atau H hari kunjungan. Ditracking di file Reminder & Recall per brand.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\\">COUNT(reminder terkirim di sheet Reminder — Reminder & Recall file per brand)</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>SCH Agent kirim reminder WA/telepon → catat di [Brand] Reminder & Recall New (sheet: Reminder) → IMPORTRANGE ke DAPUR sheet reminder</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>[Brand] Reminder & Recall New GSheets (sheet: Reminder) — diisi manual oleh SCH Agent</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>DAPUR sheet reminder, SCH Dashboard, evaluasi aktivitas harian SCH, korelasi dengan Show Rate</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">⏳ METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Lead Time Booking → Visit</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Jarak hari antara tanggal booking dibuat dan tanggal kunjungan yang dijadwalkan.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Semakin jauh lead time, semakin tinggi risiko no-show atau reschedule — pasien bisa berubah pikiran atau lupa. Lead time pendek (1–3 hari) biasanya Show Rate lebih tinggi. SCH perlu memperhatikan distribusi lead time saat menyusun jadwal reminder.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\\">Date Visit - Date Booking (hari)</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>Calculated dari data Simplybook — tanggal booking vs tanggal jadwal kunjungan</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Simplybook Internal/B2B (tanggal booking + tanggal jadwal visit)</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>Analisis Show Rate per lead time bucket, capacity planning, optimasi strategi reminder SCH</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">🎫 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Free Booking</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Booking dari program free booking — pasien datang tanpa bayar DP, biasanya dari program promosi atau B2B mitra.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Segmen terpisah dari booking reguler. Free Booking umumnya memiliki Show Rate lebih rendah karena tidak ada komitmen finansial. SCH perlu memprioritaskan reminder lebih intensif untuk segmen ini. Dipisah analisisnya dari booking berbayar.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\\">COUNT(booking dengan flag Free Booking atau dari Simplybook B2B)</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>Simplybook B2B (mitra/corporate) + flag Free Booking di Simplybook Internal → pipeline DAPUR</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Simplybook B2B (.xlsx export) + Simplybook Internal (flag Free Booking)</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>SCH Dashboard (breakdown Free vs Regular), analisis Show Rate per segment, laporan B2B</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">🆕 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">First Visit vs Return Visit</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>First Visit = kunjungan pertama pasien ke klinik (belum pernah datang sebelumnya). Return Visit = kunjungan ulang pasien yang sudah pernah datang.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Segmentasi penting untuk analisis funnel: First Visit mengukur akuisisi pasien baru (efektivitas CS + SCH), sedangkan Return Visit mengukur retention dan lifetime value pasien. SCH perlu memastikan first visitor mendapat experience yang baik untuk mendorong return visit.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\\">First Visit: booking WHERE pasien belum ada di histori visit sebelumnya. Return Visit: pasien sudah ada di histori visit.</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>Database Pasien (Tim TC) — riwayat kunjungan per nomor → DAPUR sheet visit → SCH Dashboard</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Database Pasien via Conversion List (Tim TC) — ditarik ke DAPUR, difilter berdasarkan histori visit</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>SCH Dashboard, Growth Dashboard (Visit breakdown), Retention pipeline (cohort analysis M0-M3+)</span></div></div>' }
        ]
      }
    }
  };
}
// ── END SCH BLOCKS ─────────────────────────────────────────────

// ── CONV BLOCKS GENERATOR ─────────────────────────────────────
// Dipanggil dengan: _convBlocks('rata') / _convBlocks('tanam') / _convBlocks('vinir')
function _convBlocks(brand) {
  var bUp = brand.toUpperCase();

  var bc = {
    rata: {
      dashUrl: 'https://docs.google.com/spreadsheets/d/RATA_CONV_ID',
      plannedOrder: false,
      hasTCbyClinic: false,
      hasNewDealing: false,
      tcLabel: 'Orthodontist / TC RATA',
      buyUnit: 'Aligner case',
      basketAvg: 'Rp 9,27jt',
      perfTarget: 'Rp 7,41B',
      crTarget: '69%',
      buyTarget: '799',
      // Booking scheme: utama DP, ada periode trial FB
      bookingScheme: 'DP (default). Free Booking pernah dicoba di periode tertentu untuk evaluasi performance.',
      paySchemes: ['Cash full', 'Cicilan bertahap', 'P2P lending', 'RATA ID Finance'],
      dpDefault: true
    },
    tanam: {
      dashUrl: 'https://docs.google.com/spreadsheets/d/14hsfJxRopAuzNvkUKNy63MVT22VUq9376RDL_CXZnhk/edit?gid=1216429003#gid=1216429003',
      plannedOrder: true,
      hasTCbyClinic: true,
      hasNewDealing: true,
      tcLabel: 'Treatment Consultant (TC)',
      buyUnit: 'Implant case',
      basketAvg: 'Rp 28,5jt',
      perfTarget: 'Rp 17,96B',
      crTarget: '72%',
      buyTarget: '630',
      // Booking scheme: Free Booking (FB) utama. DP pernah dicoba, mostly FB.
      bookingScheme: 'Free Booking (FB) — tidak ada DP di awal. DP pernah dicoba (trial & error) tapi kembali ke FB.',
      paySchemes: ['Cash bertahap', 'P2P lending', 'RATA ID Finance'],
      dpDefault: false
    },
    vinir: {
      dashUrl: 'https://docs.google.com/spreadsheets/d/VINIR_CONV_ID',
      plannedOrder: false,
      hasTCbyClinic: true,
      hasNewDealing: false,
      tcLabel: 'Treatment Consultant (TC)',
      buyUnit: 'Veneer case',
      basketAvg: 'Rp 31,57jt',
      perfTarget: 'Rp 2,97B',
      crTarget: '65%',
      buyTarget: '94',
      // Booking scheme: Free Booking (FB) utama.
      bookingScheme: 'Free Booking (FB) — tidak ada DP di awal.',
      paySchemes: ['Cash bertahap', 'P2P lending', 'RATA ID Finance'],
      dpDefault: false
    }
  }[brand];

  // ── OVERVIEW ──────────────────────────────────────────────────
  var overviewBlocks = [
    {
      type: 'text',
      html: '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px"><a href="' + (bc.dashUrl && !bc.dashUrl.includes('ID') ? bc.dashUrl : '#') + '" target="_blank" style="display:inline-flex;align-items:center;gap:6px;padding:8px 14px;background:var(--sur);border:1px solid var(--bor);border-radius:10px;color:var(--t1);text-decoration:none;font-size:13px;font-weight:600;box-shadow:var(--shadow-sm);">&#128202; Conversion Dashboard ' + bUp + ' &#8599;</a></div>'
    },
    {
      type: 'alert', level: 'info',
      html: '<strong>Tim Conversion ' + bUp + '</strong> — bertanggung jawab mengkonversi pasien Visit menjadi Buy dan men-generate performance/revenue dari new patient. KPI utama: Conversion Rate (CR%), Basket Size, Performance (Revenue).'
    },
    { type: 'heading', text: 'Posisi dalam Funnel Growth' },
    {
      type: 'diagram',
      code: [
        'flowchart LR',
        '  SCH["SCH\\nBooking → Visit"] -->|"Pasien\\nVisit Aktual"| TC["TC\\nKonsultasi\\nDeal / No Deal\\n+ Generate Revenue"]',
        '  TC -->|"BUY\\n(Deal closed)"| PAY["Skema Bayar\\n(FB/DP, bertahap\\nP2P, RATA ID)"]',
        '  TC -->|"NO BUY\\nHard Loss"| HL["DELETE\\n(Closed Permanent)"]',
        '  TC -->|"NO BUY\\nSoft Loss"| SL["FU\\n(Follow Up)"]',
        '  PAY -->|"Outstanding\\n+ Upsell"| AE["AE\\nPenuntas Cash\\n+ Upsell"]',
        '  PAY -->|"Jadwal tindakan\\nVisit 2,3 dst"| CM["Clinic Management\\n(Existing Patient Scope)\\n— di luar Growth"]',
        '  style TC fill:#15803d,color:#fff',
        '  style AE fill:#1d4ed8,color:#fff',
        '  style HL fill:#dc2626,color:#fff',
        '  style SL fill:#d97706,color:#fff',
        '  style CM fill:#64748b,color:#fff'
      ].join('\n')
    },
    { type: 'heading', text: 'Batas Scope Growth vs Clinic Management' },
    {
      type: 'alert', level: 'warn',
      html: '<strong>Penting:</strong> TC & AE adalah scope <em>Growth</em>. Setelah pasien Buy dan ada transaksi, operasional lanjutan (penjadwalan tindakan visit 2, 3, dst, reminder kunjungan) dihandle oleh <strong>Clinic Management</strong> — tim terpisah, bukan Growth. AE di Growth hanya handle <em>outstanding/sisa bayar</em> dan <em>upsell</em> jika pasien potential.'
    },
    { type: 'heading', text: 'Ringkasan Peran per Tim' },
    {
      type: 'table',
      columns: ['Tim', 'Scope', 'Tanggung Jawab', 'KPI'],
      rows: [
        ['TC', 'NEW patient — Visit → Buy', 'Konsultasi, close deal, generate performance/revenue dari pasien baru', 'CR%, Basket Size, Performance'],
        ['AE (Growth)', 'EXISTING patient — post-buy', 'Penuntas cash (tagih outstanding/cicilan), upsell jika potential', 'Cash collected, Upsell rate'],
        ['Clinic Management', 'EXISTING patient — post-buy', 'Penjadwalan tindakan, reminder visit 2/3/dst — operasional klinik', 'Di luar KPI Growth']
      ]
    },
    { type: 'heading', text: 'Target Conversion — Mei 2026' },
    {
      type: 'kpi',
      items: [
        { label: 'Visit Target', value: brand === 'tanam' ? '875' : brand === 'rata' ? '1.159' : '144', note: 'Input ke TC dari SCH' },
        { label: 'Buy Target', value: bc.buyTarget, note: 'Deal closed by TC' },
        { label: 'CR% Target', value: bc.crTarget, note: 'Buy / Visit' },
        { label: 'Basket Size Target', value: bc.basketAvg, note: 'Avg revenue per ' + bc.buyUnit },
        { label: 'Performance Target', value: bc.perfTarget, note: 'Total revenue dari new patient (TC scope)' },
        { label: 'Booking Scheme', value: bc.dpDefault ? 'DP (+ FB trial)' : 'Free Booking', note: bc.bookingScheme }
      ]
    }
  ];

  // ── BUSINESS FLOW ─────────────────────────────────────────────
  var bfInput = [
    { type: 'heading', text: 'Input ke Tim Conversion' },
    {
      type: 'text',
      html: '<p>Input utama adalah <strong>pasien yang sudah visit aktual</strong> — booking confirmed dari SCH dan benar-benar hadir ke klinik. Data masuk ke <em>Database Pasien</em> via Dynamic CRM.</p>'
    },
    {
      type: 'table',
      columns: ['Sumber Data', 'Isi', 'Kolom Kunci'],
      rows: [
        ['Dynamic CRM', 'Status visit, TC assigned, result konsultasi, deal amount, alasan no buy', 'Col B (Visit Date), Col I (Upgrade Status), Col K (TC Name), Col R (No Buy Reason)'],
        ['Planned Order (CoE)' + (bc.plannedOrder ? '' : ' [N/A untuk ' + bUp + ']'), bc.plannedOrder ? 'Jumlah implant & average price per case — pipeline terpisah dari Dynamic/CoE' : 'Tidak digunakan di ' + bUp, bc.plannedOrder ? 'Col: order qty, avg price, TC, clinic, date' : '—'],
        ['SCH Booking Data', 'Tanggal booking, tanggal visit, klinik, sumber referral', 'Col A (ID), Col C (Clinic), Col AM (Week Visit Konsul)']
      ]
    }
  ];

  var bfProses = [
    { type: 'heading', text: 'Proses Konsultasi & Deal' },
    {
      type: 'steps',
      items: [
        { title: '1. Pre-visit Check', desc: 'TC cek riwayat pasien di CRM sebelum konsultasi — history sebelumnya, sumber referral, apakah re-konsultasi (HL/SL lama yang balik).', note: 'Re-konsultasi = pasien lama, perlu baca catatan TC sebelumnya' },
        { title: '2. Assessment Klinis', desc: 'TC menerima pasien, assessment bersama dokter (rontgen, pemeriksaan, diskusi kebutuhan). TC catat indikasi dan preferensi pasien.', note: 'Dokter konfirmasi indikasi klinis — TC tidak bisa diagnosa sendiri' },
        { title: '3. Presentasi Paket & Harga', desc: 'TC presentasikan opsi paket ' + bUp + ', harga, dan skema pembayaran yang tersedia. Nego dalam batas wewenang TC.', note: 'Diskon di luar batas wewenang → escalate ke SPV dulu' },
        { title: '4. Deal / No Deal', desc: 'Pasien memutuskan BUY atau NO BUY. Jika No Buy, TC catat reason spesifik (HL atau SL + sub-reason). TC yang generate dan own angka performance dari deal ini.', note: 'Gate: col I = "No Upgrade" → No Buy; semua lain → Buy' },
        { title: '5. Input Dynamic CRM', desc: 'TC update hasil konsultasi hari H: status upgrade, alasan no buy, deal amount, paket yang dipilih. Ini menjadi source data seluruh dashboard.', note: 'Wajib input hari H — delay input = data dashboard tidak akurat' }
      ]
    },
    { type: 'heading', text: 'Klasifikasi No Buy' },
    {
      type: 'diagram',
      code: [
        'flowchart TD',
        '  NB["NO BUY\\n(col I = No Upgrade)"]',
        '  NB --> HL["HARD LOSS\\n(DELETE — Closed Permanent)"]',
        '  NB --> SL["SOFT LOSS\\n(FU — Follow Up)"]',
        '  HL --> HL1["Budget"]',
        '  HL --> HL2["Mau Konsultasi Dulu"]',
        '  HL --> HL3["Tunda Dulu"]',
        '  HL --> HL4["Bukan Mau Konsultasi Implant"]',
        '  HL --> HL5["Sistemik"]',
        '  HL --> HL6["Tidak Indikasi"]',
        '  HL --> HL7["Location"]',
        '  HL --> HL8["Authority"]',
        '  SL --> SL1["Budget"]',
        '  SL --> SL2["Delay Time"]',
        '  SL --> SL3["Convenience"]',
        '  SL --> SL4["Ragu"]',
        '  SL --> SL5["Authority"]',
        '  SL --> SL6["Mau Compare"]',
        '  SL --> SL7["Tanya Internis"]',
        '  style HL fill:#dc2626,color:#fff',
        '  style SL fill:#d97706,color:#fff',
        '  style NB fill:#7c3aed,color:#fff'
      ].join('\n')
    }
  ];

  var bfOutput = [
    { type: 'heading', text: 'Output dari Proses Konsultasi' },
    {
      type: 'alert', level: 'info',
      html: '<strong>TC = pemilik angka performance.</strong> Revenue dari deal new patient di-generate dan di-own oleh TC. AE hanya masuk untuk menyelesaikan sisa pembayaran (outstanding) dan potensi upsell — bukan untuk generate revenue utama.'
    },
    {
      type: 'table',
      columns: ['Output', 'Siapa yang Handle Selanjutnya', 'Kondisi', 'Notes'],
      rows: [
        ['BUY — Deal Closed', 'Skema bayar ditentukan → AE handle outstanding', 'Pasien setuju paket & harga. TC catat deal amount di CRM.', 'Revenue di-count dari TC. Pasien masuk pipeline AE untuk sisa bayar & upsell.'],
        ['HARD LOSS', 'Closed — tidak ada handover', 'Pasien tidak dapat di-FU: budget final, sistemik, bukan indikasi, lokasi, authority permanen.', 'Lead di-mark closed di CRM. Tidak ada FU. TC wajib input reason.'],
        ['SOFT LOSS', 'TC sendiri (FU berkala)', 'Pasien masih berpotensi: ragu, delay, compare, tanya internis.', 'TC set reminder FU. Attribut penyebab dicatat (Pasien / TC / Dokter / Clinic).'],
        ['Post-buy operasional', 'Clinic Management — BUKAN Growth', 'Penjadwalan tindakan, reminder visit 2/3/dst.', 'Di luar scope Growth sepenuhnya.']
      ]
    }
  ];

  var bfSkema = [
    { type: 'heading', text: 'Skema Pembayaran per Brand' },
    {
      type: 'alert', level: 'info',
      html: 'Skema pembayaran berbeda per brand dan memengaruhi DP <30% case, cancel rate, dan cara TC presentasikan harga ke pasien.'
    },
    {
      type: 'table',
      columns: ['Brand', 'Skema Default', 'Catatan'],
      rows: [
        ['RATA', 'DP (Down Payment)', 'Skema utama DP. Free Booking pernah dicoba di periode tertentu untuk evaluasi performance — bukan skema permanen.'],
        ['TANAM', 'Free Booking (FB)', 'Tidak ada DP di awal. DP pernah dicoba (trial & error) tapi kembali ke FB. Pasien booking tanpa komitmen bayar awal.'],
        ['VINIR', 'Free Booking (FB)', 'Tidak ada DP di awal. Pasien booking tanpa komitmen bayar awal.']
      ]
    },
    { type: 'heading', text: 'Opsi Pembayaran Setelah Deal' },
    {
      type: 'table',
      columns: ['Skema', 'Deskripsi', 'Tersedia untuk'],
      rows: [
        ['Cash Full', 'Bayar lunas langsung saat atau setelah tindakan', 'Semua brand'],
        ['Cash Bertahap', 'Cicilan ke klinik langsung — dijadwalkan per termin', 'Semua brand — TC & AE yang manage'],
        ['P2P Lending', 'Pinjaman via platform P2P (fintech) — pasien cicil ke platform, klinik terima full', 'Semua brand'],
        ['RATA ID Finance', 'Produk pembiayaan internal RATA ID — tenor lebih fleksibel', 'Semua brand — dikelola Growth + Finance']
      ]
    },
    { type: 'heading', text: 'Hubungan Skema Bayar dengan DP <30%' },
    {
      type: 'text',
      html: '<p>Untuk brand dengan skema <strong>DP</strong> (RATA), kasus DP <30% terjadi ketika pasien deal tapi bayar di bawah 30% dari nilai paket. Ini di-flag dan dimonitor karena risiko cancel lebih tinggi. Ada 13 sub-reason mengapa pasien DP rendah.</p><p>Untuk brand <strong>Free Booking</strong> (TANAM, VINIR), DP <30% masih relevan karena setelah deal TC pun ada proses pembayaran bertahap — pasien yang commit tapi DP-nya kecil di cicilan awal tetap berisiko.</p>'
    }
  ];

  var bfEskalasi = [
    { type: 'heading', text: 'Eskalasi & Edge Cases' },
    {
      type: 'text',
      html: '<p><strong>Eskalasi</strong> = situasi di mana TC tidak bisa handle sendiri, butuh keterlibatan pihak lain. <strong>Edge Cases</strong> = skenario di luar flow normal yang butuh treatment khusus.</p>'
    },
    {
      type: 'table',
      columns: ['Skenario', 'Tipe', 'Handling', 'Siapa yang Terlibat'],
      rows: [
        ['Pasien minta diskon di luar batas wewenang TC', 'Eskalasi', 'TC tidak bisa approve sendiri — harus minta approval SPV/Leader sebelum kasih angka ke pasien', 'TC → SPV / Leader'],
        ['Pasien kondisi Sistemik / Tidak Indikasi klinis', 'Eskalasi', 'Butuh konfirmasi dokter sebelum di-mark Hard Loss. TC tidak bisa unilateral mark Sistemik tanpa sign-off dokter.', 'TC → Dokter → mark HL'],
        ['Pasien komplain harga/info tidak sesuai dari CS', 'Eskalasi', 'TC tidak handle sendiri — escalate ke CS Leader + TC Leader untuk rekonsiliasi informasi', 'TC → CS Leader + TC Leader'],
        ['Walk-in (datang tanpa booking)', 'Edge Case', 'Pasien hadir tanpa booking dari SCH. TC tetap bisa handle konsultasi tapi data tidak akan ada di pipeline booking SCH — perlu input manual ke CRM.', 'TC input manual, catat source = walk-in'],
        ['Re-konsultasi (pasien lama balik)', 'Edge Case', 'Pasien yang sebelumnya HL/SL dan kembali. TC wajib baca history di CRM — handling berbeda dari pasien baru, jangan mulai dari nol.', 'TC baca history CRM sebelum konsultasi'],
        ['DP dispute / pasien tolak bayar minimum DP', 'Edge Case', 'Deal sudah di-agree tapi pasien tidak mau bayar DP minimum. TC flag ke AE + SPV — tidak bisa dicount sebagai buy yang sehat.', 'TC → AE + SPV']
      ]
    }
  ];

  // ── OPERASIONAL ───────────────────────────────────────────────
  var opHarian = [
    { type: 'heading', text: 'Aktivitas Harian TC & Analyst' },
    {
      type: 'table',
      columns: ['Waktu', 'Aktivitas', 'Siapa', 'Output'],
      rows: [
        ['Sebelum jam operasional', 'Pre-visit check — lihat list pasien yang akan datang hari ini di CRM', 'TC', 'Siap dengan history pasien, tidak blind saat konsultasi'],
        ['Selama jam operasional', 'Konsultasi pasien visit — assessment, presentasi paket, deal/no deal', 'TC', 'Input di Dynamic CRM: status, reason, deal amount'],
        ['Hari H selesai konsultasi', 'Update Dynamic CRM: col I (Upgrade Status), col R (No Buy Reason), deal amount, skema bayar', 'TC', 'Data masuk ke Database Pasien — source semua dashboard metrics'],
        ['Harian (monitoring)', 'Cek Conversion Dashboard — CR%, HL rate, SL rate, DP <30%', 'SPV TC / Analyst', 'Identifikasi anomali, coaching TC underperform'],
        ['Harian (AE)', 'Follow up outstanding/cicilan pasien buy, reminder, upsell jika potential', 'AE', 'Cash collection, upsell recorded di CRM'],
        ['Weekly', 'Review TC Performance sheet — per-TC breakdown CR, basket, HL/SL, SL cause attribution', 'Leader TC / Analyst', 'Weekly coaching & target adjustment'],
        ['Monthly close', 'Rekap Performance by Loc, New Dealing Comparison, update target', 'Analyst Growth', 'Monthly report ke VP Growth']
      ]
    }
  ];

  var opTools = [
    { type: 'heading', text: 'Tools & Sistem' },
    {
      type: 'table',
      columns: ['Tool', 'Fungsi di Conversion', 'Siapa yang Input', 'Link/Akses'],
      rows: [
        ['Dynamic CRM', 'Source utama — TC input hasil konsultasi, status upgrade, alasan no buy, deal amount, skema bayar', 'TC (input langsung hari H)', 'Via portal Dynamic — akses per role'],
        ['Conversion Dashboard GSheets', '5 sheet monitoring: Conversion, TC Performance, TC by Clinic, Clinic Performance, New Dealing Comparison. Formula otomatis dari Database Pasien.', 'Read-only untuk TC — input hanya lewat CRM', bc.dashUrl && !bc.dashUrl.includes('RATA_CONV_ID') && !bc.dashUrl.includes('VINIR_CONV_ID') ? '<a href="' + bc.dashUrl + '" target="_blank">Buka Dashboard ' + bUp + '</a>' : 'URL dari leader'],
        bc.plannedOrder ? ['Planned Order (CoE)', 'Pipeline Dynamic/CoE — data jumlah implant & avg price. Source TERPISAH dari Database Pasien.', 'Otomatis dari CoE pipeline', 'Sheet "planned order" di Dashboard'] : ['—', 'Tidak ada planned order untuk ' + bUp, '—', '—'],
        ['RATA ID Finance', 'Produk pembiayaan untuk pasien — tenor fleksibel. TC presentasikan ke pasien sebagai opsi bayar.', 'Finance team (TC hanya refer pasien)', 'Koordinasi via Finance / Leader']
      ]
    }
  ];

  var opRules = [
    { type: 'heading', text: 'Rules & Kebijakan Konversi' },
    {
      type: 'steps',
      items: [
        { title: 'Gate Utama: No Upgrade = No Buy', desc: 'Satu-satunya penentu Buy/No Buy adalah col I di Database Pasien. Nilai "No Upgrade" → No Buy. Semua lain → Buy. Tidak ada exception.', note: 'Formula: COUNTIFS(colI,"<>No Upgrade",...) untuk Buy; COUNTIFS(colI,"No Upgrade",...) untuk No Buy' },
        { title: 'TC adalah Owner Revenue New Patient', desc: 'Performance/revenue dari pasien baru di-generate dan di-own oleh TC — bukan AE. AE hanya masuk setelah deal untuk outstanding dan upsell.', note: 'Ini penting untuk atribusi KPI: naik/turunnya Performance adalah tanggung jawab TC, bukan AE' },
        { title: 'Hard Loss vs Soft Loss', desc: 'Hard Loss = permanen, wajib DELETE dari pipeline FU. Soft Loss = recoverable, wajib set tanggal FU. HL rate tinggi = masalah kualitas lead upstream atau skill TC.', note: '8 HL reasons + 7 SL reasons — masing-masing ada sub-reason di dashboard' },
        { title: 'Skema Booking Default per Brand', desc: bc.bookingScheme, note: 'Skema mempengaruhi DP <30% monitoring dan cara TC presentasi harga' },
        { title: 'Input CRM Wajib Hari H', desc: 'TC wajib update Dynamic CRM hari yang sama dengan konsultasi. Delay input = data dashboard lag = keputusan berdasarkan data stale.', note: 'SPV TC monitor compliance input harian' },
        { title: 'Diskon di Luar Batas = Eskalasi', desc: 'TC punya batas diskon yang diijinkan. Di luar itu, wajib approval SPV/Leader sebelum memberikan angka ke pasien.', note: 'Jangan promise ke pasien sebelum ada approval' }
      ]
    }
  ];

  var opSOP = [
    { type: 'heading', text: 'SOP Conversion — Ringkasan' },
    {
      type: 'steps',
      items: [
        { title: '1. Pre-visit Check', desc: 'Sebelum konsultasi: buka CRM, cek history pasien (baru/re-konsultasi, sumber, history HL/SL sebelumnya).', note: '' },
        { title: '2. Assessment & Presentasi', desc: 'Konsultasi bersama dokter. Assessment klinis → presentasi paket + opsi skema bayar (cash, cicilan, P2P, RATA ID finance).', note: '' },
        { title: '3. Close Deal atau Record No Buy', desc: 'Buy → input deal amount, skema bayar, paket di CRM. No Buy → input reason spesifik (HL/SL + sub-reason). Wajib hari H.', note: '' },
        { title: '4. FU Soft Loss', desc: 'Semua SL wajib ada tanggal FU di CRM. FU dalam 3-7 hari. Jika 3x tidak respons → evaluasi upgrade ke HL.', note: '' },
        { title: '5. Handover ke AE (jika Buy)', desc: 'TC inform AE ada deal baru. AE handle outstanding/cicilan dan potensi upsell. TC tidak handle post-deal payment collection.', note: 'TC selesai saat deal closed. AE mulai dari sini.' },
        { title: '6. Post-buy Operasional → Clinic Management', desc: 'Penjadwalan tindakan dan reminder visit 2/3/dst dihandle Clinic Management — di luar scope Growth. TC tidak perlu follow up ini.', note: '' }
      ]
    }
  ];

  // ── DATA & PIPELINE ───────────────────────────────────────────
  var dpSources = [
    { type: 'heading', text: 'Data Sources — Overview' },
    {
      type: 'alert', level: 'info',
      html: 'Dashboard Conversion <strong>' + bUp + '</strong> memiliki <strong>' + (bc.plannedOrder ? '4' : '3') + ' layer data</strong> yang saling terhubung. Semua metrics di 5 sheet dashboard dihitung dengan COUNTIFS/SUMIFS dari dua source utama: <em>Database Pasien</em> dan <em>planned order</em>.'
    },
    { type: 'heading', text: 'Layer 1: Database Pasien (87 Kolom) — Source Utama' },
    {
      type: 'text',
      html: '<p>Sheet master dari <strong>IMPORTRANGE ke GSheets CRM</strong> (ID: <code>1xOHtJCh78vADETQEnEZUctqOnc5re58NrlbueUHLvlo</code>). Data ditarik secara bertahap per chunk kolom: A-C, D-F, G-I, J-L, M-P, dst. Setiap baris = satu pasien visit.</p>'
    },
    {
      type: 'table',
      columns: ['Kolom', 'Nama Field', 'Nilai / Format', 'Digunakan untuk'],
      rows: [
        ['Col B', 'Visit Date', 'Date (tanggal konsultasi aktual)', 'Filter DAILY metrics — axis waktu harian'],
        ['Col H', 'TC Name', 'String nama TC', 'Filter per TC di TC Performance & TC by Clinic'],
        ['Col I', 'Upgrade Status', '"No Upgrade" atau nilai lain', 'GATE utama Buy/No Buy. "<>No Upgrade" = Buy; "No Upgrade" = No Buy'],
        ['Col K', 'DP Sub-Reason', 'String alasan DP <30% (contains pattern)', 'COUNTIFS untuk 13 sub-reason DP <30%'],
        ['Col L', 'No Buy Reason Label', 'Pattern "HL - [reason]" atau "SL - [reason]"', 'COUNTIFS dengan wildcard: "*HL*", "*SL*", "*HL - Budget*", dll'],
        ['Col V', 'Cash In Amount', 'Numeric (rupiah)', 'SUMIFS untuk Cash in {Total} — sisa pembayaran yang sudah masuk'],
        ['Col Y', 'Lead Temperature', '"HOT", "WARM", "COLD"', 'Breakdown kualitas lead per minggu'],
        ['Col AM', 'Week Visit Konsul', 'String "W1-Mei26", "W2-Mei26", dst', 'Filter WEEKLY metrics — axis waktu mingguan (berbeda dari col B)'],
        ['Col AO', 'Case Complexity', '"Simple", "Moderate", "Complex", "Rahang"', 'Breakdown tipe kasus implant'],
        ['Col AX', 'Payment Status', '"LUNAS", "DP 30%", "DP < 30%"', '%Lunas, %DP>30%, %DP<30% calculation'],
        ['Col AY', 'Year', 'Numeric (2025, 2026)', 'Filter per tahun di MTD formulas'],
        ['Col AZ', 'Month', 'Numeric (1-12)', 'Filter per bulan di MTD formulas'],
        ['Col CF', 'SL Cause Attribution', '"Pasien", "TC", "Dokter", "Clinic"', 'SL cause breakdown — basis coaching TC']
      ]
    },
    bc.plannedOrder ? { type: 'heading', text: 'Layer 2: planned order (55 Kolom) — Source Revenue & Implant' } : null,
    bc.plannedOrder ? {
      type: 'text',
      html: '<p>Sheet pipeline dari <strong>IMPORTRANGE ke GSheets CoE/Dynamic</strong> (<a href="https://docs.google.com/spreadsheets/d/1tU9qJnLSquYdXK5UgpP4LQveZ4j__8V83XqGZ0ggeCY/edit" target="_blank">source CoE pipeline</a>). Source TERPISAH dari Database Pasien — merekam rencana order implant per kasus. Dua metric utama yang HANYA bisa dihitung dari sini: <strong>Total Implant</strong> dan <strong>Revenue {Performance}</strong>.</p>'
    } : null,
    bc.plannedOrder ? {
      type: 'table',
      columns: ['Kolom', 'Isi', 'Digunakan untuk'],
      rows: [
        ['Col F', 'Implant quantity per row', 'SUMIFS → Total Implant (filter by col I = week label)'],
        ['Col I', 'Week label (planned order)', 'Filter weekly Total Implant'],
        ['Col AP', 'Week label (alt)', 'Filter weekly Revenue & Avg Price'],
        ['Col AT', 'Month-year string', 'Filter MTD Revenue & Avg Price'],
        ['Col AH', 'Revenue total per row', 'SUMIFS → Revenue {Performance} (exclude veneer via col AA)'],
        ['Col AK', 'ALL IN qty', 'Dikecualikan dari avg price calculation'],
        ['Col AQ', 'Implant type', '"ALL IN", "OD" → dikecualikan dari avg price. Filter untuk Rahang/Single'],
        ['Col AA', 'Treatment category', 'Revenue formula: exclude "*veneer*"'],
        ['Col R', 'Week label (alt 2)', 'Avg single implant calculation']
      ]
    } : null,
    { type: 'heading', text: (bc.plannedOrder ? 'Layer 3' : 'Layer 2') + ': Target Sheet — Lookup Target Values' },
    {
      type: 'text',
      html: '<p>Sheet berisi target per bulan untuk semua metrics. Dashboard sheet mengambil nilai target dengan <code>INDEX(Target!$B3:$Z3, MATCH(1, (Target!$B$1:$Z$1=brand) * (Target!$B$2:$Z$2=periode), 0))</code> — dua kriteria: brand + periode.</p>'
    },
    { type: 'heading', text: (bc.plannedOrder ? 'Layer 4' : 'Layer 3') + ': index2 — Helper Lookup Sheet' },
    {
      type: 'text',
      html: '<p>Sheet helper dengan beberapa fungsi sekaligus:</p><ul><li><strong>Col A/B</strong>: Mapping tanggal → week label (digunakan untuk menghitung jumlah hari kerja per minggu via COUNTIFS)</li><li><strong>Col D/E</strong>: Mapping nomor tahun → abbreviasi (2025→25, 2026→26) untuk generate header kolom dinamis</li><li><strong>Col K/L</strong>: Daftar TC aktif (nama TC)</li><li><strong>Col O+</strong>: Daftar klinik per kategori (Internal TANAM, B2B per kota)</li></ul>'
    }
  ].filter(Boolean);

  var dpFlow = [
    { type: 'heading', text: 'Flow Data & Sheet Dependency' },
    {
      type: 'diagram',
      code: [
        'flowchart TD',
        '  subgraph EXT ["EXTERNAL SOURCES"]',
        '    CRM["GSheets CRM\\nDatabase Pasien\\n(ID: 1xOHtJCh78...)"]',
        bc.plannedOrder ? '    COE["GSheets CoE Pipeline\\nplanned order\\n(ID: 1tU9qJnLSq...)"]' : '',
        '  end',
        '  subgraph DASH ["CONVERSION DASHBOARD ' + bUp + '"]',
        '    DB["Database Pasien\\n(87 col)\\nIMPORTRANGE ← CRM"]',
        bc.plannedOrder ? '    PO["planned order\\n(55 col)\\nIMPORTRANGE ← CoE"]' : '',
        '    IDX["index2\\n(helper: week labels, month abbrev\\nworking days, TC list, clinic list)"]',
        '    TGT["Target\\n(target per bulan\\nper brand)"]',
        '    CONV["Conversion\\n(aggregate funnel\\nNo Buy, DP, Perf by Loc)"]',
        '    TCP["TC Performance\\n(per-TC, filter col H)"]',
        bc.hasTCbyClinic ? '    TCL["TC by Clinic\\n(TC × Klinik matrix)"]' : '',
        '    CP["Clinic Performance\\n(per-klinik)"]',
        bc.hasNewDealing ? '    ND["New Dealing Comparison\\n(period vs period)"]' : '',
        '  end',
        '  CRM -->|"IMPORTRANGE\\n(chunk: A-C, D-F, G-I, J-L, M-P...)"| DB',
        bc.plannedOrder ? '  COE -->|"IMPORTRANGE"| PO' : '',
        '  DB -->|"COUNTIFS/SUMIFS\\n(col I gate, col L reason\\ncol AM week, col B date)"| CONV',
        '  DB -->|"COUNTIFS\\n(+ col H TC filter)"| TCP',
        bc.hasTCbyClinic ? '  DB --> TCL' : '',
        '  DB --> CP',
        bc.hasNewDealing ? '  DB --> ND' : '',
        bc.plannedOrder ? '  PO -->|"SUMIFS\\n(col F qty, col AH revenue\\ncol AP/AT week/month)"| CONV' : '',
        bc.plannedOrder ? '  PO -->|"SUMIFS\\n(+ TC filter)"| TCP' : '',
        '  TGT -->|"INDEX/MATCH\\n(brand × periode)"| CONV',
        '  TGT --> TCP',
        '  IDX -->|"VLOOKUP/XLOOKUP\\n(month-year abbrev)"| CONV',
        '  IDX -->|"COUNTIFS\\n(working days per week)"| CONV',
        '  IDX --> TCP',
        '  style DB fill:#1e40af,color:#fff',
        bc.plannedOrder ? '  style PO fill:#065f46,color:#fff' : '',
        '  style IDX fill:#6b21a8,color:#fff',
        '  style TGT fill:#92400e,color:#fff'
      ].filter(Boolean).join('\n')
    },
    { type: 'heading', text: 'Header Kolom — Cara Dashboard Generate Periode' },
    {
      type: 'text',
      html: '<p>Header kolom di setiap sheet dashboard tidak hardcoded — di-generate dinamis dari formula:</p><ul><li><strong>Weekly (W1–W5)</strong>: <code>"W1-"&TEXT($E$3,"mmmyy")</code> → hasil: "W1-Mei26", "W2-Mei26", dst</li><li><strong>Daily columns</strong>: <code>DATE(C3, C2, 1)</code> lalu <code>+1</code> per kolom berikutnya</li><li><strong>Month-year lookup</strong>: <code>XLOOKUP($C$3, index2!$D$14:$D$15, index2!$E$14:$E$15)</code> → 2026 → "26"</li><li><strong>Working day count per week</strong>: <code>COUNTIFS(index2!$B:$B, weekLabel, index2!$A:$A, "<" & TODAY())</code> untuk AVG MTD</li></ul>'
    }
  ];

  var dpFormula = [
    { type: 'heading', text: 'Formula Lengkap per Metric' },
    {
      type: 'alert', level: 'warn',
      html: '<strong>Dual Time Axis:</strong> <strong>Weekly</strong> → filter <code>col AM</code> (string "W1-Mei26"). <strong>Daily</strong> → filter <code>col B</code> (tanggal). Jangan campur. MTD → filter <code>col AY</code> (tahun) + <code>col AZ</code> (bulan).'
    },
    {
      type: 'table',
      columns: ['Metric', 'Formula Aktual (simplified)', 'Source Kolom', 'Notes'],
      rows: [
        ['Visit (weekly)', "COUNTIFS('Database Pasien'!$AM:$AM, weekLabel)", 'col AM', 'Basis semua CR% calculation'],
        ['Visit (daily)', "COUNTIFS('Database Pasien'!$B:$B, date)", 'col B', 'Daily columns'],
        ['Buy (weekly)', "COUNTIFS('DB'!$I:$I,'<>No Upgrade','DB'!$AM:$AM,weekLabel)", 'col I + col AM', 'GATE: col I bukan "No Upgrade"'],
        ['CR% (weekly)', 'Buy / Visit', 'Formula', ''],
        ['%HOT/WARM/COLD', "COUNTIFS('DB'!$AM:$AM,week,'DB'!$Y:$Y,'HOT') / Visit", 'col Y + col AM', 'Lead quality breakdown'],
        ['%Lunas', "COUNTIFS('DB'!$I,'<>NUpg','DB'!$AX,'LUNAS','DB'!$AY,yr,'DB'!$AZ,mo) / Buy", 'col AX + col AY + col AZ', 'MTD filter pakai col AY/AZ'],
        ['%DP 30%', "COUNTIFS(...,'DB'!$AX,'DP 30%',...) / Buy", 'col AX', '"DP 30%" = DP antara 30-99%'],
        ['%DP < 30%', "COUNTIFS(...,'DB'!$AX,'DP < 30%',...) / Buy", 'col AX', 'Flag risiko cancel'],
        ['Basket Size', 'Revenue / Buy', 'Formula', ''],
        ['Total Implant (weekly)', "SUMIFS('planned order'!$F:$F,'PO'!$I:$I,weekLabel)", 'PO col F + col I', 'Dari planned order, BUKAN Database Pasien'],
        ['Revenue/Performance (weekly)', "SUMIFS('PO'!$AH:$AH,'PO'!$AP:$AP,week,'PO'!$AA,'<>*veneer*')", 'PO col AH + col AP + col AA', 'Exclude veneer treatment'],
        ['Avg Price (weekly)', "SUMIFS(PO!$AH,...) / (totalImplant - ALLINqty)", 'PO col AH, AK, AQ', 'Exclude "ALL IN" dan "OD" dari denominator'],
        ['Avg single Implant', "SUMIFS(PO!$F,...,'<>ALL IN','<>OD','<>HALF JAW') / buyCount", 'PO col F + col K', 'Single implant only'],
        ['Total rahang', "SUMIFS(PO!... rahang type filter)", 'PO col AQ', '"ALL IN", "OD" types'],
        ['Cash in {Total} (weekly)', "SUMIFS('DB'!$V:$V,'DB'!$AM:$AM,week,'DB'!$I,'<>No Upgrade')", 'col V + col AM', 'Cash yang sudah masuk — dari Database Pasien'],
        ['Hard Loss (weekly)', "COUNTIFS('DB'!$I,'No Upgrade','DB'!$AM,week,'DB'!$L,'*HL*')", 'col I + col AM + col L', 'col L wildcard match "*HL*"'],
        ['HL - Budget', "COUNTIFS(...,'DB'!$L,'*HL- Budget*')", 'col L', 'Pattern: "*HL- Budget*"'],
        ['HL - Sistemik', "COUNTIFS(...,'DB'!$L,'*HL - Sistemik*')", 'col L', ''],
        ['HL - Location', "COUNTIFS(...,'DB'!$L,'*HL - Luar Kota / LN*')", 'col L', 'Full pattern: "HL - Luar Kota / LN"'],
        ['Soft Loss (weekly)', "COUNTIFS('DB'!$I,'No Upgrade','DB'!$AM,week,'DB'!$L,'*SL*')", 'col I + col AM + col L', 'col L wildcard match "*SL*"'],
        ['SL - Mau Compare', "COUNTIFS(...,'DB'!$L,'*SL - Mau compare dengan klinik lain*')", 'col L', 'Full pattern panjang'],
        ['SL Cause — Pasien/TC/Dokter/Clinic', "COUNTIFS('DB'!$CF,'Pasien','DB'!$L,'*SL*',...)", 'col CF + col L', '4 attribution causes'],
        ['Reason DP <30% total', "COUNTIFS('DB'!$I,'<>No Upgrade','DB'!$AM,week,'DB'!$AX,'DP < 30%')", 'col I + col AM + col AX', ''],
        ['DP sub-reason — Belum Siap Dana', "COUNTIFS(...,'DB'!$AX,'DP < 30%','DB'!$K,'*Belum Siap Dana*')", 'col AX + col K', 'col K = DP reason, wildcard match'],
        ['Case complexity — Simple/Moderate', "COUNTIFS('DB'!$AY,yr,'DB'!$AZ,mo,'DB'!$AO,'Simple') / Visit", 'col AO + col AY + col AZ', '4 types: Simple, Moderate, Complex, Rahang'],
        ['TC filter (TC Performance)', "COUNTIFS(...,'DB'!$H:$H, tcName)", 'col H', 'col H = TC Name — semua metric TCP pakai tambahan filter ini'],
        ['Target lookup', "INDEX(Target!$B3:$Z3, MATCH(1,(Target!$B$1=brand)*(Target!$B$2=periode),0))", 'Target sheet', 'Array formula — brand × periode sebagai keys'],
        ['Working days per week (denominator AVG)', "COUNTIFS(index2!$B:$B,weekLabel,index2!$A:$A,'<'&TODAY())", 'index2 col A + col B', 'Untuk AVG MTD per working day']
      ]
    },
    { type: 'heading', text: 'No Buy — Exact Pattern Matching di Col L' },
    {
      type: 'alert', level: 'info',
      html: 'Semua No Buy reason di-encode sebagai <strong>string prefix di col L</strong> Database Pasien, bukan kode/enum. COUNTIFS menggunakan wildcard <code>*</code>. TC input teks alasan, dan formula matching berdasarkan pattern ini.'
    },
    {
      type: 'table',
      columns: ['Metric', 'Pattern di Col L', 'Kategori'],
      rows: [
        ['Hard Loss (any)', '"*HL*"', 'HL'],
        ['HL - Budget', '"*HL- Budget*"', 'HL'],
        ['HL - Mau Konsultasi Dulu', '"*HL - Mau Konsultasi Dulu*"', 'HL'],
        ['HL - Tunda dulu', '"*HL - Tunda dulu*"', 'HL'],
        ['HL - Bukan mau konsultasi implant', '"*HL - Bukan mau konsultasi implant*"', 'HL'],
        ['HL - Sistemik', '"*HL - Sistemik*"', 'HL'],
        ['HL - Tidak Indikasi', '"*HL - Tidak Indikasi*"', 'HL'],
        ['HL - Location', '"*HL - Luar Kota / LN*"', 'HL'],
        ['HL - Authority', '"*HL - Authority*"', 'HL'],
        ['Soft Loss (any)', '"*SL*"', 'SL'],
        ['SL - Budget', '"*SL - Budget*"', 'SL'],
        ['SL - Delay Time', '"*SL - Delay Time*"', 'SL'],
        ['SL - Convenience', '"*SL - Convenience (kemudahan)*"', 'SL'],
        ['SL - Ragu', '"*SL - Ragu*"', 'SL'],
        ['SL - Authority', '"*SL - Authority*"', 'SL'],
        ['SL - Mau Compare', '"*SL - Mau compare dengan klinik lain*"', 'SL'],
        ['SL - Tanya Internis', '"*SL - Tanya Internis*"', 'SL']
      ]
    }
  ];

  var dpOutput = [
    { type: 'heading', text: 'Output Data — 5 Sheet Dashboard' },
    {
      type: 'table',
      columns: ['Sheet', 'Level', 'Metrics Utama', 'Audience'],
      rows: [
        ['Conversion', 'Aggregate brand/periode', 'Visit, Buy, CR%, Basket, Performance' + (bc.plannedOrder ? ', Total Implant, Avg Price' : '') + ', No Buy (HL+SL), Reason DP<30%, Performance by Loc', 'VP Growth, Leader TC'],
        ['TC Performance', 'Per-TC', 'Semua metrics Conversion di-slice per TC individu — basis coaching', 'Leader TC, SPV'],
        bc.hasTCbyClinic ? ['TC by Clinic', 'TC × Klinik', 'CR%, Buy per TC per klinik — cross-tab matrix', 'Leader TC (deployment optimization)'] : null,
        ['Clinic Performance', 'Per-klinik', 'Visit, Buy, CR%, Performance — evaluasi produktivitas klinik', 'Leader Regional, VP Growth'],
        bc.hasNewDealing ? ['New Dealing Comparison', 'Period comparison', 'Delta Buy & Performance MoM/WoW — tracking momentum', 'VP Growth, monthly review'] : null
      ].filter(Boolean)
    }
  ];

  // ── DASHBOARD & LAPORAN ───────────────────────────────────────

  // -- GROWTH DASHBOARD PIPELINE --
  var dpGrowthPipeline = (function () {
    var bName = brand.toUpperCase();

    // Raw sheet inventory per brand
    var rawSheets = {
      tanam: [
        ['chat_budget_tanam', 'Chat & Budget harian', 'A=Date, B=Week label, C=Total Chat; kolom kanan (H+): raw Supermetrics campaign — H=Date, I=Campaign name, J=Budget spent per campaign'],
        ['prospek_tanam', 'Prospect count per TC', 'A=Date, B=Week label, C+=jumlah prospect per TC (nama TC sebagai header kolom dinamis)'],
        ['simply_tanam', 'Data terjadwal (Simplybook)', 'N=Date Scheduled, O=Tipe kunjungan (Booking/DP/etc.), S=Kota klinik, T=Nama klinik, U=Group (INTERNAL / B2B INTERNAL / B2B EXTERNAL)'],
        ['raw_pasien hadir_tanam', 'Data visit pasien — master', 'A=Visit Date, B=Nama Pasien, E=Nama Klinik, F=Upgrade Status (Upgrade / No Upgrade / Upgrade Recovery), G=Payment (LUNAS / DP amount), H=Notes / alasan no buy, I=Cash In (Rp), J=Week label, M=Kota, N=Channel (INTERNAL / B2B), Q=Klinik group, T=Treatment type (Single Implant / Other Treatment)'],
        ['sr_fb_tanam', 'Free Booking visit source', 'A=No HP, B=Tgl Consul Proposal, C=Nama Klinik, D=Tgl Input, E=Nama Customer, F=Nama Agent (TC), G=Email, H=Tag (Free Booking)'],
        ['Planned Order', 'Pipeline revenue & implant', 'Q=Product Title, R=Qty implant, T=Type (NEW), U=Brand (TANAM), V=Kategori treatment, W=Subtotal revenue; sumber: IMPORTRANGE dari GSheets CoE Pipeline'],
        ['Existing Revenue (AE)', 'Outstanding + upsell (AE)', 'A=Date, B+=Nama customer & jumlah per AE; scope AE: bayar sisa outstanding & upsell — bukan scope TC'],
        ['daily_cash', 'Cash collection harian', 'A=Week, B=Date, C=Total Treatment cash, D=Veneer cash, E=Tanam cash'],
        ['target MTD', 'Target bulanan per brand', 'Row 4=header tanggal bulan (Jan-25 dst), Col A=nama brand; sheet TANAM ambil target via HLOOKUP atau INDEX+MATCH'],
        ['index / index2', 'Helper lookup', 'index: mapping tanggal→week label, jumlah hari kerja. index2: mapping klinik→group→kota, daftar TC aktif, month abbreviation'],
      ],
      rata: [
        ['chat_budget_rata', 'Chat & Budget harian', 'A=Date, B=Week label, C=Total Chat; H+=raw Supermetrics campaign'],
        ['raw_sch_rata', 'Scheduling aggregate', 'A=Date, B=Week, C=Total Booking, D=Total Visit, E=Visit Internal, F=Visit B2B, G=Booking Internal, H=Booking B2B; M+=per-patient: date, channel, DP/FB count'],
        ['raw_compile rata', 'Per-visit buy detail', 'A=Klinik, D=Hasil visit (DP/Konsultasi), E=Produk, F=Upgrade status, J=Tgl Visit, K=Nama TC / alasan DP, M=Week label, N=Harga, P=Skema bayar (P2P/Non P2P), R=Cash in, T=Channel (Internal RATA / B2B)'],
        ['raw_refund_rata', 'Refund cases', 'Data refund — dikecualikan dari perhitungan revenue'],
        ['raw_data_HL_rata', 'Hot Lead yang tidak buy', 'Basis analisis penyebab HL'],
        ['raw_cb_rata', 'Cash bertahap detail', 'Rincian cicilan pasien skema cash bertahap'],
        ['cost_rata', 'Marketing cost harian', 'Budget iklan per hari dari Supermetrics per campaign'],
        ['target MTD', 'Target bulanan', 'Sama dengan TANAM — brand filter col A = "RATA"'],
        ['index2', 'Helper lookup', 'Klinik mapping, daftar TC aktif, week labels'],
      ],
      vinir: [
        ['chat_budget_vinir', 'Chat & Budget harian', 'A=Date, B=Week label, C=Total Chat; H+=raw Supermetrics campaign'],
        ['raw_pasien visit vinir', 'Per-visit master', 'A=Visit Date, B=Nama, C=Phone, D=Treatment type (Smile), E=Booking type (DP/NO DP), F=Upgrade status, G=Produk (Porcelain / Tidak Upgrade), I=Payment status (Lunas / Comfee), J=Revenue amount, K=Upgrade flag, L=Booking date, N=Total Dealing'],
        ['raw_data_HL_vinir', 'Hot Lead yang tidak buy', 'Basis analisis penyebab HL VINIR'],
        ['prospek_new_vinir', 'Prospect count', 'Tracking prospect harian/mingguan'],
        ['cost_vinir', 'Marketing cost harian', 'Budget iklan per hari dari Supermetrics'],
        ['target MTD', 'Target bulanan', 'Sama — brand filter col A = "VINIR"'],
        ['index2', 'Helper lookup', 'Klinik mapping, TC list, week labels'],
      ],
    };

    var metricRows = brand === 'tanam' ? [
      ['Row 6', 'Revenue', 'SUMIFS([Planned Order]!W:W, brand, filter period)', 'Planned Order'],
      ['Row 7', 'Cost per Chat', 'Budget / Chat', 'chat_budget_tanam'],
      ['Row 8', 'Chat', 'SUMIFS(chat_budget_tanam!C:C, date range)', 'chat_budget_tanam'],
      ['Row 9', '% Chat to Prospect', 'Prospect / Chat', 'prospek_tanam'],
      ['Row 10', 'Prospect', 'SUMIFS(prospek_tanam!C+, date range)', 'prospek_tanam'],
      ['Row 11', '% Prospect to Booking', 'Booking / Prospect', 'simply_tanam'],
      ['Row 12', 'Booking', 'COUNTIFS/SUMIFS dari simply_tanam; target: HLOOKUP(target MTD)', 'simply_tanam + target MTD'],
      ['Row 14', 'Visit', 'COUNTIFS(raw_pasien hadir_tanam!A:A, date...)', 'raw_pasien hadir_tanam'],
      ['Row 15', '% Visit to Buy', 'Buy / Visit', '—'],
      ['Row 16', 'Buy', 'COUNTIFS(raw_pasien hadir_tanam!F:F, "<>No Upgrade"...)', 'raw_pasien hadir_tanam'],
      ['Row 18', 'Basket Size', 'Revenue / Buy; target: HLOOKUP(target MTD)', 'Planned Order + target MTD'],
      ['Row 30+', 'Target values', 'INDEX(target MTD!$B$86:$S$106, MATCH($A30, ...))', 'target MTD'],
    ] : [];

    var bRaw = rawSheets[brand] || rawSheets.tanam;
    var rawRows = bRaw.map(function (r) {
      return ['<code>' + r[0] + '</code>', r[1], r[2]];
    });

    var blocks = [
      { type: 'heading', text: 'Growth Dashboard — Raw Sheet Map (' + bName + ')' },
      {
        type: 'alert', level: 'info',
        html: '<strong>Growth Dashboard</strong> adalah file <code>[GROWTH] NEW DASHBOARD.xlsx</code> — dashboard aggregate all-team. Sheet utama <strong>' + bName + '</strong> menghitung semua metric funnel (Chat → Prospect → Booking → Visit → Buy → Revenue) via SUMIFS/COUNTIFS dari raw sheets di bawah ini.'
      },
      { type: 'heading', text: 'Inventory Raw Sheets — ' + bName },
      {
        type: 'table',
        columns: ['Sheet Name', 'Fungsi', 'Kolom Kunci'],
        rows: rawRows
      },
      { type: 'heading', text: 'Dependency Flow — Sheet ' + bName.charAt(0) + bName.slice(1).toLowerCase() },
      {
        type: 'diagram',
        code: [
          'flowchart TD',
          brand === 'tanam' ? '  CB["chat_budget_tanam\nA=Date · C=Chat · H+=Campaign Budget"]' : '',
          brand === 'tanam' ? '  PR["prospek_tanam\nA=Date · C+=Prospect per TC"]' : '',
          brand === 'tanam' ? '  ST["simply_tanam\nN=Date · U=Group (Booking/Terjadwal)"]' : '',
          brand === 'tanam' ? '  RP["raw_pasien hadir_tanam\nA=Date · F=Upgrade Status · I=Cash In"]' : '',
          brand === 'tanam' ? '  PO["Planned Order\nW=Revenue · R=Qty\n(IMPORTRANGE ← CoE GSheets)"]' : '',
          brand === 'rata' ? '  CB["chat_budget_rata\nA=Date · C=Chat"]' : '',
          brand === 'rata' ? '  RS["raw_sch_rata\nA=Date · C=Booking · D=Visit"]' : '',
          brand === 'rata' ? '  RC["raw_compile rata\nJ=Date · N=Revenue · R=Cash in"]' : '',
          brand === 'vinir' ? '  CB["chat_budget_vinir\nA=Date · C=Chat"]' : '',
          brand === 'vinir' ? '  RV["raw_pasien visit vinir\nA=Date · F=Upgrade · J=Revenue"]' : '',
          '  TG["target MTD\nRow 4=bulan · Col A=Brand"]',
          '  IX["index / index2\nWeek labels · Klinik map · TC list"]',
          '  MS["Sheet: ' + bName + '\nChat · Prospect · Booking · Visit · Buy\nRevenue · Basket · Cost/Chat · %CR"]',
          brand === 'tanam' ? '  CB -->|"SUMIFS chat + budget"| MS' : '',
          brand === 'tanam' ? '  PR -->|"SUMIFS prospect"| MS' : '',
          brand === 'tanam' ? '  ST -->|"COUNTIFS booking"| MS' : '',
          brand === 'tanam' ? '  RP -->|"COUNTIFS visit + buy\n(F<>No Upgrade = Buy)"| MS' : '',
          brand === 'tanam' ? '  PO -->|"SUMIFS revenue + implant qty"| MS' : '',
          brand === 'rata' ? '  CB -->|"SUMIFS chat"| MS' : '',
          brand === 'rata' ? '  RS -->|"SUMIFS booking + visit"| MS' : '',
          brand === 'rata' ? '  RC -->|"SUMIFS revenue + buy"| MS' : '',
          brand === 'vinir' ? '  CB -->|"SUMIFS chat"| MS' : '',
          brand === 'vinir' ? '  RV -->|"COUNTIFS visit + buy\nSUMIFS revenue"| MS' : '',
          '  TG -->|"HLOOKUP / INDEX+MATCH\n(target per metric per bulan)"| MS',
          '  IX -->|"lookup helper"| MS',
        ].filter(function (l) { return l !== ''; }).join('\n        ')
      },
      brand === 'tanam' ? { type: 'heading', text: 'Struktur Metric — Sheet TANAM (row layout)' } : null,
      brand === 'tanam' ? {
        type: 'table',
        columns: ['Row', 'Metric', 'Formula Pattern', 'Source Sheet'],
        rows: metricRows
      } : null,
      { type: 'heading', text: 'Catatan Penting' },
      {
        type: 'table',
        columns: ['Item', 'Keterangan'],
        rows: [
          ['Gate Buy/No Buy (TANAM)', 'Col F raw_pasien hadir_tanam: "<>No Upgrade" = Buy; "No Upgrade" = No Buy'],
          ['Gate Buy (RATA)', 'Col F raw_compile rata: "upgrade" = Buy; "tidak upgrade" = No Buy'],
          ['Gate Buy (VINIR)', 'Col F raw_pasien visit vinir: "Upgrade" = Buy; "Tidak Upgrade" / "No Konsul" = No Buy'],
          ['Revenue source', 'TANAM: SUMIFS dari Planned Order (col W). RATA: SUMIFS dari raw_compile rata (col N). VINIR: SUMIFS dari raw_pasien visit vinir (col J / N)'],
          ['Target lookup', 'Sheet TANAM/RATA/VINIR ambil target dari "target MTD" via HLOOKUP (row match bulan) atau INDEX+MATCH (brand × bulan)'],
          ['IMPORTRANGE', 'Planned Order (TANAM) = IMPORTRANGE dari GSheets CoE Pipeline. Database Pasien = IMPORTRANGE dari GSheets CRM. Jika quota habis, data tidak update otomatis.'],
          ['Week label', 'Semua sheet pakai format "W1-Jan25", "W2-Mar26", dst. Di-generate dari sheet "index" via COUNTIFS hari kerja per minggu.'],
        ]
      }
    ].filter(Boolean);

    return blocks;
  })();
  // -- END GROWTH DASHBOARD PIPELINE --

  var dashLaporan = [
    { type: 'heading', text: 'Laporan Rutin dari Tim Conversion' },
    {
      type: 'table',
      columns: ['Laporan', 'Frekuensi', 'Isi Utama', 'Audience'],
      rows: [
        ['Daily CR Monitor', 'Harian', 'CR% hari berjalan vs target, anomali TC, jumlah SL/HL hari ini', 'Leader TC, SPV'],
        ['Weekly Conversion Review', 'Mingguan', 'W1–W5: Visit, Buy, CR%, No Buy breakdown, TC ranking', 'Leader TC, VP Growth'],
        ['TC Performance Report', 'Mingguan / Bulanan', 'Per-TC: CR%, Basket, HL/SL rate, SL cause attribution — basis coaching 1-on-1', 'Leader TC, SPV'],
        ['Monthly Performance Summary', 'Bulanan', 'Semua metrics + Performance by Loc + New Dealing Comparison + target vs actual', 'VP Growth, manajemen'],
        ['DP <30% Alert', 'On-demand / Weekly', 'List kasus DP rendah + reason — priority AE follow-up', 'AE, Leader TC']
      ]
    }
  ];

  var dashDashboard = [
    {
      type: 'text',
      html: '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:4px;">'
        + (bc.dashUrl && !bc.dashUrl.includes('_ID')
          ? '<a href="' + bc.dashUrl + '" target="_blank" style="display:inline-flex;flex-direction:column;gap:4px;padding:14px 18px;background:var(--sur);border:1.5px solid var(--bor);border-radius:12px;text-decoration:none;color:var(--t1);box-shadow:var(--shadow-sm);min-width:200px;max-width:300px;transition:border-color .15s;" onmouseover="this.style.borderColor=\'#3b82f6\'" onmouseout="this.style.borderColor=\'\'">' +
          '<span style="font-size:10px;text-transform:uppercase;letter-spacing:.6px;color:#94a3b8;font-weight:600;">&#128202; Google Sheets</span>' +
          '<span style="font-weight:700;font-size:13.5px;">[' + bUp + '] 2026 Conversion Dashboard</span>' +
          '<span style="font-size:11.5px;color:#64748b;">Conversion & TC performance ' + bUp + ' ↗</span></a>'
          : '<span style="font-size:12px;color:#94a3b8;padding:8px 0;">&#128279; URL dashboard belum tersedia — minta ke leader</span>')
        + '</div>'
    },
    { type: 'heading', text: 'Sheet Breakdown — Conversion Dashboard ' + bUp },
    {
      type: 'alert', level: 'ok',
      html: 'File: <strong>[' + bUp + '] 2026 Conversion Dashboard</strong>' + (bUp === 'TANAM' ? ' — 21 sheet total.' : '.') + ' Sheet utama: 5 sheet di bawah.'
    },
    { type: 'heading', text: 'Sheet 1: Conversion (Aggregate)' },
    {
      type: 'text',
      html: '<p>View aggregate seluruh funnel conversion. 4 section besar:</p><ul><li><strong>Inbound</strong> — Visit, Buy, CR%, Basket, Performance' + (bc.plannedOrder ? ', Total Implant, Avg Price' : '') + '</li><li><strong>No Buy</strong> — Hard Loss (8 sub) + Soft Loss (7 sub + 4 cause attribution: Pasien/TC/Dokter/Clinic)</li><li><strong>Reason DP &lt;30%</strong> — 13 sub-reason</li><li><strong>Performance by Loc (Internal)</strong> — per klinik + Buy Single Implant / Rahang / Single+others</li></ul><p>Time axis: <strong>Weekly</strong> via col AM (W1–W5) + <strong>Daily</strong> columns via col B.</p>'
    },
    { type: 'heading', text: 'Sheet 2: TC Performance' },
    {
      type: 'text',
      html: '<p>Seluruh metrics Conversion di-slice <strong>per TC individu</strong>. Setiap TC = satu baris. Langsung dipakai untuk <strong>coaching 1-on-1 weekly</strong> dan evaluasi target per TC.</p>'
    },
    bc.hasTCbyClinic ? { type: 'heading', text: 'Sheet 3: TC by Clinic' } : null,
    bc.hasTCbyClinic ? {
      type: 'text',
      html: '<p>Cross-tabulation TC × Klinik. Setiap cell = CR% dan/atau Buy count TC di klinik tersebut. Berguna untuk <strong>deployment TC</strong> — tempatkan TC terbaik di klinik traffic tinggi.</p>'
    } : null,
    { type: 'heading', text: (bc.hasTCbyClinic ? 'Sheet 4' : 'Sheet 3') + ': Clinic Performance' },
    {
      type: 'text',
      html: '<p>Metrics per klinik: Visit, Buy, CR%, Performance. Evaluasi <strong>produktivitas tiap lokasi klinik</strong> dan dasar keputusan alokasi resource.</p>'
    },
    bc.hasNewDealing ? { type: 'heading', text: 'Sheet 5: New Dealing Comparison' } : null,
    bc.hasNewDealing ? {
      type: 'text',
      html: '<p>Perbandingan new deals dua periode (MoM/WoW). Delta Buy, delta Performance, growth rate. Dipakai di <strong>monthly review VP Growth</strong> untuk tracking momentum conversion.</p>'
    } : null
  ].filter(Boolean);

  // ── KPI & METRICS ─────────────────────────────────────────────
  var kpiUtama = [
    { type: 'heading', text: 'KPI Utama Tim Conversion ' + bUp },
    {
      type: 'kpi',
      items: [
        { label: 'CR% (Conversion Rate)', value: bc.crTarget, note: 'Buy / Visit — target Mei 2026. Metric paling utama TC.' },
        { label: 'Basket Size', value: bc.basketAvg, note: 'Revenue per ' + bc.buyUnit + '. Indicator kualitas deal.' },
        { label: 'Performance (Revenue)', value: bc.perfTarget, note: 'Total revenue new patient yang di-generate TC (bukan AE).' },
        { label: 'Buy Count', value: bc.buyTarget, note: 'Deal closed. Target Mei 2026.' },
        { label: 'HL Rate', value: '< 15% dari NB', note: 'Hard Loss / No Buy. Tinggi = masalah kualitas lead atau skill TC.' },
        { label: 'DP <30% Rate', value: '< 10% dari Buy', note: 'Flag risiko cancel — monitoring AE.' }
      ]
    },
    { type: 'heading', text: 'Semua Metrics yang Ditrack' },
    {
      type: 'table',
      columns: ['Metric', 'Definisi', 'Source Kolom', 'Sheet'],
      rows: [
        ['Visit', 'Pasien hadir konsultasi aktual', 'COUNTA(col B)', 'Conversion'],
        ['Buy', 'col I ≠ "No Upgrade"', 'COUNTIFS(col I, "<>No Upgrade")', 'Conversion'],
        ['CR%', 'Buy / Visit', 'Formula', 'Conversion'],
        ['Basket Size', 'Performance / Buy', 'Formula', 'Conversion'],
        ['Performance', 'Revenue dari deals new patient (TC scope)', 'SUMIFS deal amount', 'Conversion'],
        bc.plannedOrder ? ['Total Implant', 'Qty implant dari planned order', 'SUMIFS planned order', 'Conversion'] : null,
        bc.plannedOrder ? ['Avg Price/Implant', 'Weighted avg harga per unit', 'planned order — weighted', 'Conversion'] : null,
        ['No Buy', 'col I = "No Upgrade"', 'COUNTIFS(col I, "No Upgrade")', 'Conversion'],
        ['Hard Loss', 'HL subset dari No Buy', 'COUNTIFS per HL reason (col R)', 'Conversion'],
        ['Soft Loss', 'SL subset dari No Buy', 'COUNTIFS per SL reason (col R)', 'Conversion'],
        ['SL Cause — Pasien/TC/Dokter/Clinic', '4 attribution cause untuk SL', 'COUNTIFS cause col', 'Conversion'],
        ['DP <30%', 'Buy dengan DP di bawah 30%', 'COUNTIFS dp pct < 30%', 'Conversion'],
        ['Buy Single Implant', 'Deal single implant saja', 'COUNTIFS implant type', 'Conversion (Perf by Loc)'],
        ['Buy Rahang', 'Deal implant full rahang', 'COUNTIFS implant type', 'Conversion (Perf by Loc)'],
        ['Buy Single Implant+others', 'Single + prosedur tambahan', 'COUNTIFS implant type', 'Conversion (Perf by Loc)']
      ].filter(Boolean)
    }
  ];

  var kpiTarget = [
    { type: 'heading', text: 'Target & Cara Ukur' },
    {
      type: 'table',
      columns: ['Metric', 'Target Mei 2026', 'Cara Ukur', 'Frekuensi'],
      rows: [
        ['CR%', bc.crTarget, 'Buy / Visit dari Database Pasien', 'Daily + Weekly'],
        ['Basket Size', bc.basketAvg, 'Performance / Buy', 'Weekly'],
        ['Performance', bc.perfTarget, 'SUMIFS deal amount — TC scope (new patient)', 'Weekly + Monthly'],
        ['Buy Count', bc.buyTarget, 'COUNTIFS col I ≠ No Upgrade', 'Daily'],
        ['HL Rate', '< 15%', 'Hard Loss / Total No Buy', 'Weekly'],
        ['SL Rate', '> 60% dari NB', 'Soft Loss / Total No Buy — SL harus mayoritas', 'Weekly'],
        ['DP <30% Rate', '< 10%', 'DP <30% count / Buy', 'Weekly'],
        ['SL FU Compliance', '> 80%', '% SL yang sudah di-FU ≤ 7 hari', 'Weekly (monitoring CRM)']
      ]
    },
    {
      type: 'alert', level: 'info',
      html: '<strong>CR% dihitung dari Visit, bukan Booking.</strong> Pasien booking tapi tidak visit tidak masuk denominator. CR% murni mengukur <em>skill closing TC</em> — bukan kualitas lead dari upstream. Naik/turunnya CR% adalah tanggung jawab TC, bukan CS atau SCH.'
    }
  ];

  return {
    Overview: { blocks: overviewBlocks },
    'Business Flow': {
      Input: { blocks: bfInput },
      'Proses Konsultasi': { blocks: bfProses },
      'Output & Status': { blocks: bfOutput },
      'Skema Pembayaran': { blocks: bfSkema },
      'Eskalasi & Edge Cases': { blocks: bfEskalasi }
    },
    Operasional: {
      'Aktivitas Harian': { blocks: opHarian },
      'Tools & Sistem': { blocks: opTools },
      'Rules & Kebijakan': { blocks: opRules },
      SOP: { blocks: opSOP }
    },
    'Data & Pipeline': {
      'Data Sources': { blocks: dpSources },
      'Flow Diagram': { blocks: dpFlow },
      'Transformasi & Formula': { blocks: dpFormula },
      'Output Data': { blocks: dpOutput },
      'Growth Dashboard Pipeline': { blocks: dpGrowthPipeline }
    },
    'Dashboard & Laporan': {
      'Laporan Rutin': { blocks: dashLaporan },
      Dashboard: { blocks: dashDashboard }
    },
    'KPI & Metrics': {
      'KPI Utama': { blocks: kpiUtama },
      'Target & Cara Ukur': { blocks: kpiTarget },
      'Kamus Metrics': {
        blocks: [
          { type: 'heading', text: 'Kamus Metrics Conversion \u2014 Definisi, Source & Cara Hitung' },
          { type: 'alert', level: 'info', html: '<strong>Kamus lengkap metrik Tim Conversion</strong> \u2014 definisi operasional bisnis, cara hitung, aliran data dari sumber, source data, dan di mana metrik dikonsumsi. Gunakan search di homepage untuk query spesifik (contoh: \u201cdefinisi buy\u201d, \u201csource data cr%\u201d, \u201ccara hitung soft loss\u201d).' },
          {
            type: 'table',
            columns: ['Metric', 'Definisi Singkat', 'Source Data Utama', 'Dipakai Di'],
            rows: [
              ['Visit', 'Pasien hadir ke klinik & masuk sesi TC', 'Database Pasien col B/AM/AY+AZ', 'Conversion Dashboard, TC Performance, CR% denominator'],
              ['Buy', 'Pasien upgrade treatment (col I ≠ No Upgrade)', 'Database Pasien col I', 'CR% numerator, TC Performance, Basket Size'],
              ['No Buy', 'Hadir tapi tidak beli (col I = No Upgrade)', 'Database Pasien col I + col L', 'No Buy Analysis, coaching TC'],
              ['CR%', 'Buy / Visit × 100% — headline conversion', 'Turunan Buy & Visit', 'Dashboard utama, Weekly Report, 1-on-1 TC'],
              ['Hard Loss (HL)', 'No Buy permanen — pipeline ditutup', 'Database Pasien col L prefix HL -', 'No Buy Analysis, funnel audit'],
              ['Soft Loss (SL)', 'No Buy yang masih bisa di-FU lagi', 'Database Pasien col L prefix SL -', 'SL FU Compliance, coaching, attribution'],
              ['SL Attribution', '4 sebab SL: Pasien/TC/Dokter/Clinic', 'Database Pasien col L sub-prefix', 'Monthly coaching review, root cause'],
              ['SL FU Compliance', '% SL di-FU ≤ 7 hari oleh TC', 'CRM activity log vs col B', 'TC review, pipeline audit'],
              ['Performance', 'Total revenue TC dari new patient Buy', 'Database Pasien col V (Cash In)', 'TC ranking, bonus, VP Growth review'],
              ['Basket Size', 'Rata-rata nilai transaksi per Buy', 'Turunan Performance / Buy', 'Coaching upsell, target setting'],
              ['DP Breakdown', 'LUNAS / DP 30% / DP <30% (risk flag)', 'Database Pasien col AX', 'AE follow-up, cash flow forecast'],
              ['Cash In', 'Uang masuk — scope AE outstanding', 'Database Pasien col V scope AE', 'AE performance, finance rekonsiliasi'],
              ['Kualitas Lead', 'HOT/WARM/COLD — kesiapan beli pasien', 'Database Pasien col Y', 'Funnel quality, upstream CS eval'],
              ['DP Sub-Reason', '13 alasan spesifik partial payment', 'Database Pasien col K', 'AE collection strategy, DP root cause'],
              ['Planned Order', 'Pipeline implant terencana (TANAM only)', 'Sheet planned_order', 'Revenue forecast, clinic capacity TANAM'],
              ['TC by Clinic', 'CR% & Buy per kombinasi TC × Klinik', 'Database Pasien + klinik field', 'TC deployment, clinic review'],
              ['Dual Time Axis', 'Daily / Weekly / MTD filter pada semua metric', 'col B, col AM, col AY+AZ', 'Semua metric Conversion']
            ]
          },
          { type: 'heading', text: 'Detail Per Metric' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">🚶 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Visit</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Jumlah pasien yang hadir ke klinik dan masuk ke sesi konsultasi TC. Bukan booking, bukan appointment — harus benar-benar hadir (showed up).</span><span style=\"color:#64748b;font-weight:600;\">Logika Bisnis</span><span>Denominator utama semua metric conversion. Tanpa visit tidak ada peluang Buy. Volume visit menentukan ukuran pipeline TC hari itu.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\">COUNTROWS(Database Pasien) WHERE periode = filter aktif (Daily: col B, Weekly: col AM, MTD: col AY+AZ)</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>CRM/Simplybook → raw_pasien_hadir → Database Pasien. col B = Visit Date harian, col AM = Week label (mis. W1-Mei26), col AY/AZ = Year/Month untuk MTD.</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Database Pasien: col B (Visit Date), col AM (Week Visit label), col AY (Year), col AZ (Month)</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>TC Performance sheet, Conversion Dashboard, Weekly Report, daily standup, CR% denominator</span></div><div style=\"margin-top:10px;padding:8px 12px;background:rgba(245,158,11,.08);border-radius:6px;font-size:12px;color:#92400e;\"><strong>⚠️ Catatan:</strong> Visit hanya dihitung jika pasien benar-benar hadir. No-show dan cancel tidak masuk hitungan.</div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">💰 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Buy</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Pasien yang melakukan pembelian/upgrade treatment pada sesi kunjungan. Gate: col I (Upgrade Status) tidak sama dengan \'No Upgrade\'.</span><span style=\"color:#64748b;font-weight:600;\">Logika Bisnis</span><span>KPI utama TC. Setiap Buy = revenue masuk. Target Buy per TC ditetapkan per brand. Hubungan Buy → Visit menghasilkan CR% yang merupakan health indicator paling utama tim.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\">COUNTROWS WHERE col I <> \'No Upgrade\'  (filter periode via col B / col AM / col AY+AZ)</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>TC input upgrade status di CRM → sync ke Database Pasien col I</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Database Pasien: col I (Upgrade Status) — nilai selain \'No Upgrade\' = Buy</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>TC Performance, Conversion Dashboard (headline), CR% numerator, Basket Size denominator, DP analysis</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">❌ METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">No Buy</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Pasien yang hadir (Visit) namun tidak melakukan pembelian. col I = \'No Upgrade\'.</span><span style=\"color:#64748b;font-weight:600;\">Logika Bisnis</span><span>No Buy bukan kegagalan tunggal — ada dua sub-kategori: Hard Loss (pipeline ditutup permanen) dan Soft Loss (masih bisa di-follow up). Breakdown ini menentukan tindakan TC berikutnya.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\">COUNTROWS WHERE col I = \'No Upgrade\'   |   alternatif: No Buy = Visit - Buy</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>TC input \'No Upgrade\' + reason di CRM → Database Pasien col I (status) + col L (reason label)</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Database Pasien: col I = \'No Upgrade\', col L = No Buy Reason Label (format: \'HL - [alasan]\' atau \'SL - [alasan]\')</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>Conversion Dashboard, No Buy Analysis sheet, coaching TC, funnel audit</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">📈 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">CR% (Conversion Rate)</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Persentase pasien yang datang (Visit) dan akhirnya melakukan pembelian (Buy). Metric utama efektivitas konsultasi TC.</span><span style=\"color:#64748b;font-weight:600;\">Logika Bisnis</span><span>Health indicator paling utama tim Conversion. Target CR% per brand berbeda (mis. TANAM 72%). CR% rendah → coaching TC, review skrip konsultasi, atau evaluasi kualitas lead dari upstream (CS).</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\">CR% = Buy / Visit × 100%</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>Kalkulasi turunan dari Buy dan Visit — keduanya bersumber dari Database Pasien</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Database Pasien: col I (Buy gate), col B/AM/AY+AZ (periode filter)</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>Conversion Dashboard (headline metric), TC Performance sheet, Weekly Report, 1-on-1 TC review, VP Growth review</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">🔴 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Hard Loss (HL)</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Pasien No Buy yang pipeline-nya ditutup secara permanen. Tidak ada follow up lanjutan. Identifikasi dari prefix \'HL -\' pada reason label di col L.</span><span style=\"color:#64748b;font-weight:600;\">Logika Bisnis</span><span>HL = real loss, pipeline selesai. HL tinggi bisa indikasi kualitas visit jelek (dominasi lead COLD), atau TC terlalu cepat menutup case. Tidak di-FU lagi.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\">COUNTROWS WHERE col L LIKE \'HL - %\'</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>TC input reason di CRM dengan prefix \'HL - [alasan]\' → Database Pasien col L</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Database Pasien: col L (No Buy Reason Label) — prefix \'HL -\' = Hard Loss</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>No Buy Analysis, coaching TC, funnel quality audit, monthly review</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">🟡 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Soft Loss (SL)</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Pasien No Buy yang masih berpotensi dikonversi di masa mendatang. Identifikasi dari prefix \'SL -\' di col L. Wajib di-FU oleh TC.</span><span style=\"color:#64748b;font-weight:600;\">Logika Bisnis</span><span>SL = peluang recovery. TC wajib follow up SL dalam ≤ 7 hari. Ada 4 attribution sebab: Pasien (budget/waktu), TC (pitching kurang), Dokter (trust issue), Clinic (operasional). Setiap attribution punya action berbeda.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\">COUNTROWS WHERE col L LIKE \'SL - %\'   |   SL = No Buy - HL</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>TC input reason di CRM dengan prefix \'SL - [kategori - detail]\' → Database Pasien col L</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Database Pasien: col L — prefix \'SL -\' = Soft Loss. Sub-kategori: SL-Pasien, SL-TC, SL-Dokter, SL-Clinic</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>No Buy Analysis, SL FU Compliance tracking, root cause coaching, monthly attribution report</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">🔍 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">SL Attribution (4 Kategori)</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Pembagian Soft Loss berdasarkan penyebab: (1) Pasien — belum siap budget/waktu, (2) TC — pitching/follow up kurang, (3) Dokter — kurang trust atau tidak cocok, (4) Clinic — hambatan jadwal/lokasi/fasilitas.</span><span style=\"color:#64748b;font-weight:600;\">Logika Bisnis</span><span>Attribution = dasar action yang tepat sasaran: SL-TC → coaching, SL-Dokter → reassign, SL-Clinic → operasional fix, SL-Pasien → nurturing sequence. Tanpa attribution, SL hanya angka tanpa insight.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\">SL-Pasien = col L LIKE \'SL - Pasien%\' | SL-TC = col L LIKE \'SL - TC%\' | SL-Dokter = col L LIKE \'SL - Dokter%\' | SL-Clinic = col L LIKE \'SL - Clinic%\'</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>TC input detail reason di CRM: \'SL - [Kategori] - [Detail]\' → Database Pasien col L</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Database Pasien: col L — parsing prefix SL - Pasien / SL - TC / SL - Dokter / SL - Clinic</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>No Buy Analysis sheet, monthly coaching review, operational improvement tracking</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">⏱️ METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">SL FU Compliance</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Persentase kasus Soft Loss yang di-follow up TC dalam ≤ 7 hari sejak visit. Mengukur kedisiplinan TC mengelola pipeline terbuka.</span><span style=\"color:#64748b;font-weight:600;\">Logika Bisnis</span><span>SL yang tidak di-FU dalam 7 hari memiliki probabilitas konversi jauh lebih rendah. Target compliance biasanya ≥ 80%. Low compliance → TC overwhelmed atau prioritas tidak tepat.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\">SL FU Compliance% = (SL di-FU ≤ 7 hari) / Total SL × 100%</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>CRM activity log (FU date) vs Database Pasien col B (visit date). Delta ≤ 7 hari = compliant.</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>CRM activity log + Database Pasien col B (Visit Date)</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>TC 1-on-1 review, weekly pipeline audit, coaching flag</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">💵 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Performance (Revenue TC Scope)</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Total nilai transaksi yang dihasilkan TC dari new patient yang Buy. Dihitung dari col V (Cash In Amount) untuk pasien dengan col I ≠ No Upgrade.</span><span style=\"color:#64748b;font-weight:600;\">Logika Bisnis</span><span>KPI revenue TC — berbeda dari Cash In (KPI AE). Performance = berapa rupiah TC generate dari new conversion. Dipakai untuk ranking dan bonus TC.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\">SUM(col V) WHERE col I <> \'No Upgrade\' AND scope = new patient</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>TC closes deal → CRM input nilai → Database Pasien col V (Cash In Amount)</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Database Pasien: col V (Cash In Amount), col I (Buy gate)</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>TC Performance sheet, TC ranking, bonus/incentive calculation, VP Growth review</span></div><div style=\"margin-top:10px;padding:8px 12px;background:rgba(245,158,11,.08);border-radius:6px;font-size:12px;color:#92400e;\"><strong>⚠️ Catatan:</strong> Scope Performance = new patient saja. Return patient scope berbeda — lihat SOP per brand.</div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">🛒 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Basket Size (Avg Transaction Value)</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Rata-rata nilai transaksi per pasien yang Buy. Mengukur kemampuan TC dalam upsell/cross-sell dan mendorong pembelian paket lebih besar.</span><span style=\"color:#64748b;font-weight:600;\">Logika Bisnis</span><span>Basket Size tinggi = TC berhasil offering paket komprehensif. Target per brand berbeda (mis. TANAM ~Rp28,5jt). TC dengan CR% tinggi tapi basket kecil = volume player; basket besar = high-value converter.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\">Basket Size = Performance / Buy</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>Kalkulasi turunan dari Performance (SUM col V) dan Buy (COUNT col I ≠ No Upgrade)</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Database Pasien: col V (Cash In Amount), col I (Buy gate)</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>TC Performance sheet, coaching on upsell, monthly brand review, target setting</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">💳 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">DP Breakdown (LUNAS / DP 30% / DP <30%)</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Segmentasi pasien Buy berdasarkan status pembayaran DP di col AX: LUNAS (bayar penuh), DP 30% (bayar minimal 30%), DP <30% (kurang dari 30% — risk flag cancel).</span><span style=\"color:#64748b;font-weight:600;\">Logika Bisnis</span><span>DP <30% = risk flag paling kritis, cancel rate lebih tinggi secara historis. Prioritasi follow-up AE. LUNAS = aman, DP 30% = normal, DP <30% = perlu pengawasan dan collection plan dari AE.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\">LUNAS = COUNTROWS col AX = \'LUNAS\' | DP 30% = col AX = \'DP 30%\' | DP <30% = col AX = \'DP < 30%\'</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>TC/Admin input status DP di CRM → Database Pasien col AX</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Database Pasien: col AX (DP status) — nilai: \'LUNAS\', \'DP 30%\', \'DP < 30%\'</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>AE follow-up prioritization, cash flow forecast, cancel risk management, monthly DP analysis</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">🏦 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Cash In (AE Scope)</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Total pembayaran yang sudah benar-benar masuk ke klinik dari pasien outstanding. Scope utama: AE (Account Executive) untuk collection. Berbeda dari Performance (scope TC).</span><span style=\"color:#64748b;font-weight:600;\">Logika Bisnis</span><span>Cash In = KPI AE — memastikan outstanding ter-collect. Pasien DP <30% = outstanding besar = prioritas. Dipakai juga untuk rekonsiliasi revenue klinik.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\">SUM(col V) untuk scope AE (pasien outstanding/return)</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>Payment confirmation → CRM → Database Pasien col V (Cash In Amount)</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Database Pasien: col V (Cash In Amount), filter scope AE (outstanding/return patient)</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>AE performance tracking, cash flow report, finance rekonsiliasi, VP Finance review</span></div><div style=\"margin-top:10px;padding:8px 12px;background:rgba(245,158,11,.08);border-radius:6px;font-size:12px;color:#92400e;\"><strong>⚠️ Catatan:</strong> Bedakan Performance (TC scope, new patient Buy) vs Cash In (AE scope, outstanding collection). Sumber kolom sama (col V), beda filter scope.</div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">🌡️ METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Kualitas Lead / Lead Readiness (HOT / WARM / COLD)</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Segmentasi kualitas lead berdasarkan kesiapan beli saat tiba di klinik: HOT (siap beli, butuh dorong minimal), WARM (tertarik tapi perlu nurturing), COLD (belum siap, butuh edukasi lebih).</span><span style=\"color:#64748b;font-weight:600;\">Logika Bisnis</span><span>Menentukan strategi TC: HOT → closing pitch langsung, WARM → objection handling, COLD → edukasi + bangun trust. Distribusi HOT:WARM:COLD juga mengindikasikan kualitas lead generation upstream dari CS dan Marketing.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\">Distribusi: COUNTROWS per kategori / Total Visit | HOT CR% biasanya jauh > WARM/COLD CR%</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>CS/Marketing assign kualifikasi lead saat booking → TC lihat saat visit → Database Pasien col Y</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Database Pasien: col Y (Lead Readiness / Lead Temp) — nilai: \'HOT\', \'WARM\', \'COLD\'</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>TC Performance analysis, funnel quality check, upstream CS/Marketing evaluation, monthly lead quality report</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">📋 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">DP Sub-Reason</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Alasan spesifik pasien hanya bayar sebagian (DP tidak lunas). Ada 13 sub-reason di col K untuk identifikasi barrier pembayaran yang paling sering muncul.</span><span style=\"color:#64748b;font-weight:600;\">Logika Bisnis</span><span>Knowing the why di balik DP <30% memungkinkan action tepat: sub-reason finansial → opsi cicilan, sub-reason dokter → fleksibilitas jadwal, sub-reason logistik → solusi operasional. Tanpa sub-reason, outstanding hanya angka.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\">COUNTROWS per nilai col K, filter WHERE col AX IN (\'DP < 30%\', \'DP 30%\')</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>TC/Admin input DP reason di CRM → Database Pasien col K</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Database Pasien: col K (DP Sub-Reason) — 13 kategori sub-reason</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>AE collection strategy, operational improvement, monthly DP root cause analysis</span></div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">🦷 METRIC — TANAM ONLY</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Planned Order Pipeline</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Pipeline implant yang sudah dijadwalkan namun belum selesai prosedur. Meliputi: total implant terencana, avg harga per implant, dan stage (scheduled → in-progress → done).</span><span style=\"color:#64748b;font-weight:600;\">Logika Bisnis</span><span>TANAM-spesifik karena treatment implant gigi multi-tahap. Planned Order Pipeline = potential revenue yang sudah terkunci — pasien commit tapi belum selesai. Critical untuk revenue forecasting klinik.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\">Total Planned Implant = SUM(col implant) sheet planned_order | Avg Price = Total Value / Total Implant | Completion% = Done / Total</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>TC input planned order di sheet planned_order → aggregasi ke Conversion Dashboard TANAM</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Sheet: planned_order (raw) — kolom: pasien ID, jumlah implant, harga satuan, stage, TC name</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>TANAM Conversion Dashboard, revenue forecasting, clinic capacity planning, VP Growth TANAM review</span></div><div style=\"margin-top:10px;padding:8px 12px;background:rgba(245,158,11,.08);border-radius:6px;font-size:12px;color:#92400e;\"><strong>⚠️ Catatan:</strong> Metric ini hanya aktif untuk brand TANAM (bc.plannedOrder = true). Tidak relevan untuk RATA/VINIR.</div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">🏥 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">TC by Clinic Performance</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Cross-tabulation performa TC per klinik: CR%, Buy count, dan Visit per kombinasi TC × Klinik. Mengukur apakah TC tertentu lebih perform di klinik tertentu.</span><span style=\"color:#64748b;font-weight:600;\">Logika Bisnis</span><span>TC deployment optimization: tempatkan TC terbaik di klinik traffic tinggi. TC bagus di Klinik A tapi buruk di Klinik B → bisa jadi klinik issue bukan TC issue. Insight ini kritis untuk scheduling TC antar klinik.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\">Pivot: Rows = TC Name (col H), Columns = Klinik, Values = CR% dan Buy count per cell</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>Database Pasien (col H = TC Name, col klinik) → Sheet TC by Clinic (pivot)</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Database Pasien + klinik field. Sheet TC by Clinic = pivot dari Database Pasien.</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>TC deployment scheduling, clinic performance review, operational manager, VP Operations</span></div><div style=\"margin-top:10px;padding:8px 12px;background:rgba(245,158,11,.08);border-radius:6px;font-size:12px;color:#92400e;\"><strong>⚠️ Catatan:</strong> Tersedia di brand dengan bc.hasTCbyClinic = true (TANAM, VINIR). Tidak tersedia di RATA.</div></div>' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">📅 SISTEM FILTER</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Dual Time Axis — Daily / Weekly / MTD</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Sistem filter waktu 3 dimensi untuk semua metric Conversion: Daily (per tanggal), Weekly (per label minggu), MTD (akumulasi bulan berjalan).</span><span style=\"color:#64748b;font-weight:600;\">Logika Bisnis</span><span>Setiap granularitas punya use case: Daily = cek operasional harian + standup, Weekly = trend analysis + weekly report, MTD = performance vs target bulan ini. Semua metric Visit/Buy/CR% bisa diiris per dimensi ini.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\">Daily: filter col B (Visit Date) | Weekly: filter col AM (Week label mis. \'W1-Mei26\') | MTD: filter col AY (Year int) + col AZ (Month int)</code></span><span style=\"color:#64748b;font-weight:600;\">Flow Asal</span><span>Database Pasien pre-populated dengan col B, AM, AY, AZ — di-filter di Conversion Dashboard atau formula sheet</span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Database Pasien: col B (date), col AM (week string), col AY (year integer), col AZ (month integer)</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>Semua metric Conversion: Visit, Buy, CR%, Performance, Basket Size, DP Breakdown, SL/HL</span></div></div>' }
        ]
      }
    }
  };
}
// -- END CONV BLOCKS --



// ====================================================================================================================
// ====================================================================================================================
// RETENTION / AE BLOCKS
// Dipanggil dengan: _retentionBlocks('rata') / _retentionBlocks('tanam') / _retentionBlocks('vinir')
// ====================================================================================================================
function _retentionBlocks(brand) {
  var bUp = brand.toUpperCase();

  var bc = {
    rata: {
      dashUrl: 'https://docs.google.com/spreadsheets/d/RATA_RETENTION_ID/edit',
      trackerUrl: 'https://docs.google.com/spreadsheets/d/RATA_TRACKER_FU_ID/edit',
      dashName: '[RATA] Retention Dashboard',
      trackerName: 'Retention Tracker FU RATA'
    },
    tanam: {
      dashUrl: 'https://docs.google.com/spreadsheets/d/1IfoxhcypmUomSksN8M5OjiGiaPtTWa-MNY4ItKgaaHE/edit?gid=2075544299#gid=2075544299',
      trackerUrl: 'https://docs.google.com/spreadsheets/d/1mvVTBEY0xhjHHeReqQEwPjhtR69BsoMzO2BsdozVMHI/edit',
      dashName: '[TANAM] Retention Dashboard',
      trackerName: 'Retention Tracker FU TANAM'
    },
    vinir: {
      dashUrl: 'https://docs.google.com/spreadsheets/d/VINIR_RETENTION_ID/edit',
      trackerUrl: 'https://docs.google.com/spreadsheets/d/VINIR_TRACKER_FU_ID/edit',
      dashName: '[VINIR] Retention Dashboard',
      trackerName: 'Retention Tracker FU VINIR'
    }
  }[brand];

  // ── FLOW DIAGRAM ──────────────────────────────────────────────
  var diagramCode = [
    'flowchart TD',
    '    subgraph SRC ["SOURCE"]',
    '        RS["raw sum\\n(External GSheet — IMPORTRANGE)\\nNominal Tagih, Target per KPI,\\nAktual Bayar harian"]',
    '        TFU["' + bc.trackerName + '\\n(sheet: Input Data Productivity)\\nHasil FU harian AE"]',
    '        COE["CoE Pipeline / raw leads\\nData pasien per acquisition month"]',
    '        REFDB["ticketing.rata.id\\n+ Tim Customer Feedback\\nApproved refund records"]',
    '        TPDB["Database Perubahan TP\\nPerubahan treatment plan pasien"]',
    '    end',
    '    subgraph PROC ["INTERMEDIATE (Dashboard Internal)"]',
    '        RSC["raw sum cash in\\n(IMPORTRANGE dari raw sum)\\nKol: Nominal Tagih, Aktual Bayar,\\nM0–M3+, Terjadwal, Upsell,\\nUpgrade, Zircon, Carenow, Promo\\nTarget_* di col AO/AP/AQ/AR/AS"]',
    '        RDP["rawdata_promo\\n(IMPORTRANGE dari Tracker FU)\\nHasil FU per Week, Aktual Bayar,\\nTagging, Status Kunjungan"]',
    '        RL["raw leads / AE Leads\\n(cohort bayar per pasien)"]',
    '    end',
    '    subgraph DASH ["DASHBOARD — ' + bc.dashName + '"]',
    '        D1["[AE] Sum Cash In\\nHarian: Aktual Bayar, Nominal Tagih,\\nPasien Terjadwal, Upsell, Upgrade,\\nZircon, Carenow, Promo Tambahan"]',
    '        D2["[AE] Sum Refund\\nHarian: Qty & Nominal Refund,\\n% ke Cash In, breakdown Medis/Non-Medis"]',
    '        D3["[AE] Cash-in Cohort (Planned Order)\\nBulanan: M0–M3 payment timing,\\n% Outstanding per acquisition month"]',
    '        D4["[On Progress] [AE] Leads\\nStatus pasien belum convert:\\nDP<30% vs DP30%UP,\\nCONVERT vs BELUM CONVERT"]',
    '        D5["[AE] Perubahan TP\\nBulanan: kategori & status\\nperubahan treatment plan"]',
    '    end',
    '    RS -->|"IMPORTRANGE"| RSC',
    '    TFU -->|"IMPORTRANGE"| RDP',
    '    COE --> RL',
    '    RSC --> D1',
    '    RDP --> D1',
    '    RSC --> D2',
    '    REFDB --> D2',
    '    RL --> D3',
    '    RL --> D4',
    '    TPDB --> D5'
  ].join('\n');

  return {

    // ── OVERVIEW ────────────────────────────────────────────────
    Overview: {
      blocks: [
        {
          type: 'text',
          html: '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px">'
            + '<a href="' + bc.dashUrl + '" target="_blank" style="display:inline-flex;align-items:center;gap:6px;padding:8px 14px;background:var(--sur);border:1px solid var(--bor);border-radius:10px;color:var(--t1);text-decoration:none;font-size:13px;font-weight:600;box-shadow:var(--shadow-sm);">&#128202; ' + bc.dashName + ' &#8599;</a>'
            + '<a href="' + bc.trackerUrl + '" target="_blank" style="display:inline-flex;align-items:center;gap:6px;padding:8px 14px;background:var(--sur);border:1px solid var(--bor);border-radius:10px;color:var(--t1);text-decoration:none;font-size:13px;font-weight:600;box-shadow:var(--shadow-sm);">&#128221; ' + bc.trackerName + ' &#8599;</a>'
            + '</div>'
        },
        {
          type: 'alert', level: 'info',
          html: '<strong>Tim Retention / AE ' + bUp + '</strong> — berperan di tahap <em>pasca-closing</em>. Setelah TC menutup deal, AE mengambil alih untuk: (1) menagih <strong>outstanding payment</strong> bertahap (M0–M3+), (2) mendorong <strong>Upsell & Upgrade</strong>, (3) mengelola <strong>Refund</strong>, dan (4) menangani <strong>Perubahan Treatment Plan</strong>. KPI utama: Aktual Bayar vs Target, % Refund ≤ 3%.'
        },
        {
          type: 'text',
          html: '<p>Posisi dalam funnel: <strong>TC Deal Closed → [AE Handle] → Cash In + Upsell → Finance</strong>. AE tidak mengejar new acquisition — fokusnya adalah memaksimalkan cash dari pipeline pasien yang sudah exist.</p>'
        },
        {
          type: 'kpi',
          items: [
            { label: 'KPI Utama', value: 'Aktual Bayar', note: 'Total cash collected vs target harian/mingguan' },
            { label: 'Target Refund', value: '< 3%', note: 'Maks 3% dari total All Cash In (TC + AE)' },
            { label: 'Cohort Payment', value: 'M0 – M3+', note: 'Tracking kecepatan bayar per acquisition month' },
            { label: 'Program FU', value: '3 Program', note: 'Blast Zircon, Promo Tambahan, New Pasien' },
            { label: 'Upsell & Upgrade', value: 'Cash In Ekstra', note: 'Revenue tambahan dari pasien existing' },
            { label: 'Perubahan TP', value: '% Change', note: 'Persen pasien single implant yang ganti treatment plan' }
          ]
        }
      ]
    },

    // ── BUSINESS FLOW ────────────────────────────────────────────
    'Business Flow': {
      Input: {
        blocks: [
          { type: 'heading', text: 'Handover dari TC ke AE' },
          {
            type: 'alert', level: 'info',
            html: 'AE menerima pasien setelah TC menutup deal. Trigger handover: status pasien <strong>BUY</strong> di CRM — TC selesai, AE mulai.'
          },
          {
            type: 'table',
            columns: ['Input', 'Sumber', 'Keterangan'],
            rows: [
              ['Data pasien deal', 'CRM Dynamic / CoE Pipeline', 'Nama, nomor HP, nominal dealing, skema bayar, DP awal'],
              ['Grouping DP', 'raw sum cash in col D', 'DP<30% atau DP 30%UP — menentukan program FU yang dijalankan'],
              ['Jadwal tindakan', 'Simplybook / SCH', 'Tanggal visit ke depan — basis target Pasien Terjadwal'],
              ['Outstanding awal', 'Nominal Dealing − DP yang sudah masuk', 'Total sisa tagihan yang harus di-collect AE']
            ]
          }
        ]
      },
      'Proses Utama': {
        blocks: [
          { type: 'heading', text: 'Proses Kerja Harian AE' },
          {
            type: 'steps',
            items: [
              {
                title: 'Identifikasi Pasien Shortcall',
                desc: 'Buka Retention Tracker FU → Sheet Shortcall (Zircon, Promo Tambahan, atau New Pasien). Filter berdasarkan DP grouping dan reason status. Tentukan pasien mana yang perlu dihubungi hari ini.'
              },
              {
                title: 'Eksekusi FU — 3 Program',
                desc: '<strong>Blast Zircon</strong>: FU pasien yang mendekati jadwal pemasangan mahkota — dorong pelunasan sebelum tindakan. <strong>Promo Tambahan</strong>: Tawarkan promo/diskon khusus untuk trigger pembayaran outstanding. <strong>New Pasien</strong>: FU pasien baru (M0/M1) untuk percepat pelunasan awal.'
              },
              {
                title: 'Input Hasil FU ke Tracker',
                desc: 'Setiap aktivitas FU wajib diinput di sheet <strong>Input Data Productivity</strong> (Retention Tracker FU): Tipe FU, Status FU, Status FU Grouping, Nominal Promo, Status Kunjungan, Nominal Dealing, DP, Reason Tidak Lunas. Data ini menjadi source untuk dashboard via IMPORTRANGE.'
              },
              {
                title: 'Handle Perubahan TP',
                desc: 'Jika pasien meminta perubahan treatment plan — catat di Database Perubahan TP. Update nominal di CRM. Kategori: BG1>BG2/SL1>SL2, Penambahan BG, Pengurangan Treatment, Penambahan SL, Perubahan BG→SL, dll. Mayoritas outcome: "Setuju dealing TP Baru".'
              },
              {
                title: 'Handle Refund Request',
                desc: 'Pasien mengajukan refund ke klinik → klinik buka tiket di ticketing.rata.id → AE review kelayakan nominal → Finance approve budget → AE input data approved ke dashboard. Hanya refund yang sudah approved yang masuk ke [AE] Sum Refund.'
              }
            ]
          }
        ]
      },
      'Output & Handover': {
        blocks: [
          { type: 'heading', text: 'Output Tim AE' },
          {
            type: 'table',
            columns: ['Output', 'Sheet / File', 'Frekuensi', 'Audience'],
            rows: [
              ['Aktual Bayar harian', '[AE] Sum Cash In', 'Harian (real-time via IMPORTRANGE)', 'Leader, Finance'],
              ['Refund tracking', '[AE] Sum Refund', 'Harian (manual input post-approval)', 'Leader, Finance'],
              ['Cohort payment analysis', '[AE] Cash-in Cohort (Planned Order)', 'Bulanan (kumulatif)', 'Leader, Growth Manager'],
              ['Status leads on progress', '[On Progress] [AE] Leads', 'Harian (real-time)', 'AE SPV, Leader'],
              ['Treatment plan changes', '[AE] Perubahan TP', 'Bulanan', 'Dokter, TC, Leader'],
              ['Hasil FU harian', 'Retention Tracker FU → Input Data Productivity', 'Harian (input AE)', 'AE, SPV']
            ]
          }
        ]
      },
      'Exception & Eskalasi': {
        blocks: [
          { type: 'heading', text: 'Exception & Eskalasi' },
          {
            type: 'alert', level: 'warn',
            html: '<strong>Refund melebihi 3%</strong>: eskalasi ke Leader + Finance untuk investigasi root cause (Medis vs Non-Medis, Lanjut vs Tidak Lanjut treatment). <strong>Perubahan TP massal</strong>: koordinasi dengan Dokter dan TC terkait kualitas assessment awal. <strong>Pasien ghosted/No Response</strong>: setelah 3x FU tidak respons, masuk status EXTERNAL di On Progress Leads.'
          },
          {
            type: 'table',
            columns: ['Situasi', 'Status di Dashboard', 'Tindakan'],
            rows: [
              ['Pasien belum bisa bayar — alasan keuangan', 'BELUM CONVERT → EXTERNAL: Belum Siap Dana', 'Set FU date, tawarkan Carenow/P2P lending (Indodana)'],
              ['Pasien minta perubahan treatment', 'BELUM CONVERT → PENDING: Perubahan TP', 'Koordinasi dengan dokter, update nominal di CRM'],
              ['Jadwal penuh / dokter tidak tersedia', 'BELUM CONVERT → SCHEDULED: Dentist/Capacity Tidak Tersedia', 'Reschedule via SCH, update tracker'],
              ['Pasien minta refund', 'REFUND', 'Buka tiket via klinik, proses review AE → Finance'],
              ['Menunggu osseointegrasi', 'BELUM CONVERT → EXTERNAL: Menunggu Osseointegrasi', 'Pantau jadwal, FU kembali setelah periode osseointegrasi']
            ]
          }
        ]
      }
    },

    // ── OPERASIONAL ──────────────────────────────────────────────
    Operasional: {
      'Aktivitas Harian': {
        blocks: [
          { type: 'heading', text: 'Rutinitas Harian AE ' + bUp },
          {
            type: 'table',
            columns: ['Waktu', 'Aktivitas', 'Keterangan'],
            rows: [
              ['Pagi', 'Cek Shortcall list hari ini', 'Buka Retention Tracker FU → filter pasien prioritas (Zircon jatuh tempo, Promo aktif, New Pasien M0/M1)'],
              ['Pagi - Siang', 'Eksekusi Shortcall FU', 'Hubungi pasien via WA/telepon. 3 program: Blast Zircon, Promo Tambahan, New Pasien'],
              ['Siang', 'Input hasil FU ke Tracker', 'Wajib isi: Tipe FU, Status FU, Status Grouping, Nominal, Tanggal FU, AE Input di sheet Input Data Productivity'],
              ['Siang', 'Update On Progress Leads', 'Pastikan status pasien di dashboard: CONVERT / BELUM CONVERT / sub-status'],
              ['Sore', 'Handle Perubahan TP & Refund', 'Proses tiket refund baru, catat perubahan TP, koordinasi dengan Finance jika ada approval pending'],
              ['Sore', 'Review Aktual Bayar harian', 'Cek [AE] Sum Cash In -- apakah target harian tercapai? Escalate ke SPV jika ada gap besar']
            ]
          }
        ]
      },

      'Tools & Sistem': {
        blocks: [
          { type: 'heading', text: 'Tools & Akses -- AE ' + bUp },
          {
            type: 'text',
            html: '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px">'
              + '<a href="' + bc.dashUrl + '" target="_blank" style="display:inline-flex;align-items:center;gap:6px;padding:8px 14px;background:var(--b2);border:1px solid var(--sep);border-radius:6px;color:var(--t1);text-decoration:none;font-size:12px;font-weight:600">&#128202; ' + bc.dashName + ' &#8599;</a>'
              + '<a href="' + bc.trackerUrl + '" target="_blank" style="display:inline-flex;align-items:center;gap:6px;padding:8px 14px;background:var(--b2);border:1px solid var(--sep);border-radius:6px;color:var(--t1);text-decoration:none;font-size:12px;font-weight:600">&#128221; Retention Tracker FU &#8599;</a>'
              + '</div>'
          },
          {
            type: 'table',
            columns: ['Tool / File', 'Fungsi', 'Siapa Pakai'],
            rows: [
              [bc.dashName, 'Dashboard monitoring utama: Cash In, Refund, Cohort, Leads On Progress, Perubahan TP', 'AE, SPV, Leader'],
              [bc.trackerName, 'Operasional FU harian: Shortcall list + input hasil FU (Input Data Productivity)', 'AE (input harian)'],
              ['ticketing.rata.id', 'Platform tiket refund -- pasien ke klinik ke AE ke Finance', 'AE, Klinik, Finance'],
              ['Carenow / Indodana', 'P2P lending -- opsi pembiayaan untuk pasien yang belum bisa bayar penuh', 'AE (tawarkan ke pasien)'],
              ['Dynamic CRM / CoE', 'Source data pasien deal, nominal, skema bayar -- basis raw leads', 'Read-only AE, TC input']
            ]
          }
        ]
      },

      'Rules & Kebijakan': {
        blocks: [
          { type: 'heading', text: 'Rules & Kebijakan AE ' + bUp },
          {
            type: 'steps',
            items: [
              {
                title: 'Target Refund: Maks 3% dari All Cash In',
                desc: 'Target Refund = 3% x Cash In hari tersebut. % Refund to Cash In dihitung harian di [AE] Sum Refund. Jika mendekati 3%, eskalasi ke Leader + Finance.',
                note: 'Cash In = TC cash + AE cash (total keduanya, bukan hanya AE)'
              },
              {
                title: 'Grouping DP -- Dua Bucket Terpisah',
                desc: 'Semua pasien dibagi ke dua bucket: DP<30% (komitmen awal rendah, risiko outstanding tinggi) dan DP 30%UP (komitmen awal >=30%). Semua KPI di dashboard displit per bucket ini.',
                note: 'Program FU berbeda: DP<30% = Blast Zircon + Promo. DP 30%UP = New Pasien FU'
              },
              {
                title: 'Input FU Wajib Hari H',
                desc: 'AE wajib input hasil FU di Retention Tracker FU (Input Data Productivity) di hari yang sama. Delay input = data dashboard lag.',
                note: 'Data tracker mengalir via IMPORTRANGE ke rawdata_promo di dashboard'
              },
              {
                title: 'Hanya Approved Refund yang Masuk Dashboard',
                desc: 'Refund yang masuk ke [AE] Sum Refund adalah yang sudah diapprove oleh Finance. Budget refund disetujui Finance.',
                note: 'Proses: Pasien -> Klinik -> Tiket AE -> Review AE -> Approval Finance -> Input Dashboard'
              },
              {
                title: 'Target Dinamis Upsell & Zircon',
                desc: 'Untuk bulan Februari, target Upsell dan Zircon menggunakan sheet <code>target dinamis</code> (distribusi hari kerja, Minggu = 50% target harian). Bulan lain dari col AR/AS di <code>raw sum cash in</code>.',
                note: 'Logic: =IF(MONTH(date)=2, SUMIFS(target dinamis!AM:AM,...), SUMIFS(raw sum cash in!AR:AR,...))'
              }
            ]
          }
        ]
      },
      SOP: { blocks: [] }
    },

    // DATA & PIPELINE
    'Data & Pipeline': {
      'Data Sources': {
        blocks: [
          { type: 'heading', text: 'Data Sources -- AE ' + bUp + ' Pipeline' },
          {
            type: 'table',
            columns: ['File / Sheet', 'Role dalam Pipeline', 'Update Oleh', 'Cara Masuk ke Dashboard'],
            rows: [
              ['raw sum (External GSheet)', 'Source master Nominal Tagih, Aktual Bayar harian, semua Target_* per KPI', 'Otomatis / sistem', 'IMPORTRANGE ke raw sum cash in di dashboard'],
              [bc.trackerName + ' (Input Data Productivity)', 'Hasil FU harian AE: Tipe FU, Status, Nominal, Tanggal', 'AE (input manual harian)', 'IMPORTRANGE ke rawdata_promo di dashboard'],
              ['CoE Pipeline / raw leads', 'Data pasien per acquisition month -- basis cohort', 'Otomatis dari CRM', 'Langsung ke raw leads, AE Leads'],
              ['ticketing.rata.id + Tim Customer Feedback', 'Refund approved -- rekap manual', 'AE (manual setelah approval Finance)', 'Input ke databse refund -- [AE] Sum Refund'],
              ['Database Perubahan TP pasien', 'Perubahan treatment plan pasien existing', 'AE (update saat TP berubah)', 'Formula ke [AE] Perubahan TP'],
              ['target dinamis (internal sheet)', 'Distribusi target harian Upsell & Zircon (khusus Februari)', 'Set manual Analyst/Leader awal bulan', 'Formula IF(MONTH=2) di [AE] Sum Cash In']
            ]
          }
        ]
      },
      'Flow Diagram': {
        blocks: [
          { type: 'heading', text: 'Data Flow -- AE ' + bUp + ' Pipeline' },
          { type: 'diagram', code: diagramCode }
        ]
      },
      'Transformasi & Formula': {
        blocks: [
          { type: 'heading', text: 'Formula & Logic Utama' },
          {
            type: 'alert', level: 'info',
            html: 'Dashboard AE berbasis <strong>SUMIFS harian</strong> -- setiap kolom = satu tanggal (row 7 header), setiap row = satu metrik. Axis: <code>raw sum cash in</code> col I (tanggal).'
          },
          {
            type: 'table',
            columns: ['Sheet', 'Metrik', 'Formula / Logic'],
            rows: [
              ['[AE] Sum Cash In', 'Aktual Bayar', 'SUMIFS(raw sum cash in!$N:$N, col$I:$I, date_header)'],
              ['[AE] Sum Cash In', 'Target (Px Terjadwal)', 'SUMIFS(raw sum cash in!$AO:$AO, col$I:$I, date_header)'],
              ['[AE] Sum Cash In', 'Pasien Terjadwal', 'SUMIFS(raw sum cash in!$U:$U, col$I:$I, date_header)'],
              ['[AE] Sum Cash In', 'Upsell', 'SUMIFS(raw sum cash in!$V:$V, col$I:$I, date_header)'],
              ['[AE] Sum Cash In', 'Upgrade OD to All In', 'SUMIFS(raw sum cash in!$W:$W, col$I:$I, date_header)'],
              ['[AE] Sum Cash In', 'Pelunasan Zircon', 'SUMIFS(raw sum cash in!$X:$X, col$I:$I, date_header)'],
              ['[AE] Sum Cash In', 'Promo Tambahan', 'SUMIFS(rawdata_promo!$T:$T, rawdata_promo!$H:$H, date, rawdata_promo!$U:$U, "Promo Tambahan")'],
              ['[AE] Sum Cash In', 'Target Upsell (non-Feb)', 'SUMIFS(raw sum cash in!$AP:$AP, col$I:$I, date_header)'],
              ['[AE] Sum Cash In', 'Target Upsell (Februari)', 'SUMIFS(target dinamis!$AM:$AM, target dinamis!$AI:$AI, date_header)'],
              ['[AE] Sum Cash In', 'Target Zircon (non-Feb)', 'SUMIFS(raw sum cash in!$AR:$AR, col$I:$I, date_header)'],
              ['[AE] Sum Cash In', 'Target Zircon (Februari)', 'SUMIFS(target dinamis!$AT:$AT, target dinamis!$AP:$AP, date_header)'],
              ['[AE] Sum Refund', 'Target Refund', '3% x Cash In hari tersebut'],
              ['[AE] Sum Refund', '% Refund to Cash In', 'Actual Refund / Cash In'],
              ['[AE] Cash-in Cohort', 'M0', 'Cash masuk di bulan yang sama dengan bulan akuisisi pasien'],
              ['[AE] Cash-in Cohort', 'M1', 'Cash masuk 1 bulan setelah bulan akuisisi'],
              ['[AE] Cash-in Cohort', '% Cash Received', 'Total Cash Received / Total Nominal Acquisition'],
              ['[AE] Perubahan TP', '% Perubahan TP', 'Total Perubahan TP / Total Px Single Implan (bulanan)']
            ]
          },
          {
            type: 'alert', level: 'warn',
            html: '<strong>Grouping DP:</strong> Semua raw data di <code>raw sum cash in</code> dibagi ke dua baris per tanggal -- <code>DP&lt;30%</code> dan <code>DP 30%UP</code> (col D). Formula SUMIFS mengfilter per grouping ini untuk split reporting.'
          }
        ]
      },
      'Output Data': {
        blocks: [
          { type: 'heading', text: 'Output Dashboard -- 5 Sheet Utama' },
          {
            type: 'table',
            columns: ['Sheet', 'Isi / Fungsi', 'Granularitas', 'KPI Tracked'],
            rows: [
              ['[AE] Sum Cash In', 'Dashboard utama AE -- monitoring cash collection harian per program', 'Harian (kolom = tanggal)', 'Aktual Bayar, Nominal Tagih, % Ach, Pasien Terjadwal, Upsell, Upgrade OD to All In, Pelunasan Zircon, Carenow/P2P, Promo Tambahan'],
              ['[AE] Sum Refund', 'Monitoring refund -- quantity, nominal, % ke cash in, breakdown alasan', 'Harian', '% Refund to Cash In (target max 3%), Medis vs Non-Medis, Lanjut vs Tidak Lanjut'],
              ['[AE] Cash-in Cohort (Planned Order)', 'Analisis cohort pembayaran per acquisition month', 'Bulanan', 'DP%, M0%, M1%, M2%, M3%, % Cash Received, % Outstanding -- split DP<30% vs DP30%UP'],
              ['[On Progress] [AE] Leads', 'Status real-time pasien yang belum fully convert', 'Harian', 'CONVERT (M0-M3), BELUM CONVERT (REFUND/SCHEDULED/EXTERNAL) -- target DP<30%: Rp 1M, DP30%: Rp 450jt'],
              ['[AE] Perubahan TP', 'Monitoring perubahan treatment plan pasien existing', 'Bulanan + weekly filter', '% Perubahan TP, 10 kategori perubahan, status pasien saat TP berubah']
            ]
          }
        ]
      }
    },

    // DASHBOARD & LAPORAN
    'Dashboard & Laporan': {
      'Laporan Rutin': {
        blocks: [
          { type: 'heading', text: 'Laporan Rutin AE ' + bUp },
          {
            type: 'table',
            columns: ['Laporan', 'Frekuensi', 'Isi', 'Audience'],
            rows: [
              ['Daily Cash In Update', 'Harian', 'Aktual Bayar vs Target, gap per program (Terjadwal, Upsell, Zircon, Promo)', 'SPV AE, Leader'],
              ['Weekly Retention Recap', 'Mingguan', 'MTD achievement per program, % Refund, On Progress status, TP changes', 'Leader, Growth Manager'],
              ['Monthly Cohort Review', 'Bulanan', '% M0-M3 per acquisition month, outstanding trend, DP grouping performance', 'Leader, Finance, Management']
            ]
          }
        ]
      },
      Dashboard: {
        blocks: [
          { type: 'heading', text: 'Dashboard ' + bUp + ' Retention' },
          {
            type: 'text',
            html: '<div style="display:flex;gap:10px;flex-wrap:wrap;">'
              + (bc.dashUrl && !bc.dashUrl.includes('_ID')
                ? '<a href="' + bc.dashUrl + '" target="_blank" style="display:inline-flex;flex-direction:column;gap:4px;padding:14px 18px;background:var(--sur);border:1.5px solid var(--bor);border-radius:12px;text-decoration:none;color:var(--t1);box-shadow:var(--shadow-sm);min-width:200px;max-width:300px;transition:border-color .15s;" onmouseover="this.style.borderColor=\'#15803d\'" onmouseout="this.style.borderColor=\'\'">' +
                '<span style="font-size:10px;text-transform:uppercase;letter-spacing:.6px;color:#94a3b8;font-weight:600;">&#128202; Google Sheets</span>' +
                '<span style="font-weight:700;font-size:13.5px;">' + bc.dashName + '</span>' +
                '<span style="font-size:11.5px;color:#64748b;">Retention dashboard ' + bUp + ' ↗</span></a>'
                : '<span style="font-size:12px;color:#94a3b8;padding:8px 0;">&#128279; URL dashboard belum tersedia</span>')
              + (bc.trackerUrl && !bc.trackerUrl.includes('_ID')
                ? '<a href="' + bc.trackerUrl + '" target="_blank" style="display:inline-flex;flex-direction:column;gap:4px;padding:14px 18px;background:var(--sur);border:1.5px solid var(--bor);border-radius:12px;text-decoration:none;color:var(--t1);box-shadow:var(--shadow-sm);min-width:200px;max-width:300px;transition:border-color .15s;" onmouseover="this.style.borderColor=\'#ca8a04\'" onmouseout="this.style.borderColor=\'\'">' +
                '<span style="font-size:10px;text-transform:uppercase;letter-spacing:.6px;color:#94a3b8;font-weight:600;">&#128221; Google Sheets</span>' +
                '<span style="font-weight:700;font-size:13.5px;">' + bc.trackerName + '</span>' +
                '<span style="font-size:11.5px;color:#64748b;">Tracker FU harian AE ↗</span></a>'
                : '<span style="font-size:12px;color:#94a3b8;padding:8px 0;">&#128279; URL tracker belum tersedia</span>')
              + '</div>'
          }
        ]
      }
    },

    // KPI & METRICS
    'KPI & Metrics': {
      'KPI Utama': {
        blocks: [
          { type: 'heading', text: 'KPI Utama -- Tim AE ' + bUp },
          {
            type: 'table',
            columns: ['KPI', 'Definisi', 'Target / Benchmark', 'Sumber Data'],
            rows: [
              ['Aktual Bayar', 'Total cash yang berhasil dikumpulkan AE pada periode tersebut', 'Sesuai target harian/MTD di dashboard', 'raw sum cash in col N'],
              ['% Aktual Bayar to Target', 'Aktual Bayar / Target Nominal Tagih', 'Mendekati 100%', '[AE] Sum Cash In row 19'],
              ['Pasien Terjadwal', 'Jumlah pasien yang sudah punya jadwal tindakan ke depan -- pipeline AE', 'Sesuai target (col AO)', 'raw sum cash in col U'],
              ['Upsell', 'Revenue dari treatment tambahan yang berhasil di-close AE ke pasien existing', 'Sesuai target bulanan (col AP)', 'raw sum cash in col V'],
              ['Upgrade OD to All In', 'Pasien Overdenture yang di-upgrade ke paket All In', 'Sesuai target (col AQ)', 'raw sum cash in col W'],
              ['Pelunasan Zircon', 'Nominal pelunasan pasien hendak menerima mahkota zirkon -- wajib lunas sebelum tindakan', 'Sesuai target Zircon (col AR / target dinamis)', 'raw sum cash in col X'],
              ['Carenow / P2P Lending', 'Cash in dari pasien yang memilih skema pembiayaan P2P (Carenow, Indodana, dll.)', 'Monitored', '[AE] Sum Cash In section Carenow'],
              ['Promo Tambahan', 'Nominal pembayaran dari campaign promo khusus ke pasien existing', 'Sesuai target (col AS)', 'rawdata_promo dari Retention Tracker FU'],
              ['% Refund to Cash In', 'Actual Refund / Total Cash In (TC + AE)', 'Target max 3%', '[AE] Sum Refund row 12'],
              ['% Perubahan TP', 'Total Perubahan TP / Total Px Single Implan (per bulan)', 'Monitored (trend)', '[AE] Perubahan TP'],
              ['%M0', 'Pasien yang bayar di bulan yang sama dengan akuisisi', 'Monitored per cohort', '[AE] Cash-in Cohort col J'],
              ['% Outstanding', 'Sisa belum terbayar / total nominal acquisition per cohort', 'Trend turun = baik', '[AE] Cash-in Cohort col R']
            ]
          }
        ]
      },
      'Target & Cara Ukur': {
        blocks: [
          { type: 'heading', text: 'Cara Ukur & Catatan Penting' },
          {
            type: 'steps',
            items: [
              {
                title: 'Aktual Bayar -- Split DP Grouping',
                desc: 'Semua cash in di-split ke dua bucket: DP<30% dan DP 30%UP. Reporting dan target juga terpisah per bucket. AE menggunakan program FU berbeda untuk tiap bucket.',
                note: 'DP<30% = risiko lebih tinggi, butuh program intensif (Blast Zircon, Promo). DP 30%UP = lebih committed, FU New Pasien'
              },
              {
                title: 'Cohort M0-M3+: Apa Artinya?',
                desc: 'M0 = pasien bayar di bulan yang sama dengan bulan akuisisi deal. M1 = bayar 1 bulan setelah akuisisi. M2, M3, M3+ = semakin lama, semakin susah di-collect. Not Found = tidak bisa di-match ke cohort manapun.',
                note: 'Semakin besar %M0 = semakin sehat pipeline AE -- pasien bayar cepat tanpa perlu FU berulang'
              },
              {
                title: 'Refund: Medis vs Non-Medis, Lanjut vs Tidak Lanjut',
                desc: 'Refund dikategorikan 2 dimensi: (1) Alasan -- Medis (kondisi medis, perubahan TP, alasan pribadi) vs Non-Medis (kendala layanan, review, dll). (2) Kelanjutan -- Tanam Lanjut (pasien tetap tindakan setelah refund partial) vs Tidak Lanjut (pasien keluar sepenuhnya).',
                note: 'Refund Tanam Tidak Lanjut Non-Medis = kasus paling berat, indikasi masalah layanan'
              },
              {
                title: 'On Progress Leads: CONVERT vs BELUM CONVERT',
                desc: 'CONVERT = pasien sudah bayar (masuk M0/M1/M2/M3). BELUM CONVERT = pasien belum bayar, dibagi: SCHEDULED (ada jadwal), PENDING (perlu FU atau TP change), EXTERNAL (di luar kendali AE -- Comfee, DP Drop, No Response). REFUND = diproses.',
                note: 'Target: DP<30% = Rp 1M total, DP 30%UP = Rp 450jt'
              },
              {
                title: 'Perubahan TP: Denominator = Pasien Single Implan',
                desc: '% Perubahan TP = Total Pasien yang TP-nya berubah / Total Pasien Single Implan aktif di bulan tersebut. % tinggi bisa indikasi assessment awal kurang akurat.',
                note: 'Dashboard filter by Month + Year, tampil MTD + weekly (W1-W5)'
              }
            ]
          }
        ]
      },
      'Kamus Metrics': {
        blocks: [
          { type: 'heading', text: 'Kamus Metrics Retention \u2014 Definisi, Source & Cara Hitung' },
          { type: 'alert', level: 'info', html: 'Semua metric Retention di-split berdasarkan <strong>DP Grouping (DP&lt;30% vs DP 30%UP)</strong>. Target, program FU, dan shortcall berbeda per bucket. Pastikan kamu selalu lihat angka <em>per bucket</em>, bukan hanya total.' },
          {
            type: 'table',
            columns: ['Metric', 'Definisi Singkat', 'Cara Hitung', 'Source Data'],
            rows: [
              ['Aktual Bayar', 'Total cash yang berhasil dikumpulkan AE (split DP<30% & 30%UP)', 'SUM(cash in per bucket)', 'raw sum cash in col N'],
              ['% Aktual Bayar to Target', 'Realisasi cash in vs target nominal tagih', 'Aktual / Target × 100%', '[AE] Sum Cash In row 19'],
              ['Pasien Terjadwal', 'Pasien aktif dengan jadwal tindakan ke depan', 'COUNT(pasien berjadwal)', 'raw sum cash in col U'],
              ['Upsell', 'Revenue treatment tambahan yang di-close AE ke pasien existing', 'SUM(nominal upsell)', 'raw sum cash in col V'],
              ['Upgrade OD to All In', 'Pasien OD yang berhasil di-upgrade ke paket All In', 'COUNT(upgrade berhasil)', 'raw sum cash in col W'],
              ['Pelunasan Zircon', 'Nominal pelunasan sebelum mahkota zirkon dipasang', 'SUM(nominal lunas zirkon)', 'raw sum cash in col X'],
              ['Carenow / P2P Lending', 'Cash in dari platform pembiayaan P2P', 'SUM(nominal P2P)', '[AE] Sum Cash In Carenow'],
              ['Promo Tambahan', 'Cash in dari campaign promo khusus pasien existing', 'SUM(nominal promo)', 'rawdata_promo Retention Tracker FU'],
              ['% Refund to Cash In', 'Total refund / total cash in (TC+AE)', 'Refund / Cash In × 100% — target ≤ 3%', '[AE] Sum Refund row 12'],
              ['% Perubahan TP', 'Pasien TP berubah / total pasien Single Implan', 'PTP / Single Implan × 100%', '[AE] Perubahan TP sheet'],
              ['%M0', 'Pasien bayar di bulan akuisisi — leading health indicator', 'Bayar M0 / Total akuisisi × 100%', '[AE] Cash-in Cohort col J'],
              ['Cohort M1-M3+', 'Pasien bayar 1-3+ bulan setelah akuisisi', 'COUNT per cohort per bucket', '[AE] Cash-in Cohort'],
              ['% Outstanding', 'Sisa piutang / total nominal akuisisi per cohort', 'Outstanding / Total Akuisisi × 100%', '[AE] Cash-in Cohort col R'],
              ['DP Grouping', 'Segmentasi DP<30% vs DP 30%UP — fondasi sistem FU AE', 'IF(DP/Deal < 30%, DP<30%, DP 30%UP)', 'CRM / Retention Tracker FU'],
              ['On Progress Leads', 'Pasien deal belum lunas — pipeline aktif AE (CONVERT vs BELUM CONVERT)', 'COUNT per status + DP bucket', 'Retention Tracker FU + raw leads']
            ]
          },
          { type: 'heading', text: 'Detail Per Metric' },
          { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">💰 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Aktual Bayar</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Total cash yang berhasil dikumpulkan AE pada suatu periode (harian / MTD / bulanan).</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Metrik utama performa AE. Bukan hanya nominal — di-split ke dua bucket: DP&lt;30% dan DP 30%UP, karena program FU dan target berbeda per bucket. Aktual Bayar = cash in yang sudah benar-benar masuk, bukan janji bayar.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\">SUM(nominal cash in yang terbayar per periode, split per DP grouping)</code></span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>raw sum cash in col N → [AE] Sum Cash In → Retention Dashboard</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>Retention Dashboard (baris aktual vs target), daily recap AE, laporan mingguan Leader</span></div></div>' },
            { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">📊 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">% Aktual Bayar to Target</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Persentase realisasi cash in AE terhadap target nominal tagih pada periode yang sama.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Indikator pencapaian utama AE. Target ditetapkan per bucket (DP&lt;30% dan DP 30%UP) di dashboard. Nilai mendekati 100% = on track. Di bawah 80% = perlu intervensi SPV. Di atas 100% = overperform.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\">Aktual Bayar / Target Nominal Tagih × 100%</code></span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>[AE] Sum Cash In row 19 → Retention Dashboard</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>Retention Dashboard, performance review AE, laporan mingguan VP Growth</span></div></div>' },
            { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">📅 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Pasien Terjadwal</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Jumlah pasien yang sudah memiliki jadwal tindakan ke depan — pipeline aktif AE.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Pasien terjadwal = sudah ada commitment waktu tindakan. Ini adalah leading indicator untuk cash in berikutnya. AE wajib memantau pasien terjadwal agar tidak no-show dan cicilan tetap berjalan.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\">COUNT(pasien aktif dengan jadwal tindakan ke depan di Simplybook / pipeline AE)</code></span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>raw sum cash in col U → Retention Dashboard</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>Retention Dashboard, monitoring pipeline AE harian</span></div></div>' },
            { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">⬆️ METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Upsell</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Revenue dari treatment tambahan yang berhasil di-close AE ke pasien existing (di luar deal awal).</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>AE memiliki peran upsell: menawarkan treatment tambahan (crown tambahan, whitening, dll.) ke pasien yang sudah dalam program. Upsell dicatat terpisah dari cash in cicilan. Target upsell ditetapkan bulanan per AE.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\">SUM(nominal deal upsell yang berhasil di-close oleh AE pada periode)</code></span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>raw sum cash in col V → Retention Dashboard</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>Retention Dashboard, KPI AE bulanan, laporan revenue tambahan</span></div></div>' },
            { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">🔼 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Upgrade OD to All In</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Jumlah pasien Overdenture (OD) yang berhasil di-upgrade AE ke paket All In.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Upgrade OD → All In adalah upsell dengan nilai tertinggi. Pasien yang awalnya memilih OD (implan partial) di-convert ke All In (implan full). AE membutuhkan product knowledge kuat dan momen yang tepat saat pasien sudah merasa puas dengan implan awal.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\">COUNT(pasien OD yang deal upgrade ke All In pada periode)</code></span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>raw sum cash in col W → Retention Dashboard</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>Retention Dashboard, KPI upsell AE, analisis revenue mix</span></div></div>' },
            { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">💎 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Pelunasan Zircon</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Nominal pelunasan yang dibayar pasien sebelum menerima mahkota zirkon — syarat tindakan mahkota.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Mahkota zirkon hanya bisa dipasang jika pasien sudah lunas. AE mendorong pelunasan melalui program Blast Zircon. Metric ini sangat time-sensitive: jika zirkon sudah jadi tapi belum lunas, ada biaya penyimpanan dan risiko estetik. Target dinamis sesuai jadwal mahkota siap.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\">SUM(nominal pelunasan zirkon yang terbayar pada periode) — target di col AR dashboard</code></span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>raw sum cash in col X → Retention Dashboard</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>Retention Dashboard (Blast Zircon section), shortcall harian AE</span></div></div>' },
            { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">🏦 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Carenow / P2P Lending</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Cash in dari pasien yang memilih skema pembiayaan P2P Lending (Carenow, Indodana, dll.).</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>P2P lending memungkinkan pasien mencicil ke platform, sementara klinik menerima pembayaran langsung dari platform. AE menawarkan ini sebagai solusi untuk pasien yang terkendala kemampuan bayar langsung. Dicatat terpisah karena timing penerimaan berbeda dengan cicilan langsung.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\">SUM(nominal yang masuk dari platform P2P per periode)</code></span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>[AE] Sum Cash In section Carenow → Retention Dashboard</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>Retention Dashboard, tracking instrumen pembiayaan, laporan Finance</span></div></div>' },
            { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">🎁 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Promo Tambahan</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Nominal pembayaran dari campaign promo khusus yang ditawarkan AE ke pasien existing.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Program FU kedua AE (selain Blast Zircon). Target: pasien existing yang masuk bucket promo tertentu. Campaign bisa berupa diskon cicilan, bonus treatment, atau bundling. Dicatat di Retention Tracker FU sheet Shortcall Promo Tambahan. Target ditetapkan di col AS dashboard.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\">SUM(nominal promo yang berhasil di-collect dari pasien promo aktif pada periode)</code></span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>rawdata_promo dari Retention Tracker FU → Retention Dashboard</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>Retention Dashboard, evaluasi efektivitas campaign promo</span></div></div>' },
            { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">🔄 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">% Refund to Cash In</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Persentase total refund terhadap total cash in (gabungan TC + AE) pada periode yang sama.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Target maksimal 3%. Melebihi 3% = indikasi masalah serius di kualitas layanan, assessment, atau ekspektasi pasien. Refund dikategorikan: (1) Alasan — Medis vs Non-Medis; (2) Kelanjutan — Tanam Lanjut vs Tidak Lanjut. Kasus terberat: Non-Medis + Tidak Lanjut (pasien keluar sepenuhnya karena masalah layanan).</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\">Total Refund / Total Cash In (TC + AE) × 100% — target ≤ 3%</code></span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>[AE] Sum Refund row 12 → Retention Dashboard</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>Retention Dashboard, laporan Finance, eskalasi ticketing.rata.id</span></div></div>' },
            { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">📋 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">% Perubahan Treatment Plan (% PTP)</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Persentase pasien yang mengalami perubahan treatment plan terhadap total pasien Single Implan aktif pada bulan tersebut.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>% PTP tinggi bisa indikasi assessment awal di Conversion kurang akurat, atau kondisi medis pasien berubah setelah tindakan. Ada 10 kategori alasan PTP. AE mencatat dan memasukkan ke dashboard. Denominator: pasien Single Implan (bukan All In atau OD).</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\">COUNT(pasien TP berubah pada bulan) / COUNT(total pasien Single Implan aktif bulan tersebut) × 100%</code></span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>[AE] Perubahan TP sheet → Retention Dashboard (filter Month + Year)</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>Retention Dashboard, evaluasi kualitas assessment Conversion, laporan mingguan Leader</span></div></div>' },
            { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">⚡ METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">%M0 (Cohort M0)</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Persentase pasien yang melakukan pembayaran di bulan yang sama dengan bulan akuisisi deal.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>%M0 adalah indikator kesehatan pipeline paling kuat untuk AE. M0 tinggi = pasien committed, cash in cepat, AE tidak perlu FU panjang. %M0 rendah bisa berarti: kualitas deal dari TC rendah, pasien tidak siap bayar, atau FU AE lemah di awal onboarding.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\">COUNT(pasien bayar di bulan akuisisi) / COUNT(total deal akuisisi bulan tersebut) × 100%</code></span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>[AE] Cash-in Cohort col J → Retention Dashboard</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>Retention Dashboard (Cohort section), evaluasi kualitas lead handover dari TC</span></div></div>' },
            { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">📆 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">Cohort M1 / M2 / M3 / M3+</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Pasien yang melakukan pembayaran 1, 2, 3, atau lebih dari 3 bulan setelah bulan akuisisi deal.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Semakin besar angka M = semakin lama AE menunggu cash in = semakin tinggi effort FU. M3+ adalah kasus berat yang membutuhkan program promo khusus. Not Found (NF) = pasien tidak bisa di-match ke cohort manapun, indikasi data mismatch. Target: distribusi M0 besar, M3+ minimal.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\">COUNT(pasien bayar di bulan ke-N setelah akuisisi) per cohort bulan akuisisi</code></span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>[AE] Cash-in Cohort → Retention Dashboard (baris M1, M2, M3, M3+, NF)</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>Retention Dashboard (Cohort section), analisis aging receivable, prioritas program FU</span></div></div>' },
            { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">📉 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">% Outstanding</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Persentase sisa nominal yang belum terbayar dari total nominal akuisisi per cohort.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>Melacak berapa besar piutang yang masih outstanding per cohort. Trend turun dari bulan ke bulan = sehat (piutang terkikis). Trend stagnan atau naik = ada pasien yang tidak membayar cicilan sesuai jadwal. Dimonitor per DP grouping karena karakteristik berbeda.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\">Sisa Belum Terbayar / Total Nominal Akuisisi Cohort × 100% — dashboard col R</code></span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>[AE] Cash-in Cohort col R → Retention Dashboard</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>Retention Dashboard, analisis aging, forecast cash in berikutnya</span></div></div>' },
            { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">🗂️ METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">DP Grouping (DP&lt;30% vs DP 30%UP)</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Segmentasi pasien AE berdasarkan persentase DP yang dibayar saat deal — di bawah 30% atau minimal 30%.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>DP Grouping adalah fondasi seluruh sistem FU AE. DP&lt;30%: risiko lebih tinggi, butuh program intensif (Blast Zircon + Promo Tambahan). DP 30%UP: lebih committed, FU via program New Pasien. Target, reporting, dan dashboard dibagi per bucket ini. Semua metric utama di-split berdasarkan DP Grouping.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\">DP Grouping = IF(nominal DP / nominal deal total &lt; 30%, &#39;DP&lt;30%&#39;, &#39;DP 30%UP&#39;)</code></span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Dynamic CRM / TC input → Retention Tracker FU → Retention Dashboard</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>Seluruh Retention Dashboard, program shortcall Blast Zircon / Promo / New Pasien, target harian AE</span></div></div>' },
            { type: 'text', html: '<div style=\"background:var(--b3,rgba(0,0,0,.04));border-left:4px solid var(--act);border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:6px;\"><div style=\"font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t3);font-weight:600;margin-bottom:8px;\">🔍 METRIC</div><h3 style=\"font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);\">On Progress Leads (OPL)</h3><div style=\"display:grid;grid-template-columns:140px 1fr;gap:8px 16px;font-size:13px;line-height:1.6;\"><span style=\"color:#64748b;font-weight:600;\">Definisi</span><span>Pasien yang sudah deal tapi belum lunas — total pipeline aktif AE, di-split per DP Grouping.</span><span style=\"color:#64748b;font-weight:600;\">Def. Bisnis</span><span>OPL dibagi dua status: CONVERT (sudah ada pembayaran masuk — M0/M1/M2/M3) dan BELUM CONVERT (belum ada pembayaran). BELUM CONVERT dibagi lagi: SCHEDULED (ada jadwal), PENDING (butuh FU atau TP change), EXTERNAL (di luar kendali AE: Comfee, DP Drop, No Response), REFUND. Target: DP&lt;30% = Rp 1M, DP 30%UP = Rp 450jt.</span><span style=\"color:#64748b;font-weight:600;\">Cara Hitung</span><span><code style=\"font-size:12px;background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;\">COUNT(pasien deal — belum fully paid) per DP Grouping + status substatus</code></span><span style=\"color:#64748b;font-weight:600;\">Source Data</span><span><strong>Retention Tracker FU + raw leads → Retention Dashboard (On Progress section)</strong></span><span style=\"color:#64748b;font-weight:600;\">Dipakai Di</span><span>Retention Dashboard, daily briefing AE, prioritas shortcall, forecast bulanan</span></div></div>' },
        ]
      }
    }

  };
}

// ══════════════════════════════════════════════════════════════════
//  DATA — Entry point utama. Semua brand + team terdaftar di sini.
// ══════════════════════════════════════════════════════════════════
const DATA = {

  meta: {
    lastUpdated: "4 Mei 2026"
    // Update tanggal ini setiap kali lo update konten
  },

  // ── PER BRAND ────────────────────────────────────────────────
  rata: {
    CS: _csBlocks('rata'),
    SCH: _schBlocks('rata'),
    Conversion: _convBlocks('rata'),
    Retention: _retentionBlocks('rata')
  },

  tanam: {
    CS: _csBlocks('tanam'),
    SCH: _schBlocks('tanam'),
    Conversion: _convBlocks('tanam'),
    Retention: _retentionBlocks('tanam')
  },

  vinir: {
    CS: _csBlocks('vinir'),
    SCH: _schBlocks('vinir'),
    Conversion: _convBlocks('vinir'),
    Retention: _retentionBlocks('vinir')
  },

  // ── ALL BRAND ─────────────────────────────────────────────────
  allbrand: {

    // ─────────────────────────────────────────────────────────────
    'Gambaran Umum': {
      blocks: [
        { type: 'heading', text: 'Growth Ops — Gambaran Umum' },
        {
          type: 'alert', level: 'info',
          html: '<strong>Growth Ops Analytics</strong> mengelola seluruh funnel akuisisi dan retensi pasien untuk tiga brand klinik gigi: <strong>RATA</strong> (clear aligner), <strong>TANAM</strong> (dental implant), dan <strong>VINIR</strong> (dental veneer). Tim Growth Ops terdiri dari empat sub-tim yang bekerja secara serial — output satu tim menjadi input tim berikutnya.'
        },
        {
          type: 'kpi',
          items: [
            { label: 'Brand', value: '3', note: 'RATA · TANAM · VINIR' },
            { label: 'Sub-Tim', value: '4', note: 'CS · SCH · Conversion · Retention (AE)' },
            { label: 'Ritme Laporan', value: 'Lintas Tim', note: 'CS (3x/hari) · SCH & TC (Harian) · AE (Harian/Realtime)' },
            { label: 'Platform Utama', value: 'Multi', note: 'WhatsApp · Simplybook · CRM · GSheets' }
          ]
        },

        { type: 'heading', text: 'Tiga Brand' },
        {
          type: 'table',
          columns: ['Brand', 'Produk', 'Ticket Size', 'Karakteristik Utama'],
          rows: [
            ['RATA', 'Clear Aligner', 'Rp 9–10 jt/case', 'Volume tinggi, digital-first, booking via DP 299rb. CS-heavy di awal funnel.'],
            ['TANAM', 'Dental Implant', 'Rp 28–30 jt/case', 'High-ticket, multi-session, AE-driven. Free Booking (tanpa DP). Butuh FU intensif post-deal.'],
            ['VINIR', 'Dental Veneer', 'Varies', 'Brand baru, kombinasi estetik. Pipeline sama dengan RATA/TANAM, masih tahap scaling.']
          ]
        },

        { type: 'heading', text: 'Struktur Tim Growth Ops' },
        {
          type: 'table',
          columns: ['Tim', 'Nama Lengkap', 'Input', 'Aktivitas Utama', 'Output / Handover'],
          rows: [
            ['CS', 'Customer Service', 'Lead masuk WA (dari iklan, organic, quiz)', 'Qualification, tagging HOT/WARM/NEED FU/GHOSTED/NP, push booking DP', 'Booking confirmed + DP tercatat di Dynamic CRM'],
            ['SCH', 'Scheduling', 'Booking confirmed dari CS', 'Konfirmasi jadwal, reminder H-1 & H-0, update pipeline dari Simplybook', 'Pasien hadir kunjungan konsultasi'],
            ['Conversion', 'Treatment Coordinator (TC)', 'Pasien hadir kunjungan', 'Konsultasi, presentasi TP, closing, input deal + DP acquisition', 'Deal confirmed + DP acquisition tercatat'],
            ['Retention', 'Account Executive (AE)', 'Deal dari Conversion', 'FU cicilan, pelunasan zirkon, upsell, 3 program promo, review refund', 'Cash in terjadwal, pelunasan, upsell tercatat di Retention Dashboard']
          ]
        },

        { type: 'heading', text: 'Funnel Metrics Lintas Tim' },
        {
          type: 'text',
          html: '<p>Setiap metrik di bawah memiliki owner tim yang jelas. Conversion rate antar stage adalah indikator kesehatan operasional yang dimonitor setiap hari.</p>'
        },
        {
          type: 'table',
          columns: ['Stage', 'Metrik', 'Owner Tim', 'Catatan'],
          rows: [
            ['Chat → Prospect', '%Chat to Prospect', 'CS', 'Dari total new/active chat, berapa yang jadi prospect (HOT/WARM/NEED FU)'],
            ['Prospect → Booking', '%Prospect to Deal (PD)', 'CS', 'Dari prospect, berapa yang konfirmasi booking dengan DP'],
            ['Booking → Visit', '%Booking to Visit', 'SCH', 'Dari booking confirmed, berapa yang hadir aktual kunjungan'],
            ['Visit → Buy', 'CR% (Conversion Rate)', 'Conversion', 'Buy / Visit. Metric paling utama TC. Target bervariasi per brand.'],
            ['Buy → Cash In', '%Lunas / Aktual Bayar', 'Retention', 'Dari deal yang ada, berapa yang terbayarkan sesuai jadwal'],
            ['Revenue', 'Performance (TC) + Cash In (AE)', 'Both', 'TC: revenue new deals. AE: total cash in collected.']
          ]
        },

        { type: 'heading', text: 'KPI Utama per Tim (Summary)' },
        {
          type: 'table',
          columns: ['Tim', 'KPI #1', 'KPI #2', 'KPI #3'],
          rows: [
            ['CS', 'Jumlah Booking', '% Prospect to Deal (PD)', 'Response Time < 5 mnt'],
            ['SCH', '% Booking to Visit', 'Cancel rate (seminimal mungkin)', 'Data pipeline up-to-date harian'],
            ['Conversion', 'CR% (Buy/Visit)', 'Basket Size', 'Performance (Revenue)'],
            ['Retention', 'Aktual Bayar vs Target', '% Refund to Cash In < 3%', 'Cohort %M0 (bayar bulan yang sama)']
          ]
        },

        { type: 'heading', text: 'Tools & Sistem Utama (Lintas Tim)' },
        {
          type: 'table',
          columns: ['Tool / Sistem', 'Digunakan Tim', 'Fungsi'],
          rows: [
            ['WhatsApp Business API (Infobip)', 'CS', 'Platform WA — semua chat masuk + laporan'],
            ['Dynamic CRM', 'CS, SCH', 'Input booking, tracking lead, history chat pasien'],
            ['Simplybook', 'SCH, Analyst', 'Booking system — export manual .xlsx untuk pipeline SCH'],
            ['[Growth] Sameday Data', 'CS, Analyst', 'Master template laporan harian lintas brand'],
            ['Google Colab (Python)', 'Analyst', 'Pengolahan raw data 3x/hari — new chat, attribution, prospect'],
            ['[Dapur] Tarikan Infobip', 'CS, Analyst', 'Hasil preprocessing CRM per brand — sheet OK sebagai referensi prospect'],
            ['[BRAND] Retention Dashboard', 'Retention (AE)', 'Dashboard cash in, refund, cohort, on progress leads, perubahan TP'],
            ['Retention Tracker FU', 'Retention (AE)', 'Tool operasional harian AE — input shortcall 3 program FU'],
            ['[BRAND] Conversion Dashboard', 'Conversion (TC)', 'Dashboard CR%, TC performance, by clinic, new dealing comparison'],
            ['Barantum', 'CS (TANAM)', 'CDR log telepon CS — ANSWERED/NO ANSWER/FAILED']
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    'Dashboard Growth': {
      // Override: konten diambil dari DASHBOARD_BLOCKS (dashboard_data.js)
      // Lihat renderSection() di index_v2.html
      blocks: []
    },

    // ─────────────────────────────────────────────────────────────
    'Data Flow Antar Tim': {
      blocks: [
        { type: 'heading', text: 'Data Flow Antar Tim — Gambaran Umum' },
        {
          type: 'alert', level: 'info',
          html: 'Data di Growth Ops mengalir secara <strong>serial</strong> — setiap tim mengkonsumsi output tim sebelumnya dan menghasilkan input untuk tim berikutnya. Semua data saat ini berbasis Google Sheets dengan kombinasi IMPORTRANGE, pipeline Python manual, dan upload .xlsx.'
        },

        { type: 'heading', text: 'Diagram Alur Data End to End' },
        {
          type: 'diagram',
          code: `flowchart TD
  subgraph SRC ["Sumber Eksternal"]
    ADS["Meta / TikTok Ads\\n+ Organic + Quiz"]
    INFOBIP["Infobip API\\n(WA Business)"]
    BARANTUM["Barantum\\n(CDR Telepon)"]
    SB["Simplybook\\n(Booking System)"]
    DYN["Dynamic CRM"]
  end

  subgraph CS_LAYER ["CS — Qualification & Booking"]
    COLAB["Google Colab Python\\n3x/hari: new chat,\\nattribution S1/S2/S3,\\nprospect tracking"]
    SAMEDAY["[Growth] Sameday Data\\n+ [BRAND] Sameday Template"]
    DAPUR["[Dapur] Tarikan Infobip\\n(sheet: OK — prospect aktif)"]
    CS_KPI["CS Dashboard\\nProspect · Booking · Resp Time · Tag"]
  end

  subgraph SCH_LAYER ["SCH — Scheduling & Visit"]
    SB_EXP["Simplybook Export\\n(.xlsx manual — Tim Analyst)"]
    GROWTH_MU["[GROWTH] Manual Update Simplybook\\n(sheet: Worksheet)"]
    DAPUR_SCH["[DAPUR] BRAND SCH\\nScheduled & Visit"]
    SCH_DASH["[BRAND] Scheduling Dashboard\\n(sheet: Scheduled & Visit)"]
  end

  subgraph CONV_LAYER ["Conversion — TC Closing"]
    CONV_LIST["[BRAND] Conversion List\\n(sheet: Database Pasien)"]
    CONV_DASH["[BRAND] Conversion Dashboard\\nCR% · TC Perf · Clinic · New Dealing"]
  end

  subgraph RET_LAYER ["Retention — AE Collection"]
    TRACKER["Retention Tracker FU\\n(Input Data Productivity)\\nShortcall 3 program"]
    RAW_SUM["raw sum cash in\\n(IMPORTRANGE dari external GSheet)\\nNominal Tagih + Aktual per hari"]
    RET_DASH["[BRAND] Retention Dashboard\\nSum Cash In · Refund · Cohort\\nOn Progress · Perubahan TP"]
  end

  ADS --> INFOBIP
  INFOBIP -->|"Export manual 3x/hari\\nDetailled + Conversations + People"| COLAB
  BARANTUM -->|"CDR Export manual"| COLAB
  COLAB --> SAMEDAY
  COLAB --> DAPUR
  SAMEDAY --> CS_KPI
  DAPUR --> CS_KPI
  DYN -->|"Input CS"| CS_KPI

  SB -->|"Export .xlsx\\nTim Analyst harian"| SB_EXP
  SB_EXP --> GROWTH_MU
  CS_KPI -->|"Booking confirmed"| DYN
  DYN --> GROWTH_MU
  GROWTH_MU --> DAPUR_SCH
  DAPUR_SCH --> SCH_DASH

  SCH_DASH -->|"IMPORTRANGE"| CONV_LIST
  CONV_LIST --> CONV_DASH

  CONV_DASH -->|"Deal confirmed"| TRACKER
  TRACKER -->|"IMPORTRANGE rawdata_promo"| RET_DASH
  RAW_SUM -->|"IMPORTRANGE raw sum"| RET_DASH`
        },

        { type: 'heading', text: 'Handover Antar Tim — Kriteria & Mekanisme' },
        {
          type: 'table',
          columns: ['Handover', 'Trigger', 'Mekanisme', 'Data yang Dipindah'],
          rows: [
            ['CS → SCH', 'Booking confirmed + DP tercatat', 'CS input di Dynamic CRM, SCH baca dari pipeline Simplybook + CRM', 'Nama, nomor, tanggal booking, klinik, tipe booking (FB/DP)'],
            ['SCH → Conversion', 'Pasien hadir aktual di klinik', 'Simplybook mencatat kunjungan → masuk pipeline DAPUR → Conversion List', 'Visit date, klinik, nama pasien, jenis kelamin, status kunjungan'],
            ['Conversion → Retention', 'Deal confirmed + DP acquisition input', 'TC input di CRM/GSheet → masuk raw leads AE → Retention Tracker', 'Nominal deal, DP%, tanggal deal, nama pasien, jadwal cicilan'],
            ['Retention → Finance', 'Approval refund atau pelunasan zirkon', 'AE review → eskalasi ke Finance via ticketing.rata.id', 'Nominal refund, kategori (medis/non-medis), lanjut/tidak lanjut']
          ]
        },

        { type: 'heading', text: 'IMPORTRANGE Dependency Map' },
        {
          type: 'table',
          columns: ['File Sumber', 'Sheet', 'File Tujuan', 'Sheet Tujuan', 'Tim Pemilik'],
          rows: [
            ['[Dapur] Tarikan Infobip BRAND', 'Pagi (col A, col U)', 'CS Dashboard BRAND', 'Prospek Infobip', 'CS / Analyst'],
            ['CS Dashboard BRAND', 'prospect_cal col I', 'Growth New Dashboard', 'prospek_brand', 'CS / Analyst'],
            ['Simplybook / [GROWTH] Manual Update', 'Worksheet', '[DAPUR] BRAND SCH', 'raw internal', 'SCH / Analyst'],
            ['[DAPUR] BRAND SCH', 'raw internal', '[BRAND] Scheduling Dashboard', 'Scheduled & Visit', 'SCH'],
            ['Scheduling Dashboard BRAND', 'Database Pasien / CONV output', '[BRAND] Conversion List', 'Database Pasien', 'TC'],
            ['External GSheet raw sum', 'raw sum!A2:Z', '[BRAND] Retention Dashboard', 'raw sum cash in', 'AE / Analyst'],
            ['Retention Tracker FU BRAND', 'Input Data Productivity', '[BRAND] Retention Dashboard', 'rawdata_promo', 'AE'],
            ['CoE Pipeline / raw leads', 'planned order', '[BRAND] Retention Dashboard', 'raw leads / AE Leads', 'AE / Analyst']
          ]
        },

        { type: 'heading', text: 'Laporan Harian — Jadwal & Trigger' },
        {
          type: 'table',
          columns: ['Run', 'Waktu', 'Timeframe Data', 'Output Utama', 'Audience'],
          rows: [
            ['Pagi', '~07:00 WIB', '00:00 kemarin s.d. 23:59 kemarin', 'Full day kemarin — seen rate, blast analysis (TANAM), filter DJI/Sky', 'SPV CS, Leader Sales, Tim TANAM'],
            ['Siang', '~13:00 WIB', '00:00 hari ini s.d. 13:00', 'Shift pagi — attribution S1/S2/S3, queue, tags, resp time', 'Marketing, CS, Leader'],
            ['Sore', '~17:00 WIB', '00:00 hari ini s.d. 17:00', 'Sama dengan siang, data lebih lengkap', 'Marketing, CS, Leader'],
            ['On-demand', 'Tidak rutin', 'Varies', 'Preprocessing CRM Infobip per brand (tarikan prospek)', 'Analyst']
          ]
        },

        { type: 'heading', text: 'Pipeline Python — Notebook Inventory' },
        {
          type: 'table',
          columns: ['Notebook', 'Fungsi', 'Frekuensi', 'Output Sheet'],
          rows: [
            ['daily_report_sore.ipynb', 'Pipeline utama — new chat, detail chat, attribution, resp time, lokasi', '3x/hari', 'today_new_chat, newchat_rata/tanam/vinir, detail chat, agent_tanam'],
            ['daily_report_Tarik_Active.ipynb', 'Tracking active prospect per brand + lokasi TANAM', '3x/hari', 'active_tanam_loc, active_rata, active_vinir'],
            ['daily_report_Tarik_Prospek.ipynb', 'Enrichment prospek TANAM + response time analysis', '3x/hari', 'prospek_tanam enriched'],
            ['preprocessing_tarikan_infobip_rata.ipynb', 'Cleansing CRM data RATA dari Infobip (People export)', 'On-demand', '[Dapur] Tarikan Infobip RATA — sheet OK'],
            ['preprocessing_tarikan_infobip_tanam.ipynb', 'Cleansing CRM data TANAM dari Infobip', 'On-demand', '[Dapur] Tarikan Infobip TANAM — sheet OK'],
            ['preprocessing_tarikan_infobip_vinir.ipynb', 'Cleansing CRM data VINIR dari Infobip', 'On-demand', '[Dapur] Tarikan Infobip VINIR — sheet OK']
          ]
        },

        { type: 'heading', text: 'Technical Debt & Known Issues' },
        {
          type: 'alert', level: 'warn',
          html: 'Issues di bawah adalah bottleneck operasional aktif. Semua masih berbasis proses manual dan rawan human error.'
        },
        {
          type: 'table',
          columns: ['Issue', 'Dampak', 'Status'],
          rows: [
            ['prev_chat di-append manual setiap hari', 'Rawan human error → new chat bisa inflated jika lupa append', 'Ongoing'],
            ['Nama file hardcoded di Python script', 'Script error jika nama file tidak sesuai format tanggal', 'Ongoing'],
            ['Queue & Tags tidak bisa dihasilkan Python', 'Harus di-copy manual dari Conversations setiap run', 'Ongoing'],
            ['Format nomor telepon scientific notation di Excel', 'Nomor tidak bisa di-match antar tabel — harus diubah manual', 'Ongoing'],
            ['Dedup inconsistency antar brand', 'RATA sort ascending, TANAM sort descending — tidak terdokumentasi', 'Ongoing'],
            ['prev_chat 1.5M+ records di GSheet', 'Load sangat lambat, proses lambat, rawan crash', 'Ongoing'],
            ['Tidak ada data quality check otomatis', 'Anomali bisa lolos ke laporan tanpa terdeteksi', 'Ongoing'],
            ['Export Simplybook manual oleh Tim Analyst', 'Keterlambatan export = pipeline SCH tertinggal = dashboard tidak akurat', 'Ongoing']
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    'Business Process': {
      blocks: [
        { type: 'heading', text: 'Business Process — Patient Journey End to End' },
        {
          type: 'alert', level: 'info',
          html: 'Setiap pasien melewati 5 stage dari pertama kali mengenal brand hingga pelunasan biaya perawatan. Setiap stage dikelola oleh tim berbeda dengan KPI yang jelas.'
        },
        {
          type: 'steps',
          items: [
            {
              title: '1. Awareness & Lead In (Marketing → CS)',
              desc: 'Tim Marketing menjalankan paid ads di Meta dan TikTok, ditambah organic (DM IG, Quiz Smile Assessment). Semua lead yang tertarik menghubungi via WhatsApp. Sebelum sampai ke agen CS, chat difilter chatbot terlebih dahulu.',
              note: 'Volume lead = KPI Marketing, bukan CS. CS hanya bertanggung jawab atas handling dari chat yang sudah lolos filter.'
            },
            {
              title: '2. Qualification & Booking (CS)',
              desc: 'CS melakukan qualification: intent, kebutuhan perawatan, usia pasien (ada batasan produk per brand), kesiapan finansial. Setelah qualify, CS push booking dengan DP (RATA/VINIR: DP 299rb) atau Free Booking (TANAM). CS wajib memberi tag setelah setiap interaksi: HOT / WARM / NEED FU / GHOSTED / NO PROSPECT.',
              note: 'SLA respon < 5 menit. Booking confirmed = output utama CS. Input ke Dynamic CRM, handover ke SCH.'
            },
            {
              title: '3. Scheduling & Visit (SCH)',
              desc: 'SCH mengkonfirmasi jadwal kunjungan, melakukan reminder WA H-1 dan H-hari kunjungan. Data booking masuk dari Simplybook (export manual .xlsx → pipeline DAPUR) ke dashboard Scheduled & Visit. SCH memastikan pasien hadir.',
              note: 'Export Simplybook dilakukan Tim Analyst setiap hari kerja. Keterlambatan export = data pipeline tertinggal. Cancel rate dijaga seminimal mungkin.'
            },
            {
              title: '4. Consultation & Closing (Conversion — TC)',
              desc: 'TC (Treatment Coordinator) bertemu pasien saat kunjungan, melakukan konsultasi, menyampaikan treatment plan (TP), dan mendorong deal. Jika pasien tidak deal, TC mencatat alasan No Buy: Hard Loss (HL — 8 kategori) atau Soft Loss (SL — 7 kategori + 4 cause attribution: Pasien/TC/Dokter/Clinic). Output: deal confirmed + DP acquisition dicatat.',
              note: 'DP < 30% dari deal value = flag risiko cancel, diprioritaskan untuk FU intensif oleh AE. TC tidak terlibat setelah deal closed.'
            },
            {
              title: '5. Collection, Upsell & Pelunasan (Retention — AE)',
              desc: 'AE mengelola pasien post-deal: memastikan pembayaran cicilan terjadwal, mendorong pelunasan zirkon (wajib lunas sebelum tindakan mahkota), dan upsell ke produk tambahan. AE menjalankan 3 program FU harian via shortcall: (1) Blast Zircon — pasien DP<30% untuk pelunasan, (2) Promo Tambahan — campaign promo ke pasien existing, (3) New Pasien — FU pasien baru post-deal.',
              note: 'Refund diproses via: pasien lapor klinik → ticketing.rata.id → AE review (ada budget dari Finance) → Finance approve → input ke dashboard. Refund dikategorikan: Medis vs Non-Medis, Lanjut vs Tidak Lanjut.'
            }
          ]
        },

        { type: 'heading', text: 'Cohort Payment Model (Retention)' },
        {
          type: 'text',
          html: '<p>Cash in dari pasien diklasifikasikan berdasarkan <strong>bulan bayar vs bulan akuisisi deal</strong>. Ini adalah model cohort yang dipakai AE untuk mengukur kecepatan koleksi:</p>'
        },
        {
          type: 'table',
          columns: ['Cohort', 'Definisi', 'Interpretasi'],
      rows: [
        ['M0', 'Bayar di bulan yang sama dengan bulan akuisisi deal', '% M0 tinggi = pipeline sehat, pasien langsung bayar'],
      ['M1', 'Bayar 1 bulan setelah akuisisi', 'Masih relatif cepat — FU ringan'],
      ['M2', 'Bayar 2 bulan setelah akuisisi', 'Perlu FU aktif dari AE'],
      ['M3', 'Bayar 3 bulan setelah akuisisi', 'Perlu FU intensif — risiko gagal bayar meningkat'],
      ['M3+', 'Bayar > 3 bulan setelah akuisisi', 'Kasus berat — AE eskalasi program promo khusus'],
      ['Not Found', 'Tidak bisa di-match ke cohort manapun', 'Data mismatch — perlu investigasi']
          ]
        },

{ type: 'heading', text: 'DP Grouping — Segmentasi Pasien AE' },
{
  type: 'alert', level: 'warn',
    html: '<strong>Semua KPI Retention di-split menjadi dua bucket: DP&lt;30% dan DP 30%UP.</strong> Target, reporting, dan program FU berbeda per bucket. DP&lt;30% = risiko lebih tinggi, butuh program intensif (Blast Zircon, Promo Tambahan). DP 30%UP = lebih committed, FU via New Pasien.'
},

{ type: 'heading', text: 'Alur Kerja CS (Qualification & Booking)' },
{
  type: 'diagram',
    code: `flowchart LR
  A(["Chat Masuk\\n(Ads/Organic)"]) --> B["Chatbot Filter"]
  B --> C["Assign ke\\nAgen CS"]
  C --> D{"Qualification:\\nIntent & Usia?"}
  D -->|Tidak| E["Tag:\\nNO PROSPECT"]
  D -->|Ya| F{"Kesiapan\\nFinansial?"}
  F -->|Belum| G["Tag:\\nWARM / NEED FU"]
  F -->|Siap| H["Tag: HOT\\nPush Booking"]
  H --> I{"Deal Type?"}
  I -->|DP 299rb| J["Catat DP\\n+ Input CRM"]
  I -->|Free Booking| K["Input CRM"]
  J --> L(["Handover\\nke SCH"])
  K --> L`
},

{ type: 'heading', text: 'Alur Kerja SCH (Scheduling & Visit)' },
{
  type: 'diagram',
    code: `flowchart LR
  A(["Booking dari CS\\n(Simplybook)"]) --> B["SCH Konfirmasi\\nJadwal via WA"]
  B --> C{"Pasien\\nSetuju?"}
  C -->|Tidak| D["Reschedule"]
  D --> B
  C -->|Ya| E["Tunggu H-1"]
  E --> F["Kirim WA\\nReminder H-1"]
  F --> G["Kirim WA\\nReminder H-0"]
  G --> H{"Pasien\\nHadir?"}
  H -->|Cancel| I["Update Cancel\\nRate"]
  H -->|Hadir| J(["Pasien Visit\\nHandover ke TC"])`
},

{ type: 'heading', text: 'Alur Kerja Conversion / TC (Consultation & Closing)' },
{
  type: 'diagram',
    code: `flowchart TD
  A(["Pasien Visit"]) --> B["Konsultasi &\\nPresentasi TP"]
  B --> C{"Pasien Setuju\\n(Buy)?"}
  C -->|Tidak - No Buy| D{"Alasan?"}
  D -->|Permanen| E["Hard Loss (HL)\\n(8 Kategori)"]
  D -->|Sementara| F["Soft Loss (SL)\\n(7 Kategori)"]
  F --> G["Tentukan Cause:\\nPx/TC/Dokter/Clinic"]
  C -->|Ya - Buy| H["Input DP Acquisition\\nke CRM/GSheet"]
  H --> I["Update Upgrade Status\\n= Yes Upgrade"]
  I --> J{"Berapa DP?"}
  J -->|Kurang dari 30%| K["Flag: Risiko Tinggi"]
  J -->|Lebih dari 30%| L["Flag: Aman"]
  K --> M(["Handover ke AE\\n(Retention)"])
  L --> M`
},

{ type: 'heading', text: 'Alur Kerja Retention / AE (Collection & Upsell)' },
{
  type: 'diagram',
    code: `flowchart LR
  A(["Pasien Deal\\ndari TC"]) --> B{"Cek Status DP"}
  B -->|Kurang dari 30%| C["Program:\\nBlast Zircon"]
  B -->|Lebih dari 30%| D["Program:\\nNew Pasien FU"]
  A --> E["Program:\\nPromo Tambahan"]
  C --> F["Shortcall Harian"]
  D --> F
  E --> F
  F --> G["Input Hasil ke\\nTracker FU"]
  G --> H{"Ada Perubahan\\nTP / Refund?"}
  H -->|Refund| I["Review Budget\\nFinance"]
  H -->|Ubah TP| J["Input ke\\n[AE] Perubahan TP"]
  H -->|Bayar Normal| K["Update\\nAktual Bayar"]`
}
      ]
    },

// ─────────────────────────────────────────────────────────────
'Scope & Batasan Tim': {
  blocks: [
    { type: 'heading', text: 'Scope & Batasan Tim Growth Ops' },
    {
      type: 'alert', level: 'warn',
      html: '<strong>Setiap tim punya batas tanggung jawab yang jelas.</strong> Overlap atau ambiguitas scope adalah sumber friction terbesar dalam operasional — pastikan semua anggota tim memahami batas ini.'
    },

    { type: 'heading', text: 'Matriks Scope per Tim' },
    {
      type: 'table',
      columns: ['Tim', 'DALAM Scope (tanggung jawab penuh)', 'LUAR Scope (bukan tanggung jawab)'],
      rows: [
        [
          'CS',
          'Qualification lead WA, tagging HOT/WARM/NF/GHOSTED/NP, push booking DP atau FB, input booking ke Dynamic CRM, response time, seen rate, laporan harian 3x',
          'Volume lead masuk (Marketing), penjadwalan kunjungan (SCH), closing deal (TC), pembayaran cicilan (AE), kualitas treatment plan (Dokter)'
        ],
        [
          'SCH',
          'Konfirmasi jadwal, reminder WA H-1 dan H-0, export Simplybook (atau koordinasi Tim Analyst), update pipeline DAPUR, tracking Scheduled & Visit, cancel management',
          'Kualitas lead dari CS, closing deal (TC), pembayaran pasien (AE), content treatment plan (Dokter), isi Dynamic CRM (CS)'
        ],
        [
          'Conversion (TC)',
          'Konsultasi pasien saat kunjungan, presentasi treatment plan, push deal, input DP acquisition, kategorisasi No Buy (HL/SL + cause attribution), monitoring DP < 30%',
          'Reminder jadwal kunjungan (SCH), collection cicilan post-deal (AE), approval refund (Finance), perubahan TP tanpa validasi Dokter'
        ],
        [
          'Retention (AE)',
          'FU pembayaran terjadwal (shortcall 3 program), pelunasan zirkon, upsell produk tambahan, review dan eskalasi refund, monitoring perubahan TP, on progress leads tracking',
          'Akuisisi pasien baru (CS/TC), penjadwalan kunjungan baru (SCH), approval budget refund (Finance), penetapan harga (Management)'
        ]
      ]
    },

    { type: 'heading', text: 'Matriks Eskalasi & Exception Handling' },
    {
      type: 'table',
      columns: ['Situasi', 'Tim yang Handle', 'Alur Eskalasi'],
      rows: [
        ['Pasien minta refund', 'AE → Finance', 'Pasien lapor klinik → ticketing.rata.id → AE review budget → Finance approve → input dashboard Retention'],
        ['Pasien tidak bisa dihubungi (ghosted)', 'CS / SCH / AE (sesuai stage)', 'CS: tag GHOSTED di CRM. SCH: update status cancel. AE: update Retention Tracker FU sebagai No Respon → masuk bucket FU Tim Lain'],
        ['Treatment Plan berubah (Perubahan TP)', 'Dokter + AE', 'Dokter koordinasi perubahan → AE input ke [AE] Perubahan TP di dashboard. 10 kategori alasan — denominator = Total Px Single Implan'],
        ['Pasien minta pindah klinik', 'SCH + AE', 'SCH reschedule di Simplybook, update status di pipeline. AE update Retention Tracker jika sudah di stage post-deal'],
        ['P2P Lending / Carenow gagal cair', 'AE → Finance', 'AE cek status Carenow/Indodana — koordinasi solusi alternatif dengan Finance. Dicatat sebagai section tersendiri di [AE] Sum Cash In'],
        ['Data pipeline terlambat (Simplybook)', 'Tim Analyst → SPV', 'Export Simplybook terlambat → SCH dashboard tidak akurat → SPV diinformasikan, export segera dikejar'],
        ['Anomali laporan harian CS', 'Analyst → SPV CS', 'Volume new chat tiba-tiba nol, User Name kosong >50%, atau angka jauh di luar threshold → validasi manual sebelum distribusi laporan']
      ]
    },

    { type: 'heading', text: 'KPI Ownership Matrix' },
    {
      type: 'table',
      columns: ['KPI / Metrik', 'Owner (Bertanggung Jawab)', 'Dibaca Oleh'],
      rows: [
        ['Volume Chat Masuk (New Chat)', 'Marketing', 'CS, Marketing, Leader'],
        ['% Chat to Prospect', 'CS', 'CS SPV, Leader'],
        ['% Prospect to Deal (PD / %PB)', 'CS', 'CS SPV, Leader Sales'],
        ['Response Time', 'CS', 'CS SPV, Analyst'],
        ['Booking Count', 'CS', 'CS SPV, SCH, Leader'],
        ['% Booking to Visit', 'SCH', 'SCH, Leader'],
        ['Cancel Rate', 'SCH', 'SCH, Leader'],
        ['CR% (Visit to Buy)', 'TC / Conversion', 'Leader TC, VP Growth'],
        ['Basket Size', 'TC / Conversion', 'Leader TC, VP Growth'],
        ['Performance (Revenue TC)', 'TC / Conversion', 'Finance, VP Growth, Management'],
        ['Hard Loss / Soft Loss Rate', 'TC / Conversion', 'Leader TC, SPV'],
        ['Aktual Bayar vs Target (AE)', 'AE / Retention', 'Leader AE, Finance, VP Growth'],
        ['% Refund to Cash In', 'AE + Finance', 'Finance, VP Growth, Management'],
        ['Cohort %M0 (bayar bulan akuisisi)', 'AE / Retention', 'Leader AE, VP Growth'],
        ['On Progress Leads (DP<30% + 30%UP)', 'AE / Retention', 'Leader AE, VP Growth'],
        ['Perubahan TP %', 'Dokter + AE', 'Leader, Dokter, VP Growth']
      ]
    }
  ]
},

// ─────────────────────────────────────────────────────────────
'Glossary & Kamus Istilah': {
  blocks: [
    { type: 'heading', text: 'Kamus Istilah Growth Ops' },
    {
      type: 'alert', level: 'info',
      html: 'Referensi lengkap istilah, singkatan, dan jargon yang digunakan lintas tim di Growth Ops. Gunakan <strong>Ctrl+F</strong> untuk mencari istilah spesifik.'
    },

    { type: 'heading', text: 'Istilah Umum & Funnel' },
    {
      type: 'table',
      columns: ['Istilah', 'Singkatan', 'Definisi', 'Konteks Tim'],
      rows: [
        ['New Chat', 'NC', 'Chat pertama kali dari nomor yang belum pernah terdaftar di prev_chat. Dihitung per brand per hari.', 'CS'],
        ['Return Chat', 'RC', 'Chat dari nomor yang sudah pernah chat sebelumnya (ada di prev_chat). Diklasifikasikan terpisah dari New Chat.', 'CS'],
        ['Active Chat', '—', 'Chat yang sudah di-assign ke agen CS (User Name terisi di Infobip Conversations).', 'CS'],
        ['Prospect', '—', 'Lead yang sudah qualified — bisa New Prospect atau Return Prospect. Dihitung via prospect_cal di CS Dashboard.', 'CS'],
        ['Prospect ALL', '—', 'Total Prospect = Prospect New + Prospect Return. Angka inilah yang tampil di Growth Dashboard.', 'CS'],
        ['Booking', '—', 'Pasien yang sudah konfirmasi jadwal kunjungan. Di Growth Dashboard, Booking = sr_fb (merge Free Booking + DP), bukan Simplybook scheduled count.', 'CS / SCH'],
        ['Free Booking (FB)', 'FB', 'Booking tanpa DP — pasien tidak membayar di awal. Dipakai TANAM dan VINIR sebagai skema default.', 'CS / SCH'],
        ['Down Payment (DP)', 'DP', 'Pembayaran awal saat booking. RATA pakai DP sebagai skema default (Rp 299rb).', 'CS / Conversion'],
        ['Visit', '—', 'Kunjungan aktual pasien ke klinik. Denominator utama CR%. Pasien booking tapi tidak visit = tidak masuk Visit count.', 'SCH / Conversion'],
        ['Buy', '—', 'Deal closed — pasien setuju treatment plan dan membayar. Gate: col I (Upgrade Status) != "No Upgrade" di Database Pasien.', 'Conversion'],
        ['No Buy', 'NB', 'Pasien visit tapi tidak deal. Dibagi menjadi Hard Loss (HL) dan Soft Loss (SL).', 'Conversion'],
        ['Hard Loss', 'HL', 'No Buy karena alasan yang tidak bisa diubah dalam waktu dekat: biaya, kondisi medis, tidak minat, dll. 8 sub-kategori.', 'Conversion'],
        ['Soft Loss', 'SL', 'No Buy karena masih ada kemungkinan deal: masih pikir-pikir, perlu diskusi keluarga, jadwal bentrok, dll. 7 sub-kategori + 4 cause attribution.', 'Conversion'],
        ['CR% (Conversion Rate)', 'CR%', 'Buy / Visit. Metric paling utama TC. Target bervariasi per brand (RATA: 69%, TANAM: 72%).', 'Conversion'],
        ['Basket Size', '—', 'Performance / Buy. Revenue rata-rata per deal. Indicator kualitas closing TC.', 'Conversion'],
        ['Performance', 'Perf', 'Total revenue new deals yang di-generate TC. Berbeda dari Cash In — ini adalah nominal deal, bukan yang sudah terbayar.', 'Conversion'],
        ['Treatment Plan', 'TP', 'Rencana perawatan pasien yang disusun dokter dan dipresentasikan TC. Bisa berubah — perubahan TP dicatat di Retention Dashboard.', 'Conversion / Dokter'],
        ['DP Grouping', '—', 'Segmentasi pasien AE berdasarkan % DP dari total deal. DP<30% = risiko tinggi, butuh FU intensif. DP 30%UP = lebih committed.', 'Retention'],
        ['Cash In TC', '—', 'Cash masuk dari pasien di bulan yang sama dengan bulan closing deal (M0). Scope TC.', 'Conversion / Retention'],
        ['Cash In AE', '—', 'Cash masuk dari pasien yang dikelola AE — cicilan, pelunasan zirkon, upsell, promo. Scope AE.', 'Retention'],
        ['Cohort M0', 'M0', 'Pasien bayar di bulan yang sama dengan bulan akuisisi deal. % M0 tinggi = pipeline sehat.', 'Retention'],
        ['Cohort M1-M3', 'M1/M2/M3', 'Pasien bayar 1-3 bulan setelah akuisisi. Semakin besar nomor = semakin susah di-collect.', 'Retention'],
        ['Cohort M3+', 'M3+', 'Bayar lebih dari 3 bulan setelah akuisisi. Kasus berat — perlu program promo khusus dari AE.', 'Retention'],
        ['Not Found', 'NF', 'Pasien tidak bisa di-match ke cohort manapun. Indikasi data mismatch — perlu investigasi.', 'Retention'],
        ['On Progress Leads', 'OPL', 'Pasien yang sudah deal tapi belum bayar penuh. Split: CONVERT (sudah bayar M0-M3) vs BELUM CONVERT (SCHEDULED/PENDING/EXTERNAL/REFUND).', 'Retention'],
        ['Blast Zircon', '—', 'Program FU AE untuk pasien DP<30%: dorong pelunasan zirkon sebelum tindakan mahkota. Shortcall harian.', 'Retention'],
        ['Promo Tambahan', '—', 'Program FU AE: campaign promo khusus ke pasien existing (existing patient marketing). Dicatat di Retention Tracker FU sheet Shortcall Promo Tambahan.', 'Retention'],
        ['New Pasien', '—', 'Program FU AE untuk pasien baru post-deal DP 30%UP: pastikan cicilan terjadwal berjalan. Shortcall harian.', 'Retention'],
        ['Perubahan TP', 'PTP', 'Perubahan treatment plan setelah deal. 10 kategori alasan. % PTP = Total Px TP berubah / Total Px Single Implan.', 'Retention / Dokter'],
        ['Carenow / Indodana', 'P2P', 'Skema pembiayaan P2P lending yang ditawarkan AE. Pasien cicil ke platform, klinik terima langsung dari platform.', 'Retention'],
        ['Refund', '—', 'Pembayaran dikembalikan ke pasien. Kategorisasi: Medis vs Non-Medis; Lanjut Tindakan vs Tidak Lanjut. Max 3% dari Cash In.', 'Retention / Finance'],
        ['Attribution S1/S2/S3', 'S1/S2/S3', 'Level awareness dari source iklan. S1 = awareness (broad), S2 = retargeting, S3 = high intent. Derived dari matching first message dengan at_dict.', 'CS / Marketing'],
        ['DJI / Sky', '—', 'Filter khusus di laporan pagi CS untuk mengecualikan nomor tertentu yang tidak relevan (bot/internal/dll).', 'CS / Analyst'],
        ['prev_chat', '—', 'GSheet historis semua nomor yang pernah chat per brand. Dipakai untuk menentukan apakah nomor adalah New Chat atau Return Chat. RATA: 1.5M+ records.', 'Analyst'],
        ['at_dict', '—', 'Kamus atribusi: mapping keyword first message → channel + creative + S1/S2/S3. Master data yang dikelola manual.', 'Analyst / Marketing'],
        ['[Dapur] Tarikan Infobip', 'Dapur', 'GSheet hasil preprocessing CRM Infobip per brand. Sheet OK adalah output bersih yang berisi prospect aktif.', 'CS / Analyst'],
        ['DAPUR (SCH)', 'DAPUR', 'GSheet pipeline SCH: [DAPUR] BRAND SCH Scheduled & Visit. Menggabungkan data dari GROWTH Manual Update Simplybook → raw internal → output Scheduled & Visit.', 'SCH / Analyst'],
        ['Free Text', '—', 'New chat yang tidak cocok dengan keyword manapun di at_dict dan bukan dari quiz/DM IG. Volume Free Text = proxy brand awareness organik.', 'CS / Marketing'],
        ['Takeout', '—', 'Pesan di mana CS outbound timestamp lebih awal dari inbound customer pada conversation yang sama. Dikecualikan dari hitungan new chat dan prospek.', 'Analyst'],
        ['Aftersales', '—', 'Customer dengan status_akhir = BOOKED. Dikecualikan dari hitungan new prospek di laporan harian.', 'CS / Analyst']
      ]
    },

    { type: 'heading', text: 'Singkatan & File Reference' },
    {
      type: 'table',
      columns: ['Singkatan / File', 'Kepanjangan / Nama File', 'Konteks'],
      rows: [
        ['TC',   'Treatment Coordinator',          'Tim Conversion — melakukan konsultasi dan closing deal'],
        ['AE',   'Account Executive',              'Tim Retention — mengelola collection dan upsell post-deal'],
        ['CS',   'Customer Service',               'Tim CS — qualification lead dan push booking'],
        ['SCH',  'Scheduling',                     'Tim Scheduling — konfirmasi jadwal dan tracking visit'],
        ['SPV',  'Supervisor',                     'Supervisi operasional harian per tim'],
        ['VP',   'Vice President',                 'VP Growth — atasan langsung semua tim Growth Ops'],
        ['HL',   'Hard Loss',                      'No Buy kategori berat — kecil kemungkinan convert'],
        ['SL',   'SoftLoss',                       'No Buy kategori ringan — masih ada kemungkinan convert'],
        ['FB',   'Free Booking',                   'Booking tanpa DP di awal (TANAM & VINIR default)'],
        ['TP',   'Treatment Plan',                 'Rencana perawatan medis yang dipresentasikan TC'],
        ['PTP',  'Perubahan Treatment Plan',       'Perubahan TP setelah deal — dimonitor AE'],
        ['MTD',  'Month to Date',                  'Akumulasi dari tanggal 1 hingga hari ini dalam bulan berjalan'],
        ['WoW',  'Week over Week',                 'Perbandingan antar minggu'],
        ['MoM',  'Month over Month',               'Perbandingan antar bulan'],
        ['CRM',  'Customer Relationship Management', 'Sistem manajemen data customer — Dynamic CRM di RATA'],
        ['CDR',  'Call Detail Record',             'Log telepon dari Barantum — dipakai CS TANAM untuk tracking outbound call'],
        ['sr_fb','Sales Report Free Booking',      'GSheet booking merge (Free Booking + DP) — source Booking count di Growth Dashboard']
      ]
    }
  ]
}

  ,

  // ─────────────────────────────────────────────────────────────
  'Data Lineage': {
    blocks: [

      { type: 'heading', text: 'End-to-End Data Flow — Growth Ops' },
      {
        type: 'alert', level: 'info',
        html: '<strong>Data Lineage</strong> adalah peta lengkap perjalanan data dari sumber paling hulu (iklan) hingga angka yang muncul di dashboard. Gunakan ini untuk menelusuri: dari mana data Chat berasal? Kolom mana yang jadi source Buy? Kenapa angka Prospect bisa salah? Ketik di search: <em>"alur chat"</em>, <em>"sumber prospect rata"</em>, <em>"dari mana data booking tanam"</em>, <em>"lineage revenue"</em>.'
      },

      { type: 'heading', text: 'Pipeline Utama — Semua Brand' },
      {
        type: 'diagram',
        code: `flowchart TD
    subgraph ADS ["① IKLAN — Meta / Google Ads"]
        MA["Meta Ads\n(FB, IG, TikTok)"]
        GA["Google Ads"]
    end

    subgraph SM ["② SUPERMETRICS (Auto-Pull Harian)"]
        SMP["Supermetrics connector\npull ke GSheet setiap hari\n→ chat_budget_[brand] col H+ = Budget\n→ col C = Jumlah Chat"]
    end

    subgraph CS_LAYER ["③ CS — Kualifikasi Lead"]
        INF["Infobip CRM\n(semua percakapan WA/IG)"]
        PY["Python Colab\n(daily_report_pagi/sore.ipynb)\nclean + tag new vs return\nattribution S1/S2/S3"]
        DAPUR["[Dapur] Tarikan Infobib\nSheet: OK\ncol A: First Chat\ncol I: Prospect Tagging"]
        PROSP_CAL["CS Dashboard\nSheet: prospect_cal\ncol D: Prospek New\ncol F: Prospek Return\ncol I: Prospek ALL"]
        PROSP_GD["[GROWTH] Dashboard\nSheet: prospek_[brand]\n= IMPORTRANGE dari prospect_cal col I"]
    end

    subgraph SCH_LAYER ["④ SCH — Penjadwalan"]
        SB["Simplybook\n(TANAM & VINIR)\nBooking online pasien"]
        MAN["Manual Update\n+ AppScript\n(RATA & fallback)"]
        SR_FB["[GROWTH] sr_fb_[brand]\nMerge Free Booking + DP\n= source Booking count dashboard"]
    end

    subgraph CONV_LAYER ["⑤ CONVERSION — TC Konsultasi"]
        CRM["Dynamic CRM\n(Google Sheets)\nInput TC hari H:\n- col I: Upgrade Status\n- col R: No Buy Reason\n- col W: Deal Amount"]
        RAW["raw_pasien / raw_compile\ncol F ≠ No Upgrade → BUY\ncol I Upgrade Status\ncol W Planned Order = Revenue"]
    end

    subgraph DASH ["⑥ DASHBOARD — Output Final"]
        GD["[GROWTH] NEW DASHBOARD.xlsx\nPer brand: row 6-26\n- row 8: Chat\n- row 10: Prospect\n- row 12: Booking\n- row 14: Visit\n- row 16: Buy\n- row 23: Revenue Performance"]
        HUB["Hub Growth Dashboard\n(Dashboard Growth tab)\nVisual: KPI cards, Pipeline,\nCharts, Weekly breakdown"]
    end

    MA -->|"impression → click → chat WA/IG"| INF
    GA -->|"search click → landing page → chat"| INF
    MA & GA -->|"spend data"| SMP
    SMP -->|"col C=Chat, col H+=Budget"| GD

    INF -->|"Export Detailed + Conversations .xlsx"| PY
    PY -->|"Python clean + tag"| DAPUR
    DAPUR -->|"IMPORTRANGE col A,I"| PROSP_CAL
    PROSP_CAL -->|"IMPORTRANGE col I (Prospek ALL)"| PROSP_GD
    PROSP_GD -->|"SUMIFS"| GD

    INF -->|"CS push booking via WA"| SB
    INF -->|"CS input manual / AppScript"| MAN
    SB -->|"Export + IMPORTRANGE"| SR_FB
    MAN -->|"AppScript copy ke sr_fb"| SR_FB
    SR_FB -->|"COUNTIFS"| GD

    SR_FB -->|"Pasien terkonfirmasi hadir"| CRM
    CRM -->|"raw_pasien col F/I/W"| RAW
    RAW -->|"COUNTIFS Buy\nSUMIFS Revenue"| GD
    GD -->|"IMPORTRANGE / API"| HUB`
      },

      {
        type: 'table',
        columns: ['Urutan', 'Layer', 'Sistem / File', 'Output ke Metric', 'Koneksi ke Layer Berikut'],
        rows: [
          ['①', 'IKLAN', 'Meta Ads (FB/IG/TikTok) · Google Ads', 'Budget Ads, Chat count', 'Supermetrics auto-pull harian → chat_budget_[brand]'],
          ['②', 'SUPERMETRICS', 'chat_budget_[brand] · col C = Chat · col H+ = Budget', 'Metric: Chat, Budget Ads, Cost/Chat', 'SUMIFS ke [GROWTH] NEW DASHBOARD row 8 (Chat) dan row 6-7 (Budget)'],
          ['③ CS', 'INFOBIP → PYTHON', 'Infobip CRM export .xlsx → Python Colab daily_report_pagi/sore.ipynb', 'New Chat, Return Chat, Attribution S1/S2/S3', 'Python clean → paste ke [Dapur] Tarikan Infobib sheet OK'],
          ['③ CS', 'DAPUR → PROSPECT_CAL', '[Dapur] Tarikan Infobib sheet OK → IMPORTRANGE → Prospek Infobib → qa → prospect_cal', 'Metric: Prospect ALL (New + Return)', 'IMPORTRANGE prospect_cal col I → prospek_[brand] → SUMIFS ke GROWTH row 10'],
          ['④ SCH', 'SIMPLYBOOK (TANAM/VINIR)', 'Simplybook export → AppScript → sr_fb_[brand] (merge Free Booking + DP)', 'Metric: Booking', 'COUNTIFS sr_fb_[brand] → GROWTH row 12'],
          ['④ SCH', 'MANUAL/APPSCRIPT (RATA)', 'Manual Upload GSheet + AppScript UploadData() → raw_sch_rata', 'Metric: Booking RATA', 'COUNTIFS raw_sch_rata → GROWTH RATA row 12'],
          ['⑤ CONV', 'DYNAMIC CRM → TC INPUT', 'TC input hari H: col I Upgrade Status · col F Buy flag · col W Deal Amount', 'Metric: Visit, Buy, Revenue', 'COUNTIFS col F → Buy (row 16) · SUMIFS col W → Revenue (row 23)'],
          ['⑥', 'DASHBOARD FINAL', '[GROWTH] NEW DASHBOARD.xlsx per brand row 6-26 → Hub Dashboard Growth tab', 'Semua KPI: Chat, Prospect, Booking, Visit, Buy, Revenue, CR%', 'Hub membaca via IMPORTRANGE / data.js block']
        ]
      },

      { type: 'heading', text: 'Per-Metric Data Lineage — Detail Kolom & Formula' },
      {
        type: 'alert', level: 'warn',
        html: 'Tabel ini adalah <strong>single source of truth</strong> untuk tracing data. Setiap cell berisi: sistem asal → file GSheet → kolom spesifik → formula agregasi → output di dashboard. Jika ada diskrepansi angka, mulai trace dari kolom paling kanan ke kiri.'
      },
      {
        type: 'table',
        columns: ['Metric', 'Brand', 'Sistem Asal', 'File / Sheet', 'Kolom Kunci', 'Formula Agregasi', 'Dashboard Row'],
        rows: [
          // CHAT
          ['Chat', 'TANAM', 'Supermetrics → GSheet', 'chat_budget_tanam', 'col C = Jumlah Chat Harian', 'SUMIFS per periode MTD', '[GROWTH] TANAM row 8'],
          ['Chat', 'RATA',  'Supermetrics → GSheet', 'chat_budget_rata',  'col C = Jumlah Chat Harian', 'SUMIFS per periode MTD', '[GROWTH] RATA row 8'],
          ['Chat', 'VINIR', 'Supermetrics → GSheet', 'chat_budget_vinir', 'col C = Jumlah Chat Harian', 'SUMIFS per periode MTD', '[GROWTH] VINIR row 8'],

          // BUDGET ADS
          ['Budget Ads', 'TANAM', 'Supermetrics → GSheet', 'chat_budget_tanam', 'col H+ = Spend per platform', 'SUM col H onwards', '[GROWTH] TANAM row 6/7'],
          ['Budget Ads', 'RATA',  'Supermetrics → GSheet', 'chat_budget_rata',  'col H+ = Spend per platform', 'SUM col H onwards', '[GROWTH] RATA row 6/7'],
          ['Budget Ads', 'VINIR', 'Supermetrics → GSheet', 'chat_budget_vinir', 'col H+ = Spend per platform', 'SUM col H onwards', '[GROWTH] VINIR row 6/7'],

          // PROSPECT
          ['Prospect', 'TANAM', 'Infobip → Python → [Dapur] → CS Dashboard', 'prospek_tanam\n(IMPORTRANGE dari prospect_cal col I)', 'prospect_cal col I = Prospek ALL (New+Return)', 'SUMIFS(prospek_tanam)', '[GROWTH] TANAM row 10'],
          ['Prospect', 'RATA',  'Infobip → Python → [Dapur] → CS Dashboard', 'prospek_rata\n(IMPORTRANGE dari prospect_cal col I)',  'prospect_cal col I = Prospek ALL', 'SUMIFS(prospek_rata)',  '[GROWTH] RATA row 10'],
          ['Prospect', 'VINIR', 'Infobip → Python → [Dapur] → CS Dashboard', 'prospek_vinir\n(IMPORTRANGE dari prospect_cal col I)', 'prospect_cal col I = Prospek ALL', 'SUMIFS(prospek_vinir)', '[GROWTH] VINIR row 10'],

          // BOOKING
          ['Booking', 'TANAM', 'Simplybook → AppScript → sr_fb_tanam', 'sr_fb_tanam\n(merge Free Booking + DP dari Sales Report)', 'col B = Tanggal Booking, col C = Klinik', 'COUNTIFS(sr_fb_tanam, periode)', '[GROWTH] TANAM row 12'],
          ['Booking', 'RATA',  'Manual Upload + AppScript → raw_sch_rata',  'raw_sch_rata\n(Hasil Upload Simplybook Manual)', 'col B = Tanggal, col C = Klinik', 'COUNTIFS(raw_sch_rata)', '[GROWTH] RATA row 12'],
          ['Booking', 'VINIR', 'Simplybook → AppScript → simply_vinir',      'simply_vinir\n(DAPUR SCH VINIR)', 'col B = Tanggal Booking', 'COUNTIFS(simply_vinir)', '[GROWTH] VINIR row 12'],

          // VISIT
          ['Visit', 'TANAM', 'Dynamic CRM → raw_pasien hadir_tanam', 'raw_pasien hadir_tanam', 'col D = Tanggal Visit (date attended)', 'COUNTIFS(tanggal visit, periode)', '[GROWTH] TANAM row 14'],
          ['Visit', 'RATA',  'Dynamic CRM → raw_compile rata',         'raw_compile rata',        'col = Tanggal Visit',                  'COUNTIFS(raw_compile rata, "visit")', '[GROWTH] RATA row 14'],
          ['Visit', 'VINIR', 'Dynamic CRM → raw_pasien visit vinir',   'raw_pasien visit vinir',  'col D = Tanggal Visit',                 'COUNTIFS(visit vinir, periode)',  '[GROWTH] VINIR row 14'],

          // BUY / UPGRADE
          ['Buy', 'TANAM', 'Dynamic CRM TC input hari H', 'raw_pasien (Database Pasien TANAM)', 'col F bukan No Upgrade', 'COUNTIFS(col F,"<>No Upgrade",tgl,periode)', 'TANAM row 16'],
          ['Buy', 'RATA',  'Dynamic CRM TC input hari H', 'raw_compile (Database Pasien RATA)',  'col F = upgrade lowercase',    'COUNTIFS(col F,"upgrade",tgl,periode)',         'RATA row 16'],
          ['Buy', 'VINIR', 'Dynamic CRM TC input hari H', 'raw_pasien (Database Pasien VINIR)', 'col F = Upgrade Title Case',    'COUNTIFS(col F,"Upgrade",tgl,periode)',         'VINIR row 16'],

          // REVENUE
          ['Revenue', 'TANAM', 'TC input ke Planned Order', 'Planned Order TANAM', 'col W = Deal Amount', 'SUMIFS(col W, tgl, periode, brand=TANAM)', 'TANAM row 23'],
          ['Revenue', 'RATA',  'TC input ke Planned Order', 'Planned Order RATA',  'col W = Deal Amount', 'SUMIFS(col W, tgl, periode, brand=RATA)',  'RATA row 23'],
          ['Revenue', 'VINIR', 'TC input ke Planned Order', 'Planned Order VINIR', 'col W = Deal Amount', 'SUMIFS(col W, tgl, periode, brand=VINIR)', 'VINIR row 23'],

          // DERIVED
          ['Cost/Chat',  'ALL', 'Derived', 'Calculated in dashboard', 'Budget Ads dibagi Chat', '[Budget] / [Chat]', 'Per brand row 7'],
          ['%C ke P', 'ALL', 'Derived', 'Calculated', 'Prospect dibagi Chat kali 100', '[Prospect]/[Chat]*100', 'Per brand row 9'],
          ['%B ke V', 'ALL', 'Derived', 'Calculated', 'Visit dibagi Booking kali 100', '[Visit]/[Booking]*100', 'Per brand row 13'],
          ['%V ke B (CR%)', 'ALL', 'Derived', 'Calculated', 'Buy dibagi Visit kali 100', '[Buy]/[Visit]*100', 'Per brand row 15']
        ]
      },

      { type: 'heading', text: 'Titik Rawan Putus Data' },
      {
        type: 'table',
        columns: ['Titik Rawan', 'Metric Terdampak', 'Gejala', 'Fix'],
        rows: [
          ['Supermetrics gagal pull', 'Chat, Budget Ads', 'Chat = 0 atau tidak update', 'Reconnect Supermetrics di GSheet Extensions'],
          ['Python Colab tidak dijalankan', 'Prospect semua brand', 'Prospect tidak update dari kemarin', 'Run script, paste output ke template CS Dashboard'],
          ['IMPORTRANGE quota habis', 'Prospect, Booking', 'Error #REF atau #N/A', 'Buka source sheet, refresh, atau buat trigger ulang'],
          ['TC tidak input CRM hari H', 'Buy, Revenue, %V-B', 'Buy rendah, Revenue tidak update', 'SPV eskalasi, TC input H+1 dengan tanggal benar'],
          ['AppScript tidak trigger', 'Booking RATA', 'Booking tidak masuk sr_fb', 'Buka GSheet, AppScript, run manual UploadData()'],
          ['Mismatch casing col F', 'Buy RATA vs VINIR', 'Buy = 0 padahal TC sudah input', 'RATA pakai lowercase upgrade, VINIR pakai Title Case Upgrade'],
          ['at_dict tidak di-update', 'Attribution, Prospect tagging', 'Banyak masuk Free Text atau untagged', 'Update at_dict di py_reader setiap campaign baru']
        ]
      },

      { type: 'heading', text: 'Cara Trace Data — Panduan Praktis' },
      {
        type: 'steps',
        items: [
          { title: 'Identifikasi: metric + brand + periode', desc: 'Contoh: Buy TANAM April di dashboard 580, TC bilang 620. Scope sudah jelas.', note: 'Selalu mulai dari spesifik sebelum trace' },
          { title: 'Cek [GROWTH] NEW DASHBOARD.xlsx langsung', desc: 'Buka sheet brand yang bersangkutan, lihat row metric, baca formula COUNTIFS/SUMIFS pointing ke mana.', note: 'Ini truth pertama, bukan dashboard Hub' },
          { title: 'Buka source sheet dari formula', desc: 'Ikuti range di formula COUNTIFS, buka sheet raw_pasien atau sr_fb atau prospek_[brand], filter dan hitung manual.', note: 'Jika count manual = dashboard, berarti input TC yang kurang bukan bug formula' },
          { title: 'Untuk Buy: cek col F di Dynamic CRM', desc: 'Filter tanggal visit sesuai periode, cek col F dan col I. Blank = TC belum input.', note: 'Blank col I adalah penyebab terbesar data loss Buy' },
          { title: 'Untuk Prospect: trace 6-hop chain', desc: 'Dapur Tarikan Infobib ke Sheet OK ke Prospek Infobib ke qa ke prospect_cal col I ke prospek_[brand] ke GROWTH Dashboard.', note: 'Putus di hop mana pun = count salah' },
          { title: 'Dokumentasikan', desc: 'Catat titik putus, nilai actual vs dashboard, fix yang dilakukan. Update di Hub Data & Pipeline brand terkait.', note: 'Tanpa dokumentasi masalah sama akan muncul lagi' }
        ]
      }

    ]
  }

  }, // end allbrand

  // ── MANAGEMENT GOA ───────────────────────────────────────────────
  goa: {
    "Panduan Tim": {
      "Overview & Acuan": {
        blocks: [
          { type: 'text', html: '<p>🎯 <strong>Objective:</strong> Pegangan kerja tim Data Analyst Growth Business Division untuk periode <strong>25 Mei – 17 Juli 2026</strong>. Memastikan semua orang selaras tentang siapa yang memegang apa, standar kerja, dan apa yang dikejar dalam 8 minggu ke depan.</p>' },
          { type: 'heading', text: '📅 Acuan Penomoran Minggu & Bulan' },
          {
            type: 'table',
            columns: ['Bulan', 'Minggu', 'Tanggal'],
            rows: [
              ['Bulan 1 (Setup & Transisi)', 'Minggu 1', '25 – 29 Mei 2026'],
              ['Bulan 1 (Setup & Transisi)', 'Minggu 2', '1 – 5 Jun 2026'],
              ['Bulan 1 (Setup & Transisi)', 'Minggu 3', '8 – 12 Jun 2026'],
              ['Bulan 1 (Setup & Transisi)', 'Minggu 4', '15 – 19 Jun 2026'],
              ['Bulan 2 (Eksekusi & Live)', 'Minggu 5', '22 – 26 Jun 2026'],
              ['Bulan 2 (Eksekusi & Live)', 'Minggu 6', '29 Jun – 3 Jul 2026'],
              ['Bulan 2 (Eksekusi & Live)', 'Minggu 7', '6 – 10 Jul 2026'],
              ['Bulan 2 (Eksekusi & Live)', 'Minggu 8', '13 – 17 Jul 2026']
            ]
          }
        ]
      },
      "Struktur & Cara Kerja Tim": {
        blocks: [
          { type: 'heading', text: '👥 Struktur Tim & PIC Domain' },
          { type: 'diagram', code: `flowchart TD
  VP["VP of Growth"]-->MGR["Growth Analyst Manager"]
  MGR-->G["Gusde\nProcess Improvement"]
  MGR-->H["Hammam\nCS"]
  MGR-->O["Ocha\nSCH & Conversion"]
  MGR-->F["Fairuz\nRetention"]` },
          { type: 'heading', text: '🚦 Jalur Masuk Pekerjaan' },
          {
            type: 'table',
            columns: ['Jalur', 'Dari', 'Penanganan'],
            rows: [
              ['Jalur 1', 'User / Stakeholder ke PIC', 'PIC menangani langsung sesuai antrean dan prioritas domainnya.'],
              ['Jalur 2', 'Manager ke PIC', 'PIC memprioritaskan (Data urgent/kebutuhan management).'],
              ['Jalur 3', 'Manager Memfasilitasi', 'Manager menetapkan PIC koordinasi untuk request lintas domain.']
            ]
          },
          { type: 'heading', text: '✅ Definition of Done (Standar Penyelesaian)' },
          {
            type: 'steps',
            items: [
              { title: '1. Output Sudah Benar', desc: 'Angka/analisis menjawab pertanyaan, sudah dicek terhadap baseline/sumber asli, dan keterbatasan dicantumkan.' },
              { title: '2. Output Dapat Diakses', desc: 'Pihak yang butuh tahu lokasinya atau sudah menerima. Tidak berhenti di file lokal pribadi.' },
              { title: '3. Pengetahuan Tercatat', desc: 'Ada catatan sumber data dan asumsi. Rekan tim bisa menelusuri ulang tanpa bertanya dari nol.' }
            ]
          },
          { type: 'heading', text: '🛡️ Panduan Eskalasi' },
          { type: 'alert', level: 'warn', html: '<strong>Hambatan Teknis (>30 menit):</strong> Tanyakan ke rekan/manager.<br><strong>Hambatan Prioritas/Cakupan:</strong> Sampaikan ke manager dalam 24 jam.<br><strong>Hambatan Koordinasi Antar Domain:</strong> Minta manager memfasilitasi.' }
        ]
      },
      "Matriks Peran & Tanggung Jawab": {
        "Gusde (Data Process Improvement)": {
          blocks: [
            { type: 'kpi', items: [
              { label: 'Domain', value: 'Perbaikan Proses' },
              { label: 'Bulan 1', value: 'Roadmap & Desain Schema' },
              { label: 'Bulan 2', value: 'Build Phase 1' }
            ]},
            { type: 'heading', text: '📋 Cakupan Kerja Harian' },
            { type: 'text', html: '<ul><li>🔍 <strong>Quality check lintas domain:</strong> Memeriksa kualitas output analyst lain secara sampling.</li><li>🎯 <strong>Fokus prioritas:</strong> Menyepakati 2-3 prioritas perbaikan dengan manager setiap minggu.</li><li>🛠️ <strong>Dukungan teknis:</strong> Membantu Hammam mengurai isu data CS yang bersifat struktural (schema, pipeline).</li><li>🔄 <strong>Masa transisi:</strong> Meng-cover sebagian daily report CS pada minggu 1 dan 2.</li></ul>' },
            { type: 'heading', text: '🚀 Tugas Khusus (8 Minggu)' },
            { type: 'text', html: '<ul><li><strong>M3 (Minggu 4):</strong> Memaparkan roadmap perbaikan CS beserta effort dan prioritas ke manager.</li><li><strong>M4 (Minggu 5):</strong> Menyelesaikan rancangan schema database CS (dimensi & fakta).</li><li><strong>M6 (Minggu 7):</strong> Membangun schema Phase 1 dan menyerahkannya ke Hammam.</li></ul>' },
            { type: 'heading', text: '💡 Cakupan Perbaikan & Perhatian' },
            { type: 'alert', level: 'info', html: 'Membangun pipeline data terstandar dengan SOP. Memelihara dokumen definisi data. <strong>Penting:</strong> Waktu perbaikan harus dilindungi dari adhoc; validasi schema dengan data nyata sebelum final.' }
          ]
        },
        "Hammam (CS)": {
          blocks: [
            { type: 'kpi', items: [
              { label: 'Domain', value: 'CS' },
              { label: 'Bulan 1', value: 'Transfer & Ops' },
              { label: 'Bulan 2', value: 'Fokus Penuh CS' }
            ]},
            { type: 'heading', text: '📋 Cakupan Kerja Harian' },
            { type: 'text', html: '<ul><li>📊 <strong>Daily Report & Adhoc:</strong> Menyusun report CS, memelihara dashboard, menyiapkan laporan incentive & booster.</li><li>🤝 <strong>PIC Utama:</strong> Titik kontak pertama untuk semua request data CS.</li><li>🔄 <strong>Transisi:</strong> Mengambil alih daily report CS sepenuhnya dari Gusde mulai minggu ke-3.</li></ul>' },
            { type: 'heading', text: '🚀 Tugas Khusus (8 Minggu)' },
            { type: 'text', html: '<ul><li><strong>M1 (Minggu 1):</strong> Mendampingi Fairuz menuntaskan transfer Retention dan meninjau output-nya.</li><li><strong>M2 (Minggu 2):</strong> Transfer rampung, beralih menjadi cadangan (backup) bagi Fairuz.</li><li><strong>M6 (Minggu 7):</strong> Menerima handover Schema CS Phase 1 dari Gusde dan mulai menggunakannya.</li></ul>' },
            { type: 'heading', text: '💡 Cakupan Perbaikan & Perhatian' },
            { type: 'alert', level: 'info', html: 'Menyusun logika deteksi anomali CS. Membantu menguji schema CS. <strong>Penting:</strong> Beban di M1-M2 sangat tinggi (ops + transfer), segera infokan manager jika adhoc menumpuk. Pastikan handover rapi.' }
          ]
        },
        "Ocha (SCH & Conversion)": {
          blocks: [
            { type: 'kpi', items: [
              { label: 'Domain', value: 'SCH & Conv' },
              { label: 'Bulan 1', value: 'Scoping Project' },
              { label: 'Bulan 2', value: 'Eksekusi & Live' }
            ]},
            { type: 'heading', text: '📋 Cakupan Kerja Harian' },
            { type: 'text', html: '<ul><li>📊 <strong>Daily Report & Adhoc:</strong> Menyusun laporan, memelihara dashboard, menyiapkan laporan incentive SCH & Conversion.</li><li>🤝 <strong>PIC Utama:</strong> Titik kontak pertama untuk semua request kedua domain.</li></ul>' },
            { type: 'heading', text: '🚀 Tugas Khusus (8 Minggu)' },
            { type: 'text', html: '<ul><li><strong>Minggu 1-2:</strong> Menyusun daftar pain point Conversion (keluhan, celah data, hambatan proses).</li><li><strong>M3 (Minggu 4):</strong> Mengajukan usulan project perbaikan ke manager dan sepakati cakupan.</li><li><strong>M5 (Minggu 7):</strong> Memimpin project perbaikan dashboard Conversion secara penuh dari perancangan sampai live.</li></ul>' },
            { type: 'heading', text: '💡 Fokus Khusus: Peningkatan Kualitas Data (Data Assurance)' },
            { type: 'alert', level: 'info', html: 'Ocha berfungsi sebagai penjaga kualitas data lintas domain. Menghubungkan funnel CS, Conv, dan Retention. Membangun kamus data. <strong>Penting:</strong> Jaga keseimbangan antara operasional harian dan project perbaikan.' }
          ]
        },
        "Fairuz (Retention)": {
          blocks: [
            { type: 'kpi', items: [
              { label: 'Domain', value: 'Retention' },
              { label: 'Bulan 1', value: 'Hands-on & Review' },
              { label: 'Bulan 2', value: 'Mandiri Penuh' }
            ]},
            { type: 'heading', text: '📋 Cakupan Kerja Harian' },
            { type: 'text', html: '<ul><li>📊 <strong>Daily Report & Adhoc:</strong> Mengerjakan report dan memelihara dashboard Retention.</li><li>🤝 <strong>Tahap Belajar (M1-M2):</strong> Hasil pekerjaan ditinjau oleh Hammam.</li><li>🚀 <strong>Tahap Mandiri (Minggu 3+):</strong> Memegang report dan adhoc secara mandiri, Hammam hanya sebagai cadangan.</li></ul>' },
            { type: 'heading', text: '🚀 Tugas Khusus (8 Minggu)' },
            { type: 'text', html: '<ul><li><strong>M1 (Minggu 1):</strong> Mengerjakan report Retention hands-on, menuntaskan tahap akhir onboarding.</li><li><strong>M2 (Minggu 2):</strong> Menjalani review onboarding Hari ke-30, menyerahkan learning roadmap pribadi.</li><li><strong>Minggu 4:</strong> Mengusulkan minimal 1 pain point atau ide perbaikan Retention berdasarkan pengalaman sendiri.</li></ul>' },
            { type: 'heading', text: '💡 Cakupan Perbaikan & Perhatian' },
            { type: 'alert', level: 'info', html: 'Menuntaskan peta alur data Retention dari pemahaman sendiri. <strong>Penting:</strong> Fokus bergeser dari kecepatan belajar ke konsistensi output. Gunakan Hammam untuk validasi tanpa ragu.' }
          ]
        }
      }
    },
    
    // Trace Progress (Custom Dashboard - intercepted in JS, no blocks needed)
    "Trace Progress": { 
      "Dashboard": { blocks: [] }
    },
    
    // Panduan Manager (Locked - rendered via JS, blocks used after auth)
    "Panduan Manager": {
      "Konteks & Transisi": {
        blocks: [
          { type: 'alert', level: 'err', html: '<strong>CONFIDENTIAL:</strong> Tidak untuk distribusi tim. Dokumen ini adalah pegangan GOA Manager dan visibility VP of Growth.' },
          { type: 'heading', text: 'Transisi Aktif yang Sedang Berjalan' },
          { type: 'text', html: '<ul><li><strong>Transisi Daily Report CS:</strong> Gusde membantu sebagian daily report CS di minggu 1 & 2. Hammam mengambil alih penuh di minggu 3. <em>Yang dijaga manager:</em> waktu perbaikan Gusde adalah asumsi yang menopang seluruh rencana perbaikan, harus benar-benar terbuka dari reaktif harian.</li><li><strong>Penuntasan Transfer Retention:</strong> Fairuz sudah hands-on. <em>Yang dijaga manager:</em> pendampingan dirampungkan M1-M2, ditutup dengan review onboarding Hari ke-30. Setelah itu Hammam hanya menjadi cadangan.</li></ul>' },
          { type: 'heading', text: 'Konteks Tiap Anggota & Pertimbangan Manajemen' },
          {
            type: 'steps',
            items: [
              { title: 'Gusde (Data Process Improvement)', desc: 'Perannya berorientasi perbaikan dan butuh blok waktu utuh. Manager memastikan: (1) Daily report CS benar-benar pindah ke Hammam di M3. (2) Prioritas mingguan disepakati. (3) Adhoc diarahkan ke PIC terkait. (4) Hasil perbaikan benar-benar diadopsi tim.' },
              { title: 'Hammam (CS)', desc: 'Memiliki beban ganda di M1-M2 (transfer & operasional). Manager memastikan: (1) Volume kerja dua minggu pertama terkelola (tunda/alihkan request non-kritis). (2) Transfer ke Fairuz rampung tanpa celah. (3) Kualitas CS terjaga setelah fokus kembali penuh.' },
              { title: 'Ocha (SCH & Conversion)', desc: 'Menyeimbangkan operasional, project perbaikan, dan kualitas data lintas domain. Manager memastikan: (1) Waktu project terlindungi dari adhoc. (2) Keputusan project dipegang Ocha, manager menilai di titik krusial. (3) Insight dan gambaran funnel dihasilkan.' },
              { title: 'Fairuz (Retention)', desc: 'Fokus bergeser dari belajar ke konsistensi output. Manager memastikan: (1) Celah pemahaman yang tersisa diidentifikasi di review Hari ke-30. (2) Transisi kepemilikan penuh tegas. (3) Ruang bertanya ke Hammam tetap terbuka tanpa merasa kurang siap.' }
            ]
          }
        ]
      },
      "Penelusuran Kinerja": {
        blocks: [
          { type: 'heading', text: 'Dimensi Penilaian' },
          {
            type: 'table',
            columns: ['Dimensi', 'Yang Dinilai'],
            rows: [
              ['Output', 'Konsistensi dan akurasi deliverable inti (tepat waktu, lolos pengecekan dasar).'],
              ['Proses', 'Kerapian cara kerja, dokumentasi, ketepatan waktu dalam eskalasi hambatan.'],
              ['Kolaborasi', 'Cara bekerja dengan tim, meneruskan request, berbagi pengetahuan.'],
              ['Eksekusi', 'Kemampuan menggerakkan pekerjaan non-rutin (project) dan kualitas keputusan.']
            ]
          },
          { type: 'heading', text: 'Ritme Peninjauan & Agenda 1-on-1' },
          {
            type: 'table',
            columns: ['Ritme', 'Fokus Agenda'],
            rows: [
              ['Harian (Ringan)', 'Pemindaian cepat terbitnya daily report tiap domain & hambatan mendadak.'],
              ['Mingguan (Senin/Jumat)', 'Senin: Rencana output mingguan. Jumat: Kualitas output, deliverable meleset, pembaruan backlog.'],
              ['Dua Mingguan (1-on-1)', 'Progress (7m), Rencana & Hambatan (8m), Project/Perbaikan (7m), Ruang diskusi terbuka (5m).'],
              ['Bulanan (Retrospektif)', 'Apa yang berjalan baik, apa yang tidak, penyesuaian prioritas proses/cara kerja.'],
              ['60 Hari (Review)', 'Peninjauan menyeluruh kinerja tim untuk rekomendasi pengaturan kerja ke VP.']
            ]
          }
        ]
      },
      "Koordinasi VP & Risiko": {
        blocks: [
          { type: 'heading', text: 'Ambang Batas Eskalasi ke VP of Growth' },
          { type: 'text', html: '<p>Membawa situasi ke VP bukan tanda kegagalan, melainkan cara mendapat dukungan atau kewenangan keputusan yang tepat. Eskalasi dilakukan jika:</p><ul><li><strong>Penuntasan transfer Retention tidak sesuai jalur:</strong> Memengaruhi beban Hammam & kapasitas tim.</li><li><strong>Beban kerja Hammam tidak berkelanjutan:</strong> VP perlu tahu agar request bisnis ke tim CS dapat ditunda sementara.</li><li><strong>Waktu perbaikan Gusde terus terpotong:</strong> Eksekusi roadmap terancam, butuh pengaturan ekspektasi di tingkat organisasi.</li><li><strong>Tekanan adhoc eksternal:</strong> Mengganggu pelaksanaan rencana utama tim.</li></ul>' },
          { type: 'heading', text: 'Risiko Aktif & Mitigasi' },
          {
            type: 'table',
            columns: ['Risiko', 'Tingkat', 'Mitigasi'],
            rows: [
              ['Beban kerja Hammam M1-M2', 'Tinggi', 'Tinjau volume awal minggu; tunda request non-kritis; pastikan transfer Fairuz tuntas tepat waktu.'],
              ['Waktu perbaikan Gusde tersita', 'Sedang', 'Konfirmasi perpindahan report ke Hammam di M3; arahkan adhoc ke PIC; eskalasi VP di M4 jika masih terpotong.'],
              ['Keseimbangan 3 lini kerja Ocha', 'Sedang', 'Pantau project vs operasional; lindungi waktu project dari adhoc selama eksekusi.'],
              ['Celah pemahaman Fairuz', 'Sedang', 'Review Hari ke-30 untuk evaluasi utuh; kepemilikan penuh diberikan setelah celah tertutup.']
            ]
          },
          { type: 'heading', text: 'Inisiatif Strategis: Growth Ops Hub' },
          { type: 'text', html: '<p>Growth Ops Hub adalah inisiatif jangka panjang yang dipegang manager, bukan beban tambahan tim. Hub ini bertujuan menjadi <strong>Single Source of Truth</strong> untuk menata data yang tersebar.</p><p><strong>Pola Pengembangan:</strong> Mengikuti penyelesaian project besar tim (misal: Schema CS Gusde selesai -> masuk ke Hub). Tim mengerjakan project domainnya, Hub mengonsumsi hasilnya secara bertahap.</p><p><strong>Arah Lanjutan:</strong> Chatbot analitik dengan konteks dinamis yang mampu menjawab pertanyaan data langsung dengan menyatukan angka dan dokumentasi.</p>' }
        ]
      }
    }
  }

}; // end DATA
