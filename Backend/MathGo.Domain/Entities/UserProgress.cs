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

    [FirestoreProperty("dailyStreak")]
    public int DailyStreak { get; set; }

    [FirestoreProperty("lastActiveDate")]
    public string LastActiveDate { get; set; } = string.Empty;

    [FirestoreProperty("gems")]
    public int Gems { get; set; } = 0;

    [FirestoreProperty("lives")]
    public int Lives { get; set; } = 15;

    [FirestoreProperty("lastLifeLostAt")]
    public DateTime? LastLifeLostAt { get; set; } = null;

    [FirestoreProperty("xpBoostUntil")]
    public DateTime? XpBoostUntil { get; set; } = null;

    [FirestoreProperty("level")]
    public int Level { get; set; } = 1;

    [FirestoreProperty("weeklyActivity")]
    public List<int> WeeklyActivity { get; set; } = new() { 0, 0, 0, 0, 0, 0, 0 };

    [FirestoreProperty("weeklyActivityStart")]
    public string WeeklyActivityStart { get; set; } = string.Empty;

    [FirestoreProperty("weeklyXp")]
    public int WeeklyXp { get; set; }

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
