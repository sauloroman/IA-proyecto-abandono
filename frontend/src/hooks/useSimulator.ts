import { useAppDispatch, useAppSelector } from '../store/hooks';
import { limpiarPrediccion } from '../store/simulator/simulator.slice';
import { startPredictRisk } from '../store/simulator/simulator.thunks';
import type { PrediccionPayload } from '../types';

export const useSimulator = () => {
    const dispatch = useAppDispatch();
    const { resultado, cargando, error } = useAppSelector((state) => state.simulator);

    const ejecutarPrediccion = (payload: PrediccionPayload) => {
        dispatch(startPredictRisk(payload));
    };

    const resetearPrediccion = () => {
        dispatch(limpiarPrediccion());
    };

    return {
        props: {
            resultado,
            cargando,
            error,
        },

        methods: {
            ejecutarPrediccion,
            resetearPrediccion,
        }
    };
};
