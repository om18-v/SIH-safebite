def calculate_risk_score(
    ingredient_safety_score: int,
    history_risk: int
) -> int:
    """
    Calculate the overall risk score from 0 to 100.

    Higher score = higher risk.

    Ingredient risk contributes up to 70 points.
    History risk contributes up to 30 points.
    """

    # Convert safety score into risk.
    ingredient_risk = 100 - ingredient_safety_score

    # Limit values to valid ranges.
    ingredient_risk = max(
        0,
        min(100, ingredient_risk)
    )

    history_risk = max(
        0,
        min(30, history_risk)
    )

    # Ingredient risk contributes 70%.
    weighted_ingredient_risk = (
        ingredient_risk * 0.7
    )

    # History risk contributes 30%.
    weighted_history_risk = (
        history_risk
    )

    overall_risk = (
        weighted_ingredient_risk
        + weighted_history_risk
    )

    return round(
        min(100, max(0, overall_risk))
    )


if __name__ == "__main__":

    print("===== RISK SCORE TEST =====")

    test_cases = [
        (100, 0),
        (80, 0),
        (80, 10),
        (60, 20),
        (40, 30),
    ]

    for safety_score, history_risk in test_cases:

        risk = calculate_risk_score(
            ingredient_safety_score=safety_score,
            history_risk=history_risk
        )

        print(
            f"Safety Score: {safety_score} | "
            f"History Risk: {history_risk} | "
            f"Overall Risk: {risk}"
        )