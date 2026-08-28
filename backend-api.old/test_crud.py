from database import SessionLocal
import crud

db = SessionLocal()

# Test fetching product ID 1
product = crud.get_product_by_id(db, 1)
print(f"📦 Found Product: {product.product_name} by {product.manufacturer}")
print(f"   - Compliance Status: {product.compliance.status}")
print(f"   - Risk Score: {product.risk_score.overall_score} ({product.risk_score.risk_level})")
print(f"   - Violations: {[v.message for v in product.violations]}")

# Test Dashboard Metrics
metrics = crud.get_dashboard_metrics(db)
print(f"\n📊 Dashboard Metrics: {metrics}")

db.close()