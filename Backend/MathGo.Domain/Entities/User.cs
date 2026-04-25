using Google.Cloud.Firestore;

namespace MathGo.Domain.Entities;

[FirestoreData]
public class User
{
    [FirestoreDocumentId]
    public string Uid { get; set; } = string.Empty;
    
    [FirestoreProperty]
    public string Email { get; set; } = string.Empty;
    
    [FirestoreProperty]
    public string DisplayName { get; set; } = string.Empty;
    
    [FirestoreProperty]
    public int GlobalScore { get; set; }

    [FirestoreProperty]
    public DateTime CreatedAt { get; set; }
    
    [FirestoreProperty]
    public DateTime UpdatedAt { get; set; }
}
