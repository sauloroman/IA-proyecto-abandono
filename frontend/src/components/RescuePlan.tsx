import React from 'react';
import type { PlanRescate } from '../types';

interface RescuePlanProps {
    plan: PlanRescate;
}

export const RescuePlan: React.FC<RescuePlanProps> = ({ plan }) => {
    const { requiere_intervencion, mensaje, acciones_recomendadas, simulacion_rescate } = plan;

    return (
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-5 space-y-5">
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-zinc-800/80">
                <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                        Estrategia de Intervención Tutorial
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{mensaje}</p>
                </div>

                <div className="text-right shrink-0">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 block font-mono">
                        Prioridad
                    </span>
                    <span className="text-xs font-mono text-zinc-300 mt-0.5 block">
                        {requiere_intervencion ? 'Intervención requerida' : 'Seguimiento ordinario'}
                    </span>
                </div>
            </div>

            {simulacion_rescate && (
                <div className="border border-zinc-800/80 rounded-md p-3.5 space-y-3 bg-zinc-950/40">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                        Análisis Contrafactual de Permanencia
                    </span>

                    <div className="grid grid-cols-3 gap-4 text-center sm:text-left py-2 border-y border-zinc-800/60">
                        <div>
                            <span className="text-[10px] text-zinc-500 font-mono block">Probabilidad Inicial</span>
                            <span className="text-base font-mono font-medium text-zinc-300 mt-0.5 block">
                                {simulacion_rescate.probabilidad_actual}
                            </span>
                        </div>
                        <div>
                            <span className="text-[10px] text-zinc-500 font-mono block">Proyección con Plan</span>
                            <span className="text-base font-mono font-semibold text-zinc-100 mt-0.5 block">
                                {simulacion_rescate.nueva_probabilidad}
                            </span>
                        </div>
                        <div>
                            <span className="text-[10px] text-zinc-500 font-mono block">Variación Estimada</span>
                            <span className="text-base font-mono font-medium text-zinc-300 mt-0.5 block">
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
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                        Medidas Tutoriales Prescritas
                    </span>

                    <ol className="divide-y divide-zinc-800/60 text-xs text-zinc-300">
                        {acciones_recomendadas.map((accion, index) => (
                            <li key={index} className="py-2.5 flex items-start gap-3">
                                <span className="font-mono text-zinc-500 text-[11px] shrink-0 w-5">
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
