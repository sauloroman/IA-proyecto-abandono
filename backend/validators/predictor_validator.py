class PredictorValidator:

    @staticmethod 
    def validate_prediction_input(data):
        errors = []

        if not data or not isinstance(data, dict):
            return False, ["El cuerpo de la petición debe ser un objeto JSON válido"]
        
        required = ["student_id", "asistencia", "promedio", "materias_reprobadas", "antecedentes"]

        for field in required:
            if field not in data:
                errors.append(f"El campo '{field}' es obligatorio para la predicción.")

        if errors:
            return False, errors, None

        cleaned_data = {}
        try:
            cleaned_data['student_id'] = int(data['student_id'])
            cleaned_data['asistencia'] = float(data['asistencia'])
            cleaned_data['promedio'] = float(data['promedio'])
            cleaned_data['materias_reprobadas'] = int(data['materias_reprobadas'])
            cleaned_data['antecedentes'] = int(data['antecedentes'])
        except (ValueError, TypeError):
            return False, ["Los campos deben contener valores numéricos válidos"], None

        if not (0.0 <= cleaned_data["asistencia"] <= 100.0):
            errors.append("La 'asistencia' debe encontrarse entre 0.0% y 100.0%")
        
        if not (0.0 <= cleaned_data["promedio"] <= 10.0):
            errors.append("El 'promedio' debe encontrarse entre 0.0 y 10.0")

        if cleaned_data["materias_reprobadas"] < 0:
            errors.append("Las 'materias_reprobadas' no pueden ser negativas.")

        if cleaned_data["antecedentes"] not in [0, 1]:
            errors.append("El campo 'antecedentes' debe ser 0 (no) o 1 (sí).")

        return len(errors) == 0, errors, cleaned_data 