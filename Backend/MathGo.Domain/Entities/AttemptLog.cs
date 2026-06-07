using Google.Cloud.Firestore;

namespace MathGo.Domain.Entities;

/// <summary>
/// Registro de un intento de resolución de ejercicio.
/// Almacenado en la colección <c>attempts</c>.
/// </summary>
[FirestoreData]
public class AttemptLog
{
    [FirestoreDocumentId]
    public string Id { get; set; } = string.Empty;

    [FirestoreProperty("userId")]
    public string UserId { get; set; } = string.Empty;

    [FirestoreProperty("worldId")]
    public int WorldId { get; set; }

    [FirestoreProperty("levelId")]
    public int LevelId { get; set; }

    [FirestoreProperty("topicId")]
    public string TopicId { get; set; } = string.Empty;

    [FirestoreProperty("subjectId")]
    public string SubjectId { get; set; } = string.Empty;

    [FirestoreProperty("unitId")]
    public string UnitId { get; set; } = string.Empty;

    [FirestoreProperty("exerciseId")]
    public string ExerciseId { get; set; } = string.Empty;

    [FirestoreProperty("isCorrect")]
    public bool IsCorrect { get; set; }

    [FirestoreProperty("userAnswer")]
    public string UserAnswer { get; set; } = string.Empty;

    [FirestoreProperty("correctAnswer")]
    public string CorrectAnswer { get; set; } = string.Empty;

    [FirestoreProperty("score")]
    public int Score { get; set; }

    [FirestoreProperty("xpEarned")]
    public int XpEarned { get; set; }

    /// <summary>Tiempo de resolución en milisegundos.</summary>
    [FirestoreProperty("timeMs")]
    public long TimeMs { get; set; }

    /// <summary>Si el usuario usó la pista antes de responder.</summary>
    [FirestoreProperty("usedHint")]
    public bool UsedHint { get; set; }

    [FirestoreProperty("completedAt")]
    public DateTime CompletedAt { get; set; }

    [FirestoreProperty("errors")]
    public List<AttemptError> Errors { get; set; } = new();
}

/// <summary>
/// Detalle de un error dentro de un intento.
/// </summary>
[FirestoreData]
public class AttemptError
{
    [FirestoreProperty("exerciseId")]
    public string ExerciseId { get; set; } = string.Empty;

    [FirestoreProperty("submittedAnswer")]
    public string SubmittedAnswer { get; set; } = string.Empty;

    [FirestoreProperty("correctAnswer")]
    public string CorrectAnswer { get; set; } = string.Empty;
}

