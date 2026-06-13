namespace MathGo.Application.DTOs.Responses;

/// <summary>
/// Respuesta estándar de error de la API.
/// </summary>
public class ApiErrorResponse
{
    public int StatusCode { get; set; }
    public string Message { get; set; } = string.Empty;
    public string? Detail { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}

/// <summary>
/// Respuesta del perfil de usuario.
/// </summary>
public class UserProfileResponse
{
    public string Uid { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = "student";
    public string AvatarUrl { get; set; } = string.Empty;
    public int Level { get; set; }
    public int XpTotal { get; set; }
    public int DailyStreak { get; set; }
    public string CurrentLeague { get; set; } = "Rookie";
    public int Gems { get; set; }
    public int Hearts { get; set; }
    public DateTime CreatedAt { get; set; }
}

/// <summary>
/// Dashboard completo del estudiante.
/// </summary>
public class DashboardResponse
{
    public UserProfileResponse Profile { get; set; } = new();
    public ProgressSummary Progress { get; set; } = new();
    public List<MissionSummary> ActiveMissions { get; set; } = new();
    public List<AchievementSummary> RecentAchievements { get; set; } = new();
    public StatsResponse Stats { get; set; } = new();
}

/// <summary>
/// Resumen de progreso para el dashboard.
/// </summary>
public class ProgressSummary
{
    public int TotalXp { get; set; }
    public int TotalLevelsCompleted { get; set; }
    public int TotalWorldsCompleted { get; set; }
    public int Lives { get; set; } = 15;
    public Dictionary<string, WorldProgressSummary> Worlds { get; set; } = new();
}

/// <summary>
/// Resumen de progreso por mundo.
/// </summary>
public class WorldProgressSummary
{
    public int LevelsCompleted { get; set; }
    public bool AllComplete { get; set; }
}

/// <summary>
/// Estadísticas de rendimiento del estudiante.
/// </summary>
public class StatsResponse
{
    public double AverageTimeMs { get; set; }
    public double AccuracyPercent { get; set; }
    public int TotalAttempts { get; set; }
    public int CorrectAttempts { get; set; }
    public int XpTotal { get; set; }
    public List<string> DominatedTopics { get; set; } = new();
    public List<string> WeakTopics { get; set; } = new();
}

/// <summary>
/// Entrada del leaderboard.
/// </summary>
public class LeaderboardEntry
{
    public int Rank { get; set; }
    public string Uid { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string AvatarUrl { get; set; } = string.Empty;
    public int XpTotal { get; set; }
    public string League { get; set; } = "Rookie";
}

/// <summary>
/// Resumen de misión para el dashboard.
/// </summary>
public class MissionSummary
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Type { get; set; } = "daily";
    public int XpReward { get; set; }
    public int Progress { get; set; }
    public int Target { get; set; }
    public bool Completed { get; set; }
}

/// <summary>
/// Resumen de logro.
/// </summary>
public class AchievementSummary
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Icon { get; set; } = "fa-solid fa-medal";
    public bool Unlocked { get; set; }
    public DateTime? UnlockedAt { get; set; }
}

/// <summary>
/// Resultado de comprar una vida en la tienda.
/// </summary>
public class BuyLifeResponse
{
    public int Gems { get; set; }
    public int Lives { get; set; }
}

/// <summary>
/// Resultado de registrar un intento.
/// </summary>
public class AttemptResultResponse
{
    public bool IsCorrect { get; set; }
    public int XpEarned { get; set; }
    public int NewXpTotal { get; set; }
    public int NewLevel { get; set; }
    public int CurrentStreak { get; set; }
    public List<AchievementSummary> NewAchievements { get; set; } = new();
}
