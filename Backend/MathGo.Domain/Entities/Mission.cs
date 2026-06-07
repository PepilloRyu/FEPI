using Google.Cloud.Firestore;

namespace MathGo.Domain.Entities;

/// <summary>
/// Definición de una misión (diaria o semanal).
/// Almacenada en la colección <c>missions</c>.
/// </summary>
[FirestoreData]
public class Mission
{
    [FirestoreDocumentId]
    public string Id { get; set; } = string.Empty;

    [FirestoreProperty("name")]
    public string Name { get; set; } = string.Empty;

    [FirestoreProperty("description")]
    public string Description { get; set; } = string.Empty;

    /// <summary>"daily" o "weekly".</summary>
    [FirestoreProperty("type")]
    public string Type { get; set; } = "daily";

    [FirestoreProperty("xpReward")]
    public int XpReward { get; set; }

    [FirestoreProperty("objective")]
    public MissionObjective Objective { get; set; } = new();

    [FirestoreProperty("isActive")]
    public bool IsActive { get; set; } = true;
}

/// <summary>
/// Objetivo cuantificable de una misión.
/// </summary>
[FirestoreData]
public class MissionObjective
{
    /// <summary>Métrica a evaluar: "xp_earned", "levels_completed", "streak_days", "perfect_lessons".</summary>
    [FirestoreProperty("metric")]
    public string Metric { get; set; } = string.Empty;

    /// <summary>Valor objetivo que debe alcanzarse.</summary>
    [FirestoreProperty("target")]
    public int Target { get; set; }
}
