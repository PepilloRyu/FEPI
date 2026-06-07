using Google.Cloud.Firestore;

namespace MathGo.Domain.Entities;

/// <summary>
/// Representa un usuario registrado en la plataforma MathGo.
/// Almacenado en la colección Firestore <c>users/{uid}</c>.
/// </summary>
[FirestoreData]
public class User
{
    [FirestoreDocumentId]
    public string Uid { get; set; } = string.Empty;
    
    [FirestoreProperty("email")]
    public string Email { get; set; } = string.Empty;

    /// <summary>Rol del usuario: "student", "teacher" o "admin".</summary>
    [FirestoreProperty("role")]
    public string Role { get; set; } = "student";

    [FirestoreProperty("name")]
    public string Name { get; set; } = string.Empty;

    [FirestoreProperty("avatarUrl")]
    public string AvatarUrl { get; set; } = string.Empty;

    /// <summary>Nivel calculado a partir del XP total (floor(xp/100) + 1).</summary>
    [FirestoreProperty("level")]
    public int Level { get; set; } = 1;

    [FirestoreProperty("gamification")]
    public UserGamification? Gamification { get; set; }

    [FirestoreProperty("createdAt")]
    public DateTime CreatedAt { get; set; }
    
    [FirestoreProperty("updatedAt")]
    public DateTime UpdatedAt { get; set; }
}

/// <summary>
/// Sub-documento embebido con métricas de gamificación del usuario.
/// </summary>
[FirestoreData]
public class UserGamification
{
    [FirestoreProperty("xpTotal")]
    public int XpTotal { get; set; }

    [FirestoreProperty("streakDays")]
    public int StreakDays { get; set; }

    [FirestoreProperty("dailyStreak")]
    public int DailyStreak { get; set; }

    [FirestoreProperty("lastActiveDate")]
    public DateTime LastActiveDate { get; set; }

    [FirestoreProperty("currentLeague")]
    public string CurrentLeague { get; set; } = "Rookie";

    [FirestoreProperty("gems")]
    public int Gems { get; set; } = 500;

    [FirestoreProperty("hearts")]
    public int Hearts { get; set; } = 5;
}
