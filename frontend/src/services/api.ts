import axios from 'axios';
import type {
    RespuestaSalud,
    Estudiante,
    CrearEstudiantePayload,
    ActualizarEstudiantePayload,
    RespuestaEstudiantes,
    PrediccionPayload,
    RespuestaPrediccion,
    RespuestaCargaMasiva,
} from '../types';

const clienteApi = axios.create({
    baseURL: `${import.meta.env.BACKEND_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const servicioApi = {
    async verificarSalud(): Promise<RespuestaSalud> {
        const respuesta = await clienteApi.get<RespuestaSalud>('/health');
        return respuesta.data;
    },

    async obtenerEstudiantes(): Promise<Estudiante[]> {
        const respuesta = await clienteApi.get<RespuestaEstudiantes<Estudiante[]>>('/students');
        return respuesta.data.datos || [];
    },

    async obtenerEstudiantePorId(id: number): Promise<Estudiante> {
        const respuesta = await clienteApi.get<RespuestaEstudiantes<Estudiante>>(`/students/${id}`);
        if (!respuesta.data.datos || Array.isArray(respuesta.data.datos)) {
            throw new Error(respuesta.data.mensaje || 'Estudiante no encontrado');
        }
        return respuesta.data.datos;
    },

    async crearEstudiante(payload: CrearEstudiantePayload): Promise<Estudiante> {
        const respuesta = await clienteApi.post<RespuestaEstudiantes<Estudiante>>('/students', payload);
        if (!respuesta.data.datos || Array.isArray(respuesta.data.datos)) {
            throw new Error(respuesta.data.mensaje || 'Error al registrar estudiante');
        }
        return respuesta.data.datos;
    },

    async actualizarEstudiante(id: number, payload: ActualizarEstudiantePayload): Promise<Estudiante> {
        const respuesta = await clienteApi.put<RespuestaEstudiantes<Estudiante>>(`/students/${id}`, payload);
        if (!respuesta.data.datos || Array.isArray(respuesta.data.datos)) {
            throw new Error(respuesta.data.mensaje || 'Error al actualizar estudiante');
        }
        return respuesta.data.datos;
    },

    async eliminarEstudiante(id: number): Promise<void> {
        await clienteApi.delete(`/students/${id}`);
    },

    async predecirRiesgo(payload: PrediccionPayload): Promise<RespuestaPrediccion> {
        const respuesta = await clienteApi.post<RespuestaPrediccion>('/predictor/predict', payload);
        return respuesta.data;
    },

    async cargarArchivoLote(archivo: File): Promise<RespuestaCargaMasiva> {
        const formData = new FormData();
        formData.append('archivo', archivo);
        formData.append('file', archivo);
        const respuesta = await clienteApi.post<RespuestaCargaMasiva>('/predictor/batch-upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return respuesta.data;
    },
};

export const apiService = servicioApi;
