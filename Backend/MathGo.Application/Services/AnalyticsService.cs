using MathGo.Application.DTOs.Responses;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Application.Interfaces.Services;

namespace MathGo.Application.Services;

public class AnalyticsService : IAnalyticsService
{
    private readonly IAttemptRepository _attemptRepository;

    public AnalyticsService(IAttemptRepository attemptRepository)
    {
        _attemptRepository = attemptRepository;
    }

    public async Task<StatsResponse> GetPersonalStatsAsync(string uid)
    {
        var attempts = await _attemptRepository.GetAllAsync(); // Needs specialized query filtering by UID later
        var userAttempts = attempts.Where(a => a.UserId == uid).ToList();
        
        if (!userAttempts.Any()) return new StatsResponse();

        return new StatsResponse
        {
            TotalAttempts = userAttempts.Count,
            CorrectAttempts = userAttempts.Count(a => a.IsCorrect),
            AccuracyPercent = userAttempts.Count(a => a.IsCorrect) * 100.0 / userAttempts.Count,
            AverageTimeMs = userAttempts.Average(a => a.TimeMs),
            XpTotal = 0 // Would require getting the user
        };
    }

    public async Task<List<StatsResponse>> GetGroupStatsAsync(string groupId)
    {
        // Mock implementation
        return new List<StatsResponse>();
    }
}
