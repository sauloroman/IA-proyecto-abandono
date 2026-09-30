from ml.predictor import DropoutPredictor

class AcademicAdvisor:

    @classmethod
    def analyze_risk_factors(cls, asistencia: float, promedio: float, materias_reprobadas: int, antecedentes: int):
        factores = []

        if materias_reprobadas >= 3:
            factores.append({
                'factor': 'materias_reprobadas',
                'nivel': 'Crítico',
                'impacto_porcentual': 40,
                'diagnostico': f'Acumula {materias_reprobadas} materias reprobadas, lo que genera alto rezago curricular.'
            })
        elif materias_reprobadas in [1, 2]:
            factores.append({
                'factor': 'materias_reprobadas',
                'nivel': 'Moderado',
                'impacto_porcentual': 20,
                'diagnostico': f'Registra {materias_reprobadas} materia(s) no acreditada(s).'
            })

        if asistencia < 60.0:
            factores.append({
                'factor': 'asistencia',
                'nivel': 'Crítico',
                'impacto_porcentual': 35,
                'diagnostico': f'Asistencia del {asistencia}% muy por debajo del mínimo institucional reglamentario (80%).'
            })
        elif asistencia < 80.0:
            factores.append({
                'factor': 'asistencia',
                'nivel': 'Alerta',
                'impacto_porcentual': 20,
                'diagnostico': f'Asistencia del {asistencia}% en zona límite de derecho a examen ordinario.'
            })

        if antecedentes == 1:
            factores.append({
                'factor': 'antecedentes',
                'nivel': 'Alerta',
                'impacto_porcentual': 15,
                'diagnostico': 'El alumno cuenta con antecedentes de bajo rendimiento o bajas temporales previas.'
            })

        if promedio < 6.5:
            factores.append({
                'factor': 'promedio',
                'nivel': 'Moderado',
                'impacto_porcentual': 10,
                'diagnostico': f'Promedio general de {promedio}, en riesgo de pérdida de regularidad académica.'
            })

        if not factores:
            factores.append({
                'factor': 'general',
                'nivel': 'Excelente',
                'impacto_porcentual': 0,
                'diagnostico': 'El alumno presenta métricas saludables de permanencia y buen desempeño.'
            })

        return factores

    @classmethod
    def generate_rescue_plan(cls, asistencia: float, promedio: float, materias_reprobadas: int, antecedentes: int):
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
                'acciones': ['Monitoreo ordinario al cierre del cuatrimestre.'],
                'probabilidad_proyectada': 0.05
            }

        simulacion = DropoutPredictor.predict(
            asistencia=asistencia_meta,
            promedio=promedio_meta,
            materias_reprobadas=materias_meta,
            antecedentes=antecedentes
        )

        return {
            'requiere_intervencion': True,
            'mensaje': 'Plan de rescate sugerido para recuperar la permanencia escolar:',
            'acciones_recomendadas': acciones,
            'simulacion_rescate': {
                'asistencia_proyectada': asistencia_meta,
                'materias_meta': materias_meta,
                'nuevo_riesgo_estimado': simulacion['riesgo'],
                'nueva_probabilidad': simulacion['probabilidad']
            }
        }
