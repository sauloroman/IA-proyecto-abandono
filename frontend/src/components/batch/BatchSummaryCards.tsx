import React from 'react';
import type { ResumenGrupal } from '../../types';

interface BatchSummaryCardsProps {
    resumen: ResumenGrupal;
}

export const BatchSummaryCards: React.FC<BatchSummaryCardsProps> = ({ resumen }) => {
    const porcentajeNumero = parseFloat(resumen.tasa_riesgo_grupal.replace('%', '')) || 0;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 text-left">
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider block">
                    Total Evaluados
                </span>
                <div className="mt-2 flex items-baseline space-x-2">
                    <span className="text-3xl font-light text-zinc-100">
                        {resumen.total_estudiantes}
                    </span>
                    <span className="text-xs text-zinc-500">estudiantes</span>
                </div>
                <p className="text-xs text-zinc-500 mt-2">
                    Lote procesado exitosamente
                </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 text-left">
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider block">
                    Tasa de Riesgo Grupal
                </span>
                <div className="mt-2 flex items-baseline space-x-2">
                    <span className="text-3xl font-light text-blue-400">
                        {resumen.tasa_riesgo_grupal}
                    </span>
                </div>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2.5 overflow-hidden">
                    <div
                        className="bg-blue-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, Math.max(0, porcentajeNumero))}%` }}
                    />
                </div>
                <p className="text-xs text-zinc-500 mt-2">
                    Índice de vulnerabilidad colectiva
                </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 text-left">
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider block">
                    Riesgo Alto
                </span>
                <div className="mt-2 flex items-baseline space-x-2">
                    <span className="text-3xl font-light text-rose-400">
                        {resumen.alumnos_riesgo_alto}
                    </span>
                    <span className="text-xs text-zinc-500">casos urgentes</span>
                </div>
                <p className="text-xs text-zinc-500 mt-2">
                    Requieren intervención prioritaria
                </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 text-left">
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider block">
                    Riesgo Bajo
                </span>
                <div className="mt-2 flex items-baseline space-x-2">
                    <span className="text-3xl font-light text-emerald-400">
                        {resumen.alumnos_riesgo_bajo}
                    </span>
                    <span className="text-xs text-zinc-500">estables</span>
                </div>
                <p className="text-xs text-zinc-500 mt-2">
                    Sin alertas críticas inmediatas
                </p>
            </div>
        </div>
    );
};
