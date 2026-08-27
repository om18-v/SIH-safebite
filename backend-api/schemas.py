from pydantic import BaseModel
from typing import List, Optional

class OCRExtractionResult(BaseModel):
    product_name: str
    manufacturer: str
    mrp: str
    net_quantity: str
    batch_number: Optional[str] = "N/A"
    manufacturing_date: Optional[str] = "N/A"
    expiry_date: Optional[str] = "N/A"
    fssai_license: Optional[str] = "N/A"
    country_of_origin: Optional[str] = "India"
    ingredients: List[str]
    confidence: float

class ComplianceViolation(BaseModel):
    rule_id: str
    severity: str
    message: str

class ComplianceResult(BaseModel):
    status: str
    violations: List[ComplianceViolation]
    compliance_score: int

class IngredientFlag(BaseModel):
    name: str
    alias: Optional[str] = None
    flag: bool
    reason: str

class IngredientResult(BaseModel):
    ingredients: List[IngredientFlag]
    safety_score: int

class FinalAnalysisResponse(BaseModel):
    status: str
    ocr_data: OCRExtractionResult
    compliance: ComplianceResult
    ingredients: IngredientResult
    overall_risk_score: int
    risk_level: str
    inspection_priority: str