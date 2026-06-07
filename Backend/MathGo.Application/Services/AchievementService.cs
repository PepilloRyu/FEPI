using MathGo.Application.DTOs.Responses;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Application.Interfaces.Services;

namespace MathGo.Application.Services;

public class AchievementService : IAchievementService
{
    private readonly IAchievementRepository _achievementRepository;
    private readonly IUserRepository _userRepository;

    public AchievementService(IAchievementRepository achievementRepository, IUserRepository userRepository)
    {
        _achievementRepository = achievementRepository;
        _userRepository = userRepository;
    }

    public async Task<List<AchievementSummary>> GetAllAchievementsAsync(string uid)
    {
        // Mock implementation
        return new List<AchievementSummary>();
    }

    public async Task<List<AchievementSummary>> EvaluateNewAchievementsAsync(string uid)
    {
        // Mock implementation
        return new List<AchievementSummary>();
    }
}
