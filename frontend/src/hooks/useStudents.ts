import { useEffect, useCallback } from "react"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import {
    startLoadingStudentById,
    startLoadingStudents,
    startCreatingStudent,
    startUpdatingStudent,
    startDeletingStudent,
} from "../store/students/student.thunk"
import type { Estudiante, CrearEstudiantePayload, ActualizarEstudiantePayload } from "../types"
import { setEstudianteSeleccionado } from "../store/students/student.slice"

export const useStudents = () => {

    const dispatch = useAppDispatch()
    const { estudiantes, estudianteSeleccionado, cargando, error } = useAppSelector(state => state.students)

    const seleccionarEstudiante = useCallback((estudiante: Estudiante | null) => {
        dispatch(setEstudianteSeleccionado(estudiante))
    }, [dispatch])

    const recargarEstudiantes = useCallback(() => {
        dispatch(startLoadingStudents())
    }, [dispatch])

    const cargarEstudiantePorId = useCallback(async (id: number) => {
        return await dispatch(startLoadingStudentById(id))
    }, [dispatch])

    const crearEstudiante = useCallback(async (payload: CrearEstudiantePayload) => {
        return await dispatch(startCreatingStudent(payload))
    }, [dispatch])

    const actualizarEstudiante = useCallback(async (id: number, payload: ActualizarEstudiantePayload) => {
        return await dispatch(startUpdatingStudent(id, payload))
    }, [dispatch])

    const eliminarEstudiante = useCallback(async (id: number) => {
        return await dispatch(startDeletingStudent(id))
    }, [dispatch])

    useEffect(() => {
        if (estudiantes.length === 0) {
            dispatch(startLoadingStudents())
        }
    }, [dispatch, estudiantes.length])

    return {
        props: {
            estudiantes,
            estudianteSeleccionado,
            cargando,
            error
        },

        methods: {
            seleccionarEstudiante,
            recargarEstudiantes,
            cargarEstudiantePorId,
            crearEstudiante,
            actualizarEstudiante,
            eliminarEstudiante,
        }
    }
}
