using Google.Cloud.Firestore;

namespace MathGo.Domain.Entities;

[FirestoreData]
public class TheoryLesson
{
    [FirestoreDocumentId]
    public string LessonId { get; set; } = string.Empty;
    
    [FirestoreProperty]
    public string Title { get; set; } = string.Empty;
    
    [FirestoreProperty]
    public string Content { get; set; } = string.Empty;
    
    [FirestoreProperty]
    public int DifficultyLevel { get; set; }
    
    [FirestoreProperty]
    public List<string> Tags { get; set; } = new();
    
    [FirestoreProperty]
    public DateTime CreatedAt { get; set; }
    
    [FirestoreProperty]
    public DateTime UpdatedAt { get; set; }
}
