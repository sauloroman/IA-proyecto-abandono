import { servicioApi } from "../../services/api"
import type { AppDispatch } from "../store"
import { iniciarCarga, setErrorEstudiantes, setEstudiantes } from "./student.slice"

export const startLoadingStudents = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(iniciarCarga())
        try {
            const estudiantes = await servicioApi.obtenerEstudiantes()
            dispatch(setEstudiantes(estudiantes))
        } catch (error) {
            dispatch(setErrorEstudiantes(error.message || 'Error al cargar estudiantes'))
        }
    }
}