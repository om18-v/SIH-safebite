def get_inspection_priority(risk_level: str) -> str:
    """
    Convert risk level into inspection priority.
    """

    risk_level = risk_level.upper().strip()

    if risk_level == "LOW":
        return "ROUTINE"

    if risk_level == "MEDIUM":
        return "MODERATE"

    if risk_level == "HIGH":
        return "HIGH"

    if risk_level == "CRITICAL":
        return "URGENT"

    return "UNKNOWN"


if __name__ == "__main__":

    print("===== INSPECTION PRIORITY TEST =====")

    test_levels = [
        "LOW",
        "MEDIUM",
        "HIGH",
        "CRITICAL"
    ]

    for level in test_levels:

        priority = get_inspection_priority(level)

        print(
            f"Risk Level: {level} | "
            f"Inspection Priority: {priority}"
        )