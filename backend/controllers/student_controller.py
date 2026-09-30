from flask import request, jsonify

from models import db, Student, Prediction
from validators.student_validator import StudentValidator
from ml.predictor import DropoutPredictor 

class StudentController:

    @staticmethod
    def create_student():
        data = request.get_json() or {}
        
        is_valid, errors = StudentValidator.validate_create(data)

        if not is_valid:
            return jsonify({
                'estado': 'error',
                'errores': errors
            }), 400

        matricula = data['matricula'].strip()

        if Student.query.filter_by(matricula=matricula).first():
            return jsonify({
                'estado': 'error',
                'mensaje': f'Ya existe un estudiante con la matrícula "{matricula}"' 
            }), 400

        student = Student(
            nombre=data['nombre'].strip(),
            matricula=matricula,
            carrera=data.get("carrera", "").strip() or None
        )

        db.session.add(student)
        db.session.commit()

        return jsonify({
            'estado': 'exito',
            'mensaje': 'Estudiante registrado exitosamente',
            'datos': student.to_dict()
        }), 201

    @staticmethod
    def get_all_students():
        students = Student.query.order_by(Student.id.asc()).all()

        return jsonify({
            'estado': 'exito',
            'total': len(students),
            'datos': [s.to_dict(include_predictions=False) for s in students]
        }), 200

    @staticmethod
    def get_student_by_id(student_id):
        student = Student.query.get(student_id)

        if not student:
            return jsonify({
                'estado': 'error',
                'mensaje': f'Estudiante con ID {student_id} no encontrado'
            }), 404
        
        return jsonify({
            'estado': 'exito',
            'datos': student.to_dict(include_predictions=True)
        }), 200

    @staticmethod
    def update_student(student_id):
        student = Student.query.get(student_id)
        
        if not student:
            return jsonify({'estado': 'error', 'mensaje': f'Estudiante con ID {student_id} no encontrado.'}), 404
        
        data = request.get_json() or {}
        is_valid, errors = StudentValidator.validate_update(data)
        
        if not is_valid:
            return jsonify({'estado': 'error', 'errores': errors}), 400
        
        if 'nombre' in data:
            student.nombre = data['nombre'].strip()
        
        if 'matricula' in data:
            matricula = data['matricula'].strip()
            existente = Student.query.filter_by(matricula=matricula).first()
        
            if existente and existente.id != student.id:
                return jsonify({'estado': 'error', 'mensaje': 'Esa matrícula ya pertenece a otro estudiante.'}), 409
        
            student.matricula = matricula
        
        if 'carrera' in data:
            student.carrera = data['carrera'].strip() or None
        
        db.session.commit()
        
        return jsonify({
            'estado': 'exito',
            'mensaje': 'Estudiante actualizado exitosamente.',
            'datos': student.to_dict()
        }), 200

    @staticmethod
    def delete_student(student_id):
        student = Student.query.get(student_id)

        if not student:
            return jsonify({
                'estado': 'error',
                'mensaje': f'Estudiante con ID {student_id} no encontrado'
            }), 404
        
        db.session.delete(student)
        db.session.commit()

        return jsonify({
            'estado': 'exito',
            'mensaje': f'Estudiante con ID {student_id} y su historial de predicciones fueron eliminados'
        }), 200
