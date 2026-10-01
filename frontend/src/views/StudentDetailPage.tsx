import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStudents } from '../hooks/useStudents';
import { StudentModal } from '../components/students/StudentModal';
import { Button } from '../components/ui/Button';
import type { Estudiante, CrearEstudiantePayload } from '../types';
import { Formatter } from '../helpers/formatter';
import {
    ArrowLeft,
    GraduationCap,
    Play,
    Pencil,
    Calendar,
    BookOpen,
    Activity,
    AlertCircle,
} from 'lucide-react';

export const StudentDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const {
        props: { estudianteSeleccionado, cargando, error },
        methods: { cargarEstudiantePorId, actualizarEstudiante },
    } = useStudents();

    const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
    const [guardando, setGuardando] = useState(false);
    const [errorModal, setErrorModal] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            cargarEstudiantePorId(Number(id));
        }
    }, [id, cargarEstudiantePorId]);

    const handleGuardarEdicion = async (datos: CrearEstudiantePayload) => {
        if (!estudianteSeleccionado) return;
        setGuardando(true);
        setErrorModal(null);
        try {
            const res = await actualizarEstudiante(estudianteSeleccionado.id, datos);
            if (!res.ok) {
                setErrorModal(res.error || 'Error al actualizar estudiante');
                return false;
            }
            await cargarEstudiantePorId(estudianteSeleccionado.id);
            return true;
        } finally {
            setGuardando(false);
        }
    };

    const formatearFecha = (fechaStr?: string) => {
        if (!fechaStr) return '—';
        try {
            const fecha = new Date(fechaStr);
            return fecha.toLocaleString('es-MX', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        } catch {
            return fechaStr;
        }
    };

    if (cargando && !estudianteSeleccionado) {
        return (
            <div className="py-24 text-center text-zinc-500 text-xs">
                Cargando expediente del estudiante...
            </div>
        );
    }

    if (!estudianteSeleccionado && !cargando) {
        return (
            <div className="py-16 text-center space-y-4">
                <p className="text-sm text-zinc-400">
                    No se encontró el estudiante solicitado o fue eliminado.
                </p>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate('/estudiantes')}
                    leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
                >
                    Volver al Directorio
                </Button>
            </div>
        );
    }

    const estudiante = estudianteSeleccionado as Estudiante;
    const predicciones = estudiante.predicciones || [];
    const ultimaPrediccion = predicciones.length > 0 ? predicciones[predicciones.length - 1] : null;

    return (
        <div className="space-y-6 text-left">
            <div className="space-y-3">
                <button
                    onClick={() => navigate('/estudiantes')}
                    className="inline-flex items-center space-x-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Volver al Directorio de Estudiantes</span>
                </button>

                <div className="border-b border-zinc-800/80 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1">
                            <GraduationCap className="w-3.5 h-3.5 text-zinc-400" />
                            <span>Expediente Individual & Métricas</span>
                        </div>
                        <h1 className="text-xl font-semibold tracking-tight text-zinc-100">
                            {estudiante.nombre}
                        </h1>
                        <p className="text-xs text-zinc-400 mt-1">
                            Matrícula:{' '}
                            <strong className="text-zinc-300 font-medium">{estudiante.matricula}</strong>
                            {' • '}
                            {estudiante.carrera || 'Carrera no especificada'}
                        </p>
                    </div>

                    <div className="flex items-center space-x-2.5 self-start sm:self-auto shrink-0">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setModalEditarAbierto(true)}
                            leftIcon={<Pencil className="w-3.5 h-3.5 text-zinc-400" />}
                        >
                            Editar Datos
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() =>
                                navigate(`/simulador?matricula=${encodeURIComponent(estudiante.matricula)}`)
                            }
                            leftIcon={<Play className="w-3.5 h-3.5" />}
                        >
                            Simular Escenario
                        </Button>
                    </div>
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-2.5 p-3 rounded-lg bg-rose-950/40 border border-rose-900/60 text-rose-300 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{error}</span>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
                    <div className="flex items-center space-x-2 text-xs font-medium text-zinc-400 uppercase tracking-wider">
                        <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Filiación Académica</span>
                    </div>
                    <div className="mt-3 space-y-1">
                        <p className="text-xs text-zinc-500">Programa:</p>
                        <p className="text-sm font-medium text-zinc-200">
                            {estudiante.carrera || 'No especificada'}
                        </p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-zinc-800 text-[11px] text-zinc-500 flex items-center space-x-1.5">
                        <Calendar className="w-3 h-3 text-zinc-500" />
                        <span>Alta: {formatearFecha(estudiante.creado_el)}</span>
                    </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
                    <div className="flex items-center space-x-2 text-xs font-medium text-zinc-400 uppercase tracking-wider">
                        <Activity className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Historial de Evaluaciones</span>
                    </div>
                    <div className="mt-3 flex items-baseline space-x-2">
                        <span className="text-3xl font-light text-zinc-100">
                            {predicciones.length}
                        </span>
                        <span className="text-xs text-zinc-500">simulaciones</span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-2">
                        {predicciones.length === 0
                            ? 'Sin diagnósticos previos'
                            : 'Registros acumulados en base de datos'}
                    </p>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
                    <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider block">
                        Último Diagnóstico
                    </span>
                    {ultimaPrediccion ? (
                        <div className="mt-2 space-y-2">
                            <div className="flex items-center space-x-2">
                                <span
                                    className={`w-2 h-2 rounded-full ${ultimaPrediccion.riesgo_predicho.toLowerCase() === 'alto'
                                        ? 'bg-rose-400'
                                        : 'bg-emerald-400'
                                        }`}
                                />
                                <span
                                    className={`text-xl font-medium ${ultimaPrediccion.riesgo_predicho.toLowerCase() === 'alto'
                                        ? 'text-rose-400'
                                        : 'text-emerald-400'
                                        }`}
                                >
                                    Riesgo {ultimaPrediccion.riesgo_predicho}
                                </span>
                                <span className="text-xs text-zinc-400">
                                    ({Formatter.percentage(ultimaPrediccion.probabilidad)}%)
                                </span>
                            </div>
                            <p className="text-[11px] text-zinc-500">
                                Modelo: {ultimaPrediccion.modelo_usado || 'Inferencia'}
                            </p>
                        </div>
                    ) : (
                        <div className="mt-3">
                            <p className="text-xs text-zinc-500">
                                Sin registros diagnósticos para este alumno.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                    <div>
                        <h3 className="text-sm font-medium text-zinc-100">
                            Historial de Diagnósticos y Simulaciones
                        </h3>
                        <p className="text-xs text-zinc-400 mt-0.5">
                            Evolución de riesgo según las condiciones académicas evaluadas en cada sesión.
                        </p>
                    </div>
                </div>

                {predicciones.length === 0 ? (
                    <div className="py-12 text-center text-zinc-500 text-xs border border-dashed border-zinc-800 rounded-lg space-y-3">
                        <p>No se han registrado evaluaciones previas para este estudiante.</p>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() =>
                                navigate(`/simulador?matricula=${encodeURIComponent(estudiante.matricula)}`)
                            }
                            leftIcon={<Play className="w-3.5 h-3.5 text-blue-400" />}
                        >
                            Ejecutar Primera Simulación
                        </Button>
                    </div>
                ) : (
                    <div className="overflow-x-auto -mx-6 px-6">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-500">
                                    <th className="py-2.5 pr-4 font-medium">Fecha y Hora</th>
                                    <th className="py-2.5 px-4 font-medium">Diagnóstico</th>
                                    <th className="py-2.5 px-4 font-medium">Probabilidad</th>
                                    <th className="py-2.5 px-4 font-medium">Asistencia</th>
                                    <th className="py-2.5 px-4 font-medium">Promedio</th>
                                    <th className="py-2.5 px-4 font-medium">Reprobadas</th>
                                    <th className="py-2.5 px-4 font-medium">Antecedentes</th>
                                    <th className="py-2.5 pl-4 font-medium text-right">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/60 text-xs">
                                {predicciones.map((p) => {
                                    const esAlto = p.riesgo_predicho.toLowerCase() === 'alto';
                                    const porcentaje = Formatter.percentage(p.probabilidad);

                                    return (
                                        <tr key={p.id} className="hover:bg-zinc-800/20 transition-colors">
                                            <td className="py-3 pr-4 text-zinc-400 text-[11px]">
                                                {formatearFecha(p.fecha_prediccion)}
                                            </td>

                                            <td className="py-3 px-4">
                                                <div className="flex items-center space-x-1.5">
                                                    <span
                                                        className={`w-1.5 h-1.5 rounded-full ${esAlto ? 'bg-rose-400' : 'bg-emerald-400'
                                                            }`}
                                                    />
                                                    <span
                                                        className={`font-medium ${esAlto ? 'text-rose-400' : 'text-emerald-400'
                                                            }`}
                                                    >
                                                        {p.riesgo_predicho}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="py-3 px-4 font-medium text-zinc-200">
                                                {porcentaje}%
                                            </td>

                                            <td className="py-3 px-4 text-zinc-300">
                                                {Math.round(p.asistencia)}%
                                            </td>

                                            <td className="py-3 px-4 text-zinc-300">
                                                {Number(p.promedio).toFixed(1)}
                                            </td>

                                            <td className="py-3 px-4 text-zinc-300">
                                                {p.materias_reprobadas}
                                            </td>

                                            <td className="py-3 px-4 text-zinc-300">
                                                {p.antecedentes === 1 ? 'Sí' : 'No'}
                                            </td>

                                            <td className="py-3 pl-4 text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        navigate(
                                                            `/simulador?matricula=${encodeURIComponent(
                                                                estudiante.matricula
                                                            )}`
                                                        )
                                                    }
                                                >
                                                    Simular
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <StudentModal
                abierto={modalEditarAbierto}
                estudianteEditar={estudiante}
                cargando={guardando}
                errorServidor={errorModal}
                onCerrar={() => setModalEditarAbierto(false)}
                onGuardar={handleGuardarEdicion}
            />
        </div>
    );
};
