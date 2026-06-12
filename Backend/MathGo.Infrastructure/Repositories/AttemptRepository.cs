using Google.Cloud.Firestore;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Domain.Entities;

namespace MathGo.Infrastructure.Repositories;

public class AttemptRepository : FirestoreRepository<AttemptLog>, IAttemptRepository
{
    public AttemptRepository(FirestoreDb firestoreDb) : base(firestoreDb, "attempts")
    {
    }

    public async Task<IEnumerable<AttemptLog>> GetByUserIdAsync(string userId)
    {
        var query = _firestoreDb.Collection(_collectionName).WhereEqualTo("userId", userId);
        var snapshot = await query.GetSnapshotAsync();
        var results = new List<AttemptLog>();

        foreach (var doc in snapshot.Documents)
        {
            if (doc.Exists)
                results.Add(doc.ConvertTo<AttemptLog>());
        }
        return results;
    }
}
