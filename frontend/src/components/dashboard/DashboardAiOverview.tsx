import React from 'react';
import { Cpu, ShieldCheck, Scale, Compass } from 'lucide-react';

export const DashboardAiOverview: React.FC = () => {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 text-left space-y-5">
            <div className="border-b border-zinc-800 pb-4">
                <div className="flex items-center space-x-2 text-xs text-zinc-400 mb-1">
                    <Cpu className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Transparencia Algorítmica & XAI</span>
                </div>
                <h3 className="text-sm font-semibold text-zinc-100">
                    Arquitectura del Motor Predictivo y Principios Éticos
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                    Fundamentos de Machine Learning aplicados a la prevención temprana del abandono escolar.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
                <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-zinc-200 font-medium">
                        <Compass className="w-4 h-4 text-blue-400" />
                        <span>Modelos de Clasificación</span>
                    </div>
                    <p className="text-zinc-400 leading-relaxed">
                        Entrenado sobre datos académicos multidimensionales: asistencia escolar, promedio general, asignaturas reprobadas y antecedentes escolares.
                    </p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-zinc-200 font-medium">
                        <Scale className="w-4 h-4 text-emerald-400" />
                        <span>Simulación Contrafactual</span>
                    </div>
                    <p className="text-zinc-400 leading-relaxed">
                        El motor no solo diagnostica el nivel de riesgo, sino que proyecta las mejoras mínimas requeridas para revertir la probabilidad de deserción.
                    </p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-zinc-200 font-medium">
                        <ShieldCheck className="w-4 h-4 text-zinc-300" />
                        <span>Propósito Asistencial</span>
                    </div>
                    <p className="text-zinc-400 leading-relaxed">
                        Las predicciones representan estimaciones orientadas al acompañamiento tutorial preventivo, garantizando la equidad sin medidas sancionatorias.
                    </p>
                </div>
            </div>
        </div>
    );
};
