def get_risk_level(risk_score: int) -> str:
    """
    Convert a 0-100 risk score into a risk level.
    """

    # Keep score within valid range
    risk_score = max(0, min(100, risk_score))

    if risk_score <= 24:
        return "LOW"

    if risk_score <= 49:
        return "MEDIUM"

    if risk_score <= 74:
        return "HIGH"

    return "CRITICAL"


if __name__ == "__main__":

    print("===== RISK LEVEL TEST =====")

    test_scores = [0, 20, 24, 25, 40, 49, 50, 60, 74, 75, 90, 100]

    for score in test_scores:

        level = get_risk_level(score)

        print(
            f"Risk Score: {score} | "
            f"Risk Level: {level}"
        )