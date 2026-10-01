import type { FactorDetonante } from "../types";

export class StylesConfig {
    public static getConfiguracionNivel(nivel: FactorDetonante['nivel']) {
        switch (nivel) {
            case 'Crítico':
                return {
                    borde: 'border-l-rose-500/60',
                    dotColor: 'bg-rose-400',
                    textColor: 'text-rose-400',
                };
            case 'Alerta':
                return {
                    borde: 'border-l-amber-500/60',
                    dotColor: 'bg-amber-400',
                    textColor: 'text-amber-400',
                };
            case 'Excelente':
                return {
                    borde: 'border-l-emerald-500/60',
                    dotColor: 'bg-emerald-400',
                    textColor: 'text-emerald-400',
                };
            case 'Moderado':
            default:
                return {
                    borde: 'border-l-zinc-700',
                    dotColor: 'bg-zinc-400',
                    textColor: 'text-zinc-400',
                };
        }
    };
}