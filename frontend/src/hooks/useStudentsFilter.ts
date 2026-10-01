import { useState, useMemo } from 'react';
import type { Estudiante } from '../types';

interface UseStudentsFilterParams {
    estudiantes: Estudiante[];
}

export const useStudentsFilter = ({ estudiantes }: UseStudentsFilterParams) => {
    const [busqueda, setBusqueda] = useState<string>('');
    const [filtroCarrera, setFiltroCarrera] = useState<string>('todas');

    const carrerasDisponibles = useMemo(() => {
        const carreras = new Set<string>();
        estudiantes.forEach((e) => {
            if (e.carrera && e.carrera.trim()) {
                carreras.add(e.carrera.trim());
            }
        });
        return Array.from(carreras).sort();
    }, [estudiantes]);

    const estudiantesFiltrados = useMemo(() => {
        return estudiantes.filter((item) => {
            const termino = busqueda.trim().toLowerCase();
            const coincideBusqueda =
                termino === '' ||
                item.nombre.toLowerCase().includes(termino) ||
                item.matricula.toLowerCase().includes(termino) ||
                (item.carrera && item.carrera.toLowerCase().includes(termino));

            const coincideCarrera =
                filtroCarrera === 'todas' ||
                (item.carrera && item.carrera.trim().toLowerCase() === filtroCarrera.trim().toLowerCase());

            return coincideBusqueda && coincideCarrera;
        });
    }, [estudiantes, busqueda, filtroCarrera]);

    return {
        props: {
            busqueda,
            filtroCarrera,
            carrerasDisponibles,
            estudiantesFiltrados,
            totalResultados: estudiantesFiltrados.length,
        },
        methods: {
            setBusqueda,
            setFiltroCarrera,
            limpiarFiltros: () => {
                setBusqueda('');
                setFiltroCarrera('todas');
            },
        },
    };
};
