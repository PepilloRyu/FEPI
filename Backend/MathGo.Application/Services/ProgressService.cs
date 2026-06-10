using MathGo.Application.DTOs.Requests;
using MathGo.Application.DTOs.Responses;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Application.Interfaces.Services;
using MathGo.Domain.Entities;
using System.Diagnostics;

namespace MathGo.Application.Services;

public class ProgressService : IProgressService
{
    private readonly IProgressRepository _progressRepository;
    private readonly IUserRepository _userRepository;
    private readonly IGamificationService _gamificationService;
    private readonly IAttemptRepository _attemptRepository;
    private readonly IMissionService _missionService;
    private readonly IAchievementService _achievementService;

    public ProgressService(
        IProgressRepository progressRepository,
        IUserRepository userRepository,
        IGamificationService gamificationService,
        IAttemptRepository attemptRepository,
        IMissionService missionService,
        IAchievementService achievementService)
    {
        _progressRepository = progressRepository;
        _userRepository = userRepository;
        _gamificationService = gamificationService;
        _attemptRepository = attemptRepository;
        _missionService = missionService;
        _achievementService = achievementService;
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
        if (user == null) throw new Exception("User not found");

        var progress = await _progressRepository.GetByIdAsync(uid);
        if (progress == null) throw new Exception("Progress not found");

        int xpEarned = _gamificationService.CalculateXpEarned(request.IsCorrect, request.UsedHint, progress.DailyStreak);
        
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
            progress.TotalXp += xpEarned;
            progress.Level = _gamificationService.CalculateLevel(progress.TotalXp);
            progress.CurrentLeague = _gamificationService.CalculateLeague(progress.TotalXp);
            
            progress.DailyStreak = await _gamificationService.UpdateDailyStreakAsync(uid, progress.LastActiveDate);
            progress.StreakDays = Math.Max(progress.StreakDays, progress.DailyStreak);
            progress.LastActiveDate = DateTime.UtcNow.Date.ToString("yyyy-MM-dd");

            // Track weekly activity (0 = Sunday, 6 = Saturday)
            int dayOfWeek = (int)DateTime.UtcNow.DayOfWeek;
            if (progress.WeeklyActivity == null || progress.WeeklyActivity.Count != 7)
            {
                progress.WeeklyActivity = new List<int> { 0, 0, 0, 0, 0, 0, 0 };
            }
            progress.WeeklyActivity[dayOfWeek] += xpEarned;

            await _progressRepository.UpdateAsync(uid, progress);

            _ = _missionService.EvaluateMissionProgressAsync(uid, "xp_earned", xpEarned)
                .ContinueWith(t => Debug.WriteLine($"[MissionService] EvaluateMissionProgress error: {t.Exception}"), TaskContinuationOptions.OnlyOnFaulted);
            _ = _achievementService.EvaluateNewAchievementsAsync(uid)
                .ContinueWith(t => Debug.WriteLine($"[AchievementService] EvaluateNewAchievements error: {t.Exception}"), TaskContinuationOptions.OnlyOnFaulted);
        }
        else
        {
            // si incorrecto -> -1 Vida
            progress.Lives = Math.Max(0, progress.Lives - 1);
            await _progressRepository.UpdateAsync(uid, progress);
        }

        return new AttemptResultResponse
        {
            IsCorrect = request.IsCorrect,
            XpEarned = xpEarned,
            NewXpTotal = progress.TotalXp,
            NewLevel = progress.Level,
            CurrentStreak = progress.DailyStreak,
            NewAchievements = new List<AchievementSummary>() // Achievements logic would plug in here
        };
    }

    public async Task CompleteLevelAsync(string uid, CompleteLevelRequest request)
    {
        var progress = await _progressRepository.GetByIdAsync(uid);
        if (progress == null) throw new Exception("Progress not found");

        string worldKey = $"world_{request.WorldId}";
        if (!progress.Worlds.TryGetValue(worldKey, out var worldProgress))
        {
            worldProgress = new MathGo.Domain.Entities.WorldProgress();
            progress.Worlds[worldKey] = worldProgress;
        }

        worldProgress.LevelsCompleted ??= new List<int>();
        bool levelAlreadyDone = worldProgress.LevelsCompleted.Contains(request.LevelId);

        if (!levelAlreadyDone)
        {
            worldProgress.LevelsCompleted.Add(request.LevelId);
            progress.TotalLevelsCompleted++;
        }

        bool worldJustCompleted = false;
        if (request.IsWorldComplete && !worldProgress.AllComplete)
        {
            worldProgress.AllComplete = true;
            progress.TotalWorldsCompleted++;
            worldJustCompleted = true;
        }

        await _progressRepository.UpdateAsync(uid, progress);

        _ = _achievementService.EvaluateNewAchievementsAsync(uid)
            .ContinueWith(t => Debug.WriteLine($"[AchievementService] EvaluateNewAchievements error: {t.Exception}"), TaskContinuationOptions.OnlyOnFaulted);

        if (!levelAlreadyDone)
            _ = _missionService.EvaluateMissionProgressAsync(uid, "levels_completed", 1)
                .ContinueWith(t => Debug.WriteLine($"[MissionService] EvaluateMissionProgress error: {t.Exception}"), TaskContinuationOptions.OnlyOnFaulted);

        if (worldJustCompleted)
            _ = _missionService.EvaluateMissionProgressAsync(uid, "worlds_completed", 1)
                .ContinueWith(t => Debug.WriteLine($"[MissionService] EvaluateMissionProgress error: {t.Exception}"), TaskContinuationOptions.OnlyOnFaulted);
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
