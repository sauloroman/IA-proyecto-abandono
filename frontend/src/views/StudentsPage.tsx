import React, { useState } from 'react';
import { useStudents } from '../hooks/useStudents';
import { useStudentsFilter } from '../hooks/useStudentsFilter';
import { StudentsTable } from '../components/students/StudentsTable';
import { StudentModal } from '../components/students/StudentModal';
import { Button } from '../components/ui/Button';
import type { Estudiante, CrearEstudiantePayload } from '../types';
import { GraduationCap, UserPlus, AlertCircle } from 'lucide-react';

export const StudentsPage: React.FC = () => {
    const {
        props: { estudiantes, cargando, error },
        methods: { crearEstudiante, actualizarEstudiante, eliminarEstudiante },
    } = useStudents();

    const {
        props: { busqueda, filtroCarrera, carrerasDisponibles, estudiantesFiltrados },
        methods: { setBusqueda, setFiltroCarrera, limpiarFiltros },
    } = useStudentsFilter({ estudiantes });

    const [modalAbierto, setModalAbierto] = useState(false);
    const [estudianteAEditar, setEstudianteAEditar] = useState<Estudiante | null>(null);
    const [guardando, setGuardando] = useState(false);
    const [errorModal, setErrorModal] = useState<string | null>(null);

    const handleAbrirCrear = () => {
        setEstudianteAEditar(null);
        setErrorModal(null);
        setModalAbierto(true);
    };

    const handleAbrirEditar = (estudiante: Estudiante) => {
        setEstudianteAEditar(estudiante);
        setErrorModal(null);
        setModalAbierto(true);
    };

    const handleCerrarModal = () => {
        setModalAbierto(false);
        setEstudianteAEditar(null);
        setErrorModal(null);
    };

    const handleGuardarEstudiante = async (datos: CrearEstudiantePayload) => {
        setGuardando(true);
        setErrorModal(null);
        try {
            if (estudianteAEditar) {
                const res = await actualizarEstudiante(estudianteAEditar.id, datos);
                if (!res.ok) {
                    setErrorModal(res.error || 'Error al actualizar estudiante');
                    return false;
                }
            } else {
                const res = await crearEstudiante(datos);
                if (!res.ok) {
                    setErrorModal(res.error || 'Error al registrar estudiante');
                    return false;
                }
            }
            return true;
        } finally {
            setGuardando(false);
        }
    };

    const handleEliminarEstudiante = async (id: number) => {
        await eliminarEstudiante(id);
    };

    return (
        <div className="space-y-6">
            <div className="border-b border-zinc-800/80 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1">
                        <GraduationCap className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Gestión Escolar & Expedientes</span>
                    </div>
                    <h1 className="text-xl font-semibold tracking-tight text-zinc-100">
                        Directorio de Estudiantes
                    </h1>
                    <p className="text-xs text-zinc-400 mt-1">
                        Administración centralizada de expedientes de alumnos, matrículas e historial de intervenciones.
                    </p>
                </div>

                <Button
                    variant="primary"
                    size="sm"
                    onClick={handleAbrirCrear}
                    leftIcon={<UserPlus className="w-3.5 h-3.5" />}
                >
                    Nuevo Estudiante
                </Button>
            </div>

            {error && (
                <div className="flex items-center gap-2.5 p-3 rounded-lg bg-rose-950/40 border border-rose-900/60 text-rose-300 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{error}</span>
                </div>
            )}

            <StudentsTable
                estudiantes={estudiantesFiltrados}
                busqueda={busqueda}
                filtroCarrera={filtroCarrera}
                carrerasDisponibles={carrerasDisponibles}
                totalGeneral={estudiantes.length}
                cargando={cargando}
                onBusquedaChange={setBusqueda}
                onFiltroCarreraChange={setFiltroCarrera}
                onLimpiarFiltros={limpiarFiltros}
                onEditar={handleAbrirEditar}
                onEliminar={handleEliminarEstudiante}
            />

            <StudentModal
                abierto={modalAbierto}
                estudianteEditar={estudianteAEditar}
                cargando={guardando}
                errorServidor={errorModal}
                onCerrar={handleCerrarModal}
                onGuardar={handleGuardarEstudiante}
            />
        </div>
    );
};
