from schemas import OCRExtractionResult

def extract_label_data(image_bytes: bytes) -> OCRExtractionResult:
    return OCRExtractionResult(
        product_name="Sample Energy Biscuit",
        manufacturer="ABC Foods Pvt Ltd",
        mrp="₹50",
        net_quantity="100g",
        batch_number="B-2026-99",
        manufacturing_date="01/2026",
        expiry_date="12/2026",
        fssai_license="10012022000123",
        country_of_origin="India",
        ingredients=["Wheat Flour", "Sugar", "Palm Oil", "Sodium Benzoate", "E102"],
        confidence=0.95
    )