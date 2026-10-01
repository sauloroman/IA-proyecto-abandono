import React from 'react';
import { Formatter } from '../helpers/formatter';

interface RiskGaugeProps {
    probabilidad: number;
    riesgo: 'Alto' | 'Bajo';
    modeloUsado?: string;
    fecha?: string;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({
    probabilidad,
    riesgo,
    modeloUsado = 'DecisionTree',
    fecha,
}) => {
    const porcentaje = Formatter.percentage(probabilidad);
    const esAlto = riesgo === 'Alto';

    return (
        <div className={`bg-zinc-900/50 border border-zinc-800 border-l-2 ${esAlto ? 'border-l-rose-500/70' : 'border-l-emerald-500/70'
            } rounded-lg p-5 space-y-5 shadow-xs`}>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 text-xs">
                <span className="text-zinc-300 font-medium">
                    Evaluación de Riesgo de Abandono
                </span>
                <span className="text-zinc-400 text-xs font-mono">
                    Algoritmo: {modeloUsado}
                </span>
            </div>

            <div className="flex items-baseline justify-between">
                <div>
                    <span className="text-xs uppercase tracking-wider text-zinc-400 block font-medium">
                        Probabilidad Calculada
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-4xl font-bold tracking-tight text-zinc-100">
                            {porcentaje}%
                        </span>
                        <span className="text-xs text-zinc-400">estimación del modelo</span>
                    </div>
                </div>

                <div className="text-right">
                    <span className="text-xs uppercase tracking-wider text-zinc-400 block font-medium mb-1">
                        Clasificación
                    </span>
                    <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${esAlto
                                ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            }`}
                    >
                        <span
                            className={`w-1.5 h-1.5 rounded-full ${esAlto ? 'bg-rose-400' : 'bg-emerald-400'
                                }`}
                        />
                        <span>Riesgo {riesgo}</span>
                    </span>
                </div>
            </div>

            <div className="space-y-1.5">
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-500 ${esAlto
                                ? 'bg-gradient-to-r from-zinc-600 via-rose-500/80 to-rose-400'
                                : 'bg-gradient-to-r from-zinc-600 via-emerald-500/80 to-emerald-400'
                            }`}
                        style={{ width: `${Math.min(Math.max(porcentaje, 2), 100)}%` }}
                    />
                </div>
                <div className="flex justify-between text-xs text-zinc-400">
                    <span>0% (Bajo)</span>
                    <span className="text-zinc-500">Umbral (50%)</span>
                    <span>100% (Crítico)</span>
                </div>
            </div>

            {fecha && (
                <div className="pt-2 border-t border-zinc-800/60 text-right">
                    <span className="text-xs text-zinc-400 font-mono">
                        Fecha de registro: {fecha}
                    </span>
                </div>
            )}
        </div>
    );
};
