using Google.Cloud.Firestore;

namespace MathGo.Domain.Entities;

[FirestoreData]
public class FeedbackReport
{
    [FirestoreDocumentId]
    public string FeedbackId { get; set; } = string.Empty;
    
    [FirestoreProperty]
    public string SessionId { get; set; } = string.Empty;
    
    [FirestoreProperty]
    public string UserId { get; set; } = string.Empty;
    
    [FirestoreProperty]
    public string OverallComments { get; set; } = string.Empty;
    
    [FirestoreProperty]
    public List<string> ImprovementAreas { get; set; } = new();
    
    [FirestoreProperty]
    public DateTime CreatedAt { get; set; }

    [FirestoreProperty]
    public DateTime UpdatedAt { get; set; }
}
