using Google.Cloud.Firestore;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Domain.Entities;

namespace MathGo.Infrastructure.Repositories;

public class FeedbackRepository : FirestoreRepository<FeedbackReport>, IFeedbackRepository
{
    public FeedbackRepository(FirestoreDb firestoreDb) : base(firestoreDb, "feedbacks")
    {
    }

    public async Task<IEnumerable<FeedbackReport>> GetBySessionIdAsync(string sessionId)
    {
        var query = _firestoreDb.Collection(_collectionName).WhereEqualTo("SessionId", sessionId);
        var snapshot = await query.GetSnapshotAsync();
        var results = new List<FeedbackReport>();
        
        foreach (var doc in snapshot.Documents)
        {
            if (doc.Exists)
            {
                results.Add(doc.ConvertTo<FeedbackReport>());
            }
        }
        return results;
    }
}
