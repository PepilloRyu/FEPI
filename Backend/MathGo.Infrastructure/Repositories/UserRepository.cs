using Google.Cloud.Firestore;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Domain.Entities;

namespace MathGo.Infrastructure.Repositories;

public class UserRepository : FirestoreRepository<User>, IUserRepository
{
    public UserRepository(FirestoreDb firestoreDb) : base(firestoreDb, "users")
    {
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        var snapshot = await _firestoreDb.Collection(_collectionName)
            .WhereEqualTo("email", email)
            .Limit(1)
            .GetSnapshotAsync();

        if (snapshot.Documents.Count == 0) return null;

        return snapshot.Documents[0].ConvertTo<User>();
    }
}
