from schemas import ComplianceResult, ComplianceViolation, OCRExtractionResult

def verify_metrology_rules(ocr_data: OCRExtractionResult) -> ComplianceResult:
    violations = []
    if not ocr_data.mrp or ocr_data.mrp == "N/A":
        violations.append(ComplianceViolation(rule_id="LM001", severity="HIGH", message="MRP declaration missing"))
    if not ocr_data.net_quantity or ocr_data.net_quantity == "N/A":
        violations.append(ComplianceViolation(rule_id="LM002", severity="HIGH", message="Net quantity missing"))

    score = max(0, 100 - (len(violations) * 25))
    status = "COMPLIANT" if len(violations) == 0 else "NON_COMPLIANT"

    return ComplianceResult(status=status, violations=violations, compliance_score=score)