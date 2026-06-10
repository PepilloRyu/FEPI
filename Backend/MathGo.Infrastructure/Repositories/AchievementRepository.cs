using Google.Cloud.Firestore;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Domain.Entities;

namespace MathGo.Infrastructure.Repositories;

public class AchievementRepository : FirestoreRepository<Achievement>, IAchievementRepository
{
    public AchievementRepository(FirestoreDb firestoreDb) : base(firestoreDb, "achievements") { }

    public async Task<List<UserAchievement>> GetUserAchievementsAsync(string uid)
    {
        var snapshot = await _firestoreDb
            .Collection("user_achievements").Document(uid).Collection("achievements")
            .GetSnapshotAsync();

        return snapshot.Documents
            .Where(d => d.Exists)
            .Select(d => d.ConvertTo<UserAchievement>())
            .ToList();
    }

    public async Task<UserAchievement?> GetUserAchievementAsync(string uid, string achievementId)
    {
        var snapshot = await _firestoreDb
            .Collection("user_achievements").Document(uid).Collection("achievements").Document(achievementId)
            .GetSnapshotAsync();

        return snapshot.Exists ? snapshot.ConvertTo<UserAchievement>() : null;
    }

    public async Task SaveUserAchievementAsync(string uid, UserAchievement userAchievement)
    {
        await _firestoreDb
            .Collection("user_achievements").Document(uid).Collection("achievements").Document(userAchievement.AchievementId)
            .SetAsync(userAchievement);
    }
}
