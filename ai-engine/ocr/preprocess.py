import cv2


def preprocess_image(image_path: str):
    """
    Prepare a product image before OCR.
    """

    # Read the image
    image = cv2.imread(image_path)

    if image is None:
        raise FileNotFoundError(
            f"Could not open image: {image_path}"
        )

    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Reduce small image noise
    denoised = cv2.medianBlur(gray, 3)

    # Improve contrast
    thresholded = cv2.threshold(
        denoised,
        0,
        255,
        cv2.THRESH_BINARY + cv2.THRESH_OTSU
    )[1]

    return thresholded