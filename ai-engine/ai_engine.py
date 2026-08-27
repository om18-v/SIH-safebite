import sys
import os
import pytesseract


# --------------------------------------------------
# Make the ocr folder available for imports
# --------------------------------------------------

OCR_DIR = os.path.join(
    os.path.dirname(__file__),
    "ocr"
)

if OCR_DIR not in sys.path:
    sys.path.insert(0, OCR_DIR)


# --------------------------------------------------
# Import existing AI-engine modules
# --------------------------------------------------

from preprocess import preprocess_image

from field_extractor import (
    extract_mrp,
    extract_fssai_license,
    extract_ingredients,
    extract_net_quantity,
    extract_dates,
)

from ingredient_cleaner import clean_ingredients

from ingredient_checker import (
    check_ingredients,
    calculate_safety_score,
)

from history_risk import calculate_history_risk

from risk_score import calculate_risk_score

from risk_level import get_risk_level

from inspection_priority import get_inspection_priority


# --------------------------------------------------
# Tesseract configuration
# --------------------------------------------------

pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)


# --------------------------------------------------
# Main AI Engine
# --------------------------------------------------

def analyze_product(
    image_path: str,
    previous_violations: int = 0,
    previous_inspections: int = 0,
) -> dict:
    """
    Analyze a packaged food product image.

    Returns OCR information, ingredient analysis,
    risk score, risk level and inspection priority.
    """

    # ----------------------------------------------
    # 1. OCR
    # ----------------------------------------------

    processed_image = preprocess_image(
        image_path
    )

    raw_text = pytesseract.image_to_string(
        processed_image,
        config="--psm 6"
    )

    cleaned_text = "\n".join(
        line.strip()
        for line in raw_text.splitlines()
        if line.strip()
    )

    # ----------------------------------------------
    # 2. Extract fields
    # ----------------------------------------------

    mrp = extract_mrp(cleaned_text)

    fssai_license = extract_fssai_license(
        cleaned_text
    )

    net_quantity = extract_net_quantity(
        cleaned_text
    )

    raw_ingredients = extract_ingredients(
        cleaned_text
    )

    ingredients = clean_ingredients(
        raw_ingredients
    )

    manufacturing_date, expiry_date = (
        extract_dates(cleaned_text)
    )

    # ----------------------------------------------
    # 3. Ingredient checking
    # ----------------------------------------------

    ingredient_results = check_ingredients(
        ingredients
    )

    ingredient_safety_score = (
        calculate_safety_score(
            ingredient_results
        )
    )

    # ----------------------------------------------
    # 4. History risk
    # ----------------------------------------------

    history_risk = calculate_history_risk(
        previous_violations=previous_violations,
        previous_inspections=previous_inspections,
    )

    # ----------------------------------------------
    # 5. Overall risk score
    # ----------------------------------------------

    overall_risk_score = calculate_risk_score(
        ingredient_safety_score=ingredient_safety_score,
        history_risk=history_risk,
    )

    # ----------------------------------------------
    # 6. Risk level
    # ----------------------------------------------

    risk_level = get_risk_level(
        overall_risk_score
    )

    # ----------------------------------------------
    # 7. Inspection priority
    # ----------------------------------------------

    inspection_priority = (
        get_inspection_priority(
            risk_level
        )
    )

    # ----------------------------------------------
    # 8. Return complete result
    # ----------------------------------------------

    return {
        "ocr": {
            "mrp": mrp,
            "net_quantity": net_quantity,
            "fssai_license": fssai_license,
            "ingredients": ingredients,
            "manufacturing_date": manufacturing_date,
            "expiry_date": expiry_date,
        },

        "ingredient_analysis": ingredient_results,

        "ingredient_safety_score":
            ingredient_safety_score,

        "history_risk":
            history_risk,

        "overall_risk_score":
            overall_risk_score,

        "risk_level":
            risk_level,

        "inspection_priority":
            inspection_priority,
    }


# --------------------------------------------------
# Test the complete AI engine
# --------------------------------------------------

if __name__ == "__main__":

    image_path = os.path.join(
        OCR_DIR,
        "test_product.png"
    )

    result = analyze_product(
        image_path=image_path,
        previous_violations=0,
        previous_inspections=0,
    )

    print("\n===== SAFEBITE AI ENGINE =====\n")

    print("MRP:",
          result["ocr"]["mrp"])

    print("Net Quantity:",
          result["ocr"]["net_quantity"])

    print("FSSAI License:",
          result["ocr"]["fssai_license"])

    print("Ingredients:",
          result["ocr"]["ingredients"])

    print(
        "Manufacturing Date:",
        result["ocr"]["manufacturing_date"]
    )

    print(
        "Expiry Date:",
        result["ocr"]["expiry_date"]
    )

    print(
        "\nIngredient Safety Score:",
        result["ingredient_safety_score"]
    )

    print(
        "History Risk:",
        result["history_risk"]
    )

    print(
        "Overall Risk Score:",
        result["overall_risk_score"]
    )

    print(
        "Risk Level:",
        result["risk_level"]
    )

    print(
        "Inspection Priority:",
        result["inspection_priority"]
    )

    print("\n===== INGREDIENT ANALYSIS =====\n")

    for ingredient in result[
        "ingredient_analysis"
    ]:
        print(ingredient)