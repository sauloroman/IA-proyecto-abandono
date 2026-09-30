/**
 * @endpoint GET /api/health
 */
export interface RespuestaSalud {
    estado: 'exito' | 'error';
    mensaje: string;
    base_datos: string;
}

/**
 * @endpoint GET /api/students/:id (incluido en el arreglo 'predicciones')
 */
export interface DetallePrediccion {
    id: number;
    estudiante_id: number;
    asistencia: number;
    promedio: number;
    materias_reprobadas: number;
    antecedentes: number;
    riesgo_predicho: 'Alto' | 'Bajo';
    probabilidad: number;
    modelo_usado: string;
    fecha_prediccion: string;
}

/**
 * @endpoint GET /api/students (elementos de la lista 'datos')
 * @endpoint GET /api/students/:id (objeto 'datos')
 * @endpoint POST /api/students (objeto retornado en 'datos')
 */
export interface Estudiante {
    id: number;
    nombre: string;
    matricula: string;
    carrera?: string | null;
    creado_el?: string;
    total_predicciones?: number;
    predicciones?: DetallePrediccion[];
}

/**
 * @endpoint POST /api/students (Request Body)
 */
export interface CrearEstudiantePayload {
    nombre: string;
    matricula: string;
    carrera?: string;
}

/**
 * @endpoint PUT /api/students/:id (Request Body)
 */
export interface ActualizarEstudiantePayload {
    nombre?: string;
    matricula?: string;
    carrera?: string;
}

/**
 * @endpoint GET /api/students
 * @endpoint GET /api/students/:id
 * @endpoint POST /api/students
 * @endpoint PUT /api/students/:id
 * @endpoint DELETE /api/students/:id
 */
export interface RespuestaEstudiantes<T = Estudiante | Estudiante[]> {
    estado: 'exito' | 'error';
    mensaje?: string;
    total?: number;
    datos?: T;
    errores?: string[];
}

/**
 * @endpoint POST /api/predictor/predict (campo 'factores_detonantes')
 */
export interface FactorDetonante {
    factor: string;
    nivel: 'Crítico' | 'Alerta' | 'Moderado' | 'Excelente';
    impacto_porcentual: number;
    diagnostico: string;
}

/**
 * @endpoint POST /api/predictor/predict (campo 'plan_rescate_tutoria.simulacion_rescate')
 */
export interface SimulacionRescate {
    probabilidad_actual: string;
    nueva_probabilidad: string;
    nuevo_riesgo_estimado: string;
    reduccion_esperada: string;
    impacto_diagnostico: string;
}

/**
 * @endpoint POST /api/predictor/predict (campo 'plan_rescate_tutoria')
 */
export interface PlanRescate {
    requiere_intervencion: boolean;
    mensaje: string;
    acciones_recomendadas: string[];
    simulacion_rescate: SimulacionRescate;
}

/**
 * @endpoint POST /api/predictor/predict (Request Body)
 */
export interface PrediccionPayload {
    estudiante_id: number;
    asistencia: number;
    promedio: number;
    materias_reprobadas: number;
    antecedentes: number; // 1: Sí, 0: No
}

/**
 * @endpoint POST /api/predictor/predict (Response Body)
 */
export interface RespuestaPrediccion {
    estado: 'exito' | 'error';
    mensaje: string;
    estudiante: {
        id: number;
        nombre: string;
        matricula: string;
        carrera?: string | null;
    };
    diagnostico: {
        id_evaluacion: number;
        riesgo: 'Alto' | 'Bajo';
        probabilidad: number;
        modelo_usado: string;
        fecha_prediccion: string;
    };
    factores_detonantes: FactorDetonante[];
    plan_rescate_tutoria: PlanRescate;
    aviso_etico: string;
}

/**
 * @endpoint POST /api/predictor/batch-upload (en 'resumen_grupal.alumnos_prioritarios_atencion')
 */
export interface AlumnoPrioritario {
    matricula: string;
    nombre: string;
    probabilidad: number;
    alerta: string;
}

/**
 * @endpoint POST /api/predictor/batch-upload (campo 'resumen_grupal')
 */
export interface ResumenGrupal {
    total_estudiantes: number;
    alumnos_riesgo_alto: number;
    alumnos_riesgo_bajo: number;
    tasa_riesgo_grupal: string;
    alumnos_prioritarios_atencion: AlumnoPrioritario[];
}

/**
 * @endpoint POST /api/predictor/batch-upload (elementos de 'detalles')
 */
export interface DetalleLote {
    estudiante: {
        id: number;
        nombre: string;
        matricula: string;
    };
    diagnostico: {
        riesgo: string;
        probabilidad: string;
    };
    factores_criticos: string[];
    plan_rescate: {
        requiere_intervencion: boolean;
        nueva_probabilidad_proyectada: string;
        reduccion_riesgo: string;
        impacto: string;
        acciones: string[];
    };
}

/**
 * @endpoint POST /api/predictor/batch-upload (Response Body)
 */
export interface RespuestaCargaMasiva {
    estado: 'exito' | 'error';
    mensaje: string;
    resumen_grupal: ResumenGrupal;
    detalles: DetalleLote[];
}

export type Student = Estudiante;
export type PredictionDetail = DetallePrediccion;
export type PredictionResponse = RespuestaPrediccion;
export type BatchResponse = RespuestaCargaMasiva;
