import { useAppDispatch, useAppSelector } from '../store/hooks';
import { limpiarLote } from '../store/batch/batch.slice';
import { startUploadBatchFile } from '../store/batch/batch.thunk';

export const useBatchUpload = () => {
    const dispatch = useAppDispatch();
    const { resultado, cargando, error, nombreArchivo } = useAppSelector(
        (state) => state.batch
    );

    const subirArchivo = (archivo: File) => {
        dispatch(startUploadBatchFile(archivo));
    };

    const resetearLote = () => {
        dispatch(limpiarLote());
    };

    return {
        props: {
            resultado,
            cargando,
            error,
            nombreArchivo,
        },
        methods: {
            subirArchivo,
            resetearLote,
        },
    };
};
