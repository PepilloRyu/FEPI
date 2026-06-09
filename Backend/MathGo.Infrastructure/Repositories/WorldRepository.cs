using Google.Cloud.Firestore;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Domain.Entities;

namespace MathGo.Infrastructure.Repositories;

public class WorldRepository : FirestoreRepository<World>, IWorldRepository
{
    public WorldRepository(FirestoreDb firestoreDb) : base(firestoreDb, "mathgo_worlds")
    {
    }
}
