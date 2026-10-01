import React from 'react';
import type { Estudiante, PrediccionPayload } from '../../types';
import type { UseFormRegister, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { Button } from '../ui/Button';
import { Slider } from '../ui/Slider';
import { SegmentedControl } from '../ui/SegmentedControl';
import { Play, RotateCcw, UserCheck } from 'lucide-react';

interface SimulatorFormProps {
    estudiantes: Estudiante[];
    estudianteActual?: Estudiante;
    cargandoEstudiantes: boolean;
    cargandoInferencia: boolean;
    valores: PrediccionPayload;
    errors: FieldErrors<PrediccionPayload>;
    register: UseFormRegister<PrediccionPayload>;
    setValue: UseFormSetValue<PrediccionPayload>;
    onSeleccionarEstudiante: (estudiante: Estudiante | null) => void;
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    onReset: () => void;
}

export const SimulatorForm: React.FC<SimulatorFormProps> = ({
    estudiantes,
    estudianteActual,
    cargandoEstudiantes,
    cargandoInferencia,
    valores,
    errors,
    register,
    setValue,
    onSeleccionarEstudiante,
    onSubmit,
    onReset,
}) => {
    return (
        <form
            onSubmit={onSubmit}
            className="bg-zinc-900/50 border border-zinc-800/90 rounded-xl p-5 space-y-5"
        >
            <div className="pb-3 border-b border-zinc-800/70">
                <span className="text-xs font-bold text-zinc-300 uppercase">
                    Parámetros del Alumno
                </span>
            </div>

            <div className="space-y-1.5">
                <label className="block text-xs font-medium text-zinc-300">
                    Estudiante a Evaluar
                </label>
                <select
                    value={valores.estudiante_id || ''}
                    {...register('estudiante_id', { required: 'Seleccione un estudiante' })}
                    onChange={(e) => {
                        setValue('estudiante_id', Number(e.target.value));
                        const est = estudiantes.find((x) => x.id === Number(e.target.value)) || null;
                        onSeleccionarEstudiante(est);
                    }}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-zinc-600 transition-colors"
                    disabled={cargandoEstudiantes}
                >
                    {estudiantes.map((e) => (
                        <option key={e.id} value={e.id}>
                            {e.matricula} &bull; {e.nombre}
                        </option>
                    ))}
                </select>
                {estudianteActual && (
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mt-1">
                        <UserCheck className="w-3 h-3 text-zinc-400" />
                        <span>{estudianteActual.carrera || 'Carrera no especificada'}</span>
                    </div>
                )}
                {errors.estudiante_id && (
                    <span className="text-[11px] text-rose-400">{errors.estudiante_id.message}</span>
                )}
            </div>

            <Slider
                label="Asistencia Escolar"
                valorActual={`${valores.asistencia}%`}
                min={0}
                max={100}
                step={1}
                subetiquetas={{
                    izquierda: '0%',
                    centro: 'Mínimo 80%',
                    derecha: '100%',
                }}
                {...register('asistencia')}
            />

            <Slider
                label="Promedio Académico"
                valorActual={`${Number(valores.promedio).toFixed(1)} / 10.0`}
                min={0}
                max={10}
                step={0.1}
                subetiquetas={{
                    izquierda: '0.0',
                    centro: 'Aprobatorio 7.0',
                    derecha: '10.0',
                }}
                {...register('promedio')}
            />

            <Slider
                label="Materias Reprobadas"
                valorActual={valores.materias_reprobadas}
                min={0}
                max={8}
                step={1}
                subetiquetas={{
                    izquierda: '0',
                    centro: 'Crítico ≥ 2',
                    derecha: '8',
                }}
                {...register('materias_reprobadas')}
            />

            <SegmentedControl
                label="Historial / Antecedentes de Abandono"
                value={Number(valores.antecedentes)}
                onChange={(val) => setValue('antecedentes', val)}
                options={[
                    { value: 0, label: 'Sin Antecedentes (0)' },
                    { value: 1, label: 'Con Antecedentes (1)' },
                ]}
            />

            <div className="pt-3 flex gap-2 border-t border-zinc-800/70">
                <Button
                    type="submit"
                    variant="primary"
                    cargando={cargandoInferencia}
                    textoCarga="Procesando inferencia..."
                    leftIcon={<Play className="w-3.5 h-3.5 fill-current" />}
                    className="flex-1"
                >
                    Ejecutar Inferencia
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={onReset}
                    title="Restablecer valores"
                    aria-label="Restablecer valores"
                >
                    <RotateCcw className="w-3.5 h-3.5" />
                </Button>
            </div>
        </form>
    );
};
