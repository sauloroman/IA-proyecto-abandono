from flask import Blueprint

from controllers.predictor_controller import PredictorController

predictor_bp = Blueprint('predictor_bp', __name__)

@predictor_bp.route('/predict', methods=['POST'])
def predict_risk():
    return PredictorController.predict_risk()

@predictor_bp.route('/batch-upload', methods=['POST'])
def batch_predict():
    return PredictorController.batch_predict()