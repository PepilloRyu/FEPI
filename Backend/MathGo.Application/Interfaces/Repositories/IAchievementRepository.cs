using MathGo.Domain.Entities;

namespace MathGo.Application.Interfaces.Repositories;

public interface IAchievementRepository : IBaseRepository<Achievement>
{
    Task<List<UserAchievement>> GetUserAchievementsAsync(string uid);
    Task<UserAchievement?> GetUserAchievementAsync(string uid, string achievementId);
    Task SaveUserAchievementAsync(string uid, UserAchievement userAchievement);
}
