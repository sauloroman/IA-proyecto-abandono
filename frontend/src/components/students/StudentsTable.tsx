import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Estudiante } from '../../types';
import { Button } from '../ui/Button';
import { Play, Eye, Pencil, Trash2, Search, AlertTriangle } from 'lucide-react';

interface StudentsTableProps {
    estudiantes: Estudiante[];
    busqueda: string;
    filtroCarrera: string;
    carrerasDisponibles: string[];
    totalGeneral: number;
    cargando: boolean;
    onBusquedaChange: (valor: string) => void;
    onFiltroCarreraChange: (carrera: string) => void;
    onLimpiarFiltros: () => void;
    onEditar: (estudiante: Estudiante) => void;
    onEliminar: (id: number) => Promise<void>;
}

export const StudentsTable: React.FC<StudentsTableProps> = ({
    estudiantes,
    busqueda,
    filtroCarrera,
    carrerasDisponibles,
    totalGeneral,
    cargando,
    onBusquedaChange,
    onFiltroCarreraChange,
    onLimpiarFiltros,
    onEditar,
    onEliminar,
}) => {
    const navigate = useNavigate();
    const [estudianteAEliminar, setEstudianteAEliminar] = useState<Estudiante | null>(null);
    const [eliminando, setEliminando] = useState(false);

    const confirmarEliminacion = async () => {
        if (!estudianteAEliminar) return;
        setEliminando(true);
        try {
            await onEliminar(estudianteAEliminar.id);
            setEstudianteAEliminar(null);
        } finally {
            setEliminando(false);
        }
    };

    const formatearFecha = (fechaStr?: string) => {
        if (!fechaStr) return '—';
        try {
            const fecha = new Date(fechaStr);
            return fecha.toLocaleDateString('es-MX', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            });
        } catch {
            return fechaStr;
        }
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 text-left space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
                <div>
                    <h3 className="text-sm font-medium text-zinc-100">
                        Catálogo de Alumnos Registrados
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                        Padrón estudiantil activo con acceso rápido a expedientes y módulo de simulación XAI.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="relative min-w-[240px]">
                        <input
                            type="text"
                            value={busqueda}
                            onChange={(e) => onBusquedaChange(e.target.value)}
                            placeholder="Buscar por nombre o matrícula..."
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
                        />
                        <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-2.5" />
                    </div>

                    {carrerasDisponibles.length > 0 && (
                        <div className="relative min-w-[180px]">
                            <select
                                value={filtroCarrera}
                                onChange={(e) => onFiltroCarreraChange(e.target.value)}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-zinc-600 transition-colors cursor-pointer"
                            >
                                <option value="todas">Todas las carreras ({totalGeneral})</option>
                                {carrerasDisponibles.map((carr) => (
                                    <option key={carr} value={carr}>
                                        {carr}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>
                    Mostrando <strong className="text-zinc-300 font-medium">{estudiantes.length}</strong> de {totalGeneral} estudiantes registrados
                </span>
                {(busqueda || filtroCarrera !== 'todas') && (
                    <button
                        onClick={onLimpiarFiltros}
                        className="text-blue-400 hover:underline cursor-pointer"
                    >
                        Limpiar filtros
                    </button>
                )}
            </div>

            {cargando && estudiantes.length === 0 ? (
                <div className="py-12 text-center text-zinc-500 text-xs">
                    Cargando nómina de estudiantes...
                </div>
            ) : estudiantes.length === 0 ? (
                <div className="py-12 text-center text-zinc-500 text-xs border border-dashed border-zinc-800 rounded-lg">
                    No se encontraron estudiantes que coincidan con los criterios de búsqueda.
                </div>
            ) : (
                <div className="overflow-x-auto -mx-6 px-6">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-500">
                                <th className="py-2.5 pr-4 font-medium">Matrícula</th>
                                <th className="py-2.5 px-4 font-medium">Estudiante</th>
                                <th className="py-2.5 px-4 font-medium">Programa Académico</th>
                                <th className="py-2.5 px-4 font-medium text-center">Evaluaciones</th>
                                <th className="py-2.5 px-4 font-medium">Registrado</th>
                                <th className="py-2.5 pl-4 font-medium text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/60 text-xs">
                            {estudiantes.map((estudiante) => (
                                <tr key={estudiante.id} className="hover:bg-zinc-800/20 transition-colors">
                                    <td className="py-3.5 pr-4 font-medium text-zinc-300">
                                        <button
                                            onClick={() => navigate(`/estudiantes/${estudiante.id}`)}
                                            className="hover:text-blue-400 hover:underline cursor-pointer text-left"
                                        >
                                            {estudiante.matricula}
                                        </button>
                                    </td>

                                    <td className="py-3.5 px-4">
                                        <button
                                            onClick={() => navigate(`/estudiantes/${estudiante.id}`)}
                                            className="font-medium text-zinc-100 hover:text-blue-400 hover:underline cursor-pointer text-left block"
                                        >
                                            {estudiante.nombre}
                                        </button>
                                    </td>

                                    <td className="py-3.5 px-4 text-zinc-400">
                                        {estudiante.carrera || (
                                            <span className="text-zinc-600 italic">No especificada</span>
                                        )}
                                    </td>

                                    <td className="py-3.5 px-4 text-center">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-zinc-800/70 border border-zinc-700/50 text-[11px] text-zinc-300 font-medium">
                                            {estudiante.total_predicciones ?? 0}
                                        </span>
                                    </td>

                                    <td className="py-3.5 px-4 text-zinc-500 text-[11px]">
                                        {formatearFecha(estudiante.creado_el)}
                                    </td>
                                    <td className="py-3.5 pl-4 text-right">
                                        <div className="inline-flex items-center space-x-1.5 justify-end">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    navigate(`/simulador?matricula=${encodeURIComponent(estudiante.matricula)}`)
                                                }
                                                leftIcon={<Play className="w-3 h-3 text-zinc-400" />}
                                            >
                                                Simular
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => navigate(`/estudiantes/${estudiante.id}`)}
                                                leftIcon={<Eye className="w-3 h-3 text-zinc-400" />}
                                            >
                                                Expediente
                                            </Button>
                                            <button
                                                title="Editar expediente"
                                                onClick={() => onEditar(estudiante)}
                                                className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
                                            >
                                                <Pencil className="w-3.5 h-3.5" />
                                            </button>

                                            <button
                                                title="Eliminar estudiante"
                                                onClick={() => setEstudianteAEliminar(estudiante)}
                                                className="p-1.5 rounded-md text-zinc-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {estudianteAEliminar && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-sm w-full p-6 text-left shadow-2xl space-y-4">
                        <div className="flex items-center space-x-3 text-rose-400">
                            <div className="w-9 h-9 rounded-lg bg-rose-950/40 border border-rose-900/50 flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-rose-400" />
                            </div>
                            <h3 className="text-sm font-semibold text-zinc-100">
                                Confirmar Eliminación
                            </h3>
                        </div>

                        <p className="text-xs text-zinc-400 leading-relaxed">
                            ¿Está seguro de eliminar permanentemente al alumno{' '}
                            <strong className="text-zinc-200">{estudianteAEliminar.nombre}</strong> (
                            {estudianteAEliminar.matricula})? Esta acción también borrará todas sus predicciones históricas asociadas.
                        </p>

                        <div className="flex items-center justify-end space-x-2 pt-2 border-t border-zinc-800">
                            <Button
                                variant="ghost"
                                size="sm"
                                disabled={eliminando}
                                onClick={() => setEstudianteAEliminar(null)}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                cargando={eliminando}
                                textoCarga="Eliminando..."
                                onClick={confirmarEliminacion}
                            >
                                Sí, Eliminar
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
