class PredictorValidator:

    @staticmethod 
    def validate_prediction_input(data):
        errores = []

        if not data or not isinstance(data, dict):
            return False, ["El cuerpo de la petición debe ser un objeto JSON válido"], None
        
        estudiante_id = data.get("estudiante_id") if "estudiante_id" in data else data.get("student_id")
        
        if estudiante_id is None:
            errores.append("El campo 'estudiante_id' es obligatorio para la predicción.")

        required = ["asistencia", "promedio", "materias_reprobadas", "antecedentes"]
        for field in required:
            if field not in data:
                errores.append(f"El campo '{field}' es obligatorio para la predicción.")

        if errores:
            return False, errores, None

        cleaned_data = {}
        try:
            cleaned_data['estudiante_id'] = int(estudiante_id)
            cleaned_data['asistencia'] = float(data['asistencia'])
            cleaned_data['promedio'] = float(data['promedio'])
            cleaned_data['materias_reprobadas'] = int(data['materias_reprobadas'])
            cleaned_data['antecedentes'] = int(data['antecedentes'])
        except (ValueError, TypeError):
            return False, ["Los campos deben contener valores numéricos válidos"], None

        if not (0.0 <= cleaned_data["asistencia"] <= 100.0):
            errores.append("La 'asistencia' debe encontrarse entre 0.0% y 100.0%")
        
        if not (0.0 <= cleaned_data["promedio"] <= 10.0):
            errores.append("El 'promedio' debe encontrarse entre 0.0 y 10.0")

        if cleaned_data["materias_reprobadas"] < 0:
            errores.append("Las 'materias_reprobadas' no pueden ser negativas.")

        if cleaned_data["antecedentes"] not in [0, 1]:
            errores.append("El campo 'antecedentes' debe ser 0 (no) o 1 (sí).")

        return len(errores) == 0, errores, cleaned_data