import { useEffect, useState } from "react";
import { servicioApi } from "../services/api";

export const useCheckAppStatus = () => {
    const [conectado, setConectado] = useState<boolean | null>(null);

    useEffect(() => {
        const comprobarConexion = async () => {
            try {
                const salud = await servicioApi.verificarSalud();
                setConectado(salud.estado === 'exito');
            } catch {
                setConectado(false);
            }
        };

        comprobarConexion();
        const intervalo = setInterval(comprobarConexion, 30000);
        return () => clearInterval(intervalo);
    }, []);

    return { conectado }
}