import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { Estudiante, CrearEstudiantePayload } from '../../types';
import { Button } from '../ui/Button';
import { X, UserPlus, UserCog } from 'lucide-react';

interface StudentModalProps {
    abierto: boolean;
    estudianteEditar?: Estudiante | null;
    cargando: boolean;
    errorServidor?: string | null;
    onCerrar: () => void;
    onGuardar: (datos: CrearEstudiantePayload) => Promise<boolean | void>;
}

export const StudentModal: React.FC<StudentModalProps> = ({
    abierto,
    estudianteEditar,
    cargando,
    errorServidor,
    onCerrar,
    onGuardar,
}) => {
    const esEdicion = Boolean(estudianteEditar);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CrearEstudiantePayload>({
        defaultValues: {
            nombre: '',
            matricula: '',
            carrera: '',
        },
    });

    useEffect(() => {
        if (estudianteEditar) {
            reset({
                nombre: estudianteEditar.nombre,
                matricula: estudianteEditar.matricula,
                carrera: estudianteEditar.carrera || '',
            });
        } else {
            reset({
                nombre: '',
                matricula: '',
                carrera: '',
            });
        }
    }, [estudianteEditar, reset, abierto]);

    if (!abierto) return null;

    const onSubmit = handleSubmit(async (data) => {
        const payload: CrearEstudiantePayload = {
            nombre: data.nombre.trim(),
            matricula: data.matricula.trim(),
            carrera: data.carrera?.trim() || undefined,
        };
        const ok = await onGuardar(payload);
        if (ok !== false) {
            onCerrar();
        }
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-md w-full p-6 text-left shadow-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-zinc-300">
                            {esEdicion ? (
                                <UserCog className="w-4 h-4 text-zinc-300" />
                            ) : (
                                <UserPlus className="w-4 h-4 text-blue-400" />
                            )}
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-zinc-100">
                                {esEdicion ? 'Editar Expediente de Estudiante' : 'Registrar Nuevo Estudiante'}
                            </h3>
                            <p className="text-[11px] text-zinc-400">
                                {esEdicion
                                    ? 'Actualice los datos de filiación institucional del alumno.'
                                    : 'Ingrese los datos generales para crear un nuevo expediente escolar.'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onCerrar}
                        disabled={cargando}
                        className="text-zinc-500 hover:text-zinc-300 transition-colors p-1 rounded-md hover:bg-zinc-800 cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {errorServidor && (
                    <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-900/50 text-rose-300 text-xs leading-relaxed">
                        {errorServidor}
                    </div>
                )}

                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="block text-xs font-medium text-zinc-300">
                            Nombre Completo <span className="text-blue-400">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Ej. Roberto Carlos Pérez"
                            disabled={cargando}
                            {...register('nombre', {
                                required: 'El nombre del estudiante es obligatorio',
                                minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                            })}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
                        />
                        {errors.nombre && (
                            <span className="text-[11px] text-rose-400 block">{errors.nombre.message}</span>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label className="block text-xs font-medium text-zinc-300">
                            Matrícula Institucional <span className="text-blue-400">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Ej. MAT-2024-001"
                            disabled={cargando}
                            {...register('matricula', {
                                required: 'La matrícula institucional es obligatoria',
                                minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                            })}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors uppercase"
                        />
                        {errors.matricula && (
                            <span className="text-[11px] text-rose-400 block">{errors.matricula.message}</span>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label className="block text-xs font-medium text-zinc-300">
                            Programa Académico / Carrera
                        </label>
                        <input
                            type="text"
                            placeholder="Ej. Ingeniería en Tecnologías de la Información"
                            disabled={cargando}
                            {...register('carrera')}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
                        />
                        <span className="text-[11px] text-zinc-500 block">
                            Opcional. Permite segmentar filtros por división o facultad.
                        </span>
                    </div>

                    <div className="flex items-center justify-end space-x-2 pt-3 border-t border-zinc-800">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            disabled={cargando}
                            onClick={onCerrar}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            size="sm"
                            cargando={cargando}
                            textoCarga={esEdicion ? 'Actualizando...' : 'Guardando...'}
                        >
                            {esEdicion ? 'Actualizar Estudiante' : 'Guardar Estudiante'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
