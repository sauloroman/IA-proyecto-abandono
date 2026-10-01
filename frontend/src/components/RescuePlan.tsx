import React from 'react';
import type { PlanRescate } from '../types';
import { TrendingDown } from 'lucide-react';

interface RescuePlanProps {
    plan: PlanRescate;
}

export const RescuePlan: React.FC<RescuePlanProps> = ({ plan }) => {
    const { requiere_intervencion, mensaje, acciones_recomendadas, simulacion_rescate } = plan;

    return (
        <div className="bg-zinc-900/40 border border-zinc-800 border-l-2 border-l-amber-500/60 rounded-lg p-5 space-y-5 shadow-xs">
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-zinc-800/80">
                <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                        Estrategia de Intervención Tutorial
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{mensaje}</p>
                </div>

                <div className="text-right shrink-0">
                    <span className="text-xs uppercase tracking-wider text-zinc-400 block font-medium">
                        Prioridad
                    </span>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium mt-1 ${requiere_intervencion ? 'text-amber-400' : 'text-emerald-400'
                        }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${requiere_intervencion ? 'bg-amber-400' : 'bg-emerald-400'
                            }`} />
                        <span>{requiere_intervencion ? 'Intervención requerida' : 'Seguimiento ordinario'}</span>
                    </span>
                </div>
            </div>

            {simulacion_rescate && (
                <div className="border border-zinc-800/80 border-l-2 border-l-emerald-500/60 rounded-md p-4 space-y-3 bg-zinc-950/60">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">
                            Análisis Contrafactual de Permanencia
                        </span>
                        <span className="text-xs text-emerald-400/90 font-medium flex items-center gap-1">
                            <TrendingDown className="w-3.5 h-3.5" />
                            Reducción proyectada
                        </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center sm:text-left py-2.5 border-y border-zinc-800/60">
                        <div>
                            <span className="text-xs text-zinc-400 block">Probabilidad Inicial</span>
                            <span className="text-lg font-bold text-zinc-200 mt-0.5 block">
                                {simulacion_rescate.probabilidad_actual}
                            </span>
                        </div>
                        <div>
                            <span className="text-xs text-zinc-400 block">Proyección con Plan</span>
                            <span className="text-lg font-bold text-emerald-400 mt-0.5 block">
                                {simulacion_rescate.nueva_probabilidad}
                            </span>
                        </div>
                        <div>
                            <span className="text-xs text-zinc-400 block">Variación Estimada</span>
                            <span className="text-lg font-bold text-emerald-400 mt-0.5 block">
                                {simulacion_rescate.reduccion_esperada}
                            </span>
                        </div>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                        {simulacion_rescate.impacto_diagnostico}
                    </p>
                </div>
            )}

            {acciones_recomendadas && acciones_recomendadas.length > 0 && (
                <div className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">
                        Medidas Tutoriales Prescritas
                    </span>

                    <ol className="divide-y divide-zinc-800/60 text-xs text-zinc-300">
                        {acciones_recomendadas.map((accion, index) => (
                            <li key={index} className="py-2.5 flex items-start gap-3">
                                <span className="text-zinc-500 font-semibold text-xs shrink-0 w-6">
                                    {String(index + 1).padStart(2, '0')}.
                                </span>
                                <span className="leading-relaxed">{accion}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    );
};
