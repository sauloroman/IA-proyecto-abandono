from ml.predictor import DropoutPredictor

class AcademicAdvisor:

    @classmethod
    def analyze_risk_factors(cls, asistencia: float, promedio: float, materias_reprobadas: int, antecedentes: int):
        factores = []

        if materias_reprobadas >= 3:
            factores.append({
                'factor': 'Asignaturas No Acreditadas',
                'nivel': 'Crítico',
                'impacto_porcentual': 40,
                'diagnostico': f'Acumula {materias_reprobadas} materias reprobadas, lo que genera alto rezago curricular.'
            })
        elif materias_reprobadas in [1, 2]:
            factores.append({
                'factor': 'Asignaturas No Acreditadas',
                'nivel': 'Moderado',
                'impacto_porcentual': 20,
                'diagnostico': f'Registra {materias_reprobadas} materia(s) no acreditada(s).'
            })

        if asistencia < 60.0:
            factores.append({
                'factor': 'Asistencia Escolar',
                'nivel': 'Crítico',
                'impacto_porcentual': 35,
                'diagnostico': f'Asistencia del {asistencia}% muy por debajo del mínimo institucional reglamentario (80%).'
            })
        elif asistencia < 80.0:
            factores.append({
                'factor': 'Asistencia Escolar',
                'nivel': 'Alerta',
                'impacto_porcentual': 20,
                'diagnostico': f'Asistencia del {asistencia}% en zona límite de derecho a examen ordinario.'
            })

        if antecedentes == 1:
            factores.append({
                'factor': 'Historial y Antecedentes',
                'nivel': 'Alerta',
                'impacto_porcentual': 15,
                'diagnostico': 'El alumno cuenta con antecedentes de bajo rendimiento o bajas temporales previas.'
            })

        if promedio < 6.5:
            factores.append({
                'factor': 'Rendimiento Académico (Promedio)',
                'nivel': 'Moderado',
                'impacto_porcentual': 10,
                'diagnostico': f'Promedio general de {promedio}, en riesgo de pérdida de regularidad académica.'
            })

        if not factores:
            factores.append({
                'factor': 'Métricas Generales',
                'nivel': 'Excelente',
                'impacto_porcentual': 0,
                'diagnostico': 'El alumno presenta métricas saludables de permanencia y buen desempeño.'
            })

        return factores

    @classmethod
    def generate_rescue_plan(cls, asistencia: float, promedio: float, materias_reprobadas: int, antecedentes: int, probabilidad_actual: float = 0.0):
        acciones = []

        asistencia_meta = asistencia
        materias_meta = materias_reprobadas
        promedio_meta = promedio

        if asistencia < 80.0:
            asistencia_meta = 85.0
            acciones.append(f'Compromiso de asistencia: Aumentar del {asistencia}% al menos al 85% durante el siguiente mes.')

        if materias_reprobadas > 0:
            materias_meta = 0
            acciones.append(f'Acreditar las {materias_reprobadas} materia(s) pendientes en el próximo periodo de regularización/asesorías.')

        if promedio < 7.0:
            promedio_meta = 7.5
            acciones.append(f'Establecer metas de estudio asistido para elevar el promedio actual ({promedio}) a mínimo 7.5.')

        if antecedentes == 1:
            acciones.append('Canalización al departamento de orientación psicopedagógica y tutorías individuales quincenales.')

        if not acciones:
            return {
                'requiere_intervencion': False,
                'mensaje': 'El alumno no requiere plan de rescate de emergencia. Continuar con tutoría ordinaria.',
                'acciones_recomendadas': ['Monitoreo ordinario al cierre del cuatrimestre.'],
                'simulacion_rescate': {
                    'probabilidad_actual': f"{round(probabilidad_actual * 100, 2)}%",
                    'nueva_probabilidad': f"{round(probabilidad_actual * 100, 2)}%",
                    'reduccion_esperada': "0.0%",
                    'impacto_diagnostico': 'El alumno se encuentra en permanencia saludable.'
                }
            }

        simulacion = DropoutPredictor.predict(
            asistencia=asistencia_meta,
            promedio=promedio_meta,
            materias_reprobadas=materias_meta,
            antecedentes=antecedentes
        )

        nueva_probabilidad = simulacion['probabilidad']
        reduccion = round((probabilidad_actual - nueva_probabilidad) * 100, 2)

        return {
            'requiere_intervencion': True,
            'mensaje': 'Plan de rescate sugerido para recuperar la permanencia escolar:',
            'acciones_recomendadas': acciones,
            'simulacion_rescate': {
                'probabilidad_actual': f"{round(probabilidad_actual * 100, 2)}%",
                'nueva_probabilidad': f"{round(nueva_probabilidad * 100, 2)}%",
                'nuevo_riesgo_estimado': simulacion['riesgo'],
                'reduccion_esperada': f"-{abs(reduccion)}%",
                'impacto_diagnostico': f"Al aplicar este plan, la probabilidad de abandono disminuye del {round(probabilidad_actual * 100, 1)}% al {round(nueva_probabilidad * 100, 1)}% (Reducción de {abs(reduccion)} puntos porcentuales)."
            }
        }
