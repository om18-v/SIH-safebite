import pytesseract

from preprocess import preprocess_image


# Location of the Tesseract OCR program
pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)


# Path of the product image
IMAGE_PATH = "ocr/test_product.png"


# Preprocess the image
processed_image = preprocess_image(IMAGE_PATH)


# Perform OCR
text = pytesseract.image_to_string(
    processed_image,
    config="--psm 6"
)


# Remove unnecessary blank lines
cleaned_text = "\n".join(
    line.strip()
    for line in text.splitlines()
    if line.strip()
)


# Print OCR result
print("\n===== OCR RESULT =====\n")
print(cleaned_text)


# Save OCR result to a text file
with open("ocr/ocr_output.txt", "w", encoding="utf-8") as file:
    file.write(cleaned_text)


print("\n===== OCR TEXT SAVED =====")
print("Saved to: ocr/ocr_output.txt")