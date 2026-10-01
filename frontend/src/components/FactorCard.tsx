import React from 'react';
import type { FactorDetonante } from '../types';
import { Formatter } from '../helpers/formatter';

interface FactorCardProps {
    factor: FactorDetonante;
}

export const FactorCard: React.FC<FactorCardProps> = ({ factor }) => {
    const titulo = Formatter.factorTitle(factor.factor);

    return (
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-4 flex flex-col justify-between">
            <div>
                {/* Título formal y nivel como texto discreto con tipografía unificada */}
                <div className="flex items-baseline justify-between gap-2 pb-2 border-b border-zinc-800/60">
                    <h4 className="text-xs font-semibold text-zinc-200">
                        {titulo}
                    </h4>
                    <span className="text-xs text-zinc-400 font-medium">
                        {factor.nivel}
                    </span>
                </div>

                {/* Diagnóstico técnico */}
                <p className="mt-2.5 text-xs text-zinc-400 leading-relaxed">
                    {factor.diagnostico}
                </p>
            </div>

            {/* Ponderación como indicador neutral */}
            <div className="mt-4 pt-2.5 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400">
                <span>Ponderación en cálculo</span>
                <span className="text-zinc-200 font-semibold">{factor.impacto_porcentual}%</span>
            </div>
        </div>
    );
};