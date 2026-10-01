import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Estudiante } from '../../types';
import { Button } from '../ui/Button';
import { Play, Eye, ArrowRight } from 'lucide-react';

interface DashboardRecentStudentsProps {
    estudiantes: Estudiante[];
}

export const DashboardRecentStudents: React.FC<DashboardRecentStudentsProps> = ({
    estudiantes,
}) => {
    const navigate = useNavigate();

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 text-left space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4">
                <div>
                    <h3 className="text-sm font-medium text-zinc-100">
                        Alumnos Recientes en Plataforma
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                        Últimos estudiantes incorporados mediante carga masiva o registro manual.
                    </p>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/estudiantes')}
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                    Ver Todo el Directorio
                </Button>
            </div>

            {estudiantes.length === 0 ? (
                <div className="py-12 text-center text-zinc-500 text-xs border border-dashed border-zinc-800 rounded-lg">
                    No se registran estudiantes aún. Suba un archivo en Carga Masiva o agregue uno manualmente.
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
                                <th className="py-2.5 pl-4 font-medium text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/60 text-xs">
                            {estudiantes.map((e) => (
                                <tr key={e.id} className="hover:bg-zinc-800/20 transition-colors">
                                    <td className="py-3 pr-4 font-medium text-zinc-300">
                                        <button
                                            onClick={() => navigate(`/estudiantes/${e.id}`)}
                                            className="hover:text-blue-400 hover:underline cursor-pointer"
                                        >
                                            {e.matricula}
                                        </button>
                                    </td>
                                    <td className="py-3 px-4 font-medium text-zinc-100">
                                        <button
                                            onClick={() => navigate(`/estudiantes/${e.id}`)}
                                            className="hover:text-blue-400 hover:underline cursor-pointer"
                                        >
                                            {e.nombre}
                                        </button>
                                    </td>
                                    <td className="py-3 px-4 text-zinc-400">
                                        {e.carrera || <span className="text-zinc-600 italic">No especificada</span>}
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-zinc-800/70 border border-zinc-700/50 text-[11px] text-zinc-300 font-medium">
                                            {e.total_predicciones ?? 0}
                                        </span>
                                    </td>
                                    <td className="py-3 pl-4 text-right">
                                        <div className="inline-flex items-center space-x-1.5 justify-end">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    navigate(`/simulador?matricula=${encodeURIComponent(e.matricula)}`)
                                                }
                                                leftIcon={<Play className="w-3 h-3 text-zinc-400" />}
                                            >
                                                Simular
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => navigate(`/estudiantes/${e.id}`)}
                                                leftIcon={<Eye className="w-3 h-3 text-zinc-400" />}
                                            >
                                                Expediente
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
