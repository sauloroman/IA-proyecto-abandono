Actúa como un Arquitecto de Software y Desarrollador Senior en Python y Flask. Estamos desarrollando el "Proyecto 1. Sistema de predicción del abandono escolar" basado en el documento PDF adjunto ("doc/PROYECTOS FIA.pdf").

No quiero un script monolítico ni una API básica de un solo archivo. Necesito una arquitectura robusta, modular y separada por responsabilidades (tipo arquitectura en capas o modular por rutas y controladores).

Por favor, ayúdame a diseñar y estructurar el proyecto completo considerando los siguientes requerimientos técnicos obligatorios:

1. ARQUITECTURA DEL PROYECTO (Separación de responsabilidades):
   Estructura la carpeta del proyecto de manera limpia, por ejemplo:
   - /config (Conexión a base de datos)
   - /models (Modelos de base de datos o lógica de datos)
   - /routes o /controllers (Endpoints de la API)
   - /services o /ml (Lógica de Machine Learning: entrenamiento y predicción)
   - app.py (Punto de entrada de la aplicación Flask)

2. INFRAESTRUCTURA Y BASE DE DATOS (Docker + PostgreSQL):
   - Pronéme un archivo `docker-compose.yml` para levantar un contenedor de PostgreSQL de forma local.
   - Configura la conexión en Flask utilizando una librería robusta (como SQLAlchemy o psycopg2, prefiriendo SQLAlchemy con Flask-SQLAlchemy).

3. MACHINE LEARNING (Requerimientos 1, 2, 4, 5 y 6 del documento):
   - Un script o módulo que genere/cargue al menos 200 registros con variables (asistencia, promedio, materias reprobadas, antecedentes).
   - Implemente y compare al menos dos algoritmos de clasificación de scikit-learn (ej. Árbol de Decisión y Regresión Logística), guardando el modelo entrenado con `joblib`.

4. ENDPOINTS DE LA API (CRUD completo + Predicción - Al menos 5 endpoints):
   Necesito una API RESTful profesional con al menos 5 endpoints funcionales:
   - POST `/api/students` -> Crear un nuevo registro académico de un estudiante en la base de datos.
   - GET `/api/students` -> Listar todos los registros almacenados en la base de datos.
   - GET `/api/students/<id>` -> Obtener el detalle de un estudiante específico.
   - PUT `/api/students/<id>` -> Actualizar la información de un estudiante.
   - DELETE `/api/students/<id>` -> Eliminar un registro de la base de datos.
   - POST `/api/students/predict` -> Recibir los datos de un estudiante, ejecutar el modelo de Machine Learning entrenado, **guardar el resultado en la base de datos** y devolver la estimación de riesgo (alto/bajo) junto con su probabilidad.

No quiero que me des todo el código ni el sistema completo de golpe. Quiero ir aprendiendo y construyendo el proyecto paso a paso, de forma interactiva. 

La arquitectura que utilizaremos a lo largo de las sesiones será modular (separada por responsabilidades: base de datos con Docker, modelos, lógica de Machine Learning, rutas/CRUD de la API). Sin embargo, avanzaremos estrictamente **de uno en uno**.

Por favor, para este **PASO 1**, ayúdame únicamente con lo siguiente:
1. Dame las instrucciones exactas y el código para configurar el entorno inicial de trabajo, el archivo de dependencias (`requirements.txt`) y el archivo `docker-compose.yml` para levantar PostgreSQL con Docker.
2. Explícame brevemente qué hace cada archivo o comando.
3. Una vez que me des esto, **detente y espera a que yo te confirme** que ya lo probé y funcionó en mi computadora antes de pasar al Paso 2.

¿Estamos listos? Dame las instrucciones y el código solo para este primer paso.