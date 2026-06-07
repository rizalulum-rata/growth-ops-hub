"""
generate_implant_data.py
Refresh data Project "Monitoring proporsi kasus Implant Gigi" untuk Growth Ops Hub.
Baca sheet `newchat_tanam` (live via service account) -> tulis 2 file:
  - implant_data.js     : full per-client untuk chart/filter
  - implant_context.js  : ringkasan agregat untuk chatbot

Cara pakai:
  pip install gspread google-auth openpyxl
  python generate_implant_data.py            # baca dari Google Sheet (butuh credentials.json)
  python generate_implant_data.py file.xlsx  # baca dari file xlsx lokal (sheet newchat_tanam)
"""
import sys, json
from collections import Counter, defaultdict

SHEET_ID  = "1GZh55Do0YPg6exEFlLRYp-1hJQfNv1TWvzKD-xzNm-I"  # ganti kalau beda
WS_NAME   = "newchat_tanam"
CREDS     = "credentials.json"
TIERS = ["simple", "moderate", "complex", "rahang"]
TAGS  = ["\U0001F525 HOT", "\U0001F7E1 WARM", "\U0001F5D3️ NEED FU", "\U0001F47B GHOSTED"]


def load_rows():
    if len(sys.argv) > 1:
        import openpyxl
        wb = openpyxl.load_workbook(sys.argv[1], data_only=True)
        ws = wb[WS_NAME]
        return [list(r) for r in ws.iter_rows(values_only=True)]
    import gspread
    from google.oauth2.service_account import Credentials
    creds = Credentials.from_service_account_file(CREDS, scopes=["https://www.googleapis.com/auth/spreadsheets"])
    gc = gspread.authorize(creds)
    return gc.open_by_key(SHEET_ID).worksheet(WS_NAME).get_all_values()


def main():
    raw = load_rows()
    hdr = [str(h).strip() for h in raw[0]]
    ix = {h: i for i, h in enumerate(hdr)}
    def g(r, c):
        i = ix.get(c); v = r[i] if i is not None else None
        return "" if v is None else str(v).strip()

    data, dates = [], []
    for r in raw[1:]:
        if not g(r, "client"):
            continue
        d = g(r, "date")[:10]; dates.append(d)
        data.append([d, g(r, "Group Loc") or "Unknown", g(r, "Loc") or "Unknown",
                     1 if g(r, "Active") == "YES" else 0, 1 if g(r, "Prospect") == "YES" else 0,
                     g(r, "ProspectTag"), 1 if g(r, "Booking") == "YES" else 0,
                     g(r, "Hilang Tier"), g(r, "Implan Tier")])
    N = len(data); dmin, dmax = min(dates), max(dates)

    with open("implant_data.js", "w", encoding="utf-8") as f:
        f.write("/* implant_data.js (auto). Kolom: date,groupLoc,loc,active,prospect,tag,booking,hilangTier,implanTier */\n")
        f.write("window.IMPLANT_META=%s;\n" % json.dumps({"periode": dmin + " s/d " + dmax, "total": N, "sumber": WS_NAME}, ensure_ascii=False))
        f.write("window.IMPLANT_ROWS=" + json.dumps(data, ensure_ascii=False) + ";\n")

    def pct(x, y): return f"{round(100*x/y)}%" if y else "-"
    a = dict(active=sum(r[3] for r in data), prospect=sum(r[4] for r in data), booking=sum(r[6] for r in data))
    tag = Counter(); tagBook = Counter()
    for r in data:
        if r[4]:
            tag[r[5]] += 1; tagBook[r[5]] += 1 if r[6] else 0
    L = []
    L.append(f"PERIODE: {dmin} s/d {dmax} | total client: {N}")
    L.append(f"FUNNEL: Chat {N} -> Active {a['active']} ({pct(a['active'],N)}) -> Prospect {a['prospect']} ({pct(a['prospect'],a['active'])} dari active) -> Booking {a['booking']} ({pct(a['booking'],a['prospect'])} dari prospect).")
    L.append("PROSPECT TAG (jumlah | booking):")
    for t in TAGS:
        L.append(f"  {t}: {tag[t]} | booking {tagBook[t]} ({pct(tagBook[t],tag[t])})")
    hd = Counter(r[7] for r in data if r[7] in TIERS); idd = Counter(r[8] for r in data if r[8] in TIERS)
    L.append("HILANG TIER: " + ", ".join(f"{t} {hd[t]}" for t in TIERS))
    L.append("IMPLAN TIER: " + ", ".join(f"{t} {idd[t]}" for t in TIERS))
    L.append("PROPORSI IMPLAN TIER per tahap funnel:")
    for nm, fl in [("Chat", lambda r: True), ("Active", lambda r: r[3]), ("Prospect", lambda r: r[4]), ("Booking", lambda r: r[6])]:
        sub = [r for r in data if fl(r)]; c = Counter(r[8] if r[8] in TIERS else "Tanpa tier" for r in sub); tot = len(sub)
        L.append("  " + nm + f" (n={tot}): " + ", ".join(f"{t} {c[t]} ({pct(c[t],tot)})" for t in TIERS + ["Tanpa tier"]))
    bImp = Counter(r[8] for r in data if r[6] and r[8] in TIERS)
    L.append("BOOKING per Implan Tier: " + ", ".join(f"{t} {bImp[t]}" for t in TIERS))
    gl = defaultdict(lambda: [0, 0, 0, 0])
    for r in data:
        o = gl[r[1]]; o[0] += 1; o[1] += r[3]; o[2] += r[4]; o[3] += r[6]
    L.append("Per GROUP LOC (chat/active/prospect/booking, book rate):")
    for k in sorted(gl, key=lambda x: -gl[x][3]):
        o = gl[k]; L.append(f"  {k}: {o[0]}/{o[1]}/{o[2]}/{o[3]} ({pct(o[3],o[2])})")
    loc = defaultdict(lambda: [0, 0, 0, 0])
    for r in data:
        o = loc[r[2]]; o[0] += 1; o[1] += r[3]; o[2] += r[4]; o[3] += r[6]
    top = sorted(loc.items(), key=lambda x: (-x[1][3], -x[1][2]))[:10]
    L.append("TOP 10 LOKASI (booking): " + "; ".join(f"{k} (book {v[3]}, prospect {v[2]})" for k, v in top))
    mtx = defaultdict(Counter)
    for r in data:
        ht = r[7] if r[7] in TIERS else "Tanpa tier"; it = r[8] if r[8] in TIERS else "Tanpa tier"
        if r[7] or r[8]:
            mtx[ht][it] += 1
    L.append("MATRIKS Hilang->Implan (baris Hilang):")
    for ht in TIERS + ["Tanpa tier"]:
        L.append("  " + ht + ": " + ", ".join(f"{it} {mtx[ht][it]}" for it in TIERS + ["Tanpa tier"]))
    # per Group Loc: implan tier dist + booking per tier
    gtier = defaultdict(lambda: [Counter(), Counter()])  # [dist, booking]
    for r in data:
        if r[8] in TIERS:
            gtier[r[1]][0][r[8]] += 1
            if r[6]:
                gtier[r[1]][1][r[8]] += 1
    L.append("IMPLAN TIER per GROUP LOC (urutan s/m/c/r) -> dist | booking:")
    for k in sorted(gtier, key=lambda x: -sum(gtier[x][1].values())):
        d, b = gtier[k]
        L.append("  " + k + ": dist " + "/".join(str(d[t]) for t in TIERS) + " | booking " + "/".join(str(b[t]) for t in TIERS))
    locB = defaultdict(Counter); locBtot = Counter()
    for r in data:
        if r[6]:
            locBtot[r[2]] += 1
            if r[8] in TIERS:
                locB[r[2]][r[8]] += 1
    L.append("BOOKING per Implan Tier per LOKASI (lokasi yang ada booking):")
    for k in sorted(locBtot, key=lambda x: -locBtot[x]):
        L.append("  " + k + " (booking " + str(locBtot[k]) + "): " + ", ".join(f"{t} {locB[k][t]}" for t in TIERS))
    L.append("CATATAN: 'Tanpa tier' = belum/tidak balas atau jawaban tidak jelas. Tier: simple 1-2, moderate 3-4, complex 5-8, rahang >=9/se-rahang. Untuk slice lain (mis. tier per tahap per lokasi, per tanggal), pakai filter di dashboard.")
    ctx = "\n".join(L)
    with open("implant_context.js", "w", encoding="utf-8") as f:
        f.write("/* implant_context.js (auto) ringkasan agregat untuk chatbot */\n")
        f.write("const IMPLANT_CONTEXT_TEXT = " + json.dumps(ctx, ensure_ascii=False) + ";\n")
    print(f"OK. implant_data.js ({N} baris) + implant_context.js ditulis.")


if __name__ == "__main__":
    main()
