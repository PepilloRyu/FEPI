using Google.Cloud.Firestore;

namespace MathGo.Domain.Entities;

/// <summary>
/// Definición de un logro desbloqueable.
/// Almacenado en la colección <c>achievements</c>.
/// </summary>
[FirestoreData]
public class Achievement
{
    [FirestoreDocumentId]
    public string Id { get; set; } = string.Empty;

    [FirestoreProperty("name")]
    public string Name { get; set; } = string.Empty;

    [FirestoreProperty("description")]
    public string Description { get; set; } = string.Empty;

    [FirestoreProperty("icon")]
    public string Icon { get; set; } = "🏅";

    [FirestoreProperty("condition")]
    public AchievementCondition Condition { get; set; } = new();
}

/// <summary>
/// Condición que debe cumplirse para desbloquear un logro.
/// </summary>
[FirestoreData]
public class AchievementCondition
{
    /// <summary>Tipo de condición: "levels_completed", "xp_total", "streak_days", "worlds_completed".</summary>
    [FirestoreProperty("type")]
    public string Type { get; set; } = string.Empty;

    /// <summary>Valor objetivo.</summary>
    [FirestoreProperty("target")]
    public int Target { get; set; }
}
