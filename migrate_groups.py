import sys
import os
from google.cloud import firestore

# Force UTF-8 encoding for standard output on Windows
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

CREDENTIALS_PATH = "Backend/MathGo.Api/firebase-credentials.json"

def main():
    if not os.path.exists(CREDENTIALS_PATH):
        print(f"Error: Credentials file not found at {CREDENTIALS_PATH}")
        sys.exit(1)

    print("Connecting to Firestore using credentials...")
    db = firestore.Client.from_service_account_json(CREDENTIALS_PATH)
    
    print("Fetching groups collection...")
    groups_ref = db.collection("groups")
    docs = groups_ref.stream()

    total_groups = 0
    updated_groups = 0

    for doc in docs:
        total_groups += 1
        data = doc.to_dict()
        group_id = doc.id
        group_name = data.get("name", "Unnamed Group")
        members = data.get("members", [])
        
        # Extract studentId from each member
        student_ids = []
        for m in members:
            if isinstance(m, dict) and "studentId" in m:
                student_ids.append(m["studentId"])
        
        # Check if studentIds already matches
        current_student_ids = data.get("studentIds", None)
        if current_student_ids != student_ids:
            # Update the document with studentIds
            doc_ref = groups_ref.document(group_id)
            doc_ref.update({"studentIds": student_ids})
            print(f"🔄 Updated group '{group_name}' ({group_id}): Set studentIds = {student_ids}")
            updated_groups += 1
        else:
            print(f"✅ Group '{group_name}' ({group_id}) is already up to date.")

    print("\n" + "=" * 50)
    print("MIGRATION SUMMARY")
    print("=" * 50)
    print(f"Total groups processed : {total_groups}")
    print(f"Groups updated         : {updated_groups}")
    print("=" * 50)

if __name__ == "__main__":
    main()
