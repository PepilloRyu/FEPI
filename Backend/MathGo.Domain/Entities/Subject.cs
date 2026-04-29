using Google.Cloud.Firestore;

namespace MathGo.Domain.Entities;

[FirestoreData]
public class Subject
{
    [FirestoreDocumentId]
    public string Id { get; set; } = string.Empty;

    [FirestoreProperty("title")]
    public string Title { get; set; } = string.Empty;

    [FirestoreProperty("description")]
    public string Description { get; set; } = string.Empty;

    [FirestoreProperty("isActive")]
    public bool IsActive { get; set; } = true;
}
