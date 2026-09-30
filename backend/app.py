from flask import Flask, jsonify
from flask_cors import CORS
from config.config import Config

from models import db
from routes.student_routes import students_bp
from routes.predictor_routes import predictor_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    db.init_app(app)

    app.register_blueprint(students_bp, url_prefix='/api/students')
    app.register_blueprint(predictor_bp, url_prefix='/api/predictor')

    @app.route('/api/health', methods=["GET"])
    def health_check():
        return jsonify({
            'estado': 'exito',
            'mensaje': 'API de Predicción de Abandono Escolar en Funcionamiento',
            'base_datos': 'Conectada exitosamente'
        }), 200

    with app.app_context():
        db.create_all()

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)

