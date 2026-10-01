import { useForm } from "react-hook-form"
import type { PrediccionPayload } from "../types"

interface SimulatorFormDependencies {
    onSubmit: (payload: PrediccionPayload) => void
    onReset?: () => void,
    estudianteInicialId?: number
}

export const useSimulatorForm = ({
    onSubmit,
    onReset,
    estudianteInicialId
}: SimulatorFormDependencies) => {

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<PrediccionPayload>({
        defaultValues: {
            estudiante_id: estudianteInicialId || 1,
            asistencia: 75,
            promedio: 7.5,
            materias_reprobadas: 1,
            antecedentes: 0,
        },
    });

    const valores = watch()

    const onSubmitHandler = handleSubmit((data) => {
        onSubmit({
            estudiante_id: Number(data.estudiante_id),
            asistencia: Number(data.asistencia),
            promedio: Number(data.promedio),
            materias_reprobadas: Number(data.materias_reprobadas),
            antecedentes: Number(data.antecedentes),
        });
    });
    const onResetHandler = () => {
        reset();
        if (onReset) onReset();
    };
    return {
        props: {
            valores,
            errors,
        },

        methods: {
            register,
            setValue,
            onSubmitHandler,
            onResetHandler,
        }
    };

}