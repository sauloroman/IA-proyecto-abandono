import axios from 'axios';
import { servicioApi } from "../../services/api"
import type { AppDispatch } from "../store"
import {
    iniciarCarga,
    setErrorEstudiantes,
    setEstudianteSeleccionado,
    setEstudiantes,
    agregarEstudiante,
    actualizarEstudianteEnLista,
    removerEstudianteDeLista,
} from "./student.slice"
import type { CrearEstudiantePayload, ActualizarEstudiantePayload } from "../../types"

export const startLoadingStudents = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(iniciarCarga())
        try {
            const estudiantes = await servicioApi.obtenerEstudiantes()
            dispatch(setEstudiantes(estudiantes))
        } catch (error: unknown) {
            const mensaje = error instanceof Error ? error.message : 'Error al cargar estudiantes';
            dispatch(setErrorEstudiantes(mensaje))
        }
    }
}

export const startLoadingStudentById = (id: number) => {
    return async (dispatch: AppDispatch) => {
        dispatch(iniciarCarga())
        try {
            const estudiante = await servicioApi.obtenerEstudiantePorId(id)
            dispatch(setEstudianteSeleccionado(estudiante))
            return estudiante
        } catch (error: unknown) {
            const mensaje = error instanceof Error ? error.message : 'Error al cargar detalle del estudiante';
            dispatch(setErrorEstudiantes(mensaje))
            return null
        }
    }
}

export const startCreatingStudent = (payload: CrearEstudiantePayload) => {
    return async (dispatch: AppDispatch) => {
        dispatch(iniciarCarga())
        try {
            const nuevoEstudiante = await servicioApi.crearEstudiante(payload)
            dispatch(agregarEstudiante(nuevoEstudiante))
            return { ok: true, estudiante: nuevoEstudiante }
        } catch (error: unknown) {
            let mensaje = 'Error al registrar estudiante';
            if (axios.isAxiosError(error)) {
                mensaje = error.response?.data?.mensaje || error.message || mensaje;
            } else if (error instanceof Error) {
                mensaje = error.message;
            }
            dispatch(setErrorEstudiantes(mensaje))
            return { ok: false, error: mensaje }
        }
    }
}

export const startUpdatingStudent = (id: number, payload: ActualizarEstudiantePayload) => {
    return async (dispatch: AppDispatch) => {
        dispatch(iniciarCarga())
        try {
            const estudianteActualizado = await servicioApi.actualizarEstudiante(id, payload)
            dispatch(actualizarEstudianteEnLista(estudianteActualizado))
            return { ok: true, estudiante: estudianteActualizado }
        } catch (error: unknown) {
            let mensaje = 'Error al actualizar estudiante';
            if (axios.isAxiosError(error)) {
                mensaje = error.response?.data?.mensaje || error.message || mensaje;
            } else if (error instanceof Error) {
                mensaje = error.message;
            }
            dispatch(setErrorEstudiantes(mensaje))
            return { ok: false, error: mensaje }
        }
    }
}

export const startDeletingStudent = (id: number) => {
    return async (dispatch: AppDispatch) => {
        dispatch(iniciarCarga())
        try {
            await servicioApi.eliminarEstudiante(id)
            dispatch(removerEstudianteDeLista(id))
            return { ok: true }
        } catch (error: unknown) {
            let mensaje = 'Error al eliminar estudiante';
            if (axios.isAxiosError(error)) {
                mensaje = error.response?.data?.mensaje || error.message || mensaje;
            } else if (error instanceof Error) {
                mensaje = error.message;
            }
            dispatch(setErrorEstudiantes(mensaje))
            return { ok: false, error: mensaje }
        }
    }
}
