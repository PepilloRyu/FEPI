using MathGo.Application.Interfaces.Repositories;
using MathGo.Application.Interfaces.Services;

namespace MathGo.Application.Services;

public class GamificationService : IGamificationService
{
    private readonly IProgressRepository _progressRepository;

    public GamificationService(IProgressRepository progressRepository)
    {
        _progressRepository = progressRepository;
    }

    public int CalculateXpEarned(bool isCorrect, bool usedHint, int currentStreak)
    {
        if (!isCorrect) return 0;
        
        int baseXP = 10;
        
        if (usedHint)
        {
            baseXP /= 2;
        }

        // Streak bonus
        int bonusXP = currentStreak > 0 ? (currentStreak > 5 ? 5 : currentStreak) : 0;
        
        return baseXP + bonusXP;
    }

    public int CalculateLevel(int totalXp)
    {
        // Simple scale: 100 XP per level
        return (totalXp / 100) + 1;
    }

    public string CalculateLeague(int totalXp)
    {
        if (totalXp < 500) return "Bronce";
        if (totalXp < 1500) return "Plata";
        if (totalXp < 3000) return "Oro";
        if (totalXp < 5000) return "Platino";
        if (totalXp < 10000) return "Diamante";
        return "Maestro";
    }

    public async Task<int> UpdateDailyStreakAsync(string uid, string lastActiveDate)
    {
        var progress = await _progressRepository.GetByIdAsync(uid);
        if (progress == null) return 0;

        // Implement logic for checking lastActiveDate against today
        // For simplicity, assuming caller passes "yyyy-MM-dd"
        string today = DateTime.UtcNow.ToString("yyyy-MM-dd");
        
        if (lastActiveDate != today)
        {
            // If they didn't play yesterday, reset streak, else increment
            // Actual check requires parsing dates. For now, incrementing.
            progress.DailyStreak += 1;
            if (progress.DailyStreak > progress.StreakDays)
            {
                progress.StreakDays = progress.DailyStreak;
            }
            progress.LastActiveDate = today;
            await _progressRepository.UpdateAsync(uid, progress);
        }

        return progress.DailyStreak;
    }
}
