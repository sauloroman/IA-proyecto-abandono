import React, { useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStudents } from '../hooks/useStudents';
import { useSimulator } from '../hooks/useSimulator';
import { useSimulatorForm } from '../hooks/useSimulatorForm';

import { SimulatorForm } from '../components/simulator/SimulatorForm';
import { SimulatorResults } from '../components/simulator/SimulatorResults';

import { SlidersHorizontal, AlertCircle } from 'lucide-react';

export const SimulatorPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const matriculaParam = searchParams.get('matricula');
    const estudianteIdParam = searchParams.get('estudiante_id');
    const paramProcesadoRef = useRef<string | null>(null);

    const {
        props: { estudiantes, cargando: cargandoEstudiantes },
        methods: { seleccionarEstudiante, recargarEstudiantes, cargarEstudiantePorId },
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

    useEffect(() => {
        if (matriculaParam || estudianteIdParam) {
            const encontrado = estudiantes.some(
                (e) =>
                    (matriculaParam && e.matricula.toLowerCase() === matriculaParam.toLowerCase()) ||
                    (estudianteIdParam && e.id === Number(estudianteIdParam))
            );
            if (!encontrado && !cargandoEstudiantes) {
                recargarEstudiantes();
            }
        }
    }, [matriculaParam, estudianteIdParam, estudiantes, cargandoEstudiantes, recargarEstudiantes]);

    const estudianteObjetivo = useMemo(() => {
        if (estudiantes.length === 0) return null;
        if (matriculaParam) {
            return (
                estudiantes.find(
                    (e) => e.matricula.toLowerCase() === matriculaParam.toLowerCase()
                ) || null
            );
        }
        if (estudianteIdParam) {
            return estudiantes.find((e) => e.id === Number(estudianteIdParam)) || null;
        }
        return null;
    }, [estudiantes, matriculaParam, estudianteIdParam]);

    useEffect(() => {
        const claveActual = matriculaParam || estudianteIdParam;

        if (claveActual && estudianteObjetivo) {
            if (paramProcesadoRef.current === claveActual) return;
            paramProcesadoRef.current = claveActual;

            setValue('estudiante_id', estudianteObjetivo.id);
            seleccionarEstudiante(estudianteObjetivo);

            cargarEstudiantePorId(estudianteObjetivo.id).then((detallado) => {
                if (detallado?.predicciones && detallado.predicciones.length > 0) {
                    const ultimaPred = detallado.predicciones[detallado.predicciones.length - 1];
                    const asist = Math.round(Number(ultimaPred.asistencia));
                    const prom = Number(ultimaPred.promedio);
                    const reprob = Number(ultimaPred.materias_reprobadas);
                    const antec = Number(ultimaPred.antecedentes);

                    setValue('asistencia', asist);
                    setValue('promedio', prom);
                    setValue('materias_reprobadas', reprob);
                    setValue('antecedentes', antec);

                    ejecutarPrediccion({
                        estudiante_id: estudianteObjetivo.id,
                        asistencia: asist,
                        promedio: prom,
                        materias_reprobadas: reprob,
                        antecedentes: antec,
                    });
                }
            });
        } else if (!matriculaParam && !estudianteIdParam && estudiantes.length > 0 && !valores.estudiante_id) {
            setValue('estudiante_id', estudiantes[0].id);
            seleccionarEstudiante(estudiantes[0]);
        }
    }, [
        estudianteObjetivo,
        matriculaParam,
        estudianteIdParam,
        setValue,
        seleccionarEstudiante,
        cargarEstudiantePorId,
        ejecutarPrediccion,
        estudiantes,
        valores.estudiante_id,
    ]);

    const estudianteActual = useMemo(
        () => estudiantes.find((e) => e.id === Number(valores.estudiante_id)),
        [valores.estudiante_id, estudiantes]
    );

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
