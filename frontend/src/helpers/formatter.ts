export class Formatter {

    public static percentage(probabilidad: number): number {
        const porcentage = probabilidad <= 1 ? Math.round(probabilidad * 100) : Math.round(probabilidad);
        return porcentage;
    }

    public static factorTitle(factor: string): string {
        const titulos: Record<string, string> = {
            'asistencia': 'Asistencia Escolar',
            'materias_reprobadas': 'Asignaturas No Acreditadas',
            'promedio': 'Rendimiento Académico (Promedio)',
            'antecedentes': 'Historial y Antecedentes',
            'general': 'Métricas Generales',
        };
        return titulos[factor.toLowerCase()] || factor;
    }

}