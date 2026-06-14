import sys
import os
from google.cloud import firestore

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

CREDENTIALS_PATH = "Backend/MathGo.Api/firebase-credentials.json"

def main():
    if not os.path.exists(CREDENTIALS_PATH):
        print(f"Error: Credentials file not found")
        sys.exit(1)

    db = firestore.Client.from_service_account_json(CREDENTIALS_PATH)
    
    print("Obteniendo todos los UIDs de 'mathgo_progress'...")
    progress_uids = {doc.id for doc in db.collection("mathgo_progress").stream()}
    
    print("Obteniendo todos los UIDs de 'users'...")
    user_uids = {doc.id for doc in db.collection("users").stream()}
    
    print(f"\nResumen:")
    print(f"  Documentos en mathgo_progress: {len(progress_uids)}")
    print(f"  Documentos en users: {len(user_uids)}")
    
    orphans = progress_uids - user_uids
    print(f"\nUIDs que están en mathgo_progress pero NO en users:")
    for uid in orphans:
        # Intentar obtener datos de mathgo_progress para dar más pistas
        prog_data = db.collection("mathgo_progress").document(uid).get().to_dict()
        print(f"  - UID: {uid}")
        print(f"    Progreso: {prog_data}")
        
    print(f"\nUIDs que están en users pero NO en mathgo_progress:")
    for uid in (user_uids - progress_uids):
        user_data = db.collection("users").document(uid).get().to_dict()
        print(f"  - UID: {uid}")
        print(f"    Usuario: {user_data}")

if __name__ == "__main__":
    main()
