-- Dimension Tables
CREATE TABLE IF NOT EXISTS dim_brand (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS dim_channel (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    type VARCHAR(50) -- e.g., 'Internal', 'B2B'
);

CREATE TABLE IF NOT EXISTS dim_treatment_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(50) -- e.g., 'Single Implant', 'Rahang', 'Aligner'
);

-- Fact Tables
CREATE TABLE IF NOT EXISTS fact_funnel (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    dim_brand_id INT REFERENCES dim_brand(id),
    dim_channel_id INT REFERENCES dim_channel(id),
    chat_count INT DEFAULT 0,
    prospect_count INT DEFAULT 0,
    booking_count INT DEFAULT 0,
    visit_count INT DEFAULT 0,
    buy_count INT DEFAULT 0,
    UNIQUE(date, dim_brand_id, dim_channel_id)
);

CREATE TABLE IF NOT EXISTS fact_sales_and_revenue (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    dim_brand_id INT REFERENCES dim_brand(id),
    dim_channel_id INT REFERENCES dim_channel(id),
    dim_treatment_type_id INT REFERENCES dim_treatment_type(id),
    implant_qty INT DEFAULT 0,
    revenue_amount NUMERIC DEFAULT 0,
    payment_status VARCHAR(50), -- 'LUNAS', 'DP > 30%', 'DP < 30%'
    is_rahang BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS fact_cash_collection (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    dim_brand_id INT REFERENCES dim_brand(id),
    dim_channel_id INT REFERENCES dim_channel(id),
    cash_in_amount NUMERIC DEFAULT 0,
    collected_by VARCHAR(50) -- 'TC' or 'AE'
);

CREATE TABLE IF NOT EXISTS fact_marketing_cost (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    dim_brand_id INT REFERENCES dim_brand(id),
    dim_channel_id INT REFERENCES dim_channel(id),
    budget_spent NUMERIC DEFAULT 0
);

CREATE TABLE IF NOT EXISTS fact_targets (
    id SERIAL PRIMARY KEY,
    month_year VARCHAR(10) NOT NULL, -- e.g., '2026-03'
    dim_brand_id INT REFERENCES dim_brand(id),
    target_terjadwal INT DEFAULT 0,
    target_cancel INT DEFAULT 0,
    target_visit INT DEFAULT 0,
    target_revenue NUMERIC DEFAULT 0,
    UNIQUE(month_year, dim_brand_id)
);

-- Seed initial dimensions
INSERT INTO dim_brand (name) VALUES ('TANAM'), ('RATA'), ('VINIR') ON CONFLICT DO NOTHING;
INSERT INTO dim_channel (name, type) VALUES ('Internal All', 'Internal'), ('B2B All', 'B2B'), ('B2B Internal', 'B2B') ON CONFLICT DO NOTHING;
INSERT INTO dim_treatment_type (name, category) VALUES ('Single Implant', 'Implant'), ('Rahang', 'Implant'), ('Aligner', 'Aligner'), ('Veneer', 'Veneer') ON CONFLICT DO NOTHING;
