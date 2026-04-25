using Google.Cloud.Firestore;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Domain.Entities;

namespace MathGo.Infrastructure.Repositories;

public class TheoryRepository : FirestoreRepository<TheoryLesson>, ITheoryRepository
{
    public TheoryRepository(FirestoreDb firestoreDb) : base(firestoreDb, "theory_lessons")
    {
    }

    public async Task<IEnumerable<TheoryLesson>> GetByTagsAsync(List<string> tags)
    {
        var query = _firestoreDb.Collection(_collectionName).WhereArrayContainsAny("Tags", tags);
        var snapshot = await query.GetSnapshotAsync();
        var results = new List<TheoryLesson>();
        
        foreach (var doc in snapshot.Documents)
        {
            if (doc.Exists)
            {
                results.Add(doc.ConvertTo<TheoryLesson>());
            }
        }
        return results;
    }
}
