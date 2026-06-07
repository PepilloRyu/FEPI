using Google.Cloud.Firestore;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Domain.Entities;

namespace MathGo.Infrastructure.Repositories;

public class MissionRepository : FirestoreRepository<Mission>, IMissionRepository
{
    public MissionRepository(FirestoreDb firestoreDb) : base(firestoreDb, "missions")
    {
    }
}
