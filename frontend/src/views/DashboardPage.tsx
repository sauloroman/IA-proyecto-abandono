import React from 'react';
import { useStudents } from '../hooks/useStudents';
import { useDashboard } from '../hooks/useDashboard';
import { DashboardMetricsCards } from '../components/dashboard/DashboardMetricsCards';
import { DashboardQuickActions } from '../components/dashboard/DashboardQuickActions';
import { DashboardRecentStudents } from '../components/dashboard/DashboardRecentStudents';
import { DashboardAiOverview } from '../components/dashboard/DashboardAiOverview';
import { Button } from '../components/ui/Button';
import { LayoutDashboard, RotateCcw } from 'lucide-react';

export const DashboardPage: React.FC = () => {
    const {
        props: { estudiantes, cargando: cargandoEstudiantes },
        methods: { recargarEstudiantes },
    } = useStudents();

    const {
        props: {
            totalEstudiantes,
            totalEvaluaciones,
            conDiagnostico,
            tasaCobertura,
            recientes,
            salud,
        },
    } = useDashboard({
        estudiantes,
        cargandoEstudiantes,
    });

    return (
        <div className="space-y-6">
            <div className="border-b border-zinc-800/80 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-left">
                <div>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1">
                        <LayoutDashboard className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Panel de Control Institucional</span>
                    </div>
                    <h1 className="text-xl font-semibold tracking-tight text-zinc-100">
                        Centro de Monitoreo & Analítica Predictiva
                    </h1>
                    <p className="text-xs text-zinc-400 mt-1">
                        Visión general del sistema de detección temprana de abandono escolar y permanencia académica.
                    </p>
                </div>

                <div className="flex items-center space-x-2 self-start sm:self-auto shrink-0">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={recargarEstudiantes}
                        leftIcon={<RotateCcw className="w-3.5 h-3.5 text-zinc-400" />}
                    >
                        Actualizar Datos
                    </Button>
                </div>
            </div>

            <DashboardMetricsCards
                totalEstudiantes={totalEstudiantes}
                totalEvaluaciones={totalEvaluaciones}
                tasaCobertura={tasaCobertura}
                conDiagnostico={conDiagnostico}
                salud={salud}
            />

            <DashboardQuickActions />

            <DashboardRecentStudents estudiantes={recientes} />

            <DashboardAiOverview />
        </div>
    );
};
