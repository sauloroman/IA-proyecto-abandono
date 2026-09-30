import os
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report, confusion_matrix

from ml.data_generator import generate_student_dataset

def train_and_compare_models():
    data_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data')
    csv_path = os.path.join(data_dir, 'dataset_estudiantes.csv')

    if not os.path.exists(csv_path):
        df = generate_student_dataset()
    else:
        df = pd.read_csv(csv_path)

    features = ["asistencia", "promedio", "materias_reprobadas", "antecedentes"]
    target = "abandono"

    X = df[features]
    y = df[target]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )

    models = {
        'DecisionTree': Pipeline([
            ('scaler', StandardScaler()),
            ('classifier', DecisionTreeClassifier(max_depth=4, random_state=45))
        ]),
        'LogisticRegression': Pipeline([
            ('scaler', StandardScaler()),
            ('classifier', LogisticRegression(random_state=45))
        ])
    }

    results = {}

    print("\n=====================================================")
    print("EVALUACIÓN Y COMPARACIÓN DE MODELOS DE CLASIFICACIÓN")
    print("=====================================================")

    best_model_name = None
    best_f1 = -1.0
    best_pipeline = None

    for name, pipeline in models.items():
        pipeline.fit(X_train, y_train)
        y_pred = pipeline.predict(X_test)

        acc = accuracy_score(y_test, y_pred)
        prec = precision_score(y_test, y_pred, zero_division=0)
        rec = recall_score(y_test, y_pred, zero_division=0)
        f1 = f1_score(y_test, y_pred, zero_division=0)

        results[name] = {
            'Accuracy': acc,
            'Precision': prec,
            'Recall': rec,
            'F1-Score': f1,
            'pipeline': pipeline
        }

        print(f"\n-- Algoritmo: {name} --")
        print(f"Accuracy: {acc:.4f}")
        print(f"Precision: {prec:.4f}")
        print(f"Recall: {rec:.4f}")
        print(f"F1-Score: {f1:.4f}")
        print("\nMatriz de Confusión")
        print(confusion_matrix(y_test, y_pred))

        if f1 > best_f1:
            best_f1 = f1
            best_model_name = name
            best_pipeline = pipeline
        
    print("\n=====================================================================")
    print(f"MODELO SELECCIONADO: {best_model_name} (F1-Score: {best_f1:.4f})")
    print("=====================================================================")

    model_output_path = os.path.join(data_dir, 'best_model.joblib')
    joblib.dump({
        'pipeline': best_pipeline,
        'model_name': best_model_name,
        'features': features,
        'metrics': {k: {m: round(v, 4) for m, v in vals.items() if m != 'pipeline'} for k, vals in results.items()}
    }, model_output_path)

    print(f"Modelo exportado exitosamente a: {model_output_path}\n")

if __name__ == '__main__':
    train_and_compare_models()
