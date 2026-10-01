import React, { type InputHTMLAttributes } from 'react';

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label: string;
    valorActual: string | number;
    subetiquetas?: {
        izquierda?: string;
        centro?: string;
        derecha?: string;
    };
    error?: string;
}

export const Slider: React.FC<SliderProps> = ({
    label,
    valorActual,
    subetiquetas,
    error,
    className = '',
    ...props
}) => {
    return (
        <div className={`space-y-2 ${className}`}>
            <div className="flex justify-between items-center text-xs">
                <label className="text-zinc-300 font-medium">{label}</label>
                <span className="text-zinc-200 font-semibold bg-zinc-800 px-2 py-0.5 rounded text-xs border border-zinc-700/50">
                    {valorActual}
                </span>
            </div>
            <input
                type="range"
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-200 focus:outline-none"
                {...props}
            />
            {subetiquetas && (
                <div className="flex justify-between text-xs text-zinc-400">
                    <span>{subetiquetas.izquierda}</span>
                    <span>{subetiquetas.centro}</span>
                    <span>{subetiquetas.derecha}</span>
                </div>
            )}
            {error && <span className="text-xs text-rose-400 block">{error}</span>}
        </div>
    );
};
