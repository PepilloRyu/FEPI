using MathGo.Application.DTOs.Responses;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Application.Interfaces.Services;
using MathGo.Domain.Entities;
using System.Diagnostics;

namespace MathGo.Application.Services;

public class MissionService : IMissionService
{
    private readonly IMissionRepository _missionRepository;
    private readonly IProgressRepository _progressRepository;
    private readonly IGamificationService _gamificationService;
    private readonly IAchievementService _achievementService;

    public MissionService(
        IMissionRepository missionRepository,
        IProgressRepository progressRepository,
        IGamificationService gamificationService,
        IAchievementService achievementService)
    {
        _missionRepository = missionRepository;
        _progressRepository = progressRepository;
        _gamificationService = gamificationService;
        _achievementService = achievementService;
    }

    public async Task<List<MissionSummary>> GetActiveMissionsAsync(string uid)
    {
        var allMissions = (await _missionRepository.GetAllAsync())
            .Where(m => m.IsActive)
            .ToList();

        var userMissions = await _missionRepository.GetUserMissionsAsync(uid);
        var userMissionsMap = userMissions.ToDictionary(um => um.MissionId);

        var today = DateTime.UtcNow.Date;
        // Semana actual: lunes al domingo
        var weekStart = today.AddDays(-(((int)today.DayOfWeek + 6) % 7));

        var results = new List<MissionSummary>();
        foreach (var m in allMissions)
        {
            userMissionsMap.TryGetValue(m.Id, out var um);

            bool needsReset = um != null && (
                (m.Type == "daily"  && um.DateAssigned.Date < today) ||
                (m.Type == "weekly" && um.DateAssigned.Date < weekStart)
            );

            if (needsReset)
            {
                um!.Progress = 0;
                um.Completed = false;
                um.DateAssigned = DateTime.UtcNow;
                um.DateCompleted = null;
                await _missionRepository.SaveUserMissionAsync(uid, um);
            }

            results.Add(new MissionSummary
            {
                Id = m.Id,
                Name = m.Name,
                Description = m.Description,
                Type = m.Type,
                XpReward = m.XpReward,
                Progress = needsReset ? 0 : (um?.Progress ?? 0),
                Target = m.Objective.Target,
                Completed = !needsReset && (um?.Completed ?? false)
            });
        }
        return results;
    }

    public async Task<MissionSummary?> CompleteMissionAsync(string uid, string missionId)
    {
        var mission = await _missionRepository.GetByIdAsync(missionId);
        if (mission == null || !mission.IsActive) return null;

        var userMission = await _missionRepository.GetUserMissionAsync(uid, missionId)
            ?? new UserMission { UserId = uid, MissionId = missionId, DateAssigned = DateTime.UtcNow };

        if (userMission.Completed) return null;

        // Verify progress exists before committing the mission as complete, so XP is never silently lost.
        var progress = await _progressRepository.GetByIdAsync(uid);
        if (progress == null) return null;

        userMission.Completed = true;
        userMission.Progress = mission.Objective.Target;
        userMission.DateCompleted = DateTime.UtcNow;
        await _missionRepository.SaveUserMissionAsync(uid, userMission);

        progress.TotalXp += mission.XpReward;
        progress.Level = _gamificationService.CalculateLevel(progress.TotalXp);
        await _progressRepository.UpdateAsync(uid, progress);

        _ = _achievementService.EvaluateNewAchievementsAsync(uid)
            .ContinueWith(t => Debug.WriteLine($"[AchievementService] EvaluateNewAchievements error: {t.Exception}"), TaskContinuationOptions.OnlyOnFaulted);

        return new MissionSummary
        {
            Id = mission.Id,
            Name = mission.Name,
            Description = mission.Description,
            Type = mission.Type,
            XpReward = mission.XpReward,
            Progress = userMission.Progress,
            Target = mission.Objective.Target,
            Completed = true
        };
    }

    public async Task EvaluateMissionProgressAsync(string uid, string eventType, int value)
    {
        var activeMissions = (await _missionRepository.GetAllAsync())
            .Where(m => m.IsActive && m.Objective.Metric == eventType)
            .ToList();

        foreach (var mission in activeMissions)
        {
            var userMission = await _missionRepository.GetUserMissionAsync(uid, mission.Id)
                ?? new UserMission { UserId = uid, MissionId = mission.Id, DateAssigned = DateTime.UtcNow };

            if (userMission.Completed) continue;

            userMission.Progress = Math.Min(userMission.Progress + value, mission.Objective.Target);
            await _missionRepository.SaveUserMissionAsync(uid, userMission);
        }
    }
}
