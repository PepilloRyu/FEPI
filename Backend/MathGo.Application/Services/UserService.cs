using MathGo.Application.DTOs.Requests;
using MathGo.Application.DTOs.Responses;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Application.Interfaces.Services;

namespace MathGo.Application.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IProgressRepository _progressRepository;
    private readonly IMissionRepository _missionRepository;
    private readonly IAchievementRepository _achievementRepository;

    public UserService(
        IUserRepository userRepository,
        IProgressRepository progressRepository,
        IMissionRepository missionRepository,
        IAchievementRepository achievementRepository)
    {
        _userRepository = userRepository;
        _progressRepository = progressRepository;
        _missionRepository = missionRepository;
        _achievementRepository = achievementRepository;
    }

    public async Task<UserProfileResponse?> GetProfileAsync(string uid)
    {
        var user = await _userRepository.GetByIdAsync(uid);
        if (user == null) return null;

        // XP, racha y gemas viven en mathgo_progress, no en users
        var progress = await _progressRepository.GetByIdAsync(uid);

        int totalCompleted = 0;
        if (progress?.Worlds != null)
            foreach (var w in progress.Worlds.Values)
                totalCompleted += w.LevelsCompleted?.Count ?? 0;

        return new UserProfileResponse
        {
            Uid = uid,
            Name = user.Name,
            Email = user.Email,
            Role = user.Role,
            AvatarUrl = user.AvatarUrl ?? "",
            Level = totalCompleted + 1,
            XpTotal = progress?.TotalXp ?? 0,
            DailyStreak = progress?.DailyStreak ?? 0,
            StreakDays = progress?.DailyStreak ?? 0,
            Gems = progress?.Gems ?? 0,
            Hearts = 5,
            CurrentLeague = "Rookie",
            CreatedAt = user.CreatedAt,
        };
    }

    public async Task<UserProfileResponse> UpdateProfileAsync(string uid, UpdateProfileRequest request)
    {
        var user = await _userRepository.GetByIdAsync(uid);
        if (user == null) throw new Exception("User not found");

        if (!string.IsNullOrEmpty(request.Name))
        {
            user.Name = request.Name;
        }

        if (request.AvatarUrl != null)
        {
            user.AvatarUrl = request.AvatarUrl;
        }

        await _userRepository.UpdateAsync(uid, user);
        return await GetProfileAsync(uid) ?? throw new Exception("Failed to retrieve updated profile");
    }

    public async Task<DashboardResponse> GetDashboardAsync(string uid)
    {
        var profile = await GetProfileAsync(uid);
        if (profile == null) throw new Exception("User not found");

        var progress = await _progressRepository.GetByIdAsync(uid);

        // TotalLevelsCompleted y TotalWorldsCompleted no los escribe el frontend:
        // se calculan desde el diccionario worlds en mathgo_progress
        int totalLevels = 0;
        int totalWorlds = 0;
        var progressSummary = new ProgressSummary { TotalXp = progress?.TotalXp ?? 0 };

        if (progress?.Worlds != null)
        {
            foreach (var kv in progress.Worlds)
            {
                int count = kv.Value.LevelsCompleted?.Count ?? 0;
                totalLevels += count;
                if (kv.Value.AllComplete) totalWorlds++;
                progressSummary.Worlds[kv.Key] = new WorldProgressSummary
                {
                    LevelsCompleted = count,
                    AllComplete = kv.Value.AllComplete,
                };
            }
        }
        progressSummary.TotalLevelsCompleted = totalLevels;
        progressSummary.TotalWorldsCompleted = totalWorlds;

        return new DashboardResponse
        {
            Profile = profile,
            Progress = progressSummary,
            ActiveMissions = new List<MissionSummary>(),
            RecentAchievements = new List<AchievementSummary>(),
            Stats = new StatsResponse { XpTotal = progress?.TotalXp ?? 0 },
        };
    }

    public async Task<List<LeaderboardEntry>> GetLeaderboardAsync(int top = 20)
    {
        // XP viene de mathgo_progress, nombre/avatar de users
        var progressList = await _progressRepository.GetTopByXpAsync(top);
        var leaderboard = new List<LeaderboardEntry>();
        int rank = 1;

        foreach (var p in progressList)
        {
            var user = await _userRepository.GetByIdAsync(p.Uid);
            leaderboard.Add(new LeaderboardEntry
            {
                Rank = rank++,
                Uid = p.Uid,
                Name = user?.Name ?? "Usuario",
                AvatarUrl = user?.AvatarUrl ?? "",
                XpTotal = p.TotalXp,
                League = "Rookie",
            });
        }

        return leaderboard;
    }
}
