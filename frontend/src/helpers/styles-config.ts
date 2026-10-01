import { AlertOctagon, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import type { FactorDetonante } from "../types";

export class StylesConfig {
    public static getConfiguracionNivel(nivel: FactorDetonante['nivel']) {
        switch (nivel) {
            case 'Crítico':
                return {
                    badgeClass: 'bg-rose-950/40 text-rose-300 border-rose-900/50',
                    barClass: 'bg-rose-500/80',
                    Icon: AlertOctagon,
                };
            case 'Alerta':
                return {
                    badgeClass: 'bg-amber-950/30 text-amber-300 border-amber-900/50',
                    barClass: 'bg-amber-500/80',
                    Icon: AlertTriangle,
                };
            case 'Excelente':
                return {
                    badgeClass: 'bg-emerald-950/30 text-emerald-300 border-emerald-900/50',
                    barClass: 'bg-emerald-500/80',
                    Icon: CheckCircle2,
                };
            case 'Moderado':
            default:
                return {
                    badgeClass: 'bg-zinc-800 text-zinc-300 border-zinc-700/60',
                    barClass: 'bg-zinc-500',
                    Icon: Info,
                };
        }
    };
}