from field_extractor import (
    extract_mrp,
    extract_fssai_license,
    extract_ingredients,
    extract_net_quantity,
    extract_dates,
)


test_text = """
PRODUCT: Sample Food Product

INGREDIENTS:
Wheat Flour, Sugar, Salt

LIC. NO. 10012029001320
"""


mrp = extract_mrp(test_text)

fssai_license = extract_fssai_license(test_text)

ingredients = extract_ingredients(test_text)

net_quantity = extract_net_quantity(test_text)

manufacturing_date, expiry_date = extract_dates(test_text)


print("\n===== MISSING FIELD TEST =====\n")

print("MRP:", mrp)
print("Net Quantity:", net_quantity)
print("FSSAI License:", fssai_license)
print("Ingredients:", ingredients)
print("Manufacturing Date:", manufacturing_date)
print("Expiry Date:", expiry_date)