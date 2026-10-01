import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

export const SimulatorEmptyState: React.FC = () => {
    return (
        <div className="bg-zinc-900/30 border border-zinc-800/60 border-dashed rounded-xl p-10 text-center flex flex-col items-center justify-center min-h-[420px]">
            <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 mb-3">
                <SlidersHorizontal className="w-6 h-6 text-zinc-400" />
            </div>
            <h3 className="text-sm font-medium text-zinc-300">
                Sin evaluación activa
            </h3>
            <p className="text-xs text-zinc-400 max-w-sm mt-1 leading-relaxed">
                Ajuste los indicadores académicos del estudiante en el panel izquierdo y presione{' '}
                <strong className="text-zinc-200">Ejecutar Inferencia</strong> para calcular el riesgo y el plan tutorial.
            </p>
        </div>
    );
};
