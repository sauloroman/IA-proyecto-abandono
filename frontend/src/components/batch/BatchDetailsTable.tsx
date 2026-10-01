import React from 'react';
import type { DetalleLote } from '../../types';
import type { FiltroRiesgo } from '../../hooks/useBatchTableFilter';
import { Button } from '../ui/Button';

interface BatchDetailsTableProps {
    estudiantes: DetalleLote[];
    busqueda: string;
    filtroRiesgo: FiltroRiesgo;
    estudianteExpandidoId: number | null;
    totalGeneral: number;
    onBusquedaChange: (valor: string) => void;
    onFiltroRiesgoChange: (filtro: FiltroRiesgo) => void;
    onToggleExpansion: (id: number) => void;
    onLimpiarFiltros: () => void;
}

export const BatchDetailsTable: React.FC<BatchDetailsTableProps> = ({
    estudiantes,
    busqueda,
    filtroRiesgo,
    estudianteExpandidoId,
    totalGeneral,
    onBusquedaChange,
    onFiltroRiesgoChange,
    onToggleExpansion,
    onLimpiarFiltros,
}) => {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 text-left space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
                <div>
                    <h3 className="text-sm font-medium text-zinc-100">
                        Nómina Evaluada y Diagnóstico Individual
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                        Desglose pormenorizado de riesgos, factores determinantes y proyección de rescate tutoría.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="relative min-w-[220px]">
                        <input
                            type="text"
                            value={busqueda}
                            onChange={(e) => onBusquedaChange(e.target.value)}
                            placeholder="Buscar por nombre o matrícula..."
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500/60 transition-colors"
                        />
                        <svg
                            className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-2.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <div className="inline-flex rounded-lg bg-zinc-950 p-0.5 border border-zinc-800 self-start sm:self-auto">
                        <button
                            type="button"
                            onClick={() => onFiltroRiesgoChange('todos')}
                            className={`px-3 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${filtroRiesgo === 'todos'
                                    ? 'bg-zinc-800 text-zinc-100'
                                    : 'text-zinc-400 hover:text-zinc-200'
                                }`}
                        >
                            Todos ({totalGeneral})
                        </button>
                        <button
                            type="button"
                            onClick={() => onFiltroRiesgoChange('Alto')}
                            className={`px-3 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${filtroRiesgo === 'Alto'
                                    ? 'bg-rose-950/40 text-rose-300 border border-rose-900/40'
                                    : 'text-zinc-400 hover:text-zinc-200'
                                }`}
                        >
                            Riesgo Alto
                        </button>
                        <button
                            type="button"
                            onClick={() => onFiltroRiesgoChange('Bajo')}
                            className={`px-3 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${filtroRiesgo === 'Bajo'
                                    ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-900/40'
                                    : 'text-zinc-400 hover:text-zinc-200'
                                }`}
                        >
                            Riesgo Bajo
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>
                    Mostrando <strong className="text-zinc-300 font-medium">{estudiantes.length}</strong> de {totalGeneral} estudiantes
                </span>
                {(busqueda || filtroRiesgo !== 'todos') && (
                    <button
                        onClick={onLimpiarFiltros}
                        className="text-blue-400 hover:underline cursor-pointer"
                    >
                        Restablecer filtros
                    </button>
                )}
            </div>

            {estudiantes.length === 0 ? (
                <div className="py-12 text-center text-zinc-500 text-xs border border-dashed border-zinc-800 rounded-lg">
                    No se encontraron estudiantes que coincidan con los criterios de búsqueda.
                </div>
            ) : (
                <div className="overflow-x-auto -mx-6 px-6">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-500">
                                <th className="py-2.5 pr-4 font-medium">Estudiante</th>
                                <th className="py-2.5 px-4 font-medium">Diagnóstico</th>
                                <th className="py-2.5 px-4 font-medium">Factores Críticos</th>
                                <th className="py-2.5 px-4 font-medium">Proyección Rescate</th>
                                <th className="py-2.5 pl-4 font-medium text-right">Plan de Acción</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/60 text-xs">
                            {estudiantes.map((item) => {
                                const esAlto = item.diagnostico.riesgo.toLowerCase() === 'alto';
                                const expandido = estudianteExpandidoId === item.estudiante.id;

                                return (
                                    <React.Fragment key={item.estudiante.id}>
                                        <tr className="hover:bg-zinc-800/20 transition-colors">
                                            <td className="py-3.5 pr-4">
                                                <div className="font-medium text-zinc-100">
                                                    {item.estudiante.nombre}
                                                </div>
                                                <div className="text-[11px] text-zinc-500">
                                                    {item.estudiante.matricula}
                                                </div>
                                            </td>

                                            <td className="py-3.5 px-4">
                                                <div className="flex items-center space-x-2">
                                                    <span
                                                        className={`w-1.5 h-1.5 rounded-full ${esAlto ? 'bg-rose-400' : 'bg-emerald-400'
                                                            }`}
                                                    />
                                                    <span
                                                        className={`font-medium ${esAlto ? 'text-rose-400' : 'text-emerald-400'
                                                            }`}
                                                    >
                                                        {item.diagnostico.riesgo} ({item.diagnostico.probabilidad})
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="py-3.5 px-4">
                                                {item.factores_criticos && item.factores_criticos.length > 0 ? (
                                                    <div className="space-y-1">
                                                        {item.factores_criticos.map((fac, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="text-zinc-300 text-[11px] flex items-center space-x-1.5"
                                                            >
                                                                <span className="w-1 h-1 rounded-full bg-rose-400/80"></span>
                                                                <span className="truncate max-w-[260px]">{fac}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="text-zinc-500 text-[11px]">
                                                        Sin alertas críticas
                                                    </span>
                                                )}
                                            </td>

                                            <td className="py-3.5 px-4">
                                                {item.plan_rescate?.nueva_probabilidad_proyectada ? (
                                                    <div>
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-zinc-300">
                                                                Proyectada: {item.plan_rescate.nueva_probabilidad_proyectada}
                                                            </span>
                                                            {item.plan_rescate.reduccion_riesgo && (
                                                                <span className="text-emerald-400 font-medium">
                                                                    ({item.plan_rescate.reduccion_riesgo})
                                                                </span>
                                                            )}
                                                        </div>
                                                        <span className="text-[11px] text-zinc-500 block">
                                                            {item.plan_rescate.impacto}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-zinc-500 text-[11px]">
                                                        Mantiene nivel bajo
                                                    </span>
                                                )}
                                            </td>

                                            <td className="py-3.5 pl-4 text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => onToggleExpansion(item.estudiante.id)}
                                                    rightIcon={
                                                        <svg
                                                            className={`w-3.5 h-3.5 transition-transform ${expandido ? 'rotate-180' : ''
                                                                }`}
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    }
                                                >
                                                    {expandido ? 'Ocultar' : 'Recomendaciones'}
                                                </Button>
                                            </td>
                                        </tr>

                                        {expandido && (
                                            <tr className="bg-zinc-950/40">
                                                <td colSpan={5} className="p-4 sm:p-5">
                                                    <div className="space-y-3">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                                                                Protocolo Tutorial Sugerido para {item.estudiante.nombre}
                                                            </span>
                                                            <span className="text-xs text-zinc-500">
                                                                {item.plan_rescate?.requiere_intervencion
                                                                    ? 'Intervención Requerida'
                                                                    : 'Seguimiento Preventivo'}
                                                            </span>
                                                        </div>

                                                        {item.plan_rescate?.acciones && item.plan_rescate.acciones.length > 0 ? (
                                                            <ul className="space-y-1.5 pt-1">
                                                                {item.plan_rescate.acciones.map((acc, aIdx) => (
                                                                    <li
                                                                        key={aIdx}
                                                                        className="text-xs text-zinc-400 flex items-start space-x-2"
                                                                    >
                                                                        <span className="text-blue-400 mt-0.5">•</span>
                                                                        <span>{acc}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <p className="text-xs text-zinc-500">
                                                                No se especificaron acciones adicionales. Mantener acompañamiento estándar.
                                                            </p>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
