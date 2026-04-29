using Google.Cloud.Firestore;

namespace MathGo.Domain.Entities;

[FirestoreData]
public class Topic
{
    [FirestoreDocumentId]
    public string Id { get; set; } = string.Empty;

    [FirestoreProperty("title")]
    public string Title { get; set; } = string.Empty;

    [FirestoreProperty("order")]
    public int Order { get; set; }

    [FirestoreProperty("theory")]
    public TopicTheory Theory { get; set; } = new();

    [FirestoreProperty("example")]
    public TopicExample Example { get; set; } = new();

    [FirestoreProperty("exercises")]
    public List<TopicExercise> Exercises { get; set; } = new();
}

[FirestoreData]
public class TopicTheory
{
    [FirestoreProperty("content")]
    public string Content { get; set; } = string.Empty;

    [FirestoreProperty("mediaUrl")]
    public string? MediaUrl { get; set; }
}

[FirestoreData]
public class TopicExample
{
    [FirestoreProperty("problemStatement")]
    public string ProblemStatement { get; set; } = string.Empty;

    [FirestoreProperty("stepByStepSolution")]
    public List<string> StepByStepSolution { get; set; } = new();
}

[FirestoreData]
public class TopicExercise
{
    [FirestoreProperty("id")]
    public string Id { get; set; } = string.Empty;

    [FirestoreProperty("type")]
    public string Type { get; set; } = "multiple_choice"; // "multiple_choice", "input", "true_false"

    [FirestoreProperty("question")]
    public string Question { get; set; } = string.Empty;

    [FirestoreProperty("options")]
    public List<string>? Options { get; set; }

    [FirestoreProperty("correctAnswer")]
    public string CorrectAnswer { get; set; } = string.Empty;

    [FirestoreProperty("xpReward")]
    public int XpReward { get; set; } = 10;
}
