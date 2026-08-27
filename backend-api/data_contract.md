# SafeBite Analysis Data Contract

This document defines the data format passed between the SafeBite analysis modules and the database layer.

## 1. Product Data

The OCR module provides the basic product information.

```python
{
    "product_name": "Sample Test Biscuits",
    "manufacturer": "Demo Foods Ltd",
    "mrp": "₹50",
    "net_quantity": "100g"
}
2. Compliance Data

The compliance engine provides the overall compliance result.

{
    "status": "NON_COMPLIANT",
    "compliance_score": 60
}

Allowed status values:

COMPLIANT
NON_COMPLIANT
3. Violations

The compliance engine provides a list of individual violations.

[
    {
        "severity": "HIGH",
        "message": "MRP declaration missing"
    },
    {
        "severity": "MEDIUM",
        "message": "Net quantity information unclear"
    }
]

Allowed severity values:

LOW
MEDIUM
HIGH
CRITICAL

A product can have zero or multiple violations.

4. Ingredient Flags

The ingredient analysis engine provides flags for ingredients requiring attention.

[
    {
        "ingredient_name": "Sodium Benzoate",
        "reason": "Requires verification"
    }
]

A product can have zero or multiple ingredient flags.

5. Risk Data

The risk engine provides the final risk assessment.

{
    "overall_score": 75,
    "risk_level": "HIGH"
}

Allowed risk levels:

LOW
MEDIUM
HIGH
CRITICAL
6. Complete Analysis

The database layer receives all of the above information through:

save_full_analysis(
    db,
    product_data,
    compliance_data,
    violations_list,
    flags_list,
    risk_data
)

The database then stores the information across the related tables:

Product
|
+-- Compliance Result
|
+-- Violations
|
+-- Ingredient Flags
|
+-- Risk Score
