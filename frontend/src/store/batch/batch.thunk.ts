import axios from 'axios';
import { servicioApi } from '../../services/api';
import { iniciarCargaLote, setErrorLote, setResultadoLote } from './batch.slice';
import { startLoadingStudents } from '../students/student.thunk';
import type { AppDispatch } from '../store';

export const startUploadBatchFile = (archivo: File) => {
    return async (dispatch: AppDispatch) => {
        dispatch(iniciarCargaLote(archivo.name));
        try {
            const respuesta = await servicioApi.cargarArchivoLote(archivo);
            dispatch(setResultadoLote(respuesta));
            dispatch(startLoadingStudents());
        } catch (error: unknown) {
            let mensaje = 'Error al procesar el archivo en el servidor';
            if (axios.isAxiosError(error)) {
                mensaje = error.response?.data?.mensaje || error.message || mensaje;
            } else if (error instanceof Error) {
                mensaje = error.message;
            }
            dispatch(setErrorLote(mensaje));
        }
    };
};
