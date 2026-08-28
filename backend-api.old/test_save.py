from database import SessionLocal
import crud

db = SessionLocal()

product_data = {
    "product_name": "Demo Cola",
    "manufacturer": "Demo Beverages Ltd",
    "mrp": "₹40",
    "net_quantity": "500 ml"
}

compliance_data = {
    "status": "NON_COMPLIANT",
    "compliance_score": 70
}

violations_list = [
    {
        "severity": "HIGH",
        "message": "Mandatory declaration missing"
    },
    {
        "severity": "MEDIUM",
        "message": "Label information unclear"
    }
]

flags_list = [
    {
        "ingredient_name": "Sodium Benzoate",
        "reason": "Requires verification"
    }
]

risk_data = {
    "overall_score": 78,
    "risk_level": "HIGH"
}

product = crud.save_full_analysis(
    db,
    product_data,
    compliance_data,
    violations_list,
    flags_list,
    risk_data
)

print(f"Product saved successfully!")
print(f"Product ID: {product.id}")
print(f"Product Name: {product.product_name}")

db.close()