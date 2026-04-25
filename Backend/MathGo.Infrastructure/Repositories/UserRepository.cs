using Google.Cloud.Firestore;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Domain.Entities;

namespace MathGo.Infrastructure.Repositories;

public class UserRepository : FirestoreRepository<User>, IUserRepository
{
    public UserRepository(FirestoreDb firestoreDb) : base(firestoreDb, "users")
    {
    }
}
