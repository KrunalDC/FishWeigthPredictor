from flask import Flask, request, jsonify, render_template
import numpy as np
import joblib

app = Flask(__name__)

# Load the trained model and scaler
model = joblib.load('fish_weight_model.pkl')
scaler = joblib.load('scaler.pkl')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    print("Start")
    data = request.get_json()
    length1 = data['length1']
    length2 = data['length2']
    length3 = data['length3']
    height = data['height']
    width = data['width']
    
    features = np.array([[length1, length2, length3, height, width]])
    features_scaled = scaler.transform(features)
    
    weight = model.predict(features_scaled)[0]
    
    return jsonify({'weight': weight})

if __name__ == '__main__':
    app.run(debug=True)
