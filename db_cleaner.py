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
    
    # Check execution mode
    clean_mode = "--clean" in sys.argv
    print(f"Mode: {'CLEANUP & RESTRUCTURING (Write)' if clean_mode else 'ANALYSIS (Read-Only)'}")
    print("-" * 50)

    # 1. Analyze / Clean Users collection
    print("\n--- Collection: users ---")
    users_ref = db.collection("users")
    docs = users_ref.stream()

    obsolete_fields = ["totalXp", "totalXP", "gems", "streak", "gamification", "level", "updatedAt"]
    
    total_users = 0
    users_with_obsolete = 0
    clean_users = 0
    
    users_report = []
    
    for doc in docs:
        total_users += 1
        data = doc.to_dict()
        uid = doc.id
        email = data.get("email", "No Email")
        name = data.get("name", "No Name")
        
        found_obsolete = [f for f in obsolete_fields if f in data]
        
        if found_obsolete:
            users_with_obsolete += 1
            users_report.append({
                "uid": uid,
                "email": email,
                "name": name,
                "fields": list(data.keys()),
                "obsolete": found_obsolete,
            })
            
            if clean_mode:
                doc_ref = users_ref.document(uid)
                update_dict = {f: firestore.DELETE_FIELD for f in found_obsolete}
                doc_ref.update(update_dict)
                print(f"🧹 Cleaned user {uid} ({email}): Removed {found_obsolete}")
        else:
            clean_users += 1
            users_report.append({
                "uid": uid,
                "email": email,
                "name": name,
                "fields": list(data.keys()),
                "obsolete": [],
            })

    # 2. Analyze / Add weeklyActivity & weeklyXp in mathgo_progress collection
    print("\n--- Collection: mathgo_progress ---")
    progress_ref = db.collection("mathgo_progress")
    progress_docs = progress_ref.stream()
    
    total_progress = 0
    progress_missing_weekly = 0
    
    progress_report = []
    
    for doc in progress_docs:
        total_progress += 1
        data = doc.to_dict()
        uid = doc.id
        
        has_weekly = "weeklyActivity" in data
        has_weekly_xp = "weeklyXp" in data
        
        weekly_activity = data.get("weeklyActivity", [0, 0, 0, 0, 0, 0, 0])
        if not isinstance(weekly_activity, list) or len(weekly_activity) != 7:
            weekly_activity = [0, 0, 0, 0, 0, 0, 0]
            has_weekly = False
            
        calculated_weekly_xp = sum(weekly_activity)
        current_weekly_xp = data.get("weeklyXp")
        
        needs_update = not has_weekly or not has_weekly_xp or current_weekly_xp != calculated_weekly_xp
        
        if needs_update:
            progress_missing_weekly += 1
            progress_report.append({
                "uid": uid,
                "has_weekly": has_weekly,
                "has_weekly_xp": has_weekly_xp,
                "calculated_weekly_xp": calculated_weekly_xp
            })
            
            if clean_mode:
                doc_ref = progress_ref.document(uid)
                doc_ref.update({
                    "weeklyActivity": weekly_activity,
                    "weeklyXp": calculated_weekly_xp
                })
                print(f"📈 Restructured progress {uid}: Set weeklyActivity and weeklyXp={calculated_weekly_xp}")
        else:
            progress_report.append({
                "uid": uid,
                "has_weekly": True,
                "has_weekly_xp": True,
                "calculated_weekly_xp": calculated_weekly_xp
            })

    print("\n" + "=" * 50)
    print("RESTRUCTURING SUMMARY REPORT")
    print("=" * 50)
    print(f"Collection 'users':")
    print(f"  Total user documents: {total_users}")
    print(f"  Documents with obsolete fields: {users_with_obsolete}")
    print(f"  Clean documents: {clean_users}")
    print(f"\nCollection 'mathgo_progress':")
    print(f"  Total progress documents: {total_progress}")
    print(f"  Documents missing/outdated 'weeklyActivity' or 'weeklyXp': {progress_missing_weekly}")
    print("=" * 50)
    
    print("\nDetailed Users Report:")
    for item in users_report:
        status_icon = "✅" if not item["obsolete"] else "❌"
        print(f"{status_icon} User {item['uid']} ({item['name']} - {item['email']})")
        print(f"   All Fields: {item['fields']}")
        if item["obsolete"]:
            print(f"   Obsolete fields detected: {item['obsolete']}")

    print("\nDetailed Progress Report:")
    for item in progress_report:
        status_icon = "✅" if (item.get("has_weekly", True) and item.get("has_weekly_xp", True)) else "⚠️ (Needs update)"
        print(f"{status_icon} Progress for UID: {item['uid']} (Calculated weeklyXp={item['calculated_weekly_xp']})")

    if not clean_mode:
        if users_with_obsolete > 0 or progress_missing_weekly > 0:
            print("\n👉 To run the database restructuring and clean obsolete fields, run:")
            print("   python db_cleaner.py --clean")
        else:
            print("\n🎉 Database is fully clean and restructured!")

if __name__ == "__main__":
    main()
