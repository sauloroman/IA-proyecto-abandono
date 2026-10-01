export const descargarPlantillaEjemploCSV = () => {
    const encabezados = 'nombre,matricula,asistencia,promedio,materias_reprobadas,antecedentes,carrera';
    const filas = [
        'Carlos Eduardo Mendoza,MAT-2024-001,65.0,6.2,3,1,Ingeniería en Tecnologías de la Información',
        'Mariana Soto López,MAT-2024-002,94.5,9.1,0,0,Ingeniería Mecatrónica',
        'Roberto Hernández Cruz,MAT-2024-003,71.0,7.0,2,0,Licenciatura en Administración',
        'Ana Patricia Gómez,MAT-2024-004,58.0,5.8,4,1,Ingeniería en Tecnologías de la Información',
        'Diego Morales Vega,MAT-2024-005,88.0,8.5,1,0,Ingeniería Industrial',
        'Valeria Domínguez Ríos,MAT-2024-006,78.5,7.9,1,0,Ingeniería Mecatrónica'
    ];

    const contenidoCsv = [encabezados, ...filas].join('\n');
    const blob = new Blob([contenidoCsv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'plantilla_alumnos_abandono.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};
