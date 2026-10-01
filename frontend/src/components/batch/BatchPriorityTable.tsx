import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { AlumnoPrioritario } from '../../types';
import { Formatter } from '../../helpers/formatter';
import { Button } from '../ui/Button';

interface BatchPriorityTableProps {
    alumnos: AlumnoPrioritario[];
}

export const BatchPriorityTable: React.FC<BatchPriorityTableProps> = ({ alumnos }) => {
    const navigate = useNavigate();

    if (!alumnos || alumnos.length === 0) {
        return (
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 text-left">
                <div className="flex items-center space-x-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <h3 className="text-sm font-medium text-zinc-200">
                        Atención Prioritaria Despejada
                    </h3>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                    No se detectaron alumnos en estado crítico que demanden citatorio urgente dentro de este lote.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 text-left space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                    <div className="flex items-center space-x-2.5">
                        <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                        <h3 className="text-sm font-medium text-zinc-100">
                            Alumnos Prioritarios para Citatorio Inmediato
                        </h3>
                        <span className="text-xs px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-300 font-medium">
                            {alumnos.length} {alumnos.length === 1 ? 'caso' : 'casos'}
                        </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">
                        Estudiantes en riesgo alto que sobrepasan el umbral de deserción y requieren intervención tutorial inmediata.
                    </p>
                </div>
            </div>

            <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-500">
                            <th className="py-2.5 pr-4 font-medium">Matrícula</th>
                            <th className="py-2.5 px-4 font-medium">Estudiante</th>
                            <th className="py-2.5 px-4 font-medium">Probabilidad Estimada</th>
                            <th className="py-2.5 px-4 font-medium">Alerta</th>
                            <th className="py-2.5 pl-4 font-medium text-right">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 text-xs">
                        {alumnos.map((alumno) => {
                            const porcentaje = Formatter.percentage(alumno.probabilidad);

                            return (
                                <tr key={alumno.matricula} className="hover:bg-zinc-800/20 transition-colors">
                                    <td className="py-3 pr-4 font-medium text-zinc-300">
                                        {alumno.matricula}
                                    </td>
                                    <td className="py-3 px-4 text-zinc-100 font-medium">
                                        {alumno.nombre}
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-rose-400 font-medium">
                                                {porcentaje}%
                                            </span>
                                            <div className="w-16 bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                                                <div
                                                    className="bg-rose-500 h-full rounded-full"
                                                    style={{ width: `${porcentaje}%` }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="inline-flex items-center space-x-1.5 text-rose-300">
                                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
                                            <span className="text-xs">{alumno.alerta}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 pl-4 text-right">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => navigate(`/simulador?matricula=${encodeURIComponent(alumno.matricula)}`)}
                                        >
                                            Simular Caso
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
