import React, { useEffect, useMemo } from 'react';
import { useStudents } from '../hooks/useStudents';
import { useSimulator } from '../hooks/useSimulator';
import { useSimulatorForm } from '../hooks/useSimulatorForm';

import { SimulatorForm } from '../components/simulator/SimulatorForm';
import { SimulatorResults } from '../components/simulator/SimulatorResults';

import { SlidersHorizontal, AlertCircle } from 'lucide-react';

export const SimulatorPage: React.FC = () => {
    const {
        props: { estudiantes, cargando: cargandoEstudiantes },
        methods: { seleccionarEstudiante },
    } = useStudents();

    const {
        props: { resultado, cargando, error },
        methods: { ejecutarPrediccion, resetearPrediccion },
    } = useSimulator();

    const {
        props: { valores, errors },
        methods: { register, setValue, onSubmitHandler, onResetHandler },
    } = useSimulatorForm({
        onSubmit: ejecutarPrediccion,
        onReset: resetearPrediccion,
        estudianteInicialId: estudiantes[0]?.id,
    });

    const estudianteActual = useMemo(
        () => estudiantes.find((e) => e.id === Number(valores.estudiante_id)),
        [valores.estudiante_id, estudiantes]
    );

    useEffect(() => {
        if (estudiantes.length > 0 && !valores.estudiante_id) {
            setValue('estudiante_id', estudiantes[0].id);
        }
    }, [estudiantes, setValue, valores.estudiante_id]);

    return (
        <div className="space-y-6">
            <div className="border-b border-zinc-800/80 pb-4">
                <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Módulo de Inferencia & XAI</span>
                </div>
                <h1 className="text-xl font-semibold tracking-tight text-zinc-100">
                    Simulador de Riesgo Académico
                </h1>
                <p className="text-xs text-zinc-400 mt-1">
                    Evalúe escenarios individuales con explicabilidad algorítmica y recomendaciones de permanencia.
                </p>
            </div>

            {error && (
                <div className="flex items-center gap-2.5 p-3 rounded-lg bg-rose-950/40 border border-rose-900/60 text-rose-300 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{error}</span>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-5">
                    <SimulatorForm
                        estudiantes={estudiantes}
                        estudianteActual={estudianteActual}
                        cargandoEstudiantes={cargandoEstudiantes}
                        cargandoInferencia={cargando}
                        valores={valores}
                        errors={errors}
                        register={register}
                        setValue={setValue}
                        onSeleccionarEstudiante={seleccionarEstudiante}
                        onSubmit={onSubmitHandler}
                        onReset={onResetHandler}
                    />
                </div>

                <div className="lg:col-span-7">
                    <SimulatorResults resultado={resultado} />
                </div>
            </div>
        </div>
    );
};
