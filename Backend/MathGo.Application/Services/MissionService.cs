using MathGo.Application.DTOs.Responses;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Application.Interfaces.Services;

namespace MathGo.Application.Services;

public class MissionService : IMissionService
{
    private readonly IMissionRepository _missionRepository;
    private readonly IUserRepository _userRepository;

    public MissionService(IMissionRepository missionRepository, IUserRepository userRepository)
    {
        _missionRepository = missionRepository;
        _userRepository = userRepository;
    }

    public async Task<List<MissionSummary>> GetActiveMissionsAsync(string uid)
    {
        // Mock implementation for now, should fetch from user_missions
        return new List<MissionSummary>();
    }

    public async Task<MissionSummary?> CompleteMissionAsync(string uid, string missionId)
    {
        // Mock implementation
        return null;
    }

    public async Task EvaluateMissionProgressAsync(string uid, string eventType, int value)
    {
        // Mock implementation to evaluate events like "levels_completed", "xp_earned"
        await Task.CompletedTask;
    }
}
