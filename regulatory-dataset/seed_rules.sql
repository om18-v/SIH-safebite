-- Seed High-Value Demo Rules from Legal Metrology (Packaged Commodities) Rules, 2011

INSERT OR REPLACE INTO compliance_rules (rule_id, category, field, rule_condition, required, severity, violation_message, legal_source) VALUES
('RULE_LM_01', 'Manufacturer', 'manufacturer_name', 'IS_NOT_NULL', 1, 'CRITICAL', 'Manufacturer/Packer name and address declaration missing on package label.', 'Rule 6(1)(a) / Rule 10(1)'),
('RULE_LM_02', 'MRP', 'mrp_text', 'CONTAINS_TAX_CLAUSE', 1, 'HIGH', 'MRP declaration missing required mandatory suffix "inclusive of all taxes" or "incl. of all taxes".', 'Rule 2(m) / Rule 6(1)(e)'),
('RULE_LM_03', 'Manufacturing Date', 'manufacture_month', 'IS_NOT_NULL', 1, 'HIGH', 'Month and year of manufacture/pre-packing declaration missing on label.', 'Rule 6(1)(d)'),
('RULE_LM_04', 'Net Quantity', 'declared_net_quantity', 'IS_NOT_NULL', 1, 'CRITICAL', 'Net quantity declaration missing from principal display panel.', 'Rule 6(1)(c)'),
('RULE_LM_05', 'Consumer Care', 'consumer_care_details', 'IS_NOT_NULL', 1, 'HIGH', 'Mandatory Consumer Care contact details (Name/Address/Phone/Email) missing.', 'Rule 6(2)'),
('RULE_LM_06', 'Country of Origin', 'country_of_origin', 'IS_NOT_NULL_IF_IMPORTED', 1, 'MEDIUM', 'Country of origin / importer address declaration missing for imported product.', 'Rule 6(1)(a) / Rule 10(1)'),
('RULE_LM_07', 'Standard Size', 'declared_net_quantity', 'MATCHES_SECOND_SCHEDULE', 0, 'MEDIUM', 'Non-standard quantity used without compulsory non-standard pack size declaration on label.', 'Rule 5 & Second Schedule');