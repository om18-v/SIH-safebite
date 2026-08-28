def calculate_history_risk(
    previous_violations: int = 0,
    previous_inspections: int = 0
) -> int:
    """
    Calculate a simple historical risk score.

    Returns a score from 0 to 30.

    More previous violations increase historical risk.
    """

    if previous_violations <= 0:
        return 0

    if previous_violations == 1:
        return 10

    if previous_violations == 2:
        return 20

    return 30


def get_history_status(
    previous_violations: int
) -> str:
    """
    Convert historical violations into a simple status.
    """

    if previous_violations == 0:
        return "NO_HISTORY"

    if previous_violations == 1:
        return "LOW_HISTORY_RISK"

    if previous_violations == 2:
        return "MEDIUM_HISTORY_RISK"

    return "HIGH_HISTORY_RISK"


if __name__ == "__main__":

    print("===== HISTORY RISK TEST =====")

    for violations in [0, 1, 2, 3]:

        risk = calculate_history_risk(
            previous_violations=violations
        )

        status = get_history_status(
            previous_violations=violations
        )

        print(
            f"Violations: {violations} | "
            f"Risk: {risk} | "
            f"Status: {status}"
        )