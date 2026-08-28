from risk_score import calculate_risk_score
from risk_level import get_risk_level
from inspection_priority import get_inspection_priority


test_cases = [
    {
        "name": "No risk",
        "safety_score": 100,
        "history_risk": 0,
    },
    {
        "name": "Low risk",
        "safety_score": 90,
        "history_risk": 0,
    },
    {
        "name": "Medium risk",
        "safety_score": 60,
        "history_risk": 10,
    },
    {
        "name": "High risk",
        "safety_score": 40,
        "history_risk": 20,
    },
    {
        "name": "Critical risk",
        "safety_score": 20,
        "history_risk": 30,
    },
]


print("\n===== RISK PIPELINE TEST =====\n")


for case in test_cases:

    risk_score = calculate_risk_score(
        ingredient_safety_score=case["safety_score"],
        history_risk=case["history_risk"],
    )

    risk_level = get_risk_level(
        risk_score
    )

    inspection_priority = get_inspection_priority(
        risk_level
    )

    print(
        f"{case['name']}: "
        f"Risk Score={risk_score}, "
        f"Level={risk_level}, "
        f"Priority={inspection_priority}"
    )