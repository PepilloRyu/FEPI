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

        var progress = await _progressRepository.GetByIdAsync(uid) ?? new UserProgress
        {
            Uid = uid,
            TotalXp = 0,
            DailyStreak = 0,
            StreakDays = 0,
            Gems = 500,
            Lives = 5,
            Level = 1,
            CurrentLeague = "Rookie"
        };

        return new UserProfileResponse
        {
            Uid = user.Uid,
            Name = user.Name,
            Email = user.Email,
            Role = user.Role.ToString().ToLower(),
            AvatarUrl = user.AvatarUrl ?? "",
            Level = progress.Level,
            XpTotal = progress.TotalXp,
            StreakDays = progress.StreakDays,
            DailyStreak = progress.DailyStreak,
            CurrentLeague = progress.CurrentLeague,
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
        
        var progressSummary = new ProgressSummary();
        if (progress != null)
        {
            progressSummary.TotalXp = progress.TotalXp;
            progressSummary.TotalLevelsCompleted = progress.TotalLevelsCompleted;
            progressSummary.TotalWorldsCompleted = progress.TotalWorldsCompleted;
            
            if (progress.Worlds != null)
            {
                foreach (var wp in progress.Worlds)
                {
                    progressSummary.Worlds.Add(wp.Key, new WorldProgressSummary
                    {
                        LevelsCompleted = wp.Value.LevelsCompleted?.Count ?? 0,
                        AllComplete = wp.Value.AllComplete
                    });
                }
            }
        }

        // Just returning an empty mock for now, actual implementation depends on joining other collections
        return new DashboardResponse
        {
            Profile = profile,
            Progress = progressSummary,
            ActiveMissions = new List<MissionSummary>(),
            RecentAchievements = new List<AchievementSummary>(),
            Stats = new StatsResponse()
        };
    }

    public async Task<List<LeaderboardEntry>> GetLeaderboardAsync(int top = 20)
    {
        var topProgress = await _progressRepository.GetTopByXpAsync(top);
        var leaderboard = new List<LeaderboardEntry>();
        int rank = 1;

        foreach (var prog in topProgress)
        {
            var user = await _userRepository.GetByIdAsync(prog.Uid);
            if (user != null)
            {
                leaderboard.Add(new LeaderboardEntry
                {
                    Rank = rank++,
                    Uid = user.Uid,
                    Name = user.Name,
                    AvatarUrl = user.AvatarUrl ?? "",
                    XpTotal = prog.TotalXp,
                    League = prog.CurrentLeague ?? "Rookie"
                });
            }
        }

        return leaderboard;
    }
}
