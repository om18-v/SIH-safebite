from sqlalchemy.orm import Session
import models

# 1. Fetch a single product with all its relational data
def get_product_by_id(db: Session, product_id: int):
    return db.query(models.Product).filter(models.Product.id == product_id).first()

# 2. Fetch all products for list views
def get_all_products(db: Session):
    return db.query(models.Product).all()

# 3. Fetch analytics for the dashboard
def get_dashboard_metrics(db: Session):
    total_products = db.query(models.Product).count()
    total_violations = db.query(models.Violation).count()
    
    non_compliant = db.query(models.ComplianceResult).filter(
        models.ComplianceResult.status == "NON_COMPLIANT"
    ).count()
    
    high_risk = db.query(models.RiskScore).filter(
        models.RiskScore.risk_level == "HIGH"
    ).count()

    return {
        "total_products": total_products,
        "non_compliant_products": non_compliant,
        "total_violations": total_violations,
        "high_risk_products": high_risk
    }
# Function for Member 2 to call after OCR / Compliance / Risk engines run
def save_full_analysis(db: Session, product_data: dict, compliance_data: dict, violations_list: list, flags_list: list, risk_data: dict):
    # 1. Create Product
    product = models.Product(**product_data)
    db.add(product)
    db.commit()
    db.refresh(product)

    # 2. Add Compliance
    db.add(models.ComplianceResult(product_id=product.id, **compliance_data))

    # 3. Add Violations
    for v in violations_list:
        db.add(models.Violation(product_id=product.id, **v))

    # 4. Add Ingredient Flags
    for f in flags_list:
        db.add(models.IngredientFlag(product_id=product.id, **f))

    # 5. Add Risk Score
    db.add(models.RiskScore(product_id=product.id, **risk_data))

    db.commit()
    return product