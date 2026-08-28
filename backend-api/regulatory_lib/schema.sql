-- SQLite Database Schema for Legal Metrology Compliance Engine

CREATE TABLE IF NOT EXISTS compliance_rules (
    rule_id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    field TEXT NOT NULL,
    rule_condition TEXT NOT NULL,
    required INTEGER NOT NULL CHECK (required IN (0, 1)),
    severity TEXT NOT NULL CHECK (severity IN ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW')),
    violation_message TEXT NOT NULL,
    legal_source TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS demo_products (
    product_id TEXT PRIMARY KEY,
    product_name TEXT NOT NULL,
    category TEXT NOT NULL,
    declared_net_quantity REAL,
    unit TEXT,
    declared_mrp REAL,
    mrp_text TEXT,
    manufacture_month INTEGER,
    manufacture_year INTEGER,
    manufacturer_name TEXT,
    manufacturer_address TEXT,
    consumer_care_details TEXT,
    country_of_origin TEXT,
    is_non_standard_declared INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS compliance_logs (
    log_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id TEXT NOT NULL,
    rule_id TEXT NOT NULL,
    severity TEXT NOT NULL,
    explanation TEXT NOT NULL,
    checked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(product_id) REFERENCES demo_products(product_id),
    FOREIGN KEY(rule_id) REFERENCES compliance_rules(rule_id)
);