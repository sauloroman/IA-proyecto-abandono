import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RespuestaCargaMasiva } from '../../types';

interface BatchState {
    resultado: RespuestaCargaMasiva | null;
    cargando: boolean;
    error: string | null;
    nombreArchivo: string | null;
}

const initialState: BatchState = {
    resultado: null,
    cargando: false,
    error: null,
    nombreArchivo: null,
};

export const batchSlice = createSlice({
    name: 'batch',
    initialState,
    reducers: {
        iniciarCargaLote: (state, action: PayloadAction<string>) => {
            state.cargando = true;
            state.error = null;
            state.nombreArchivo = action.payload;
        },
        setResultadoLote: (state, action: PayloadAction<RespuestaCargaMasiva>) => {
            state.cargando = false;
            state.resultado = action.payload;
            state.error = null;
        },
        setErrorLote: (state, action: PayloadAction<string>) => {
            state.cargando = false;
            state.error = action.payload;
        },
        limpiarLote: (state) => {
            state.resultado = null;
            state.cargando = false;
            state.error = null;
            state.nombreArchivo = null;
        },
    },
});

export const {
    iniciarCargaLote,
    setResultadoLote,
    setErrorLote,
    limpiarLote,
} = batchSlice.actions;
