import re


FLAGGED_INGREDIENTS = {
    "acesulfame potassium": "Artificial sweetener detected.",
    "sucralose": "Artificial sweetener detected.",
    "sodium benzoate": "Preservative detected.",
}


def normalize_ingredient(name: str) -> str:
    """
    Normalize an ingredient name before checking it.
    """

    name = name.lower()

    # Remove INS/E-number information
    name = re.sub(r"\(ins\s*\d+\)", "", name)

    # Remove square-bracket INS numbers
    name = re.sub(r"\[ins\s*\d+\]", "", name)

    # Remove extra spaces
    name = re.sub(r"\s+", " ", name)

    # Remove common OCR symbols
    name = re.sub(r"[-_=|~]+", " ", name)

    # Remove surrounding punctuation
    name = name.strip(" .,:;|-")

    return name


def check_ingredient(name: str) -> dict:
    """
    Check one ingredient against the flagged ingredient list.
    """

    normalized_name = normalize_ingredient(name)

    for flagged_name, reason in FLAGGED_INGREDIENTS.items():

        if flagged_name in normalized_name:

            return {
                "name": name,
                "alias": flagged_name,
                "flag": True,
                "reason": reason,
            }

    return {
        "name": name,
        "alias": None,
        "flag": False,
        "reason": "No configured flag found.",
    }


def check_ingredients(ingredients: list[str]) -> list[dict]:
    """
    Check all extracted ingredients.
    """

    results = []

    for ingredient in ingredients:

        result = check_ingredient(ingredient)

        results.append(result)

    return results


def calculate_safety_score(results: list[dict]) -> int:
    """
    Calculate a simple demo safety score.

    Starts at 100.
    Each flagged ingredient reduces the score by 10.
    """

    score = 100

    for result in results:

        if result["flag"]:
            score -= 10

    return max(0, score)


if __name__ == "__main__":

    test_ingredients = [
        "Whey Protein concentrate",
        "Acesulfame potassium (INS 950)",
        "Sucralose [INS 955]",
        "Iodized salt",
    ]

    results = check_ingredients(test_ingredients)

    print("\n===== INGREDIENT CHECK =====\n")

    for result in results:
        print(result)

    score = calculate_safety_score(results)

    print("\nSafety Score:", score)