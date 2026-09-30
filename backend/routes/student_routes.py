from flask import Blueprint

from controllers.student_controller import StudentController

students_bp = Blueprint('students_bp', __name__ )

@students_bp.route('', methods=['POST'])
def create_student():
    return StudentController.create_student()

@students_bp.route('', methods=['GET'])
def get_students():
    return StudentController.get_all_students()

@students_bp.route('/<int:student_id>', methods=["GET"])
def get_student_by_id(student_id):
    return StudentController.get_student_by_id(student_id)

@students_bp.route('/<int:student_id>', methods=["PUT"])
def update_student(student_id):
    return StudentController.update_student(student_id)

@students_bp.route('/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    return StudentController.delete_student(student_id)