import sys
import os
from google.cloud import firestore

# Force UTF-8 encoding for standard output on Windows
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

CREDENTIALS_PATH = "Backend/MathGo.Api/firebase-credentials.json"

ACHIEVEMENTS = [
    # Progreso General de Niveles y XP
    {
        "id": "first_landing",
        "name": "Primer Aterrizaje",
        "description": "Resuelve tu primer nivel de álgebra. ¡Bienvenido a bordo!",
        "icon": "first_landing",
        "condition": {
            "type": "levels_completed",
            "target": 1
        }
    },
    {
        "id": "energy_accumulator",
        "name": "Acumulador de Energía",
        "description": "Consigue tus primeros 500 puntos de XP.",
        "icon": "energy_accumulator",
        "condition": {
            "type": "xp_total",
            "target": 500
        }
    },
    {
        "id": "tireless_mathematician",
        "name": "Matemático Incansable",
        "description": "Supera 25 niveles algebraicos.",
        "icon": "tireless_mathematician",
        "condition": {
            "type": "levels_completed",
            "target": 25
        }
    },
    {
        "id": "power_knowledge",
        "name": "El Tomo del Conocimiento",
        "description": "Acumula un total de 2,500 puntos de XP.",
        "icon": "power_knowledge",
        "condition": {
            "type": "xp_total",
            "target": 2500
        }
    },
    {
        "id": "academy_sage",
        "name": "Sabio de la Academia",
        "description": "Resuelve un total de 60 niveles.",
        "icon": "academy_sage",
        "condition": {
            "type": "levels_completed",
            "target": 60
        }
    },

    # Rachas y Consistencia
    {
        "id": "daily_habit",
        "name": "El Hábito Hace al Maestro",
        "description": "Estudia álgebra durante 3 días seguidos.",
        "icon": "daily_habit",
        "condition": {
            "type": "streak_days",
            "target": 3
        }
    },
    {
        "id": "inner_fire",
        "name": "Fuego Interior",
        "description": "Mantén encendida tu racha de estudio durante 10 días consecutivos.",
        "icon": "inner_fire",
        "condition": {
            "type": "streak_days",
            "target": 10
        }
    },

    # Logros de Mundos Completados (Específicos)
    {
        "id": "world_1_completed",
        "name": "Conquistador del Nexo",
        "description": "Completa al 100% el Mundo 1: Las Bases del Álgebra.",
        "icon": "world_1_completed",
        "condition": {
            "type": "world_1_completed",
            "target": 1
        }
    },
    {
        "id": "world_2_completed",
        "name": "Señor de la Realidad",
        "description": "Completa al 100% el Mundo 2: Números Reales.",
        "icon": "world_2_completed",
        "condition": {
            "type": "world_2_completed",
            "target": 1
        }
    },
    {
        "id": "world_3_completed",
        "name": "Equilibrista Lineal",
        "description": "Completa al 100% el Mundo 3: Funciones y Ecuaciones Lineales.",
        "icon": "world_3_completed",
        "condition": {
            "type": "world_3_completed",
            "target": 1
        }
    },
    {
        "id": "world_4_completed",
        "name": "Señor de las Parábolas",
        "description": "Completa al 100% el Mundo 4: Funciones y Ecuaciones Cuadráticas.",
        "icon": "world_4_completed",
        "condition": {
            "type": "world_4_completed",
            "target": 1
        }
    },
    {
        "id": "world_5_completed",
        "name": "Maestro Matricial",
        "description": "Completa al 100% el Mundo 5: Matrices y Sistemas Avanzados.",
        "icon": "world_5_completed",
        "condition": {
            "type": "world_5_completed",
            "target": 1
        }
    },
    {
        "id": "world_6_completed",
        "name": "Dimensionador Imaginario",
        "description": "Completa al 100% el Mundo 6: Números Complejos y Vectores.",
        "icon": "world_6_completed",
        "condition": {
            "type": "world_6_completed",
            "target": 1
        }
    },

    {
        "id": "multiverse_master",
        "name": "Señor del Multiverso",
        "description": "Completa 5 mundos en total. ¡Estás a un paso de la supremacía algebraica!",
        "icon": "multiverse_master",
        "condition": {
            "type": "worlds_completed",
            "target": 5
        }
    },
    # Logro Supremo Final
    {
        "id": "infinite_architect",
        "name": "Arquitecto del Infinito",
        "description": "Completa todos los mundos de MathGo. ¡Te has graduado como maestro supremo del álgebra!",
        "icon": "infinite_architect",
        "condition": {
            "type": "worlds_completed",
            "target": 6
        }
    }
]

def main():
    if not os.path.exists(CREDENTIALS_PATH):
        print(f"Error: Credentials file not found at {CREDENTIALS_PATH}")
        sys.exit(1)

    print("Conectando a Firestore...")
    db = firestore.Client.from_service_account_json(CREDENTIALS_PATH)
    
    # Primero limpiar la colección antigua para no dejar logros obsoletos
    print("Limpiando colección de logros existente...")
    achievements_ref = db.collection("achievements")
    docs = achievements_ref.stream()
    for doc in docs:
        doc.reference.delete()
    print("Colección limpia.")
    
    print(f"Iniciando seeding de {len(ACHIEVEMENTS)} nuevos logros únicos...")
    for ach in ACHIEVEMENTS:
        doc_id = ach["id"]
        doc_ref = achievements_ref.document(doc_id)
        
        data = {
            "name": ach["name"],
            "description": ach["description"],
            "icon": ach["icon"],
            "condition": {
                "type": ach["condition"]["type"],
                "target": ach["condition"]["target"]
            }
        }
        doc_ref.set(data)
        print(f"✅ Logro registrado: {doc_id} -> {ach['name']}")
        
    print("\n🎉 Seeding de los 15 logros únicos completado con éxito!")

if __name__ == "__main__":
    main()
