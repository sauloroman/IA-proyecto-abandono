import React, { useState, useRef, type DragEvent, type ChangeEvent } from 'react';
import { Button } from '../ui/Button';
import { descargarPlantillaEjemploCSV } from '../../helpers/csv-template';

interface BatchDropzoneProps {
    onProcesar: (archivo: File) => void;
    cargando: boolean;
    error: string | null;
}

export const BatchDropzone: React.FC<BatchDropzoneProps> = ({
    onProcesar,
    cargando,
    error,
}) => {
    const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(null);
    const [arrastrando, setArrastrando] = useState(false);
    const [errorLocal, setErrorLocal] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const formatosValidos = ['.xlsx', '.xls', '.csv'];

    const esFormatoValido = (archivo: File) => {
        const nombre = archivo.name.toLowerCase();
        return formatosValidos.some((ext) => nombre.endsWith(ext));
    };

    const manejarArchivo = (archivo: File) => {
        if (!esFormatoValido(archivo)) {
            setErrorLocal('Formato no compatible. Por favor adjunta un archivo .xlsx, .xls o .csv');
            return;
        }
        setErrorLocal(null);
        setArchivoSeleccionado(archivo);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setArrastrando(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setArrastrando(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setArrastrando(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            manejarArchivo(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            manejarArchivo(e.target.files[0]);
        }
    };

    const handleProcesar = () => {
        if (archivoSeleccionado && !cargando) {
            onProcesar(archivoSeleccionado);
        }
    };

    const handleQuitarArchivo = () => {
        setArchivoSeleccionado(null);
        setErrorLocal(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const formatearBytes = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + ['Bytes', 'KB', 'MB'][i];
    };

    const errorVisible = error || errorLocal;

    return (
        <div className="w-full space-y-6">
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !archivoSeleccionado && inputRef.current?.click()}
                className={`relative border border-dashed rounded-xl p-8 sm:p-12 text-center transition-all ${arrastrando
                        ? 'border-blue-500 bg-blue-500/5'
                        : 'border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-zinc-700'
                    } ${!archivoSeleccionado ? 'cursor-pointer' : ''}`}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleChange}
                    className="hidden"
                />

                {!archivoSeleccionado ? (
                    <div className="flex flex-col items-center space-y-3">
                        <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-zinc-200">
                                Arrastra y suelta tu archivo aquí, o <span className="text-blue-400 underline underline-offset-2">selecciona un archivo</span>
                            </p>
                            <p className="text-xs text-zinc-500">
                                Formatos admitidos: Excel (.xlsx, .xls) o CSV (.csv) hasta 10 MB
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col sm:flex-row items-center justify-between bg-zinc-900 border border-zinc-800 rounded-lg p-4 gap-4">
                        <div className="flex items-center space-x-3.5 text-left w-full sm:w-auto">
                            <div className="w-10 h-10 rounded-md bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-zinc-200 truncate">
                                    {archivoSeleccionado.name}
                                </p>
                                <p className="text-xs text-zinc-500">
                                    {formatearBytes(archivoSeleccionado.size)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                            <Button
                                variant="ghost"
                                size="sm"
                                disabled={cargando}
                                onClick={handleQuitarArchivo}
                            >
                                Cambiar
                            </Button>
                            <Button
                                variant="primary"
                                size="sm"
                                cargando={cargando}
                                textoCarga="Procesando lote..."
                                onClick={handleProcesar}
                            >
                                Iniciar Diagnóstico
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {errorVisible && (
                <div className="p-4 rounded-lg bg-rose-950/20 border border-rose-900/40 text-left flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-rose-300">Error en el archivo</p>
                        <p className="text-xs text-rose-400/80 mt-0.5 leading-relaxed">{errorVisible}</p>
                    </div>
                </div>
            )}

            <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-left space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                            Estructura Requerida de Columnas
                        </h4>
                        <p className="text-xs text-zinc-500 mt-0.5">
                            El encabezado del archivo debe contener los siguientes campos normalizados:
                        </p>
                    </div>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={descargarPlantillaEjemploCSV}
                        leftIcon={
                            <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        }
                    >
                        Descargar Plantilla CSV
                    </Button>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                    {[
                        { col: 'nombre', req: true, desc: 'Nombre completo' },
                        { col: 'matricula', req: true, desc: 'Identificador único' },
                        { col: 'asistencia', req: true, desc: '0 - 100%' },
                        { col: 'promedio', req: true, desc: '0.0 - 10.0' },
                        { col: 'materias_reprobadas', req: true, desc: '0 a N' },
                        { col: 'antecedentes', req: true, desc: '1: Sí, 0: No' },
                        { col: 'carrera', req: false, desc: 'Opcional' },
                    ].map((item) => (
                        <div
                            key={item.col}
                            className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-zinc-950/60 border border-zinc-800 text-xs"
                        >
                            <span className="font-medium text-zinc-200">{item.col}</span>
                            <span className="text-zinc-500 text-[11px]">({item.desc})</span>
                            {item.req && <span className="text-blue-400 text-[10px]">•</span>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
