/**
 * dashboard_context.js
 * Data terstruktur Dashboard Growth "All Brand" -- Apr 2026 MTD
 * Digunakan oleh chatbot AI untuk menjawab pertanyaan tentang data growth.
 * Update file ini setiap bulan sesuai data aktual.
 */

const DASHBOARD_CONTEXT = {
  meta: {
    periode: "Apr 2026 MTD",
    sumber: "[GROWTH] NEW DASHBOARD.xlsx",
    sheet_url: "https://docs.google.com/spreadsheets/d/1R-o96TKNnfxSR75BgKWFYLfydrTvK4qbzvwd2gokzxE/edit#gid=2144181734",
    brand_list: ["RATA", "TANAM", "VINIR"],
  },

  all_brand: {
    kpi: {
      total_chat: 91006,
      prospect: 4681,
      booking: 2034,
      visit: 1385,
      buy: "660+",
      cost_per_chat: "Rp 25.394",
    },
  },

  brands: {
    RATA: {
      kpi: {
        revenue: "Rp 2,77M (2.771.000.000)",
        chat: 15500,
        cost_per_chat: "Rp 17.329",
        conversion_chat_to_prospect: "19,4%",
        booking: 460,
        booking_to_visit: "98,5%",
      },
      pipeline: { chat: 15500, prospect: 3002, booking: 460, visit: 453, buy: "TBD" },
      weekly_breakdown: [
        { periode: "W1 1-7 Apr",  chat: "~9.000",  prospect: "~1.740", booking: "~265", visit: "~262" },
        { periode: "W2 8-12 Apr", chat: "~6.500",  prospect: "~1.262", booking: "~195", visit: "~191" },
        { periode: "W3-W4",       catatan: "Data tidak tersedia (hanya 12 hari aktif)" },
      ],
    },

    TANAM: {
      kpi: {
        revenue: "Rp 1,83M (1.829.835.000)",
        chat: 68858,
        cost_per_chat: "Rp 26.574",
        conversion_chat_to_prospect: "1,1%",
        buy: 604,
        visit_to_buy: "72,1%",
      },
      pipeline: { chat: 68858, prospect: 768, booking: 1411, visit: 838, buy: 604 },
      weekly_breakdown: [
        { periode: "W1 1-7 Apr",   chat: "~18.600", revenue: "~Rp 494jt" },
        { periode: "W2 8-14 Apr",  chat: "~19.200", revenue: "~Rp 510jt" },
        { periode: "W3 15-21 Apr", chat: "~17.800", revenue: "~Rp 472jt" },
        { periode: "W4 22-26 Apr", chat: "~13.258", revenue: "~Rp 354jt" },
      ],
    },

    VINIR: {
      kpi: {
        chat: 6648,
        cost_per_chat: "Rp 31.979",
        conversion_chat_to_prospect: "13,7%",
        booking_to_visit: "57,7%",
        buy: 56,
        basket_size: "Rp 32,2jt",
      },
      pipeline: { chat: 6648, prospect: 911, booking: 163, visit: 94, buy: 56 },
      weekly_breakdown: [
        { periode: "W1 1-7 Apr",   chat: "~1.605", buy: "~14" },
        { periode: "W2 8-14 Apr",  chat: "~1.907", buy: "~16" },
        { periode: "W3 15-21 Apr", chat: "~1.761", buy: "~15" },
        { periode: "W4 22-29 Apr", chat: "~1.375", buy: "~11" },
      ],
    },
  },

  budget_cost: {
    TANAM: { budget: "Rp 1.829.835.000", cost_per_chat: "Rp 26.574" },
    RATA:  { budget: "Rp 268.600.000",   cost_per_chat: "Rp 17.329" },
    VINIR: { budget: "Rp 212.600.000",   cost_per_chat: "Rp 31.979" },
  },

  metrics_snapshot: [
    { metric: "Chat",      TANAM: 68858,    RATA: 15500,   VINIR: 6648   },
    { metric: "Prospect",  TANAM: 768,      RATA: 3002,    VINIR: 911    },
    { metric: "Booking",   TANAM: 1411,     RATA: 460,     VINIR: 163    },
    { metric: "Visit",     TANAM: 838,      RATA: 453,     VINIR: 94     },
    { metric: "% C ke P",  TANAM: "1,1%",   RATA: "19,4%", VINIR: "13,7%"},
    { metric: "% B ke V",  TANAM: "59,4%",  RATA: "98,5%", VINIR: "57,7%"},
    { metric: "% V ke Buy",TANAM: "72,1%",  RATA: "-",     VINIR: "-"    },
    { metric: "Buy",       TANAM: 604,      RATA: "TBD",   VINIR: 56     },
    { metric: "Cost/Chat", TANAM: "Rp 26.574", RATA: "Rp 17.329", VINIR: "Rp 31.979" },
    { metric: "Revenue",   TANAM: "Rp 1,83M",  RATA: "Rp 2,77M",  VINIR: "-" },
  ],
};

/**
 * Menghasilkan array of blocks per brand untuk chatbot context scoring.
 * Setiap brand jadi block terpisah agar tidak terpotong saat slice.
 */
function getDashboardContextBlocks() {
  var d = DASHBOARD_CONTEXT;
  var b = d.brands;

  var allBrandText = [
    "DASHBOARD GROWTH ALL BRAND - " + d.meta.periode,
    "Sumber: " + d.meta.sumber,
    "Brand aktif: " + d.meta.brand_list.join(", "),
    "Total Chat All Brand: " + d.all_brand.kpi.total_chat.toLocaleString("id-ID"),
    "Prospect All Brand: " + d.all_brand.kpi.prospect.toLocaleString("id-ID"),
    "Booking All Brand: " + d.all_brand.kpi.booking.toLocaleString("id-ID"),
    "Visit All Brand: " + d.all_brand.kpi.visit.toLocaleString("id-ID"),
    "Buy All Brand: " + d.all_brand.kpi.buy,
    "Cost per Chat All Brand: " + d.all_brand.kpi.cost_per_chat,
  ].join("\n");

  var rataTxt = [
    "DASHBOARD GROWTH RATA - " + d.meta.periode,
    "Brand RATA",
    "Revenue RATA: " + b.RATA.kpi.revenue,
    "Chat RATA: " + b.RATA.kpi.chat.toLocaleString("id-ID"),
    "Cost per Chat RATA: " + b.RATA.kpi.cost_per_chat,
    "Konversi Chat ke Prospect RATA: " + b.RATA.kpi.conversion_chat_to_prospect,
    "Booking RATA: " + b.RATA.kpi.booking,
    "Booking ke Visit RATA: " + b.RATA.kpi.booking_to_visit,
    "Pipeline RATA: Chat " + b.RATA.pipeline.chat.toLocaleString("id-ID") + " -> Prospect " + b.RATA.pipeline.prospect.toLocaleString("id-ID") + " -> Booking " + b.RATA.pipeline.booking + " -> Visit " + b.RATA.pipeline.visit + " -> Buy " + b.RATA.pipeline.buy,
    "Budget RATA: " + d.budget_cost.RATA.budget,
    "Weekly RATA: " + b.RATA.weekly_breakdown.map(function(w) {
      return w.catatan ? (w.periode + ": " + w.catatan) : (w.periode + ": Chat " + w.chat + ", Prospect " + w.prospect + ", Booking " + w.booking + ", Visit " + w.visit);
    }).join(" | "),
  ].join("\n");

  var tanamTxt = [
    "DASHBOARD GROWTH TANAM - " + d.meta.periode,
    "Brand TANAM",
    "Revenue TANAM: " + b.TANAM.kpi.revenue,
    "Chat TANAM: " + b.TANAM.kpi.chat.toLocaleString("id-ID"),
    "Cost per Chat TANAM: " + b.TANAM.kpi.cost_per_chat,
    "Konversi Chat ke Prospect TANAM: " + b.TANAM.kpi.conversion_chat_to_prospect,
    "Buy TANAM: " + b.TANAM.kpi.buy,
    "Visit ke Buy TANAM: " + b.TANAM.kpi.visit_to_buy,
    "Pipeline TANAM: Chat " + b.TANAM.pipeline.chat.toLocaleString("id-ID") + " -> Prospect " + b.TANAM.pipeline.prospect.toLocaleString("id-ID") + " -> Booking " + b.TANAM.pipeline.booking.toLocaleString("id-ID") + " -> Visit " + b.TANAM.pipeline.visit + " -> Buy " + b.TANAM.pipeline.buy,
    "Budget TANAM: " + d.budget_cost.TANAM.budget,
    "Weekly TANAM: " + b.TANAM.weekly_breakdown.map(function(w) {
      return w.periode + ": Chat " + w.chat + ", Revenue " + w.revenue;
    }).join(" | "),
  ].join("\n");

  var vinirTxt = [
    "DASHBOARD GROWTH VINIR - " + d.meta.periode,
    "Brand VINIR",
    "Chat VINIR: " + b.VINIR.kpi.chat.toLocaleString("id-ID"),
    "Cost per Chat VINIR: " + b.VINIR.kpi.cost_per_chat,
    "Konversi Chat ke Prospect VINIR: " + b.VINIR.kpi.conversion_chat_to_prospect,
    "Booking ke Visit VINIR: " + b.VINIR.kpi.booking_to_visit,
    "Buy VINIR: " + b.VINIR.kpi.buy,
    "Basket Size VINIR: " + b.VINIR.kpi.basket_size,
    "Pipeline VINIR: Chat " + b.VINIR.pipeline.chat.toLocaleString("id-ID") + " -> Prospect " + b.VINIR.pipeline.prospect + " -> Booking " + b.VINIR.pipeline.booking + " -> Visit " + b.VINIR.pipeline.visit + " -> Buy " + b.VINIR.pipeline.buy,
    "Budget VINIR: " + d.budget_cost.VINIR.budget,
    "Weekly VINIR: " + b.VINIR.weekly_breakdown.map(function(w) {
      return w.periode + ": Chat " + w.chat + ", Buy " + w.buy;
    }).join(" | "),
  ].join("\n");

  var compareTxt = [
    "PERBANDINGAN ANTAR BRAND - " + d.meta.periode,
    d.metrics_snapshot.map(function(r) {
      return r.metric + ": TANAM=" + r.TANAM + ", RATA=" + r.RATA + ", VINIR=" + r.VINIR;
    }).join("\n"),
    "Budget: TANAM " + d.budget_cost.TANAM.budget + ", RATA " + d.budget_cost.RATA.budget + ", VINIR " + d.budget_cost.VINIR.budget,
  ].join("\n");

  return [
    { type: "text", html: allBrandText },
    { type: "text", html: rataTxt },
    { type: "text", html: tanamTxt },
    { type: "text", html: vinirTxt },
    { type: "text", html: compareTxt },
  ];
}

function getDashboardContextText() {
  return getDashboardContextBlocks().map(function(b) { return b.html; }).join("\n\n---\n\n");
}
