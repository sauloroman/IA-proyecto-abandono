import os
import numpy as np
import pandas as pd

def generate_student_dataset(n_samples=300, random_state=46):
    np.random.seed(random_state)

    asistencia = np.random.uniform(45.0, 100.0, n_samples)
    
    promedio = np.random.uniform(5.5, 10.0, n_samples)
    
    materias_reprobadas = np.random.choice([0, 1, 2, 3, 4, 5], size=n_samples, p=[0.45, 0.25, 0.15, 0.08, 0.05, 0.02])

    antecedentes = np.random.choice([0, 1], size=n_samples, p=[0.75, 0.25])

    # Menor asistencia, menor promedio y más materias reprobadas incrementan el riesgo de abandono
    risk_score = (
        (100.0 - asistencia) * 0.035 +
        (10.0 - promedio) * 0.25 +
        materias_reprobadas * 0.35 +
        antecedentes * 0.30 +
        np.random.normal(0, 0.25, n_samples)
    )

    umbral = np.percentile(risk_score, 70)

    abandono = (risk_score >= umbral).astype(int)

    df = pd.DataFrame({
        'asistencia': np.round(asistencia, 1),
        'promedio': np.round(promedio, 2),
        'materias_reprobadas': materias_reprobadas,
        'antecedentes': antecedentes,
        'abandono': abandono
    })

    data_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data')
    os.makedirs(data_dir, exist_ok=True)
    csv_path = os.path.join(data_dir, 'dataset_estudiantes.csv')
    df.to_csv(csv_path, index=False)

    print(f"Dataset generado exitosamente con {len(df)} registros en: {csv_path}")
    print(f"Distribución de clases: \n{df["abandono"].value_counts(normalize=True).round(3)}")
    return df

if __name__ == "__main__":
    generate_student_dataset()