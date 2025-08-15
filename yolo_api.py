from flask import Flask, request, send_file
from flask_cors import CORS
import torch
from PIL import Image
import io
import os
import cv2
import numpy as np
from ultralytics import YOLO

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load your YOLO model
model = YOLO('best.pt')

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint for Render"""
    return {'status': 'healthy', 'service': 'YOLO API', 'model_loaded': True}, 200

def draw_label_with_bg(img, text, position):
    """Draw text with background for better visibility"""
    font = cv2.FONT_HERSHEY_SIMPLEX
    font_scale = 0.6
    thickness = 2
    
    # Get text size
    (text_width, text_height), baseline = cv2.getTextSize(text, font, font_scale, thickness)
    
    # Position for background rectangle
    x, y = position
    bg_x1, bg_y1 = x, y - text_height - baseline
    bg_x2, bg_y2 = x + text_width, y + baseline
    
    # Draw background rectangle
    cv2.rectangle(img, (bg_x1, bg_y1), (bg_x2, bg_y2), (0, 0, 0), -1)
    
    # Draw text
    cv2.putText(img, text, (x, y), font, font_scale, (255, 255, 255), thickness)

def postprocess_and_draw(img, results):
    """Post-process YOLO results and draw bounding boxes"""
    if not results or len(results) == 0:
        return img
    
    result = results[0]
    img_array = np.array(img)
    
    # Convert PIL to OpenCV format (RGB to BGR)
    img_cv = cv2.cvtColor(img_array, cv2.COLOR_RGB2BGR)
    
    for box in result.boxes:
        x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
        cv2.rectangle(img_cv, (x1, y1), (x2, y2), color=(0, 0, 255), thickness=3)
        
        conf = box.conf[0].cpu().item()
        draw_label_with_bg(img_cv, f'{conf:.2f}', (x1, y1))
    
    # Convert back to RGB for PIL
    img_rgb = cv2.cvtColor(img_cv, cv2.COLOR_BGR2RGB)
    return Image.fromarray(img_rgb)

@app.route('/predict', methods=['POST'])
def predict():
    print("Received prediction request")
    file = request.files['image']
    img_bytes = file.read()
    print(f"Image size: {len(img_bytes)} bytes")
    img = Image.open(io.BytesIO(img_bytes)).convert('RGB')
    img = img.resize((1024, 1024))  # Ensure correct size
    print(f"Resized image to: {img.size}")

    # Run inference
    print("Running YOLO inference...")
    results = model.predict(
        source=np.array(img),
        save=False,
        save_txt=False,
        imgsz=1024
    )
    print(f"YOLO results: {len(results)} detections")

    # Postprocess and draw boxes/scores
    print("Post-processing image...")
    result_img = postprocess_and_draw(img, results)
    print(f"Post-processed image size: {result_img.size}")

    # Save to buffer and send as response
    buf = io.BytesIO()
    result_img.save(buf, format='JPEG')
    buf.seek(0)
    response_size = len(buf.getvalue())
    print(f"Sending response: {response_size} bytes")
    return send_file(buf, mimetype='image/jpeg')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=False) 