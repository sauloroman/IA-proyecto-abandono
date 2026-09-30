import pandas as pd
from ml.explainer import AcademicAdvisor
from flask import request, jsonify

from models import db, Prediction, Student
from validators.predictor_validator import PredictorValidator
from ml.predictor import DropoutPredictor

class PredictorController:
    
    @staticmethod
    def predict_risk():
        data = request.get_json() or {}

        is_valid, errores, cleaned_data = PredictorValidator.validate_prediction_input(data)

        if not is_valid:
            return jsonify({
                'estado': 'error',
                'errores': errores
            }), 400

        student = Student.query.get(cleaned_data['estudiante_id'])

        if not student:
            return jsonify({
                'estado': 'error',
                'mensaje': f"El estudiante con ID {cleaned_data['estudiante_id']} no existe."
            }), 404

        try:
            prediction_output = DropoutPredictor.predict(
                asistencia = cleaned_data['asistencia'],
                promedio = cleaned_data['promedio'],
                materias_reprobadas = cleaned_data['materias_reprobadas'],
                antecedentes = cleaned_data['antecedentes']
            )
        except Exception as e:
            return jsonify({
                'estado': 'error',
                'mensaje': f'Error en el motor de Machine Learning: {str(e)}'
            }), 500

        riesgo = prediction_output['riesgo']
        probabilidad = prediction_output['probabilidad']
        modelo_utilizado = prediction_output['modelo_utilizado']
        
        factores_detonantes = AcademicAdvisor.analyze_risk_factors(
            asistencia=cleaned_data['asistencia'],
            promedio=cleaned_data['promedio'],
            materias_reprobadas=cleaned_data['materias_reprobadas'],
            antecedentes=cleaned_data['antecedentes']
        )

        plan_rescate = AcademicAdvisor.generate_rescue_plan(
            asistencia=cleaned_data['asistencia'],
            promedio=cleaned_data['promedio'],
            materias_reprobadas=cleaned_data['materias_reprobadas'],
            antecedentes=cleaned_data['antecedentes'],
            probabilidad_actual=probabilidad
        )

        new_prediction = Prediction(
            student_id=student.id,
            asistencia=cleaned_data['asistencia'],
            promedio=cleaned_data['promedio'],
            materias_reprobadas=cleaned_data['materias_reprobadas'],
            antecedentes=cleaned_data['antecedentes'],
            probabilidad=probabilidad,
            riesgo_predicho=riesgo,
            modelo_usado=modelo_utilizado
        )

        db.session.add(new_prediction)
        db.session.commit()

        return jsonify({
            'estado': 'exito',
            'mensaje': 'Predicción de riesgo completada y registrada en la base de datos',
            'estudiante': {
                'id': student.id,
                'nombre': student.nombre,
                'matricula': student.matricula,
                'carrera': student.carrera
            },
            'diagnostico': {
                'id_evaluacion': new_prediction.id,
                'riesgo': riesgo,
                'probabilidad': probabilidad,
                'modelo_usado': modelo_utilizado,
                'fecha_prediccion': new_prediction.fecha_prediccion.strftime('%Y-%m-%d %H:%M:%S')
            },
            'factores_detonantes': factores_detonantes,
            'plan_rescate_tutoria': plan_rescate,
            'aviso_etico': 'Estimación probabilística asistencial. No debe emplearse como medida administrativa sobre el estudiante.'        
        }), 201

    @staticmethod
    def batch_predict():
        archivo = request.files.get('archivo') or request.files.get('file')

        if not archivo or archivo.filename == '':
            return jsonify({
                'estado': 'error',
                'mensaje': 'No se adjuntó ningún archivo bajo la clave "archivo" o "file"'
            }), 400

        filename = archivo.filename.lower()

        try:
            if filename.endswith('.csv'):
                df = pd.read_csv(archivo)
            elif filename.endswith(('.xlsx', '.xls')):
                df = pd.read_excel(archivo)
            else:
                return jsonify({
                    'estado': 'error', 
                    'mensaje': 'Formato no soportado. Debe ser un archivo .xlsx, .xls o .csv'
                }), 400
        except Exception as e:
            return jsonify({
                'estado': 'error', 
                'mensaje': f'Error al leer el archivo: {str(e)}'
            }), 400
            
        df.columns = [str(c).strip().lower().replace(' ', '_').replace('í', 'i') for c in df.columns]
        required_cols = ['nombre', 'matricula', 'asistencia', 'promedio', 'materias_reprobadas', 'antecedentes']
        missing_cols = [c for c in required_cols if c not in df.columns]

        if missing_cols:
            return jsonify({
                'estado': 'error',
                'mensaje': f'Faltan columnas requeridas en el archivo: {missing_cols}',
                'columnas_esperadas': required_cols
            }), 400

        resultados = []
        alumnos_riesgo_alto = []
        conteo_alto = 0
        conteo_bajo = 0

        try:
            for _, row in df.iterrows():
                nombre = str(row['nombre']).strip()
                matricula = str(row['matricula']).strip()
                carrera = str(row.get('carrera', '')).strip() if pd.notna(row.get('carrera')) else None

                asistencia = float(row['asistencia'])
                promedio = float(row['promedio'])
                materias_reprobadas = int(row['materias_reprobadas'])
                antecedentes = int(row['antecedentes'])

                student = Student.query.filter_by(matricula=matricula).first()

                if not student:
                    student = Student(nombre=nombre, matricula=matricula, carrera=carrera)
                    db.session.add(student)
                    db.session.flush()
                    
                prediction_output = DropoutPredictor.predict(
                    asistencia=asistencia,
                    promedio=promedio,
                    materias_reprobadas=materias_reprobadas,
                    antecedentes=antecedentes
                )

                riesgo = prediction_output['riesgo']
                probabilidad = prediction_output['probabilidad']
                modelo = prediction_output['modelo_utilizado']
                
                factores = AcademicAdvisor.analyze_risk_factors(asistencia, promedio, materias_reprobadas, antecedentes)
                
                plan = AcademicAdvisor.generate_rescue_plan(
                    asistencia, 
                    promedio, 
                    materias_reprobadas, 
                    antecedentes, 
                    probabilidad_actual=probabilidad
                )
                
                prediction = Prediction(
                    student_id=student.id,
                    asistencia=asistencia,
                    promedio=promedio,
                    materias_reprobadas=materias_reprobadas,
                    antecedentes=antecedentes,
                    riesgo_predicho=riesgo,
                    probabilidad=probabilidad,
                    modelo_usado=modelo
                )

                db.session.add(prediction)

                if riesgo == 'Alto':
                    conteo_alto += 1
                    alumnos_riesgo_alto.append({
                        'matricula': matricula,
                        'nombre': nombre,
                        'probabilidad': probabilidad,
                        'alerta': 'Requiere citatorio urgente'
                    })
                else:
                    conteo_bajo += 1
                    
                resultados.append({
                    'estudiante': {'id': student.id, 'nombre': nombre, 'matricula': matricula},
                    'diagnostico': {'riesgo': riesgo, 'probabilidad': f"{round(probabilidad * 100, 2)}%"},
                    'factores_criticos': [f['diagnostico'] for f in factores if f['nivel'] in ['Crítico', 'Alerta']],
                    'plan_rescate': {
                        'requiere_intervencion': plan['requiere_intervencion'],
                        'nueva_probabilidad_proyectada': plan['simulacion_rescate']['nueva_probabilidad'],
                        'reduccion_riesgo': plan['simulacion_rescate']['reduccion_esperada'],
                        'impacto': plan['simulacion_rescate']['impacto_diagnostico'],
                        'acciones': plan['acciones_recomendadas']
                    }
                })

            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return jsonify({'estado': 'error', 'mensaje': f'Error durante el procesamiento del archivo: {str(e)}'}), 500
            
        total_procesados = len(resultados)
        tasa_riesgo = round((conteo_alto / total_procesados) * 100, 1) if total_procesados > 0 else 0

        return jsonify({
            'estado': 'exito',
            'mensaje': f'Se procesaron exitosamente {total_procesados} estudiantes del archivo.',
            'resumen_grupal': {
                'total_estudiantes': total_procesados,
                'alumnos_riesgo_alto': conteo_alto,
                'alumnos_riesgo_bajo': conteo_bajo,
                'tasa_riesgo_grupal': f'{tasa_riesgo}%',
                'alumnos_prioritarios_atencion': alumnos_riesgo_alto
            },
            'detalles': resultados
        }), 201
