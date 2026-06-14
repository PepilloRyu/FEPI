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
    
    print("Buscando usuario 'prueba@mathgo.com' en Firestore...")
    users_ref = db.collection("users")
    
    # Buscar por email
    docs = users_ref.where("email", "==", "prueba@mathgo.com").stream()
    
    found = False
    for doc in docs:
        found = True
        print(f"\nDocumento encontrado:")
        print(f"  ID de Documento (UID): {doc.id}")
        print(f"  Datos: {doc.to_dict()}")
        
    if not found:
        print("No se encontró ningún usuario con ese correo.")

if __name__ == "__main__":
    main()
