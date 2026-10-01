import React from 'react';
import type { RespuestaPrediccion } from '../../types';
import { RiskGauge } from '../RiskGauge';
import { FactorCard } from '../FactorCard';
import { RescuePlan } from '../RescuePlan';
import { SimulatorEmptyState } from './SimulatorEmptyState';
import { Info } from 'lucide-react';

interface SimulatorResultsProps {
    resultado: RespuestaPrediccion | null;
}

export const SimulatorResults: React.FC<SimulatorResultsProps> = ({ resultado }) => {
    if (!resultado) {
        return <SimulatorEmptyState />;
    }

    return (
        <div className="space-y-6">
            <RiskGauge
                probabilidad={resultado.diagnostico.probabilidad}
                riesgo={resultado.diagnostico.riesgo}
                modeloUsado={resultado.diagnostico.modelo_usado}
                fecha={resultado.diagnostico.fecha_prediccion}
            />

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                        Explicabilidad del Modelo (XAI)
                    </h3>
                    <span className="text-[11px] text-zinc-400 font-mono">
                        {resultado.factores_detonantes.length} factores analizados
                    </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {resultado.factores_detonantes.map((factor, index) => (
                        <FactorCard key={index} factor={factor} />
                    ))}
                </div>
            </div>

            <RescuePlan plan={resultado.plan_rescate_tutoria} />

            <div className="flex items-start gap-2 text-[11px] text-zinc-400 bg-zinc-950 border border-zinc-900 rounded-lg p-3">
                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-zinc-400" />
                <p>{resultado.aviso_etico}</p>
            </div>
        </div>
    );
};
