namespace MathGo.Application.Interfaces.Services;

/// <summary>
/// Motor de gamificación — cálculos de XP, niveles, streak y recompensas.
/// </summary>
public interface IGamificationService
{
    /// <summary>Calcula el XP a otorgar según si es correcta, si usó pista, y el streak actual.</summary>
    int CalculateXpEarned(bool isCorrect, bool usedHint, int currentStreak);

    /// <summary>Calcula el nivel a partir del XP total.</summary>
    int CalculateLevel(int totalXp);

    /// <summary>Calcula la liga según el XP total.</summary>
    string CalculateLeague(int totalXp);

    /// <summary>Actualiza el streak diario y devuelve el nuevo valor.</summary>
    Task<int> UpdateDailyStreakAsync(string uid, string lastActiveDate);
}
