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
            .OrderByDescending("weeklyXp")
            .Limit(limit)
            .GetSnapshotAsync();

        return snapshot.Documents
            .Where(d => d.Exists)
            .Select(d => d.ConvertTo<UserProgress>());
    }
}
