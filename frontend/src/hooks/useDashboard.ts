import { useState, useEffect, useMemo } from 'react';
import { servicioApi } from '../services/api';
import type { Estudiante, RespuestaSalud } from '../types';

interface UseDashboardParams {
    estudiantes: Estudiante[];
    cargandoEstudiantes: boolean;
}

export const useDashboard = ({ estudiantes, cargandoEstudiantes }: UseDashboardParams) => {
    const [salud, setSalud] = useState<RespuestaSalud | null>(null);
    const [cargandoSalud, setCargandoSalud] = useState<boolean>(true);

    const recargarSalud = async () => {
        setCargandoSalud(true);
        try {
            const data = await servicioApi.verificarSalud();
            setSalud(data);
        } catch {
            setSalud({
                estado: 'error',
                mensaje: 'Sin conexión con el backend',
                base_datos: 'Desconectado',
            });
        } finally {
            setCargandoSalud(false);
        }
    };

    useEffect(() => {
        let activo = true;
        servicioApi.verificarSalud()
            .then((data) => {
                if (activo) {
                    setSalud(data);
                    setCargandoSalud(false);
                }
            })
            .catch(() => {
                if (activo) {
                    setSalud({
                        estado: 'error',
                        mensaje: 'Sin conexión con el backend',
                        base_datos: 'Desconectado',
                    });
                    setCargandoSalud(false);
                }
            });

        return () => {
            activo = false;
        };
    }, []);

    const metricas = useMemo(() => {
        const totalEstudiantes = estudiantes.length;
        const totalEvaluaciones = estudiantes.reduce(
            (acc, curr) => acc + (curr.total_predicciones || 0),
            0
        );
        const conDiagnostico = estudiantes.filter(
            (e) => (e.total_predicciones || 0) > 0
        ).length;

        const tasaCobertura =
            totalEstudiantes > 0 ? Math.round((conDiagnostico / totalEstudiantes) * 100) : 0;

        const mapaCarreras = new Map<string, number>();
        estudiantes.forEach((e) => {
            const carrera = e.carrera?.trim() || 'Sin programa especificado';
            mapaCarreras.set(carrera, (mapaCarreras.get(carrera) || 0) + 1);
        });

        const distribucionCarreras = Array.from(mapaCarreras.entries())
            .map(([nombre, total]) => ({ nombre, total }))
            .sort((a, b) => b.total - a.total);

        const recientes = [...estudiantes].slice(-5).reverse();

        return {
            totalEstudiantes,
            totalEvaluaciones,
            conDiagnostico,
            tasaCobertura,
            distribucionCarreras,
            recientes,
        };
    }, [estudiantes]);

    return {
        props: {
            ...metricas,
            salud,
            cargando: cargandoEstudiantes || cargandoSalud,
        },
        methods: {
            recargarSalud,
        },
    };
};
