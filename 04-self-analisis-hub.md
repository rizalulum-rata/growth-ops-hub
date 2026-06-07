# Self Analisis di Hub: Project Monitoring Implant Gigi

Panduan analisa mandiri lewat hub. Dua alat: **dashboard** (visual, buat lihat pola) dan **chatbot** (tanya jawab angka). Keduanya pakai data yang sama: `newchat_tanam`, 1700 client.

## Yang dipantau

Tiap client punya: lokasi, tahap funnel (chat / active / prospect / booking), tag prospect, dan tier klinis (Hilang Tier + Implan Tier). Tier: simple 1-2 gigi, moderate 3-4, complex 5-8, rahang >=9 atau se-rahang. "Tanpa tier" = belum balas atau jawaban tidak jelas.

## Kapan pakai dashboard vs chatbot

| Mau | Pakai |
|---|---|
| Lihat pola, tren, proporsi visual | Dashboard (tab Project) |
| Filter spesifik (lokasi x tier x tanggal) | Dashboard, pakai filter di atas |
| Tanya angka cepat tanpa klik | Chatbot |
| Breakdown per lokasi / per Group Loc | Chatbot atau filter dashboard |
| Slice yang tidak ada di chatbot (mis. per tanggal) | Dashboard filter |

Aturan praktis: chatbot tahu angka agregat yang sudah dihitung. Untuk irisan yang lebih halus (tanggal tertentu, kombinasi filter), pakai dashboard.

## Yang chatbot sudah tahu (tanpa perlu buka dashboard)

Konteks agregat sudah ditanam ke chatbot. Jadi bisa langsung dijawab:

| Topik | Contoh pertanyaan |
|---|---|
| Funnel | "Berapa konversi prospect ke booking?" |
| Tag prospect | "Booking paling banyak dari tag apa?" |
| Distribusi tier | "Sebaran Implan Tier gimana?" |
| Tier per tahap | "Proporsi tier di tahap booking beda ga sama di chat?" |
| Booking per tier | "Booking paling banyak tier apa?" |
| Per Group Loc | "Internal vs B2B, mana yang booking-nya lebih besar?" |
| Top lokasi | "10 lokasi dengan booking terbanyak?" |
| Matriks transisi | "Yang hilang complex, rencana implannya jadi tier apa?" |
| Tier per lokasi | "Tangerang booking per tier berapa?" |
| Tier per Group Loc | "Internal, booking-nya tier apa aja?" |

## Cara nanya yang bagus

| Kurang bagus | Lebih bagus | Kenapa |
|---|---|---|
| "gimana datanya" | "Booking per tier di Bali berapa?" | spesifik, ada angka pasti |
| "lokasi terbaik" | "Lokasi mana book-rate tertinggi?" | "terbaik" ambigu, sebut metriknya |
| "kenapa rendah" | "Lokasi mana prospect banyak tapi booking sedikit?" | minta data, bukan opini |

Chatbot ingat percakapan sebelumnya. Jadi boleh lanjut: tanya "Tangerang per tier?" lalu lanjut "kalau Bali?" tanpa ulang konteks.

## Batas yang perlu diingat

- Angka chatbot = snapshot terakhir generate. Kalau data sheet berubah, jalankan ulang `generate_implant_data.py` lalu reload hub.
- "Tanpa tier" bukan nol dan bukan error. Itu client yang belum balas atau jawabannya tidak bisa dipastikan. Jangan dibaca sebagai "0 gigi".
- Chatbot tidak hitung slice baru sendiri. Kalau butuh irisan yang tidak ada di daftar atas (mis. booking per tier per tanggal), pakai filter dashboard.
- Lokasi dengan booking kecil (1-2) jangan ditarik jadi kesimpulan tren. Sampelnya terlalu kecil.

## Baca dashboard singkat

| Tab | Isi | Buat jawab |
|---|---|---|
| Overview | Funnel + sumber booking per tag | "bocor di tahap mana?" |
| Sankey | Aliran tier dari chat sampai booking | "tier mana yang paling lolos ke booking?" |
| Prospect | Komposisi tag + performa lokasi | "tag mana paling worth di-follow up?" |
| Clinical | Distribusi tier + matriks Hilang ke Implan | "kasus berat dominan atau enggak?" |

Filter di atas (Group Loc, Loc, Tag, Hilang, Implan, tanggal) berlaku ke semua tab sekaligus. Jadi bisa kunci satu lokasi lalu lihat semua tab buat lokasi itu saja.

## Alur refresh data

1. Update sheet `newchat_tanam` (hasil ekstraksi notebook).
2. Jalankan `python generate_implant_data.py` (atau dengan argumen file xlsx).
3. Itu menulis ulang `implant_data.js` (dashboard) + `implant_context.js` (chatbot).
4. Reload hub (Ctrl+Shift+R) biar file baru ke-load.

Sesudah itu dashboard dan chatbot pakai angka terbaru.
