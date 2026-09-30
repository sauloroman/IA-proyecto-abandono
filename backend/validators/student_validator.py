class StudentValidator:

    @staticmethod
    def validate_create(data):
        errors = []
        
        if not data or not isinstance(data, dict):
            return False, ["El cuerpo de la petición debe ser un objeto JSON válido."]

        nombre = data.get('nombre', '').strip() if isinstance(data.get('nombre'), str) else ''
        matricula = data.get('matricula', '').strip() if isinstance(data.get('matricula'), str) else ''
        carrera = data.get('carrera', '').strip() if isinstance(data.get('carrera'), str) else ''
        
        if not nombre:
            errors.append('El campo "nombre" es obligatorio y no puede estar vacío.')
        
        if not matricula:
            errors.append('El campo "matrícula" es obligatorio y no puede estar vacío.')
       
        if not carrera:
            errors.append('El campo "carrera" es obligatorio y no puede estar vacío.')

        return len(errors) == 0, errors

    @staticmethod 
    def validate_update(data):
        errors = []

        if not data or not isinstance(data, dict):
            return False, ["El cuerpo de la petición debe ser un objeto JSON válido."]

        if 'nombre' in data:
            if not isinstance(data['nombre'], str) or not data['nombre'].strip():
                errors.append("El campo 'nombre' no puede estar vacío")

        if 'matricula' in data:
            if not isinstance(data['matricula'], str) or not data['matricula'].strip():
                errors.append("El campo 'matrícula' no puede estar vacío.")
        
        if 'carrera' in data:
            if not isinstance(data['carrera'], str) or not data['carrera'].strip():
                errors.append("El campo 'carrera' no puede estar vacío.")
        
        return len(errors) == 0, errors

