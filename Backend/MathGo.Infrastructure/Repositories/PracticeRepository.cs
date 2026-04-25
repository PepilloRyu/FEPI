using Google.Cloud.Firestore;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Domain.Entities;

namespace MathGo.Infrastructure.Repositories;

public class PracticeRepository : FirestoreRepository<PracticeSession>, IPracticeRepository
{
    public PracticeRepository(FirestoreDb firestoreDb) : base(firestoreDb, "practice_sessions")
    {
    }

    public async Task<IEnumerable<PracticeSession>> GetByUserIdAsync(string userId)
    {
        var query = _firestoreDb.Collection(_collectionName).WhereEqualTo("UserId", userId);
        var snapshot = await query.GetSnapshotAsync();
        var results = new List<PracticeSession>();
        
        foreach (var doc in snapshot.Documents)
        {
            if (doc.Exists)
            {
                results.Add(doc.ConvertTo<PracticeSession>());
            }
        }
        return results;
    }
}
