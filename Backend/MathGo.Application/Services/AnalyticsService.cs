using MathGo.Application.DTOs.Responses;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Application.Interfaces.Services;

namespace MathGo.Application.Services;

public class AnalyticsService : IAnalyticsService
{
    private readonly IAttemptRepository _attemptRepository;
    private readonly IProgressRepository _progressRepository;

    public AnalyticsService(
        IAttemptRepository attemptRepository,
        IProgressRepository progressRepository)
    {
        _attemptRepository = attemptRepository;
        _progressRepository = progressRepository;
    }

    public async Task<StatsResponse> GetPersonalStatsAsync(string uid)
    {
        var attemptsTask = _attemptRepository.GetByUserIdAsync(uid);
        var progressTask = _progressRepository.GetByIdAsync(uid);

        await Task.WhenAll(attemptsTask, progressTask);

        var userAttempts = (await attemptsTask).ToList();
        var progress = await progressTask;
        var xpTotal = progress?.TotalXp ?? 0;

        var mexicoNow = DateTime.UtcNow.Add(TimeSpan.FromHours(-6));
        var today = mexicoNow.Date;
        int daysFromMonday = ((int)today.DayOfWeek + 6) % 7;
        string currentWeekMonday = today.AddDays(-daysFromMonday).ToString("yyyy-MM-dd");
        int[] weeklyXp = progress?.WeeklyActivityStart == currentWeekMonday && progress.WeeklyActivity?.Count == 7
            ? progress.WeeklyActivity.ToArray()
            : new int[7];

        if (!userAttempts.Any())
            return new StatsResponse { XpTotal = xpTotal, WeeklyXp = weeklyXp };

        return new StatsResponse
        {
            TotalAttempts = userAttempts.Count,
            CorrectAttempts = userAttempts.Count(a => a.IsCorrect),
            AccuracyPercent = userAttempts.Count(a => a.IsCorrect) * 100.0 / userAttempts.Count,
            AverageTimeMs = userAttempts.Average(a => a.TimeMs),
            XpTotal = xpTotal,
            WeeklyXp = weeklyXp
        };
    }

    public async Task<List<StatsResponse>> GetGroupStatsAsync(string groupId)
    {
        // Mock implementation
        return new List<StatsResponse>();
    }
}
