using Google.Cloud.Firestore;

namespace MathGo.Domain.Entities;

/// <summary>
/// Progreso global del usuario. Almacenado en <c>mathgo_progress/{uid}</c>.
/// Refleja la estructura que lee/escribe mathgo-engine.js en el frontend.
/// </summary>
[FirestoreData]
public class UserProgress
{
    [FirestoreDocumentId]
    public string Uid { get; set; } = string.Empty;

    [FirestoreProperty("totalXp")]
    public int TotalXp { get; set; }

    [FirestoreProperty("totalLevelsCompleted")]
    public int TotalLevelsCompleted { get; set; }

    [FirestoreProperty("totalWorldsCompleted")]
    public int TotalWorldsCompleted { get; set; }

    [FirestoreProperty("updatedAt")]
    public DateTime UpdatedAt { get; set; }

    [FirestoreProperty("streak")]
    public int Streak { get; set; }

    [FirestoreProperty("dailyStreak")]
    public int DailyStreak { get; set; }

    [FirestoreProperty("lastActiveDate")]
    public string LastActiveDate { get; set; } = string.Empty;

    [FirestoreProperty("gems")]
    public int Gems { get; set; }

    [FirestoreProperty("lives")]
    public int Lives { get; set; } = 5;

    [FirestoreProperty("worlds")]
    public Dictionary<string, WorldProgress> Worlds { get; set; } = new();
}

/// <summary>
/// Progreso dentro de un mundo específico.
/// </summary>
[FirestoreData]
public class WorldProgress
{
    [FirestoreProperty("levelsCompleted")]
    public List<int> LevelsCompleted { get; set; } = new();

    [FirestoreProperty("allComplete")]
    public bool AllComplete { get; set; }

    [FirestoreProperty("jumpExam")]
    public JumpExamProgress JumpExam { get; set; } = new();
}

/// <summary>
/// Estado del examen de salto de un mundo.
/// </summary>
[FirestoreData]
public class JumpExamProgress
{
    [FirestoreProperty("attempts")]
    public int Attempts { get; set; }

    [FirestoreProperty("passed")]
    public bool Passed { get; set; }
}
