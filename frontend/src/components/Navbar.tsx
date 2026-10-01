import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, SlidersHorizontal, UploadCloud, Users, GraduationCap } from 'lucide-react';
import { useCheckAppStatus } from '../hooks/useCheckAppStatus';

export const Navbar: React.FC = () => {
    const { conectado } = useCheckAppStatus();

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${isActive
            ? 'bg-zinc-800 text-zinc-100 border border-zinc-700/60 shadow-xs'
            : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
        }`;

    return (
        <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">

                <NavLink to="/" className="flex items-center gap-2.5 group">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:border-blue-500/40 transition-colors">
                        <GraduationCap className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1.5 leading-none">
                            <span className="text-sm font-semibold tracking-tight text-zinc-100">
                                EduPredict
                            </span>
                        </div>
                        <span className="text-[10px] text-zinc-500 tracking-tight mt-0.5">
                            Analítica de Abandono Escolar
                        </span>
                    </div>
                </NavLink>

                <nav className="hidden md:flex items-center gap-1 bg-zinc-900/40 p-1 rounded-lg border border-zinc-800/60">
                    <NavLink to="/" end className={navLinkClass}>
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        <span>Panel General</span>
                    </NavLink>
                    <NavLink to="/simulador" className={navLinkClass}>
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        <span>Simulador</span>
                    </NavLink>
                    <NavLink to="/carga-masiva" className={navLinkClass}>
                        <UploadCloud className="w-3.5 h-3.5" />
                        <span>Carga Masiva</span>
                    </NavLink>
                    <NavLink to="/estudiantes" className={navLinkClass}>
                        <Users className="w-3.5 h-3.5" />
                        <span>Estudiantes</span>
                    </NavLink>
                </nav>

                <div className="flex items-center gap-2 px-2.5 py-1 rounded-md border border-zinc-800/90 bg-zinc-900/50 text-[11px] text-zinc-400">
                    <span
                        className={`w-1.5 h-1.5 rounded-full ${conectado === true
                            ? 'bg-emerald-500'
                            : conectado === false
                                ? 'bg-rose-500'
                                : 'bg-zinc-500 animate-pulse'
                            }`}
                    />
                    <span className="text-zinc-300 text-xs">
                        {conectado === true
                            ? 'Servicio activo'
                            : conectado === false
                                ? 'Sin conexión'
                                : 'Comprobando'}
                    </span>
                </div>
            </div>
        </header>
    );
};
