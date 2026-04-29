using Google.Cloud.Firestore;

namespace MathGo.Domain.Entities;

[FirestoreData]
public class User
{
    [FirestoreDocumentId]
    public string Uid { get; set; } = string.Empty;
    
    [FirestoreProperty("email")]
    public string Email { get; set; } = string.Empty;

    [FirestoreProperty("role")]
    public string Role { get; set; } = "student"; // "admin", "teacher", "student"

    [FirestoreProperty("name")]
    public string Name { get; set; } = string.Empty;

    [FirestoreProperty("avatarUrl")]
    public string AvatarUrl { get; set; } = string.Empty;

    [FirestoreProperty("gamification")]
    public UserGamification? Gamification { get; set; }

    [FirestoreProperty("createdAt")]
    public DateTime CreatedAt { get; set; }
    
    [FirestoreProperty("updatedAt")]
    public DateTime UpdatedAt { get; set; }
}

[FirestoreData]
public class UserGamification
{
    [FirestoreProperty("xpTotal")]
    public int XpTotal { get; set; }

    [FirestoreProperty("streakDays")]
    public int StreakDays { get; set; }

    [FirestoreProperty("lastActiveDate")]
    public DateTime LastActiveDate { get; set; }

    [FirestoreProperty("currentLeague")]
    public string CurrentLeague { get; set; } = "Rookie";
}
