from datetime import datetime
from models import db

class Student(db.Model):
    
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), nullable=False)
    matricula = db.Column(db.String(50), unique=True, nullable=True)
    carrera = db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    predictions = db.relationship('Prediction', backref='student', lazy=True, cascade="all, delete-orphan")  

    def __init__(self, nombre=None, matricula=None, carrera=None, **kwargs):
        self.nombre = nombre
        self.matricula = matricula
        self.carrera = carrera
        for key, value in kwargs.items():
            setattr(self, key, value)

    def to_dict(self, include_predictions=False):  
        data = {
            'id': self.id,
            'nombre': self.nombre,
            'matricula': self.matricula,
            'carrera': self.carrera,
            'creado_el': self.created_at.strftime('%Y-%m-%d %H:%M:%S') if self.created_at else None,
            'total_predicciones': len(self.predictions)
       }

        if include_predictions:
            data["predicciones"] = [p.to_dict() for p in self.predictions]

        return data

    def __repr__(self):
        return f"<Student {self.matricula} - {self.nombre}>"