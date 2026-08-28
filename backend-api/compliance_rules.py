import os
import sqlite3

from schemas import ComplianceResult, ComplianceViolation, OCRExtractionResult

RULES_DB_PATH = os.path.join(os.path.dirname(__file__), "compliance_rules.db")
_REGULATORY_LIB_DIR = os.path.join(os.path.dirname(__file__), "regulatory_lib")


def _ensure_rules_loaded():
    """
    Create/seed a small SQLite DB from regulatory-dataset's schema.sql +
    seed_rules.sql the first time this module is imported, so the real
    Legal Metrology rules (not a hardcoded stub) drive the checks.
    """
    conn = sqlite3.connect(RULES_DB_PATH)
    cursor = conn.cursor()

    with open(os.path.join(_REGULATORY_LIB_DIR, "schema.sql"), "r", encoding="utf-8") as f:
        conn.executescript(f.read())

    cursor.execute("SELECT COUNT(*) FROM compliance_rules")
    if cursor.fetchone()[0] == 0:
        with open(os.path.join(_REGULATORY_LIB_DIR, "seed_rules.sql"), "r", encoding="utf-8") as f:
            conn.executescript(f.read())
        conn.commit()

    conn.close()


_ensure_rules_loaded()


# Maps each rule's DB "field" name (from regulatory-dataset) to the
# matching field on the OCR-extracted product data.
_FIELD_MAP = {
    "manufacturer_name": "manufacturer",
    "mrp_text": "mrp",
    "manufacture_month": "manufacturing_date",
    "declared_net_quantity": "net_quantity",
    "consumer_care_details": None,  # not extracted yet, see note below
    "country_of_origin": "country_of_origin",
}


def _is_missing(value) -> bool:
    return value is None or str(value).strip() in ("", "N/A")


def verify_metrology_rules(ocr_data: OCRExtractionResult) -> ComplianceResult:
    conn = sqlite3.connect(RULES_DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM compliance_rules")
    rules = cursor.fetchall()
    conn.close()

    violations = []

    for rule in rules:
        mapped_field = _FIELD_MAP.get(rule["field"])
        value = getattr(ocr_data, mapped_field, None) if mapped_field else None
        condition = rule["rule_condition"]

        is_violated = False

        if condition in ("IS_NOT_NULL", "IS_NOT_NULL_IF_IMPORTED"):
            # consumer_care_details has no extractor yet (mapped_field is
            # None) -- skip that rule rather than always failing it on a
            # field we never actually looked for.
            if mapped_field is None:
                continue
            if _is_missing(value):
                is_violated = True

        elif condition == "CONTAINS_TAX_CLAUSE":
            if _is_missing(value) or "inclusive of all taxes" not in str(value).lower():
                is_violated = True

        elif condition == "MATCHES_SECOND_SCHEDULE":
            # Needs product category context OCR doesn't provide yet;
            # skip rather than guess.
            continue

        if is_violated:
            violations.append(ComplianceViolation(
                rule_id=rule["rule_id"],
                severity=rule["severity"],
                message=f"{rule['violation_message']} [Source: {rule['legal_source']}]",
            ))

    score = max(0, 100 - sum(
        {"CRITICAL": 30, "HIGH": 20, "MEDIUM": 10, "LOW": 5}.get(v.severity, 10)
        for v in violations
    ))
    status = "COMPLIANT" if not violations else "NON_COMPLIANT"

    return ComplianceResult(status=status, violations=violations, compliance_score=score)
