using Google.Cloud.Firestore;

namespace MathGo.Domain.Entities;

[FirestoreData]
public class AttemptLog
{
    [FirestoreDocumentId]
    public string Id { get; set; } = string.Empty;

    [FirestoreProperty("topicId")]
    public string TopicId { get; set; } = string.Empty;

    [FirestoreProperty("subjectId")]
    public string SubjectId { get; set; } = string.Empty;

    [FirestoreProperty("unitId")]
    public string UnitId { get; set; } = string.Empty;

    [FirestoreProperty("score")]
    public int Score { get; set; }

    [FirestoreProperty("xpEarned")]
    public int XpEarned { get; set; }

    [FirestoreProperty("completedAt")]
    public DateTime CompletedAt { get; set; }

    [FirestoreProperty("errors")]
    public List<AttemptError> Errors { get; set; } = new();
}

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
