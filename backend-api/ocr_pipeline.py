import os
import cv2
import numpy as np
import pytesseract

# On Windows, tesseract.exe often isn't on PATH even after installing.
# Point pytesseract straight at the default install location instead
# of relying on PATH. If you installed it somewhere else, change this.
_WINDOWS_TESSERACT_PATH = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
if os.name == "nt" and os.path.exists(_WINDOWS_TESSERACT_PATH):
    pytesseract.pytesseract.tesseract_cmd = _WINDOWS_TESSERACT_PATH

from schemas import OCRExtractionResult
from ocr_lib.field_extractor import (
    extract_mrp,
    extract_fssai_license,
    extract_ingredients,
    extract_net_quantity,
    extract_dates,
)
from ocr_lib.ingredient_cleaner import clean_ingredients


def _preprocess(image_bytes: bytes):
    """
    Same steps as ai-engine/ocr/preprocess.py, adapted to work on raw
    image bytes (from an upload) instead of a file path.
    """
    array = np.frombuffer(image_bytes, dtype=np.uint8)
    image = cv2.imdecode(array, cv2.IMREAD_COLOR)

    if image is None:
        raise ValueError("Could not decode uploaded image.")

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    denoised = cv2.medianBlur(gray, 3)
    thresholded = cv2.threshold(
        denoised, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU
    )[1]

    return thresholded


def extract_label_data(image_bytes: bytes) -> OCRExtractionResult:
    processed = _preprocess(image_bytes)

    raw_text = pytesseract.image_to_string(processed)

    mrp = extract_mrp(raw_text)
    fssai_license = extract_fssai_license(raw_text)
    net_quantity = extract_net_quantity(raw_text)
    manufacturing_date, expiry_date = extract_dates(raw_text)

    raw_ingredients = extract_ingredients(raw_text)
    ingredients = clean_ingredients(raw_ingredients)

    # NOTE: field_extractor.py has no product_name / manufacturer
    # extractor yet (only MRP, FSSAI license, net qty, dates,
    # ingredients). Leaving these as "N/A" is honest; a real
    # extractor for these two fields is a separate follow-up.
    return OCRExtractionResult(
        product_name="N/A",
        manufacturer="N/A",
        mrp=mrp,
        net_quantity=net_quantity,
        batch_number="N/A",
        manufacturing_date=manufacturing_date,
        expiry_date=expiry_date,
        fssai_license=fssai_license,
        country_of_origin="India",
        ingredients=ingredients,
        confidence=0.0,
    )
