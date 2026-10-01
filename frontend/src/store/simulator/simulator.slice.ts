import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RespuestaPrediccion } from '../../types';

interface SimulatorState {
    resultado: RespuestaPrediccion | null;
    cargando: boolean;
    error: string | null;
}

const initialState: SimulatorState = {
    resultado: null,
    cargando: false,
    error: null,
};

export const simulatorSlice = createSlice({
    name: 'simulator',
    initialState,
    reducers: {
        iniciarPrediccion: (state) => {
            state.cargando = true;
            state.error = null;
        },
        setResultadoPrediccion: (state, action: PayloadAction<RespuestaPrediccion>) => {
            state.cargando = false;
            state.resultado = action.payload;
            state.error = null;
        },
        setErrorPrediccion: (state, action: PayloadAction<string>) => {
            state.cargando = false;
            state.error = action.payload;
        },
        limpiarPrediccion: (state) => {
            state.resultado = null;
            state.cargando = false;
            state.error = null;
        },
    },
});

export const {
    iniciarPrediccion,
    setResultadoPrediccion,
    setErrorPrediccion,
    limpiarPrediccion,
} = simulatorSlice.actions;
