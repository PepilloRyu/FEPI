using Google.Cloud.Firestore;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Domain.Entities;

namespace MathGo.Infrastructure.Repositories;

public class ProgressRepository : FirestoreRepository<UserProgress>, IProgressRepository
{
    public ProgressRepository(FirestoreDb firestoreDb) : base(firestoreDb, "mathgo_progress")
    {
    }

    public async Task<IEnumerable<UserProgress>> GetTopByXpAsync(int limit)
    {
        var snapshot = await _firestoreDb.Collection(_collectionName)
            .OrderByDescending("totalXp")
            .Limit(limit)
            .GetSnapshotAsync();

        var results = new List<UserProgress>();
        foreach (var doc in snapshot.Documents)
        {
            if (doc.Exists)
            {
                results.Add(doc.ConvertTo<UserProgress>());
            }
        }
        return results;
    }
}
