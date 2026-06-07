using MathGo.Application.DTOs.Requests;
using MathGo.Application.DTOs.Responses;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Application.Interfaces.Services;
using MathGo.Domain.Entities;

namespace MathGo.Application.Services;

public class ProgressService : IProgressService
{
    private readonly IProgressRepository _progressRepository;
    private readonly IUserRepository _userRepository;
    private readonly IGamificationService _gamificationService;
    private readonly IAttemptRepository _attemptRepository;

    public ProgressService(
        IProgressRepository progressRepository,
        IUserRepository userRepository,
        IGamificationService gamificationService,
        IAttemptRepository attemptRepository)
    {
        _progressRepository = progressRepository;
        _userRepository = userRepository;
        _gamificationService = gamificationService;
        _attemptRepository = attemptRepository;
    }

    public async Task<ProgressSummary> GetProgressAsync(string uid)
    {
        var progress = await _progressRepository.GetByIdAsync(uid);
        var summary = new ProgressSummary();
        
        if (progress != null)
        {
            summary.TotalXp = progress.TotalXp;
            summary.TotalLevelsCompleted = progress.TotalLevelsCompleted;
            summary.TotalWorldsCompleted = progress.TotalWorldsCompleted;
            
            if (progress.Worlds != null)
            {
                foreach (var wp in progress.Worlds)
                {
                    summary.Worlds.Add(wp.Key, new WorldProgressSummary
                    {
                        LevelsCompleted = wp.Value.LevelsCompleted?.Count ?? 0,
                        AllComplete = wp.Value.AllComplete
                    });
                }
            }
        }
        
        return summary;
    }

    public async Task<AttemptResultResponse> SubmitAttemptAsync(string uid, SubmitAttemptRequest request)
    {
        var user = await _userRepository.GetByIdAsync(uid);
        if (user == null || user.Gamification == null) throw new Exception("User not found");

        var progress = await _progressRepository.GetByIdAsync(uid);
        if (progress == null) throw new Exception("Progress not found");

        int xpEarned = _gamificationService.CalculateXpEarned(request.IsCorrect, request.UsedHint, user.Gamification.DailyStreak);
        
        // Log attempt
        var attempt = new AttemptLog
        {
            Id = Guid.NewGuid().ToString(),
            UserId = uid,
            TopicId = request.TopicId,
            IsCorrect = request.IsCorrect,
            CompletedAt = DateTime.UtcNow,
            TimeMs = request.TimeMs,
            UsedHint = request.UsedHint,
            UserAnswer = request.UserAnswer,
            WorldId = request.WorldId,
            LevelId = request.LevelId
        };

        await _attemptRepository.AddAsync(attempt, attempt.Id);

        if (request.IsCorrect)
        {
            user.Gamification.XpTotal += xpEarned;
            user.Level = _gamificationService.CalculateLevel(user.Gamification.XpTotal);
            user.Gamification.CurrentLeague = _gamificationService.CalculateLeague(user.Gamification.XpTotal);
            
            // Update streak
            user.Gamification.DailyStreak = await _gamificationService.UpdateDailyStreakAsync(uid, DateTime.UtcNow.AddDays(-1).ToString("yyyy-MM-dd"));

            await _userRepository.UpdateAsync(uid, user);

            progress.TotalXp += xpEarned;
            // Additional logic for levels/worlds completed would go here

            await _progressRepository.UpdateAsync(uid, progress);
        }

        return new AttemptResultResponse
        {
            IsCorrect = request.IsCorrect,
            XpEarned = xpEarned,
            NewXpTotal = user.Gamification.XpTotal,
            NewLevel = user.Level,
            CurrentStreak = user.Gamification.DailyStreak,
            NewAchievements = new List<AchievementSummary>() // Achievements logic would plug in here
        };
    }

    public async Task<StatsResponse> GetStatsAsync(string uid)
    {
        var attempts = await _attemptRepository.GetAllAsync(); // Idealmente filtrar por UID en el repo
        var userAttempts = attempts.Where(a => a.UserId == uid).ToList();
        
        if (!userAttempts.Any()) return new StatsResponse();

        return new StatsResponse
        {
            TotalAttempts = userAttempts.Count,
            CorrectAttempts = userAttempts.Count(a => a.IsCorrect),
            AccuracyPercent = userAttempts.Count(a => a.IsCorrect) * 100.0 / userAttempts.Count,
            AverageTimeMs = userAttempts.Average(a => a.TimeMs)
        };
    }
}
