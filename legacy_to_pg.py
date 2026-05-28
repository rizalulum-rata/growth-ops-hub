"""
ETL: Legacy Excel → PostgreSQL (Star Schema)
Extracts March & April 2026 data from [GROWTH] NEW DASHBOARD.xlsx
Loads into database 'dashboard' at 127.0.0.1:5432

Sheet Column Mapping (verified from inspection):
=================================================
Planned Order (right side):
  Q: Product Title, R: Qty, T: Status, U: Business Grouping (TANAM/RATA/VINIR)
  V: Service Grouping (Crown/Implant/Bonegraft/Aligner/Veneer)
  W: Subtotal (per line item), X: Total (per customer), AB: Date Regrup
  AG: Group Klinik (Internal/B2B), Z: Jumlah Gigi Total, AA: Regroup 1

prospek_tanam: A=Date, C=No prospek, D=prospek (float)
prospek_vinir: A=Date, C=Prospek Return, D=Prospek New, E=Prospek NR
raw_compile rata: J=Tanggal ke Klinik, F=Upgrade Status, D=Payment Status, N=Price, T=Group, Y=Grouping Index New
simply_tanam: N=Date Scheduled, U=Group (row starts at row 3 because row 2 is header repeat)
raw_sch_rata: M=Date, C=Booking, D=Visit, T=Group
raw_pasien visit vinir: A=Tanggal, F=Upgrade, H=Dealing (qty), N=Total Dealing
chat_budget_tanam: A=Date, C=Total Chat, D=Budget
chat_budget_rata: A=Date, C=Total Chat, D=Budget, E=Internal, F=B2B Int
chat_budget_vinir: A=Date, C=Total Chat, F=Budget
cost_tanam: A=Date, B=Cost
cost_rata: A=date, B=cost
daily_cash: B=date, C=Treatment, D=Veneer, E=Tanam
"""

import pandas as pd
import numpy as np
from sqlalchemy import create_engine, text
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

_u = os.getenv('DB_USER', 'postgres')
_p = os.getenv('DB_PASSWORD')
_h = os.getenv('DB_HOST', '127.0.0.1')
_port = os.getenv('DB_PORT', '5432')
_db = os.getenv('DB_NAME', 'dashboard')
ENGINE = create_engine(f'postgresql://{_u}:{_p}@{_h}:{_port}/{_db}')
FILE = r"C:\Users\RATAMATE\Documents\DOCUMENTATION\growth-ops-hub\referensi\Data Existing\[GROWTH] NEW DASHBOARD.xlsx"

# Brand/Channel IDs (from dim_brand & dim_channel seed)
BID = {'TANAM': 1, 'RATA': 2, 'VINIR': 3}
CID = {'Internal': 1, 'B2B': 2}  # simplified

def to_date(s):
    """Parse to datetime, coerce errors."""
    return pd.to_datetime(s, errors='coerce')

def mar_apr_26(df, col):
    """Filter DataFrame to March & April 2026 on given date column."""
    df[col] = to_date(df[col])
    mask = (df[col].dt.year == 2026) & (df[col].dt.month.isin([3, 4]))
    return df[mask].copy()

# ─────────────────────────────────────────────────────────────────
# 0. TRUNCATE existing data for idempotency
# ─────────────────────────────────────────────────────────────────
print("Truncating tables...")
with ENGINE.begin() as c:
    for t in ['fact_funnel', 'fact_sales_and_revenue', 'fact_cash_collection', 'fact_marketing_cost', 'fact_targets']:
        c.execute(text(f"TRUNCATE {t} RESTART IDENTITY CASCADE"))

# ─────────────────────────────────────────────────────────────────
# 1. FACT_FUNNEL — Chat, Prospect, Booking, Visit, Buy
# ─────────────────────────────────────────────────────────────────
print("\n── FACT FUNNEL ──")

funnel_rows = []

# --- TANAM ---
print("  Loading chat_budget_tanam...")
df = pd.read_excel(FILE, sheet_name='chat_budget_tanam')
df = mar_apr_26(df, 'Date')
if not df.empty:
    daily = df.groupby(df['Date'].dt.date).agg(
        chat_count=('Total Chat', 'first')  # already daily aggregate
    ).reset_index().rename(columns={'Date': 'date'})
    daily['chat_count'] = pd.to_numeric(daily['chat_count'], errors='coerce').fillna(0).astype(int)

    # Prospect from prospek_tanam
    print("  Loading prospek_tanam...")
    df_p = pd.read_excel(FILE, sheet_name='prospek_tanam')
    df_p = mar_apr_26(df_p, 'Date')
    if not df_p.empty:
        p_daily = df_p.groupby(df_p['Date'].dt.date)['prospek'].sum().reset_index(name='prospect_count')
        p_daily.rename(columns={'Date': 'date'}, inplace=True)
        p_daily['prospect_count'] = pd.to_numeric(p_daily['prospect_count'], errors='coerce').fillna(0).astype(int)
        daily = daily.merge(p_daily, on='date', how='left')
    else:
        daily['prospect_count'] = 0

    # Booking & Visit from simply_tanam
    print("  Loading simply_tanam...")
    df_s = pd.read_excel(FILE, sheet_name='simply_tanam', header=1)  # header at row 2
    date_col = 'Date Scheduled' if 'Date Scheduled' in df_s.columns else df_s.columns[0]
    df_s = mar_apr_26(df_s, date_col)
    if not df_s.empty:
        s_daily = df_s.groupby(df_s[date_col].dt.date).size().reset_index(name='booking_count')
        s_daily.rename(columns={date_col: 'date'}, inplace=True)
        daily = daily.merge(s_daily, on='date', how='left')
        daily['visit_count'] = daily['booking_count']  # will refine later with actual visit status
    else:
        daily['booking_count'] = 0
        daily['visit_count'] = 0

    daily['buy_count'] = 0  # will be filled from Planned Order
    daily['dim_brand_id'] = BID['TANAM']
    daily['dim_channel_id'] = CID['Internal']
    daily = daily.fillna(0)
    funnel_rows.append(daily[['date','dim_brand_id','dim_channel_id','chat_count','prospect_count','booking_count','visit_count','buy_count']])
    print(f"  TANAM funnel: {len(daily)} days")

# --- RATA ---
print("  Loading chat_budget_rata...")
df = pd.read_excel(FILE, sheet_name='chat_budget_rata')
df = mar_apr_26(df, 'Date')
if not df.empty:
    daily = df.groupby(df['Date'].dt.date).agg(
        chat_count=('Total Chat', 'first')
    ).reset_index().rename(columns={'Date': 'date'})
    daily['chat_count'] = pd.to_numeric(daily['chat_count'], errors='coerce').fillna(0).astype(int)

    # Booking & Visit from raw_sch_rata (dual-header: row 1=label, row 2=sub-label, data starts row 3)
    # Actual structure: col A=Date, C=Booking, D=Visit (numeric daily aggregates)
    print("  Loading raw_sch_rata...")
    df_r = pd.read_excel(FILE, sheet_name='raw_sch_rata', header=None, skiprows=2)
    # After skipping 2 header rows: col 0=Date, 2=Booking, 3=Visit
    df_r.columns = range(len(df_r.columns))
    df_r.rename(columns={0: 'date_raw', 2: 'booking', 3: 'visit'}, inplace=True)
    df_r['date_raw'] = to_date(df_r['date_raw'])
    mask_r = (df_r['date_raw'].dt.year == 2026) & (df_r['date_raw'].dt.month.isin([3, 4]))
    df_r = df_r[mask_r].copy()
    if not df_r.empty:
        df_r['booking'] = pd.to_numeric(df_r['booking'], errors='coerce').fillna(0).astype(int)
        df_r['visit'] = pd.to_numeric(df_r['visit'], errors='coerce').fillna(0).astype(int)
        r_daily = df_r.groupby(df_r['date_raw'].dt.date).agg(
            booking_count=('booking', 'sum'),
            visit_count=('visit', 'sum')
        ).reset_index().rename(columns={'date_raw': 'date'})
        daily = daily.merge(r_daily, on='date', how='left')
    else:
        daily['booking_count'] = 0
        daily['visit_count'] = 0

    # Buy from raw_compile rata (col F = Upgrade Status, 'upgrade' = bought)
    print("  Loading raw_compile rata for Buy...")
    df_rc = pd.read_excel(FILE, sheet_name='raw_compile rata')
    df_rc = mar_apr_26(df_rc, 'TANGGAL KE KLINIK')
    if not df_rc.empty:
        rc_buy = df_rc[df_rc['Upgrade Status'].str.lower().str.strip() == 'upgrade']
        buy_daily = rc_buy.groupby(rc_buy['TANGGAL KE KLINIK'].dt.date).size().reset_index(name='buy_count')
        buy_daily.rename(columns={'TANGGAL KE KLINIK': 'date'}, inplace=True)
        daily = daily.merge(buy_daily, on='date', how='left')
    else:
        daily['buy_count'] = 0

    daily['prospect_count'] = daily['chat_count']  # RATA uses chat as proxy for prospect
    daily['dim_brand_id'] = BID['RATA']
    daily['dim_channel_id'] = CID['Internal']
    daily = daily.fillna(0)
    funnel_rows.append(daily[['date','dim_brand_id','dim_channel_id','chat_count','prospect_count','booking_count','visit_count','buy_count']])
    print(f"  RATA funnel: {len(daily)} days")

# --- VINIR ---
print("  Loading chat_budget_vinir...")
df = pd.read_excel(FILE, sheet_name='chat_budget_vinir')
df = mar_apr_26(df, 'Date')
if not df.empty:
    daily = df.groupby(df['Date'].dt.date).agg(
        chat_count=('Total Chat', 'first')
    ).reset_index().rename(columns={'Date': 'date'})
    daily['chat_count'] = pd.to_numeric(daily['chat_count'], errors='coerce').fillna(0).astype(int)

    # Prospect from prospek_vinir
    print("  Loading prospek_vinir...")
    df_pv = pd.read_excel(FILE, sheet_name='prospek_vinir')
    df_pv = mar_apr_26(df_pv, 'Date')
    if not df_pv.empty:
        pv_daily = df_pv.groupby(df_pv['Date'].dt.date).agg(
            prospect_count=('Prospek NR', 'sum')
        ).reset_index().rename(columns={'Date': 'date'})
        pv_daily['prospect_count'] = pd.to_numeric(pv_daily['prospect_count'], errors='coerce').fillna(0).astype(int)
        daily = daily.merge(pv_daily, on='date', how='left')
    else:
        daily['prospect_count'] = 0

    # Visit & Buy from raw_pasien visit vinir
    print("  Loading raw_pasien visit vinir...")
    df_v = pd.read_excel(FILE, sheet_name='raw_pasien visit vinir')
    df_v = mar_apr_26(df_v, 'Tanggal')
    if not df_v.empty:
        v_daily = df_v.groupby(df_v['Tanggal'].dt.date).agg(
            visit_count=('Tanggal', 'size'),
            buy_count=('Upgrade', lambda x: (x.str.lower() == 'upgrade').sum())
        ).reset_index().rename(columns={'Tanggal': 'date'})
        daily = daily.merge(v_daily, on='date', how='left')
    else:
        daily['visit_count'] = 0
        daily['buy_count'] = 0

    daily['booking_count'] = daily.get('visit_count', 0)  # Vinir booking ≈ visit
    daily['dim_brand_id'] = BID['VINIR']
    daily['dim_channel_id'] = CID['Internal']
    daily = daily.fillna(0)
    funnel_rows.append(daily[['date','dim_brand_id','dim_channel_id','chat_count','prospect_count','booking_count','visit_count','buy_count']])
    print(f"  VINIR funnel: {len(daily)} days")

if funnel_rows:
    df_funnel = pd.concat(funnel_rows, ignore_index=True)
    for col in ['chat_count','prospect_count','booking_count','visit_count','buy_count']:
        df_funnel[col] = df_funnel[col].astype(int)
    df_funnel.to_sql('fact_funnel', ENGINE, if_exists='append', index=False)
    print(f"✅ fact_funnel: {len(df_funnel)} rows inserted")

# ─────────────────────────────────────────────────────────────────
# 2. FACT_SALES_AND_REVENUE
#    TANAM: from Planned Order (Business Grouping = TANAM)
#    RATA:  from raw_compile rata (Price col N, Upgrade Status col F)
#    VINIR: from raw_pasien visit vinir (Total Dealing col N)
# ─────────────────────────────────────────────────────────────────
print("\n-- FACT SALES & REVENUE --")
sales_all = []

# --- TANAM from Planned Order ---
print("  Loading Planned Order (TANAM)...")
df_po = pd.read_excel(FILE, sheet_name='Planned Order')
col_map = {
    'Planned Order Product__title': 'product_title',
    'Planned Order Product__quantity': 'qty',
    'Planned Order Product__subtotal': 'subtotal',
    'Business Grouping': 'brand',
    'Service Grouping': 'service',
    'Date Regrup': 'date',
    'Group Klinik': 'group_klinik',
    'Jumlah Gigi Total': 'jumlah_gigi',
    'Regroup 1': 'regroup1',
}
for old, new in col_map.items():
    if old in df_po.columns:
        df_po.rename(columns={old: new}, inplace=True)

df_po = mar_apr_26(df_po, 'date')
print(f"  Planned Order Mar-Apr 2026: {len(df_po)} rows")

if not df_po.empty:
    df_po['subtotal'] = pd.to_numeric(df_po['subtotal'], errors='coerce').fillna(0)
    df_po['qty'] = pd.to_numeric(df_po['qty'], errors='coerce').fillna(0).astype(int)
    df_po['jumlah_gigi'] = pd.to_numeric(df_po['jumlah_gigi'], errors='coerce').fillna(0).astype(int)

    for _, row in df_po.iterrows():
        brand = str(row.get('brand', '')).strip().upper()
        if brand != 'TANAM':
            continue
        service = str(row.get('service', '')).strip()
        group = str(row.get('group_klinik', '')).strip()
        regroup = str(row.get('regroup1', '')).strip().lower()
        is_rahang = 'all in' in regroup or regroup == 'od' or 'rahang' in regroup
        tt_id = 2 if is_rahang else (1 if 'implant' in service.lower() else 1)

        sales_all.append({
            'date': row['date'].date() if hasattr(row['date'], 'date') else row['date'],
            'dim_brand_id': BID['TANAM'],
            'dim_channel_id': CID.get(group, 1),
            'dim_treatment_type_id': tt_id,
            'implant_qty': row['qty'],
            'revenue_amount': row['subtotal'],
            'payment_status': 'NEW',
            'is_rahang': is_rahang
        })
    print(f"  TANAM sales rows: {len([r for r in sales_all if r['dim_brand_id']==1])}")

# --- RATA from raw_compile rata ---
print("  Loading raw_compile rata (RATA revenue)...")
df_rc = pd.read_excel(FILE, sheet_name='raw_compile rata')
df_rc = mar_apr_26(df_rc, 'TANGGAL KE KLINIK')
if not df_rc.empty:
    # Only rows with Upgrade Status = 'upgrade' count as revenue
    df_rc_buy = df_rc[df_rc['Upgrade Status'].str.lower().str.strip() == 'upgrade'].copy()
    df_rc_buy['Price'] = pd.to_numeric(df_rc_buy['Price'], errors='coerce').fillna(0)
    group_col = 'Grouping Index New' if 'Grouping Index New' in df_rc_buy.columns else 'Group'
    for _, row in df_rc_buy.iterrows():
        grp = str(row.get(group_col, 'Internal')).strip()
        sales_all.append({
            'date': row['TANGGAL KE KLINIK'].date() if hasattr(row['TANGGAL KE KLINIK'], 'date') else row['TANGGAL KE KLINIK'],
            'dim_brand_id': BID['RATA'],
            'dim_channel_id': CID.get(grp, 1),
            'dim_treatment_type_id': 3,  # Aligner
            'implant_qty': 0,
            'revenue_amount': row['Price'],
            'payment_status': str(row.get('Payment Status', '')),
            'is_rahang': False
        })
    print(f"  RATA sales rows: {len(df_rc_buy)}")

# --- VINIR from raw_pasien visit vinir ---
print("  Loading raw_pasien visit vinir (VINIR revenue)...")
df_vv = pd.read_excel(FILE, sheet_name='raw_pasien visit vinir')
df_vv = mar_apr_26(df_vv, 'Tanggal')
if not df_vv.empty:
    df_vv_buy = df_vv[df_vv['Upgrade'].str.lower().str.strip() == 'upgrade'].copy()
    df_vv_buy['Total Dealing'] = pd.to_numeric(df_vv_buy['Total Dealing'], errors='coerce').fillna(0)
    for _, row in df_vv_buy.iterrows():
        sales_all.append({
            'date': row['Tanggal'].date() if hasattr(row['Tanggal'], 'date') else row['Tanggal'],
            'dim_brand_id': BID['VINIR'],
            'dim_channel_id': CID['Internal'],
            'dim_treatment_type_id': 4,  # Veneer
            'implant_qty': 0,
            'revenue_amount': row['Total Dealing'],
            'payment_status': str(row.get('Payment', '')),
            'is_rahang': False
        })
    print(f"  VINIR sales rows: {len(df_vv_buy)}")

if sales_all:
    df_sales = pd.DataFrame(sales_all)
    df_sales.to_sql('fact_sales_and_revenue', ENGINE, if_exists='append', index=False)
    print(f"  fact_sales_and_revenue TOTAL: {len(df_sales)} rows inserted")

# ─────────────────────────────────────────────────────────────────
# 3. FACT_MARKETING_COST
# ─────────────────────────────────────────────────────────────────
print("\n── FACT MARKETING COST ──")
mkt_rows = []

for brand, sheet, budget_col in [
    ('TANAM', 'chat_budget_tanam', 'Budget'),
    ('RATA',  'chat_budget_rata',  'Budget'),
    ('VINIR', 'chat_budget_vinir', 'Budget'),
]:
    print(f"  Loading {sheet}...")
    df = pd.read_excel(FILE, sheet_name=sheet)
    date_col = 'Date' if 'Date' in df.columns else df.columns[0]
    df = mar_apr_26(df, date_col)
    if df.empty:
        print(f"  {brand} marketing: no Mar-Apr data")
        continue
    bcol = budget_col if budget_col in df.columns else df.columns[3]
    daily = df.groupby(df[date_col].dt.date)[bcol].sum().reset_index(name='budget_spent')
    daily.rename(columns={date_col: 'date'}, inplace=True)
    daily['budget_spent'] = pd.to_numeric(daily['budget_spent'], errors='coerce').fillna(0)
    daily['dim_brand_id'] = BID[brand]
    daily['dim_channel_id'] = CID['Internal']
    mkt_rows.append(daily[['date','dim_brand_id','dim_channel_id','budget_spent']])
    print(f"  {brand} marketing: {len(daily)} days")

if mkt_rows:
    df_mkt = pd.concat(mkt_rows, ignore_index=True)
    df_mkt.to_sql('fact_marketing_cost', ENGINE, if_exists='append', index=False)
    print(f"✅ fact_marketing_cost: {len(df_mkt)} rows inserted")

# ─────────────────────────────────────────────────────────────────
# 4. FACT_CASH_COLLECTION (from daily_cash)
# ─────────────────────────────────────────────────────────────────
print("\n── FACT CASH COLLECTION ──")
print("  Loading daily_cash...")
df_cash = pd.read_excel(FILE, sheet_name='daily_cash')
# Column B = date, C = Treatment (general), D = Veneer, E = Tanam
date_col_cash = df_cash.columns[1]  # B
df_cash = mar_apr_26(df_cash, date_col_cash)
if not df_cash.empty:
    cash_rows = []
    # Tanam cash
    tanam_col = 'Tanam' if 'Tanam' in df_cash.columns else df_cash.columns[4]
    veneer_col = 'Veneer' if 'Veneer' in df_cash.columns else df_cash.columns[3]

    for dt, grp in df_cash.groupby(df_cash[date_col_cash].dt.date):
        tanam_cash = pd.to_numeric(grp[tanam_col], errors='coerce').sum()
        vinir_cash = pd.to_numeric(grp[veneer_col], errors='coerce').sum()
        treat_cash = pd.to_numeric(grp[df_cash.columns[2]], errors='coerce').sum()  # C = Treatment

        if tanam_cash > 0:
            cash_rows.append({'date': dt, 'dim_brand_id': BID['TANAM'], 'dim_channel_id': 1, 'cash_in_amount': tanam_cash, 'collected_by': 'TC'})
        if vinir_cash > 0:
            cash_rows.append({'date': dt, 'dim_brand_id': BID['VINIR'], 'dim_channel_id': 1, 'cash_in_amount': vinir_cash, 'collected_by': 'TC'})
        # Treatment - Tanam - Veneer ≈ RATA cash
        rata_cash = treat_cash - tanam_cash - vinir_cash
        if rata_cash > 0:
            cash_rows.append({'date': dt, 'dim_brand_id': BID['RATA'], 'dim_channel_id': 1, 'cash_in_amount': rata_cash, 'collected_by': 'TC'})

    if cash_rows:
        df_c = pd.DataFrame(cash_rows)
        df_c.to_sql('fact_cash_collection', ENGINE, if_exists='append', index=False)
        print(f"✅ fact_cash_collection: {len(df_c)} rows inserted")
else:
    print("  daily_cash: no Mar-Apr 2026 data")

# ─────────────────────────────────────────────────────────────────
# 5. UPDATE Buy count in Funnel from Planned Order (TANAM only)
#    RATA & VINIR buy counts already set from raw sheets above
# ─────────────────────────────────────────────────────────────────
print("\n-- UPDATE TANAM BUY COUNTS --")
if not df_po.empty:
    # Count unique customers per date from Planned Order
    if 'Customer Name' in df_po.columns:
        buy_col = 'Customer Name'
    else:
        buy_col = 'product_title'
    buy_agg = df_po.groupby(df_po['date'].dt.date)[buy_col].nunique().reset_index(name='buy_count')
    buy_agg.rename(columns={'date': 'dt'}, inplace=True)

    with ENGINE.begin() as conn:
        for _, r in buy_agg.iterrows():
            conn.execute(text(
                "UPDATE fact_funnel SET buy_count = :bc WHERE date = :d AND dim_brand_id = :bid"
            ), {'bc': int(r['buy_count']), 'd': r['dt'], 'bid': BID['TANAM']})
    print("  TANAM buy counts updated from Planned Order")

print("\n════════════════════════════════════════")
print("ETL COMPLETED SUCCESSFULLY!")
print("════════════════════════════════════════")
