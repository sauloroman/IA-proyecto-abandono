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

    return (
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-5 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 text-xs">
                <span className="text-zinc-400 font-medium">
                    Evaluación de Riesgo de Abandono
                </span>
                <span className="text-zinc-500 font-mono text-[11px]">
                    Algoritmo: {modeloUsado}
                </span>
            </div>

            <div className="flex items-baseline justify-between">
                <div>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 block font-mono">
                        Probabilidad Calculada
                    </span>
                    <div className="flex items-baseline gap-1.5 mt-1">
                        <span className="text-3xl font-semibold font-mono text-zinc-100">
                            {porcentaje}%
                        </span>
                        <span className="text-xs text-zinc-500 font-mono">estimación estadística</span>
                    </div>
                </div>

                <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 block font-mono">
                        Clasificación
                    </span>
                    <span className="text-sm font-medium text-zinc-200 mt-1 block">
                        Riesgo {riesgo}
                    </span>
                </div>
            </div>

            <div className="space-y-1.5">
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-zinc-300 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(Math.max(porcentaje, 2), 100)}%` }}
                    />
                </div>
                <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                    <span>0% (Mínimo)</span>
                    <span>Umbral de decisión (50%)</span>
                    <span>100% (Máximo)</span>
                </div>
            </div>

            {fecha && (
                <div className="pt-2 border-t border-zinc-800/60 text-right">
                    <span className="text-[10px] text-zinc-500 font-mono">
                        Fecha de registro: {fecha}
                    </span>
                </div>
            )}
        </div>
    );
};
