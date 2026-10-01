import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Estudiante } from "../../types";

interface StudentsState {
    estudiantes: Estudiante[],
    estudianteSeleccionado: Estudiante | null,
    cargando: boolean,
    error: string | null
}

const initialState: StudentsState = {
    cargando: false,
    error: null,
    estudianteSeleccionado: null,
    estudiantes: []
}

export const studentsSlice = createSlice({
    name: 'students',
    initialState: initialState,
    reducers: {
        iniciarCarga: (state) => {
            state.cargando = true;
            state.error = null;
        },
        setEstudiantes: (state, action: PayloadAction<Estudiante[]>) => {
            state.cargando = false;
            state.estudiantes = action.payload;
        },
        setEstudianteSeleccionado: (state, action: PayloadAction<Estudiante | null>) => {
            state.estudianteSeleccionado = action.payload;
        },
        setErrorEstudiantes: (state, action: PayloadAction<string>) => {
            state.cargando = false;
            state.error = action.payload;
        },
        agregarEstudiante: (state, action: PayloadAction<Estudiante>) => {
            state.cargando = false;
            state.estudiantes.unshift(action.payload);
        },

        actualizarEstudianteEnLista: (state, action: PayloadAction<Estudiante>) => {
            state.cargando = false;
            state.estudiantes = state.estudiantes.map((e) =>
                e.id === action.payload.id ? action.payload : e
            );
            if (state.estudianteSeleccionado?.id === action.payload.id) {
                state.estudianteSeleccionado = {
                    ...state.estudianteSeleccionado,
                    ...action.payload,
                };
            }
        },

        removerEstudianteDeLista: (state, action: PayloadAction<number>) => {
            state.cargando = false;
            state.estudiantes = state.estudiantes.filter((e) => e.id !== action.payload);
            if (state.estudianteSeleccionado?.id === action.payload) {
                state.estudianteSeleccionado = null;
            }
        },
    }
})

export const {
    iniciarCarga,
    setEstudianteSeleccionado,
    setEstudiantes,
    setErrorEstudiantes,
    agregarEstudiante,
    actualizarEstudianteEnLista,
    removerEstudianteDeLista,
} = studentsSlice.actions