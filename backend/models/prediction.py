from datetime import datetime
from models import db

class Prediction(db.Model): 
    __tablename__ = 'predictions'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id', ondelete="CASCADE"), nullable=False, index=True)

    asistencia = db.Column(db.Float, nullable=False)
    promedio = db.Column(db.Float, nullable=False)
    materias_reprobadas = db.Column(db.Integer, nullable=False)
    antecedentes = db.Column(db.Integer, nullable=False) # 1: Sí, 0: No

    riesgo_predicho = db.Column(db.String(20), nullable=False)
    probabilidad = db.Column(db.Float, nullable=False)
    modelo_usado= db.Column(db.String(50), default="DecisionTree")

    fecha_prediccion = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(
        self,
        student_id=None,
        asistencia=None,
        promedio=None,
        materias_reprobadas=None,
        antecedentes=None,
        riesgo_predicho=None,
        probabilidad=None,
        modelo_usado="DecisionTree",
        **kwargs
    ):
        self.student_id = student_id
        self.asistencia = asistencia
        self.promedio = promedio
        self.materias_reprobadas = materias_reprobadas
        self.antecedentes = antecedentes
        self.riesgo_predicho = riesgo_predicho
        self.probabilidad = probabilidad
        self.modelo_usado = modelo_usado
        for key, value in kwargs.items():
            setattr(self, key, value)

    def to_dict(self):
        return {
            "id": self.id,
            "estudiante_id": self.student_id,
            "asistencia": self.asistencia,
            "promedio": self.promedio,
            "materias_reprobadas": self.materias_reprobadas,
            "antecedentes": self.antecedentes,
            "riesgo_predicho": self.riesgo_predicho,
            "probabilidad": round(self.probabilidad, 4),
            "modelo_usado": self.modelo_usado,
            "fecha_prediccion": self.fecha_prediccion.strftime('%Y-%m-%d %H:%M:%S') if self.fecha_prediccion else None
        }

    def __repr__(self):
        return f"<Prediction ID={self.id} StudentID={self.student_id} Riesgo={self.riesgo_predicho}>"

    
