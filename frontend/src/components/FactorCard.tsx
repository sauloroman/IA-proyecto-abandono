import React from 'react';
import type { FactorDetonante } from '../types';
import { Formatter } from '../helpers/formatter';
import { StylesConfig } from '../helpers/styles-config';

interface FactorCardProps {
    factor: FactorDetonante;
}

export const FactorCard: React.FC<FactorCardProps> = ({ factor }) => {
    const titulo = Formatter.factorTitle(factor.factor);
    const estilo = StylesConfig.getConfiguracionNivel(factor.nivel);

    return (
        <div className={`bg-zinc-900/40 border border-zinc-800 border-l-2 ${estilo.borde} rounded-lg p-4 flex flex-col justify-between shadow-xs hover:border-zinc-700/80 transition-colors`}>
            <div>
                <div className="flex items-baseline justify-between gap-2 pb-2 border-b border-zinc-800/60">
                    <h4 className="text-xs font-semibold text-zinc-200">
                        {titulo}
                    </h4>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${estilo.textColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${estilo.dotColor}`} />
                        <span>{factor.nivel}</span>
                    </span>
                </div>

                <p className="mt-2.5 text-xs text-zinc-400 leading-relaxed">
                    {factor.diagnostico}
                </p>
            </div>

            <div className="mt-4 pt-2.5 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400">
                <span>Ponderación en cálculo</span>
                <span className="text-zinc-200 font-semibold">{factor.impacto_porcentual}%</span>
            </div>
        </div>
    );
};