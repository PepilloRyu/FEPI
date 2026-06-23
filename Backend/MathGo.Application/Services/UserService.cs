using MathGo.Application.DTOs.Requests;
using MathGo.Application.DTOs.Responses;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Application.Interfaces.Services;
using MathGo.Domain.Entities;

namespace MathGo.Application.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IProgressRepository _progressRepository;
    private readonly IMissionRepository _missionRepository;
    private readonly IAchievementRepository _achievementRepository;
    private readonly IGamificationService _gamificationService;

    public UserService(
        IUserRepository userRepository,
        IProgressRepository progressRepository,
        IMissionRepository missionRepository,
        IAchievementRepository achievementRepository,
        IGamificationService gamificationService)
    {
        _userRepository = userRepository;
        _progressRepository = progressRepository;
        _missionRepository = missionRepository;
        _achievementRepository = achievementRepository;
        _gamificationService = gamificationService;
    }

    public async Task<UserProfileResponse?> GetProfileAsync(string uid)
    {
        var user = await _userRepository.GetByIdAsync(uid);
        if (user == null) return null;

        var progress = await _progressRepository.GetByIdAsync(uid) ?? new UserProgress
        {
            Uid = uid,
            TotalXp = 0,
            DailyStreak = 0,
            Gems = 0,
            Lives = 15,
            Level = 1
        };

        var (newLives, newTs, changed) = LivesHelper.CalculateRegenerated(
            progress.Lives, progress.LastLifeLostAt);
        if (changed)
        {
            progress.Lives = newLives;
            progress.LastLifeLostAt = newTs;
            await _progressRepository.UpdateAsync(uid, progress);
        }

        return new UserProfileResponse
        {
            Uid = uid,
            Name = user.Name,
            Email = user.Email,
            Role = user.Role,
            AvatarUrl = user.AvatarUrl ?? "",
            Level = progress.Level,
            XpTotal = progress.TotalXp,
            DailyStreak = progress.DailyStreak,
            CurrentLeague = _gamificationService.CalculateLeague(progress.TotalXp),
            Gems = progress.Gems,
            Hearts = progress.Lives,
            CreatedAt = user.CreatedAt
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

        // TotalLevelsCompleted y TotalWorldsCompleted se calculan desde el diccionario worlds en mathgo_progress
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
        var topProgress = await _progressRepository.GetTopByXpAsync(top);
        var leaderboard = new List<LeaderboardEntry>();

        var userTasks = topProgress.Select(async prog =>
        {
            var user = await _userRepository.GetByIdAsync(prog.Uid);
            return new { Prog = prog, User = user };
        });

        var results = await Task.WhenAll(userTasks);
        int rank = 1;

        foreach (var res in results)
        {
            if (res.User != null && res.User.Role != "admin")
            {
                leaderboard.Add(new LeaderboardEntry
                {
                    Rank = rank++,
                    Uid = res.User.Uid,
                    Name = res.User.Name,
                    AvatarUrl = res.User.AvatarUrl ?? "",
                    XpTotal = res.Prog.WeeklyXp,
                    League = _gamificationService.CalculateLeague(res.Prog.WeeklyXp)
                });
            }
        }

        return leaderboard;
    }
}
