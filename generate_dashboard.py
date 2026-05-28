import psycopg2
import pandas as pd
import json
import os
from dotenv import load_dotenv

load_dotenv()

# DB Connection
conn = psycopg2.connect(
    dbname=os.getenv('DB_NAME', 'dashboard'),
    user=os.getenv('DB_USER', 'postgres'),
    password=os.getenv('DB_PASSWORD'),
    host=os.getenv('DB_HOST', '127.0.0.1'),
    port=os.getenv('DB_PORT', '5432')
)

# 1. Fetch Funnel Data (Overall)
query_funnel = "SELECT SUM(chat_count) as chat, SUM(prospect_count) as prospect, SUM(booking_count) as booking, SUM(visit_count) as visit, SUM(buy_count) as buy FROM fact_funnel"
df_funnel = pd.read_sql(query_funnel, conn).fillna(0)

# 2. Fetch Sales Data (Overall)
query_sales = "SELECT SUM(revenue_amount) as revenue, SUM(implant_qty) as implants FROM fact_sales_and_revenue"
df_sales = pd.read_sql(query_sales, conn).fillna(0)

# 3. Fetch Brand Comparison
query_brand = """
SELECT b.name as brand, 
       COALESCE(SUM(f.chat_count),0) as chat, 
       COALESCE(SUM(f.visit_count),0) as visit, 
       COALESCE(SUM(s.revenue_amount),0) as revenue
FROM dim_brand b
LEFT JOIN fact_funnel f ON b.id = f.dim_brand_id
LEFT JOIN fact_sales_and_revenue s ON b.id = s.dim_brand_id AND f.date = s.date
GROUP BY b.name
"""
df_brand = pd.read_sql(query_brand, conn)

# 4. Fetch Trend Data
query_trend = """
SELECT f.date, SUM(s.revenue_amount) as revenue, SUM(m.budget_spent) as spend
FROM fact_funnel f
LEFT JOIN fact_sales_and_revenue s ON f.date = s.date AND f.dim_brand_id = s.dim_brand_id
LEFT JOIN fact_marketing_cost m ON f.date = m.date AND f.dim_brand_id = m.dim_brand_id
GROUP BY f.date ORDER BY f.date
"""
df_trend = pd.read_sql(query_trend, conn).fillna(0)

# Format Data for Blocks
total_revenue = f"Rp {int(df_sales['revenue'][0] / 1e6):,} Jt" if not df_sales.empty else "Rp 0"
total_chat = int(df_funnel['chat'][0]) if not df_funnel.empty else 0
total_buy = int(df_funnel['buy'][0]) if not df_funnel.empty else 0
cr = f"{(total_buy/total_chat*100):.1f}%" if total_chat > 0 else "0%"

# Trend Series
dates = df_trend['date'].astype(str).tolist() if not df_trend.empty else []
rev_trend = df_trend['revenue'].tolist() if not df_trend.empty else []
spend_trend = df_trend['spend'].tolist() if not df_trend.empty else []

blocks = [
    { "type": "heading", "text": "Executive Scorecard (Mar-Apr 2026)" },
    {
      "type": "kpi",
      "items": [
        { "label": "Total Revenue (Performance)", "value": total_revenue, "note": "Semua brand (Tanam, Rata, Vinir)" },
        { "label": "Total Implants", "value": str(int(df_sales['implants'][0])) if not df_sales.empty else "0", "note": "Termasuk Single & Rahang" },
        { "label": "Total New Chat", "value": str(total_chat), "note": "Sumber: CRM/Ads" },
        { "label": "Blended CR% (Chat to Buy)", "value": cr, "note": "Rata-rata konversi akhir" }
      ]
    },
    { "type": "heading", "text": "The Growth Funnel" },
    {
      "type": "chart",
      "height": 400,
      "config": {
        "tooltip": { "trigger": "item", "formatter": "{a} <br/>{b} : {c}" },
        "series": [
          {
            "name": "Funnel", "type": "funnel", "left": "10%", "width": "80%",
            "label": { "position": "inside", "formatter": "{b}: {c}" },
            "itemStyle": { "borderColor": "#fff", "borderWidth": 1 },
            "data": [
              { "value": total_chat, "name": "Chat", "itemStyle": { "color": "#0f172a" } },
              { "value": int(df_funnel['prospect'][0]) if not df_funnel.empty else 0, "name": "Prospect", "itemStyle": { "color": "#334155" } },
              { "value": int(df_funnel['booking'][0]) if not df_funnel.empty else 0, "name": "Booking", "itemStyle": { "color": "#475569" } },
              { "value": int(df_funnel['visit'][0]) if not df_funnel.empty else 0, "name": "Visit", "itemStyle": { "color": "#64748b" } },
              { "value": total_buy, "name": "Buy", "itemStyle": { "color": "#15803d" } }
            ]
          }
        ]
      }
    },
    { "type": "heading", "text": "Brand Comparison Matrix" },
    {
      "type": "table",
      "columns": ["Metrics", "TANAM", "RATA", "VINIR"],
      "rows": [
        ["Total Chat", 
         str(df_brand[df_brand['brand']=='TANAM']['chat'].sum()), 
         str(df_brand[df_brand['brand']=='RATA']['chat'].sum()), 
         str(df_brand[df_brand['brand']=='VINIR']['chat'].sum())],
        ["Total Visit", 
         str(df_brand[df_brand['brand']=='TANAM']['visit'].sum()), 
         str(df_brand[df_brand['brand']=='RATA']['visit'].sum()), 
         str(df_brand[df_brand['brand']=='VINIR']['visit'].sum())],
        ["Revenue (Rp)", 
         f"{df_brand[df_brand['brand']=='TANAM']['revenue'].sum():,.0f}", 
         f"{df_brand[df_brand['brand']=='RATA']['revenue'].sum():,.0f}", 
         f"{df_brand[df_brand['brand']=='VINIR']['revenue'].sum():,.0f}"]
      ]
    },
    { "type": "heading", "text": "Trend: Revenue vs Marketing Spend" },
    {
      "type": "chart",
      "height": 350,
      "config": {
        "tooltip": { "trigger": "axis" },
        "legend": { "data": ["Revenue", "Spend"], "bottom": 0 },
        "xAxis": { "type": "category", "data": dates },
        "yAxis": [
          { "type": "value", "name": "Revenue", "position": "left" },
          { "type": "value", "name": "Spend", "position": "right" }
        ],
        "series": [
          { "name": "Revenue", "type": "line", "smooth": True, "yAxisIndex": 0, "itemStyle": { "color": "#15803d" }, "data": rev_trend },
          { "name": "Spend", "type": "bar", "yAxisIndex": 1, "itemStyle": { "color": "#dc2626" }, "data": spend_trend }
        ]
      }
    }
]

js_content = f"var DASHBOARD_BLOCKS = {json.dumps(blocks, indent=2)};"

with open("dashboard_data.js", "w") as f:
    f.write(js_content)

print("dashboard_data.js generated successfully with Full UI Blocks!")
