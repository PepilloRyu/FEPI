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

        string today = DateTime.UtcNow.Date.ToString("yyyy-MM-dd");

        // Ya jugó hoy: no modificar racha
        if (lastActiveDate == today)
            return progress.DailyStreak;

        int newStreak;
        if (!DateTime.TryParse(lastActiveDate, out var lastDate))
        {
            newStreak = 1; // sin fecha previa válida → primer día de racha
        }
        else
        {
            int daysDiff = (DateTime.UtcNow.Date - lastDate.Date).Days;
            // daysDiff == 1: jugó ayer → incrementar; > 1: rompió la racha → reiniciar
            newStreak = daysDiff == 1 ? progress.DailyStreak + 1 : 1;
        }

        progress.DailyStreak = newStreak;
        if (newStreak > progress.StreakDays)
            progress.StreakDays = newStreak;
        progress.LastActiveDate = today;
        await _progressRepository.UpdateAsync(uid, progress);

        return newStreak;
    }
}
