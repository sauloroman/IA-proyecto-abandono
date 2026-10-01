import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { SlidersHorizontal, UploadCloud, GraduationCap, ArrowRight } from 'lucide-react';

export const DashboardQuickActions: React.FC = () => {
    const navigate = useNavigate();

    const modulos = [
        {
            titulo: 'Simulador de Inferencia & XAI',
            descripcion:
                'Explore escenarios contrafactuales individuales con explicabilidad algorítmica y metas de rescate tutoría.',
            icono: SlidersHorizontal,
            ruta: '/simulador',
            textoBoton: 'Abrir Simulador',
            variante: 'primary' as const,
        },
        {
            titulo: 'Carga Masiva de Alumnos',
            descripcion:
                'Procese archivos Excel (.xlsx, .xls) o CSV (.csv) para obtener el triaje grupal y el padrón de alumnos prioritarios.',
            icono: UploadCloud,
            ruta: '/carga-masiva',
            textoBoton: 'Iniciar Carga',
            variante: 'secondary' as const,
        },
        {
            titulo: 'Directorio de Estudiantes',
            descripcion:
                'Administre expedientes, consulte matrículas y revise el historial cronológico de evaluaciones por alumno.',
            icono: GraduationCap,
            ruta: '/estudiantes',
            textoBoton: 'Ver Directorio',
            variante: 'secondary' as const,
        },
    ];

    return (
        <div className="space-y-3 text-left">
            <div>
                <h3 className="text-sm font-medium text-zinc-100">
                    Módulos Operativos de la Plataforma
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                    Acceso rápido a las herramientas de análisis predictivo, ingesta de datos y gestión escolar.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {modulos.map((mod) => {
                    const Icono = mod.icono;

                    return (
                        <div
                            key={mod.ruta}
                            className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 flex flex-col justify-between hover:border-zinc-700/80 transition-all space-y-4"
                        >
                            <div className="space-y-3">
                                <div className="w-9 h-9 rounded-lg bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-zinc-300">
                                    <Icono className="w-4 h-4 text-zinc-300" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-zinc-100">
                                        {mod.titulo}
                                    </h4>
                                    <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                                        {mod.descripcion}
                                    </p>
                                </div>
                            </div>

                            <div className="pt-2 border-t border-zinc-800/80">
                                <Button
                                    variant={mod.variante}
                                    size="sm"
                                    className="w-full justify-between"
                                    onClick={() => navigate(mod.ruta)}
                                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                                >
                                    {mod.textoBoton}
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
