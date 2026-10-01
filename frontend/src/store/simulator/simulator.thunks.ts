import { servicioApi } from '../../services/api';
import { iniciarPrediccion, setErrorPrediccion, setResultadoPrediccion } from './simulator.slice';

import type { AppDispatch } from '../store';
import type { PrediccionPayload } from '../../types';


export const startPredictRisk = (payload: PrediccionPayload) => {
    return async (dispatch: AppDispatch) => {
        dispatch(iniciarPrediccion());
        try {
            const respuesta = await servicioApi.predecirRiesgo(payload);
            dispatch(setResultadoPrediccion(respuesta));
        } catch (error) {

            const mensaje =
                error.response?.data?.mensaje ||
                error.message ||
                'Error al ejecutar la inferencia de Machine Learning';

            dispatch(setErrorPrediccion(mensaje));
        }
    };
};
