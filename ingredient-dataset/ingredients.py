import csv
import io
import json
import re
from typing import Any, Dict, List

# ==========================================
# 1. INLINE DATASETS (Member 5 Data Layer)
# ==========================================

INGREDIENTS_CSV_DATA = """ingredient_id,ingredient_name,category,risk_level,restricted,flag_reason,source,typical_products
ING001,Potassium Bromate,Processing Aid,High,true,Banned substance; potential carcinogenic concern under FSSAI,FSSAI Prohibited List,"Bread, buns, bakery products, flour treatment"
ING002,Non-permitted Synthetic Colours,Colorant,High,true,Illegal when used in food products; unauthorized colour use,FSSAI Prohibited List,"Sweets, candies, beverages, snacks, desserts"
ING003,Tartrazine,Colorant,Medium,true,Permitted under strict prescribed limits; INS 102,FSSAI Restricted List,"Yellow candies, beverages, desserts, confectionery"
ING004,Sodium Benzoate,Preservative,Medium,true,Permitted under strict prescribed limits; INS 211,FSSAI Restricted List,"Soft drinks, fruit beverages, sauces"
ING005,Potassium Sorbate,Preservative,Medium,true,Permitted under strict prescribed limits; INS 202,FSSAI Restricted List,"Dairy products, beverages, sauces, bakery"
ING006,TBHQ,Antioxidant,Medium,true,Permitted under strict prescribed limits; INS 319,FSSAI Restricted List,"Edible oils, fried snacks, instant foods"
ING007,BHA,Antioxidant,Medium,true,Permitted under strict prescribed limits; INS 320,FSSAI Restricted List,"Fats/oils, processed foods"
ING008,BHT,Antioxidant,Medium,true,Permitted under strict prescribed limits; INS 321,FSSAI Restricted List,"Fats/oils and some processed foods"
ING009,Monosodium Glutamate,Flavor Enhancer,Medium,true,Permitted under strict limits; INS 621 (MSG),FSSAI Restricted List,"Chips, instant noodles, seasonings, soups"
ING010,Aspartame,Artificial Sweetener,Medium,true,Permitted under strict limits; INS 951,FSSAI Restricted List,"Diet drinks, sugar-free products"
ING011,Carrageenan,Stabiliser,Low,true,Permitted under strict limits; INS 407,FSSAI Restricted List,"Ice cream, dairy products, flavoured milk"
ING012,Palm Oil / Palmolein,Fat,Low,true,Health concern ingredient; high in saturated fats,FSSAI Investigation List,"Chips, biscuits, bakery, confectionery"
ING013,Refined Flour (Maida),Carbohydrate,Low,true,Health concern ingredient; high glycemic index / refined carbs,FSSAI Investigation List,"Biscuits, bread, cakes, noodles"
ING014,Sugar,Sweetener,Low,false,None,FSSAI Standard List,"Confectionery, beverages, bakery"
ING015,Salt,Mineral,Low,false,None,FSSAI Standard List,"General processed foods"
"""

ALIASES_CSV_DATA = """alias_id,ingredient_id,alias_name
1,ING001,INS 924a
2,ING001,E924
3,ING001,potassium bromate
4,ING003,102
5,ING003,INS 102
6,ING003,E102
7,ING004,211
8,ING004,INS 211
9,ING004,E211
10,ING005,202
11,ING005,INS 202
12,ING006,319
13,ING006,INS 319
14,ING007,320
15,ING007,INS 320
16,ING008,321
17,ING008,INS 321
18,ING009,621
19,ING009,INS 621
20,ING009,MSG
21,ING010,951
22,ING010,INS 951
23,ING011,407
24,ING011,INS 407
25,ING012,palmolein
26,ING012,palm oil
27,ING013,maida
28,ING013,refined wheat flour
"""


# ==========================================
# 2. INGREDIENT MATCHING ENGINE (Member 5 Core)
# ==========================================

class IngredientEngine:
    def __init__(self, ingredients_csv_str: str, aliases_csv_str: str):
        self.ingredients: Dict[str, Dict] = {}
        self.aliases: Dict[str, str] = {}
        self._load_data(ingredients_csv_str, aliases_csv_str)

    def _load_data(self, ingredients_csv_str: str, aliases_csv_str: str):
        # Load Main Ingredients Dataset
        f_ing = io.StringIO(ingredients_csv_str.strip())
        for row in csv.DictReader(f_ing):
            self.ingredients[row['ingredient_id']] = {
                'ingredient_name': row['ingredient_name'],
                'category': row['category'],
                'risk_level': row['risk_level'],
                'restricted': row['restricted'].lower() == 'true',
                'flag_reason': row['flag_reason'],
                'source': row['source'],
                'typical_products': row['typical_products']
            }

        # Load Aliases & E-Numbers Dataset
        f_alias = io.StringIO(aliases_csv_str.strip())
        for row in csv.DictReader(f_alias):
            clean_alias = self._clean_text(row['alias_name'])
            self.aliases[clean_alias] = row['ingredient_id']
                
        # Also map canonical ingredient names as aliases
        for ing_id, data in self.ingredients.items():
            clean_main = self._clean_text(data['ingredient_name'])
            self.aliases[clean_main] = ing_id

    def _clean_text(self, text: str) -> str:
        """Lowercase, strip punctuation, and trim spacing."""
        text = text.lower()
        text = re.sub(r'[^\w\s]', '', text)
        text = re.sub(r'\s+', ' ', text)
        return text.strip()

    def process_ocr_text(self, raw_ocr: str, product_name: str = "Scanned Food Item") -> Dict[str, Any]:
        """
        Processes OCR string input, normalizes data, flags violations, 
        and generates a compliance summary report payload.
        """
        # Split OCR string by commas or semicolons
        raw_list = re.split(r'[,;]', raw_ocr)
        parsed_ingredients = []
        flagged_count = 0
        overall_status = "COMPLIANT"

        for raw_item in raw_list:
            if not raw_item.strip():
                continue

            clean_item = self._clean_text(raw_item)
            matched_id = self.aliases.get(clean_item)

            if matched_id:
                data = self.ingredients[matched_id]
                is_flagged = data['restricted']
                
                if is_flagged:
                    flagged_count += 1
                    if data['risk_level'] == 'High':
                        overall_status = "NON-COMPLIANT (BANNED/HIGH RISK)"
                    elif overall_status != "NON-COMPLIANT (BANNED/HIGH RISK)":
                        overall_status = "RESTRICTED / REGULATORY WARNING"

                parsed_ingredients.append({
                    "raw_text": raw_item.strip(),
                    "normalized_name": data['ingredient_name'],
                    "category": data['category'],
                    "risk_level": data['risk_level'],
                    "flagged": is_flagged,
                    "explanation": data['flag_reason'] if is_flagged else "Compliant ingredient under FSSAI rules.",
                    "typical_products_used_in": data['typical_products']
                })
            else:
                # Handle unlisted / unknown ingredients explicitly without guessing
                parsed_ingredients.append({
                    "raw_text": raw_item.strip(),
                    "normalized_name": clean_item,
                    "category": "Unknown",
                    "risk_level": "Unknown",
                    "flagged": False,
                    "explanation": "Unlisted ingredient; requires regulatory verification.",
                    "typical_products_used_in": "N/A"
                })

        # Return structured JSON payload (Compatible with Member 2 API response)
        return {
            "product_name": product_name,
            "overall_status": overall_status,
            "total_ingredients_scanned": len(parsed_ingredients),
            "flagged_ingredients_count": flagged_count,
            "scanned_ingredients": parsed_ingredients
        }


# ==========================================
# 3. EXECUTION TEST CASES
# ==========================================

if __name__ == "__main__":
    # Initialize engine with inline datasets
    engine = IngredientEngine(INGREDIENTS_CSV_DATA, ALIASES_CSV_DATA)

    # Sample raw OCR text output from a scanned product package label
    sample_ocr_input = "Refined Wheat Flour, Palm Oil, INS 621, INS 319, INS 924a, Sugar, Salt"

    # Process ingredients and output final safety report
    print("--- GENERATING INGREDIENT COMPLIANCE REPORT ---")
    inspection_report = engine.process_ocr_text(sample_ocr_input, product_name="Bakery Snack Pack")
    
    # Render pretty-printed JSON output
    print(json.dumps(inspection_report, indent=2))