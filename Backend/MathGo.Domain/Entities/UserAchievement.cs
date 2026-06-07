using Google.Cloud.Firestore;

namespace MathGo.Domain.Entities;

/// <summary>
/// Registro de un logro desbloqueado por un usuario.
/// Almacenado en <c>user_achievements</c>.
/// </summary>
[FirestoreData]
public class UserAchievement
{
    [FirestoreDocumentId]
    public string Id { get; set; } = string.Empty;

    [FirestoreProperty("userId")]
    public string UserId { get; set; } = string.Empty;

    [FirestoreProperty("achievementId")]
    public string AchievementId { get; set; } = string.Empty;

    [FirestoreProperty("unlockedAt")]
    public DateTime UnlockedAt { get; set; }
}
