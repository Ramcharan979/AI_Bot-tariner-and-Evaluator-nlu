#!/usr/bin/env python3
"""
Pretrain base model using existing health datasets and create knowledge base for RAG.
"""

import os
import pandas as pd
import numpy as np
import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score
import json
import ast

def load_symptoms_dataset(sample_size=None):
    """Load the main symptoms dataset."""
    dataset_path = os.path.join(os.path.dirname(__file__), 'datasets', 'Diseases_and_Symptoms_dataset.csv')
    df = pd.read_csv(dataset_path)

    # Sample if requested (for faster training)
    if sample_size and len(df) > sample_size:
        df = df.sample(n=sample_size, random_state=42)

    # First column is disease, rest are symptoms (0/1)
    target_column = df.columns[0]
    X = df.drop(columns=[target_column])
    y = df[target_column]

    return X, y, list(X.columns)

def load_knowledge_datasets():
    """Load supplementary knowledge datasets for RAG."""
    knowledge = {}

    datasets_dir = os.path.join(os.path.dirname(__file__), 'datasets')

    # Load descriptions
    desc_path = os.path.join(datasets_dir, 'description.csv')
    if os.path.exists(desc_path):
        desc_df = pd.read_csv(desc_path)
        for _, row in desc_df.iterrows():
            disease = row['Disease'].lower().strip()
            knowledge[disease] = {
                'description': row['Description'],
                'diets': [],
                'medications': [],
                'precautions': [],
                'workouts': []
            }

    # Load diets
    diets_path = os.path.join(datasets_dir, 'diets.csv')
    if os.path.exists(diets_path):
        diets_df = pd.read_csv(diets_path)
        for _, row in diets_df.iterrows():
            disease = row['Disease'].lower().strip()
            if disease in knowledge:
                # Diet data is already in readable format, not as literal lists
                knowledge[disease]['diets'] = row['Diet']

    # Load medications
    med_path = os.path.join(datasets_dir, 'medications.csv')
    if os.path.exists(med_path):
        med_df = pd.read_csv(med_path)
        for _, row in med_df.iterrows():
            disease = row['Disease'].lower().strip()
            if disease in knowledge:
                # Medication data is already in readable format
                knowledge[disease]['medications'] = row['Medication']

    # Load precautions
    prec_path = os.path.join(datasets_dir, 'precautions.csv')
    if os.path.exists(prec_path):
        prec_df = pd.read_csv(prec_path)
        for _, row in prec_df.iterrows():
            disease = row['Disease'].lower().strip()
            if disease in knowledge:
                precs = []
                for i in range(1, 5):  # Precaution_1 to Precaution_4
                    col = f'Precaution_{i}'
                    if col in row and pd.notna(row[col]):
                        precs.append(str(row[col]).strip())
                knowledge[disease]['precautions'] = precs

    # Load workouts
    work_path = os.path.join(datasets_dir, 'workout.csv')
    if os.path.exists(work_path):
        work_df = pd.read_csv(work_path)
        for _, row in work_df.iterrows():
            disease = row['Disease'].lower().strip()
            if disease in knowledge:
                # Workout data is already in readable format
                knowledge[disease]['workouts'] = row['Workouts']

    return knowledge

def create_factual_embeddings(knowledge):
    """Create simple factual knowledge base for RAG."""
    facts = []

    for disease, info in knowledge.items():
        # Add description
        if info.get('description'):
            facts.append(f"{disease}: {info['description']}")

        # Add diets
        if info.get('diets'):
            facts.append(f"{disease} diet recommendations: {info['diets']}")

        # Add medications
        if info.get('medications'):
            facts.append(f"{disease} medications: {info['medications']}")

        # Add precautions
        if info.get('precautions'):
            facts.append(f"{disease} precautions: {', '.join(info['precautions'])}")

        # Add workouts
        if info.get('workouts'):
            facts.append(f"{disease} workout recommendations: {info['workouts']}")

    return facts

def train_base_model():
    """Train and save the base model."""
    print("Loading symptoms dataset (sample for faster training)...")
    # Use 10,000 samples for faster training while maintaining diversity
    X, y, feature_names = load_symptoms_dataset(sample_size=10000)

    print(f"Dataset shape: {X.shape}")
    print(f"Number of diseases: {len(y.unique())}")
    print(f"Feature names: {len(feature_names)}")

    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    print("Training base model...")
    # Use fewer estimators for faster training
    model = RandomForestClassifier(n_estimators=50, random_state=42)
    model.fit(X_train, y_train)

    # Evaluate
    preds = model.predict(X_test)
    accuracy = accuracy_score(y_test, preds)
    f1 = f1_score(y_test, preds, average='weighted')

    print(".4f")
    print(".4f")

    # Save model
    models_dir = os.path.join(os.path.dirname(__file__), 'models')
    os.makedirs(models_dir, exist_ok=True)

    model_path = os.path.join(models_dir, 'base_health_model.pkl')
    with open(model_path, 'wb') as f:
        pickle.dump(model, f)

    # Save metadata
    metadata = {
        'model_path': model_path,
        'target_column': 'disease',
        'algorithm': 'RandomForestClassifier',
        'accuracy': float(accuracy),
        'f1_score': float(f1),
        'training_columns': feature_names,
        'num_diseases': len(y.unique()),
        'dataset_size': len(X)
    }

    metadata_path = os.path.join(models_dir, 'base_model_metadata.json')
    with open(metadata_path, 'w') as f:
        json.dump(metadata, f, indent=2)

    print(f"Base model saved to: {model_path}")
    print(f"Metadata saved to: {metadata_path}")

    return model_path, metadata

def create_knowledge_base():
    """Create and save knowledge base for RAG."""
    print("Loading knowledge datasets...")
    knowledge = load_knowledge_datasets()

    print(f"Loaded knowledge for {len(knowledge)} diseases")

    print("Creating factual embeddings...")
    facts = create_factual_embeddings(knowledge)

    # Save as simple list (can be enhanced with actual embeddings later)
    kb_path = os.path.join(os.path.dirname(__file__), 'factual_embeddings.pkl')
    with open(kb_path, 'wb') as f:
        pickle.dump(facts, f)

    print(f"Knowledge base saved to: {kb_path} with {len(facts)} facts")

    return kb_path

if __name__ == '__main__':
    print("Starting base model pretraining...")

    # Train base model
    model_path, metadata = train_base_model()

    # Create knowledge base
    kb_path = create_knowledge_base()

    print("\nPretraining complete!")
    print(f"Base model: {model_path}")
    print(f"Knowledge base: {kb_path}")
    print(f"Model accuracy: {metadata['accuracy']:.4f}")
    print(f"Model F1-score: {metadata['f1_score']:.4f}")