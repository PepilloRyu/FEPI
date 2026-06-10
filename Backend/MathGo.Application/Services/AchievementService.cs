using MathGo.Application.DTOs.Responses;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Application.Interfaces.Services;
using MathGo.Domain.Entities;

namespace MathGo.Application.Services;

public class AchievementService : IAchievementService
{
    private readonly IAchievementRepository _achievementRepository;
    private readonly IProgressRepository _progressRepository;

    public AchievementService(
        IAchievementRepository achievementRepository,
        IProgressRepository progressRepository)
    {
        _achievementRepository = achievementRepository;
        _progressRepository = progressRepository;
    }

    public async Task<List<AchievementSummary>> GetAllAchievementsAsync(string uid)
    {
        var allAchievements = await _achievementRepository.GetAllAsync();
        var userAchievements = await _achievementRepository.GetUserAchievementsAsync(uid);
        var unlockedMap = userAchievements.ToDictionary(ua => ua.AchievementId);

        return allAchievements.Select(a =>
        {
            unlockedMap.TryGetValue(a.Id, out var ua);
            return new AchievementSummary
            {
                Id = a.Id,
                Name = a.Name,
                Description = a.Description,
                Icon = a.Icon,
                Unlocked = ua != null,
                UnlockedAt = ua?.UnlockedAt
            };
        }).ToList();
    }

    public async Task<AchievementSummary?> UnlockAchievementAsync(string uid, string achievementId)
    {
        var achievement = await _achievementRepository.GetByIdAsync(achievementId);
        if (achievement == null) return null;

        var existing = await _achievementRepository.GetUserAchievementAsync(uid, achievementId);
        if (existing != null) return null;

        var userAchievement = new UserAchievement
        {
            UserId = uid,
            AchievementId = achievementId,
            UnlockedAt = DateTime.UtcNow
        };
        await _achievementRepository.SaveUserAchievementAsync(uid, userAchievement);

        return new AchievementSummary
        {
            Id = achievement.Id,
            Name = achievement.Name,
            Description = achievement.Description,
            Icon = achievement.Icon,
            Unlocked = true,
            UnlockedAt = userAchievement.UnlockedAt
        };
    }

    public async Task<List<AchievementSummary>> EvaluateNewAchievementsAsync(string uid)
    {
        var allAchievements = await _achievementRepository.GetAllAsync();
        var userAchievements = await _achievementRepository.GetUserAchievementsAsync(uid);
        var alreadyUnlocked = userAchievements.Select(ua => ua.AchievementId).ToHashSet();

        var progress = await _progressRepository.GetByIdAsync(uid);
        if (progress == null) return new List<AchievementSummary>();

        var newlyUnlocked = new List<AchievementSummary>();

        foreach (var a in allAchievements)
        {
            if (alreadyUnlocked.Contains(a.Id)) continue;

            int userValue = a.Condition.Type switch
            {
                "xp_total"         => progress.TotalXp,
                "levels_completed" => progress.Worlds?.Values.Sum(w => w.LevelsCompleted?.Count ?? 0) ?? 0,
                "streak_days"      => progress.DailyStreak,
                "worlds_completed" => progress.Worlds?.Values.Count(w => w.AllComplete) ?? 0,
                _ => 0
            };

            if (userValue < a.Condition.Target) continue;

            // Achievement data and the "not yet unlocked" state are already confirmed above —
            // write directly without re-reading from Firestore.
            var ua = new UserAchievement { UserId = uid, AchievementId = a.Id, UnlockedAt = DateTime.UtcNow };
            await _achievementRepository.SaveUserAchievementAsync(uid, ua);
            newlyUnlocked.Add(new AchievementSummary
            {
                Id = a.Id,
                Name = a.Name,
                Description = a.Description,
                Icon = a.Icon,
                Unlocked = true,
                UnlockedAt = ua.UnlockedAt
            });
        }

        return newlyUnlocked;
    }
}
