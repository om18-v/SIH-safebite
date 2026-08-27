import sqlite3
import json

def run_compliance_check(db_path: str, product_id: str):
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    # Fetch product data extracted via OCR
    cursor.execute("SELECT * FROM demo_products WHERE product_id = ?", (product_id,))
    product = cursor.fetchone()
    if not product:
        conn.close()
        return json.dumps({"error": f"Product {product_id} not found."})

    # Fetch active legal metrology rules from database
    cursor.execute("SELECT * FROM compliance_rules")
    rules = cursor.fetchall()

    violations = []
    
    for rule in rules:
        rule_id = rule['rule_id']
        field = rule['field']
        condition = rule['rule_condition']
        val = product[field]

        is_violated = False

        # Rule evaluation logic according to legal metrology standards
        if condition == 'IS_NOT_NULL':
            if val is None or str(val).strip() == "":
                is_violated = True

        elif condition == 'CONTAINS_TAX_CLAUSE':
            if not val or "inclusive of all taxes" not in str(val).lower():
                is_violated = True

        elif condition == 'MATCHES_SECOND_SCHEDULE':
            if product['category'] == 'Biscuits':
                standard_sizes = [25, 50, 75, 100, 200, 250, 300, 400, 500, 600, 700, 800, 900, 1000]
                if product['declared_net_quantity'] not in standard_sizes and not product['is_non_standard_declared']:
                    is_violated = True

        if is_violated:
            explanation = f"{rule['violation_message']} [Triggered by Rule ID: {rule_id} | Source: {rule['legal_source']}]"
            violations.append({
                "rule_id": rule_id,
                "severity": rule['severity'],
                "explanation": explanation
            })

            # Log violation to compliance_logs table
            cursor.execute(
                "INSERT INTO compliance_logs (product_id, rule_id, severity, explanation) VALUES (?, ?, ?, ?)",
                (product_id, rule_id, rule['severity'], explanation)
            )

    conn.commit()

    # Calculate compliance metrics
    total_rules = len(rules)
    num_violations = len(violations)
    compliance_score = max(0, round(((total_rules - num_violations) / total_rules) * 100, 2))
    status = "COMPLIANT" if num_violations == 0 else "NON_COMPLIANT"

    # Shared JSON Output Contract
    output_contract = {
        "product_id": product_id,
        "product_name": product['product_name'],
        "status": status,
        "compliance_score": compliance_score,
        "total_violations": num_violations,
        "violations": violations
    }

    conn.close()
    return json.dumps(output_contract, indent=4)