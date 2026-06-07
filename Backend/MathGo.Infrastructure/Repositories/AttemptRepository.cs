using Google.Cloud.Firestore;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Domain.Entities;

namespace MathGo.Infrastructure.Repositories;

public class AttemptRepository : FirestoreRepository<AttemptLog>, IAttemptRepository
{
    public AttemptRepository(FirestoreDb firestoreDb) : base(firestoreDb, "attempts")
    {
    }
}
