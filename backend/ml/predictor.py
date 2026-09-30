import os 
import pandas as pd
import joblib

class DropoutPredictor:

    _model_data = None

    @classmethod
    def load_model(cls):
        if(cls._model_data is None):
            model_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'best_model.joblib')

            if not os.path.exists(model_path):
                raise FileNotFoundError(f"El modelo entrenado no existe en: {model_path}. Ejecuta train_model.py primero")
            
            cls._model_data = joblib.load(model_path)

        return cls._model_data

    @classmethod
    def predict(cls, asistencia: float, promedio: float, materias_reprobadas: int, antecedentes: int):
        data = cls.load_model()
        pipeline = data['pipeline']
        model_name = data['model_name']
        features = data['features']

        input_df = pd.DataFrame([{
            'asistencia': float(asistencia),
            'promedio': float(promedio),
            'materias_reprobadas': int(materias_reprobadas),
            'antecedentes': int(antecedentes)
        }])[features]

        prediction_class = int(pipeline.predict(input_df)[0])
        probabilities = pipeline.predict_proba(input_df)[0]
        dropout_probability = float(probabilities[1])

        riesgo = 'Alto' if prediction_class == 1 else 'Bajo'

        return {
            'riesgo': riesgo,
            'probabilidad': round(dropout_probability, 4),
            'modelo_utilizado': model_name
        }
    
        
        
