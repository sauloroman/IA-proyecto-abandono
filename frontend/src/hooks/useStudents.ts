import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { startLoadingStudents } from "../store/students/student.thunk"
import type { Estudiante } from "../types"
import { setEstudianteSeleccionado } from "../store/students/student.slice"

export const useStudents = () => {

    const dispatch = useAppDispatch()
    const { estudiantes, estudianteSeleccionado, cargando, error } = useAppSelector(state => state.students)

    const seleccionarEstudiante = (estudiante: Estudiante | null) => {
        dispatch(setEstudianteSeleccionado(estudiante))
    }

    const recargarEstudiantes = () => {
        dispatch(startLoadingStudents())
    }

    useEffect(() => {
        if (estudiantes.length === 0) {
            dispatch(startLoadingStudents())
        }
    })

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
        }
    }
}