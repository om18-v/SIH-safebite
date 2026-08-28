import re


def clean_ingredient(ingredient: str) -> str:
    """
    Clean one OCR-extracted ingredient.
    """

    # Remove common OCR symbols
    ingredient = re.sub(r"[|~_=]+", " ", ingredient)

    # Remove backslashes
    ingredient = ingredient.replace("\\", " ")

    # Remove repeated spaces
    ingredient = re.sub(r"\s+", " ", ingredient)

    # Fix common OCR mistakes
    replacements = {
        "cncentrate": "concentrate",
        "WS centrate": "concentrate",
        "lodized": "Iodized",
        "cycralose": "Sucralose",
    }

    for wrong, correct in replacements.items():
        ingredient = ingredient.replace(wrong, correct)

    # Remove common OCR garbage words/symbols
    ingredient = re.sub(
        r"^(?:Tm|hay|Phony|gaiai)\s*[-.,:]?\s*",
        "",
        ingredient,
        flags=re.IGNORECASE
    )

    # Remove OCR garbage appearing before known ingredients
    ingredient = re.sub(
        r"^(?:[-–—]+\s*)+",
        "",
        ingredient
    )

    # Fix duplicated Whey Protein
    ingredient = re.sub(
        r"Whey Protein\s+Whey Protein",
        "Whey Protein",
        ingredient,
        flags=re.IGNORECASE
    )

    # Remove OCR garbage between Milk Protein and concentrate
    ingredient = re.sub(
        r"Milk Protein\s+(?:ae\s+)?concentrate",
        "Milk Protein concentrate",
        ingredient,
        flags=re.IGNORECASE
    )

    # Clean Minerals and Vitamins premix
    ingredient = re.sub(
        r"Minerals and Vitamins\s+(?:y\s+My\s+)?premix",
        "Minerals and Vitamins premix",
        ingredient,
        flags=re.IGNORECASE
    )

    # Clean Acesulfame potassium
    ingredient = re.sub(
        r"(?:gaiai\s+)?Acesulfame potassium",
        "Acesulfame potassium",
        ingredient,
        flags=re.IGNORECASE
    )

    # Clean Sucralose
    ingredient = re.sub(
        r"Sucralose",
        "Sucralose",
        ingredient,
        flags=re.IGNORECASE
    )

    # Clean spaces around brackets
    ingredient = re.sub(
        r"\s*\(\s*",
        " (",
        ingredient
    )

    ingredient = re.sub(
        r"\s*\)\s*",
        ")",
        ingredient
    )

    # Remove leading/trailing punctuation
    ingredient = ingredient.strip(" .,:;|-")

    return ingredient


def merge_ingredient_fragments(
    ingredients: list[str]
) -> list[str]:
    """
    Merge ingredient fragments created by OCR.
    """

    merged = []

    i = 0

    while i < len(ingredients):

        current = ingredients[i]

        # Alkalized Cocoa + powder
        if (
            current.lower() == "alkalized cocoa"
            and i + 1 < len(ingredients)
            and ingredients[i + 1].lower() == "powder"
        ):
            current = current + " powder"
            i += 1

        # Minerals and Vitamins + premix
        elif (
            current.lower().startswith(
                "minerals and vitamins"
            )
            and i + 1 < len(ingredients)
            and ingredients[i + 1].lower() == "premix"
        ):
            current = current + " premix"
            i += 1

        # Stabilizer (INS 413 + INS 416)
        elif (
            current.lower().startswith("stabilizer")
            and i + 1 < len(ingredients)
            and ingredients[i + 1].strip().endswith(")")
        ):
            current = current + ", " + ingredients[i + 1]
            i += 1

        merged.append(current)

        i += 1

    return merged


def clean_ingredients(
    ingredients: list[str]
) -> list[str]:
    """
    Clean and merge the complete ingredient list.
    """

    cleaned = []

    for ingredient in ingredients:

        cleaned_ingredient = clean_ingredient(
            ingredient
        )

        if cleaned_ingredient:
            cleaned.append(cleaned_ingredient)

    cleaned = merge_ingredient_fragments(cleaned)

    return cleaned