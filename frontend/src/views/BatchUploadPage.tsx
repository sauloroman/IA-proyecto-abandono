import React from 'react';
import { useBatchUpload } from '../hooks/useBatchUpload';
import { useBatchTableFilter } from '../hooks/useBatchTableFilter';
import { BatchDropzone } from '../components/batch/BatchDropzone';
import { BatchSummaryCards } from '../components/batch/BatchSummaryCards';
import { BatchPriorityTable } from '../components/batch/BatchPriorityTable';
import { BatchDetailsTable } from '../components/batch/BatchDetailsTable';
import { Button } from '../components/ui/Button';
import { UploadCloud, RotateCcw } from 'lucide-react';

export const BatchUploadPage: React.FC = () => {
    const {
        props: { resultado, cargando, error, nombreArchivo },
        methods: { subirArchivo, resetearLote },
    } = useBatchUpload();

    const {
        props: { busqueda, filtroRiesgo, estudiantesFiltrados, estudianteExpandidoId },
        methods: { setBusqueda, setFiltroRiesgo, toggleExpansion, limpiarFiltros },
    } = useBatchTableFilter({ detalles: resultado?.detalles || [] });

    return (
        <div className="space-y-6">
            <div className="border-b border-zinc-800/80 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1">
                        <UploadCloud className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Módulo de Ingesta & Lotes</span>
                    </div>
                    <h1 className="text-xl font-semibold tracking-tight text-zinc-100">
                        Carga Masiva de Estudiantes
                    </h1>
                    <p className="text-xs text-zinc-400 mt-1">
                        Diagnóstico predictivo institucional por lotes con simulación contrafactual y triaje de atención inmediata.
                    </p>
                </div>

                {resultado && (
                    <div className="flex items-center space-x-3 self-start sm:self-auto shrink-0">
                        <span className="text-xs text-zinc-500 hidden sm:inline">
                            Archivo: <strong className="text-zinc-300 font-medium">{nombreArchivo}</strong>
                        </span>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={resetearLote}
                            leftIcon={
                                <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
                            }
                        >
                            Cargar Otro Archivo
                        </Button>
                    </div>
                )}
            </div>

            {!resultado ? (
                <div className="max-w-3xl mx-auto py-4">
                    <BatchDropzone
                        onProcesar={subirArchivo}
                        cargando={cargando}
                        error={error}
                    />
                </div>
            ) : (
                <div className="space-y-6">
                    <BatchSummaryCards resumen={resultado.resumen_grupal} />

                    <BatchPriorityTable alumnos={resultado.resumen_grupal.alumnos_prioritarios_atencion} />

                    <BatchDetailsTable
                        estudiantes={estudiantesFiltrados}
                        busqueda={busqueda}
                        filtroRiesgo={filtroRiesgo}
                        estudianteExpandidoId={estudianteExpandidoId}
                        totalGeneral={resultado.detalles.length}
                        onBusquedaChange={setBusqueda}
                        onFiltroRiesgoChange={setFiltroRiesgo}
                        onToggleExpansion={toggleExpansion}
                        onLimpiarFiltros={limpiarFiltros}
                    />
                </div>
            )}
        </div>
    );
};
