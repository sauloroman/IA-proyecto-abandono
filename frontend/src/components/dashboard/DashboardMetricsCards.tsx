import React from 'react';
import type { RespuestaSalud } from '../../types';
import { Users, Activity, Target, Database } from 'lucide-react';

interface DashboardMetricsCardsProps {
    totalEstudiantes: number;
    totalEvaluaciones: number;
    tasaCobertura: number;
    conDiagnostico: number;
    salud: RespuestaSalud | null;
}

export const DashboardMetricsCards: React.FC<DashboardMetricsCardsProps> = ({
    totalEstudiantes,
    totalEvaluaciones,
    tasaCobertura,
    conDiagnostico,
    salud,
}) => {
    const backendOnline = salud?.estado === 'exito';

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 text-left">
                <div className="flex items-center justify-between text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    <span>Padrón Estudiantil</span>
                    <Users className="w-3.5 h-3.5 text-zinc-500" />
                </div>
                <div className="mt-2 flex items-baseline space-x-2">
                    <span className="text-3xl font-light text-zinc-100">
                        {totalEstudiantes}
                    </span>
                    <span className="text-xs text-zinc-500">alumnos</span>
                </div>
                <p className="text-xs text-zinc-500 mt-2">
                    Expedientes activos en plataforma
                </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 text-left">
                <div className="flex items-center justify-between text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    <span>Evaluaciones XAI</span>
                    <Activity className="w-3.5 h-3.5 text-zinc-500" />
                </div>
                <div className="mt-2 flex items-baseline space-x-2">
                    <span className="text-3xl font-light text-zinc-100">
                        {totalEvaluaciones}
                    </span>
                    <span className="text-xs text-zinc-500">sesiones</span>
                </div>
                <p className="text-xs text-zinc-500 mt-2">
                    Injerencias y planes contrafactuales
                </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 text-left">
                <div className="flex items-center justify-between text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    <span>Cobertura Diagnóstica</span>
                    <Target className="w-3.5 h-3.5 text-zinc-500" />
                </div>
                <div className="mt-2 flex items-baseline space-x-2">
                    <span className="text-3xl font-light text-zinc-100">
                        {tasaCobertura}%
                    </span>
                    <span className="text-xs text-zinc-500">
                        ({conDiagnostico}/{totalEstudiantes})
                    </span>
                </div>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2.5 overflow-hidden">
                    <div
                        className="bg-blue-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, Math.max(0, tasaCobertura))}%` }}
                    />
                </div>
                <p className="text-xs text-zinc-500 mt-2">
                    Alumnos con al menos un diagnóstico
                </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 text-left">
                <div className="flex items-center justify-between text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    <span>Motor & Base de Datos</span>
                    <Database className="w-3.5 h-3.5 text-zinc-500" />
                </div>
                <div className="mt-2 flex items-center space-x-2">
                    <span
                        className={`w-2 h-2 rounded-full ${
                            backendOnline ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
                        }`}
                    />
                    <span className="text-sm font-medium text-zinc-100">
                        {backendOnline ? 'Servicio Operativo' : 'Servicio Inactivo'}
                    </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                    {salud?.base_datos || 'PostgreSQL Conectado'}
                </p>
                <p className="text-[11px] text-zinc-500 mt-1">
                    Modelo de Machine Learning listo
                </p>
            </div>
        </div>
    );
};
