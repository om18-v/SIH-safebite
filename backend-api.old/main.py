from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import FinalAnalysisResponse
from ocr_pipeline import extract_label_data
from compliance_rules import verify_metrology_rules
from ingredient_safety import analyze_ingredients

app = FastAPI(title="SIH SafeBite Core API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"status": "Backend Live"}

@app.post("/products/upload", response_model=FinalAnalysisResponse)
async def upload_product(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Must be an image.")

    image_bytes = await file.read()
    ocr_data = extract_label_data(image_bytes)
    compliance_res = verify_metrology_rules(ocr_data)
    ingredient_res = analyze_ingredients(ocr_data.ingredients)

    raw_risk = int((compliance_res.compliance_score * 0.40) + (ingredient_res.safety_score * 0.25) + 15)

    return FinalAnalysisResponse(
        status="success",
        ocr_data=ocr_data,
        compliance=compliance_res,
        ingredients=ingredient_res,
        overall_risk_score=raw_risk,
        risk_level="MEDIUM" if raw_risk < 60 else "HIGH",
        inspection_priority="ROUTINE INSPECTION"
    )