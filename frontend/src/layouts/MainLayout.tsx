import React from 'react';
import { Navbar } from '../components/Navbar';
import { Outlet } from 'react-router-dom';

export const MainLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-zinc-700 selection:text-white">
            <Navbar />

            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>

            <footer className="border-t border-zinc-900 bg-zinc-950/80 py-4 text-center text-xs text-zinc-500">
                <p>EduPredict &bull; Sistema de Prevención y Acompañamiento Académico &bull; Fundamentos de Inteligencia Artificial</p>
            </footer>
        </div>
    );
};
