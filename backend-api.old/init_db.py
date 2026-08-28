from database import engine, SessionLocal, Base
from models import Product, ComplianceResult, Violation, IngredientFlag, RiskScore

def init_db():
    # 1. Create all tables in safebite.db
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()

    # 2. Clear old test data if running multiple times
    db.query(Violation).delete()
    db.query(IngredientFlag).delete()
    db.query(ComplianceResult).delete()
    db.query(RiskScore).delete()
    db.query(Product).delete()
    db.commit()

    # 3. Create a test product
    test_product = Product(
        product_name="Sample Test Biscuits",
        manufacturer="Demo Foods Ltd",
        mrp="₹50",
        net_quantity="100g"
    )
    db.add(test_product)
    db.commit()
    db.refresh(test_product)

    # 4. Attach compliance, violations, ingredient flags, and risk score
    db.add(ComplianceResult(
        product_id=test_product.id, 
        status="NON_COMPLIANT", 
        compliance_score=60
    ))
    db.add(Violation(
        product_id=test_product.id, 
        severity="HIGH", 
        message="MRP declaration missing"
    ))
    db.add(IngredientFlag(
        product_id=test_product.id, 
        ingredient_name="Sodium Benzoate", 
        reason="Requires verification"
    ))
    db.add(RiskScore(
        product_id=test_product.id, 
        overall_score=75, 
        risk_level="HIGH"
    ))
    
    db.commit()
    print(f" Success! Test product created with ID: {test_product.id}")
    db.close()

if __name__ == "__main__":
    init_db()