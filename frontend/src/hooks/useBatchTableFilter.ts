import { useState, useMemo } from 'react';
import type { DetalleLote } from '../types';

export type FiltroRiesgo = 'todos' | 'Alto' | 'Bajo';

interface UseBatchTableFilterParams {
    detalles: DetalleLote[];
}

export const useBatchTableFilter = ({ detalles }: UseBatchTableFilterParams) => {
    const [busqueda, setBusqueda] = useState<string>('');
    const [filtroRiesgo, setFiltroRiesgo] = useState<FiltroRiesgo>('todos');
    const [estudianteExpandidoId, setEstudianteExpandidoId] = useState<number | null>(null);

    const estudiantesFiltrados = useMemo(() => {
        if (!detalles) return [];

        return detalles.filter((item) => {
            const coincideBusqueda =
                busqueda.trim() === '' ||
                item.estudiante.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                item.estudiante.matricula.toLowerCase().includes(busqueda.toLowerCase());

            const coincideRiesgo =
                filtroRiesgo === 'todos' ||
                item.diagnostico.riesgo.toLowerCase() === filtroRiesgo.toLowerCase();

            return coincideBusqueda && coincideRiesgo;
        });
    }, [detalles, busqueda, filtroRiesgo]);

    const toggleExpansion = (id: number) => {
        setEstudianteExpandidoId((prev) => (prev === id ? null : id));
    };

    return {
        props: {
            busqueda,
            filtroRiesgo,
            estudiantesFiltrados,
            estudianteExpandidoId,
            totalResultados: estudiantesFiltrados.length,
        },
        methods: {
            setBusqueda,
            setFiltroRiesgo,
            toggleExpansion,
            limpiarFiltros: () => {
                setBusqueda('');
                setFiltroRiesgo('todos');
            },
        },
    };
};
