using Google.Cloud.Firestore;

namespace MathGo.Domain.Entities;

[FirestoreData]
public class PracticeQuestion
{
    [FirestoreProperty]
    public string QuestionText { get; set; } = string.Empty;
    [FirestoreProperty]
    public string ExpectedAnswer { get; set; } = string.Empty;
    [FirestoreProperty]
    public string UserAnswer { get; set; } = string.Empty;
    [FirestoreProperty]
    public bool IsCorrect { get; set; }
}

[FirestoreData]
public class PracticeSession
{
    [FirestoreDocumentId]
    public string SessionId { get; set; } = string.Empty;
    
    [FirestoreProperty]
    public string UserId { get; set; } = string.Empty;
    
    [FirestoreProperty]
    public string LessonId { get; set; } = string.Empty;
    
    [FirestoreProperty]
    public string LessonTitle { get; set; } = string.Empty;
    
    [FirestoreProperty]
    public List<PracticeQuestion> Questions { get; set; } = new();
    
    [FirestoreProperty]
    public int Score { get; set; }
    
    [FirestoreProperty]
    public DateTime CreatedAt { get; set; }
    
    [FirestoreProperty]
    public DateTime UpdatedAt { get; set; }
}
