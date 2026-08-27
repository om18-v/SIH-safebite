import re

from ingredient_cleaner import clean_ingredients
from ingredient_checker import (
    check_ingredients,
    calculate_safety_score
)


def extract_mrp(text: str):
    """
    Extract MRP from OCR text.
    """

    patterns = [
        r"MRP\s*[:\-]?\s*(?:Rs\.?|₹|INR)?\s*([0-9]+(?:\.[0-9]+)?)",
        r"(?:Rs\.?|₹|INR)\s*([0-9]+(?:\.[0-9]+)?)"
    ]

    for pattern in patterns:

        match = re.search(
            pattern,
            text,
            re.IGNORECASE
        )

        if match:
            return f"₹{match.group(1)}"

    return "N/A"


def extract_fssai_license(text: str):
    """
    Extract FSSAI license number from noisy OCR text.
    """

    license_patterns = [
        r"(?:LIC|LICENSE|LICENCE)\D{0,30}([0-9]{10,14})",
        r"(?:LIC|LICENSE|LICENCE)\.?\s*(?:NO|NUMBER)?\D{0,30}([0-9]{10,14})"
    ]

    for pattern in license_patterns:

        match = re.search(
            pattern,
            text,
            re.IGNORECASE
        )

        if match:
            return match.group(1)

    # OCR may distort the words "Lic. No."
    # Search for a 10-14 digit number near the
    # license-related text.

    lines = text.splitlines()

    for i, line in enumerate(lines):

        nearby_text = " ".join(
            lines[max(0, i - 1):i + 2]
        )

        numbers = re.findall(
            r"\b[0-9]{10,14}\b",
            nearby_text
        )

        if numbers:
            return numbers[0]

    return "N/A"


def extract_ingredients(text: str):
    """
    Extract the ingredient section from OCR text.
    """

    start_pattern = (
        r"(?:INGREDIENTS|INGREDIENT|IENTS)\s*:?"
    )

    start_match = re.search(
        start_pattern,
        text,
        re.IGNORECASE
    )

    if not start_match:
        return []

    start = start_match.end()

    end_pattern = (
        r"CONTAINS\s+ADDED\s+FLAVOUR|"
        r"NO\s+ADDED\s+SUCROSE|"
        r"MANUFACTURED\s+BY|"
        r"(?:LIC|LICENSE|LICENCE)\.?\s+NO"
    )

    end_match = re.search(
        end_pattern,
        text[start:],
        re.IGNORECASE
    )

    if end_match:

        ingredient_text = text[
            start:start + end_match.start()
        ]

    else:

        ingredient_text = text[start:]

    # Replace line breaks and repeated spaces.
    ingredient_text = re.sub(
        r"\s+",
        " ",
        ingredient_text
    ).strip()

    # Split ingredients by commas.
    ingredients = [
        item.strip()
        for item in ingredient_text.split(",")
        if item.strip()
    ]

    return ingredients


def extract_net_quantity(text: str):
    """
    Extract net quantity from OCR text.
    """

    patterns = [
        r"(?:NET\s*(?:QTY|QUANTITY|WEIGHT))\s*[:\-]?\s*"
        r"([0-9]+(?:\.[0-9]+)?\s*(?:g|kg|ml|l|mg))",

        r"([0-9]+(?:\.[0-9]+)?\s*(?:g|kg|ml|l|mg))"
    ]

    for pattern in patterns:

        match = re.search(
            pattern,
            text,
            re.IGNORECASE
        )

        if match:
            return match.group(1)

    return "N/A"


def extract_dates(text: str):
    """
    Extract manufacturing and expiry dates.
    """

    manufacturing_date = "N/A"
    expiry_date = "N/A"

    manufacturing_patterns = [
        r"(?:DATE\s+OF\s+MANUFACTURE|"
        r"DATE\s+OF\s+MFG|MFG)"
        r"\s*[:\-]?\s*"
        r"([0-9]{1,2}[-/][A-Za-z0-9]+[-/]?[0-9]{0,4})"
    ]

    expiry_patterns = [
        r"(?:EXPIRY|EXP|BEST\s+BEFORE)"
        r"\s*[:\-]?\s*"
        r"([0-9]{1,2}[-/][A-Za-z0-9]+[-/]?[0-9]{0,4})"
    ]

    for pattern in manufacturing_patterns:

        match = re.search(
            pattern,
            text,
            re.IGNORECASE
        )

        if match:
            manufacturing_date = match.group(1)
            break

    for pattern in expiry_patterns:

        match = re.search(
            pattern,
            text,
            re.IGNORECASE
        )

        if match:
            expiry_date = match.group(1)
            break

    return manufacturing_date, expiry_date


if __name__ == "__main__":

    # Read OCR output
    with open(
        "ocr/ocr_output.txt",
        "r",
        encoding="utf-8"
    ) as file:

        text = file.read()

    # -----------------------------------------
    # 1. EXTRACT BASIC FIELDS
    # -----------------------------------------

    mrp = extract_mrp(text)

    fssai_license = extract_fssai_license(text)

    net_quantity = extract_net_quantity(text)

    manufacturing_date, expiry_date = extract_dates(text)

    # -----------------------------------------
    # 2. EXTRACT AND CLEAN INGREDIENTS
    # -----------------------------------------

    raw_ingredients = extract_ingredients(text)

    ingredients = clean_ingredients(
        raw_ingredients
    )

    # -----------------------------------------
    # 3. CHECK INGREDIENTS
    # -----------------------------------------

    ingredient_results = check_ingredients(
        ingredients
    )

    # -----------------------------------------
    # 4. CALCULATE SAFETY SCORE
    # -----------------------------------------

    safety_score = calculate_safety_score(
        ingredient_results
    )

    # -----------------------------------------
    # 5. DISPLAY RESULTS
    # -----------------------------------------

    print("\n===== EXTRACTED FIELDS =====\n")

    print("MRP:", mrp)

    print("Net Quantity:", net_quantity)

    print("FSSAI License:", fssai_license)

    print("Ingredients:", ingredients)

    print("Manufacturing Date:", manufacturing_date)

    print("Expiry Date:", expiry_date)

    print("\n===== INGREDIENT ANALYSIS =====\n")

    for result in ingredient_results:
        print(result)

    print("\nIngredient Safety Score:", safety_score)