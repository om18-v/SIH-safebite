from typing import List
from schemas import IngredientResult, IngredientFlag

RESTRICTED_ADDITIVES = {
    "sodium benzoate": "Preservative flag - verify limit.",
    "e102": "Synthetic colorant flag.",
    "palm oil": "High saturated fat warning."
}

def analyze_ingredients(ingredients_list: List[str]) -> IngredientResult:
    flagged = []
    for item in ingredients_list:
        clean_name = item.strip().lower()
        if clean_name in RESTRICTED_ADDITIVES:
            flagged.append(IngredientFlag(
                name=item,
                alias=clean_name,
                flag=True,
                reason=RESTRICTED_ADDITIVES[clean_name]
            ))
    safety_score = max(0, 100 - (len(flagged) * 15))
    return IngredientResult(ingredients=flagged, safety_score=safety_score)