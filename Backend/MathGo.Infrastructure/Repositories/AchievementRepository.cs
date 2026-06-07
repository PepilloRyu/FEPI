using Google.Cloud.Firestore;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Domain.Entities;

namespace MathGo.Infrastructure.Repositories;

public class AchievementRepository : FirestoreRepository<Achievement>, IAchievementRepository
{
    public AchievementRepository(FirestoreDb firestoreDb) : base(firestoreDb, "achievements")
    {
    }
}
