using Google.Cloud.Firestore;

namespace MathGo.Domain.Entities;

[FirestoreData]
public class Unit
{
    [FirestoreDocumentId]
    public string Id { get; set; } = string.Empty;

    [FirestoreProperty("title")]
    public string Title { get; set; } = string.Empty;

    [FirestoreProperty("order")]
    public int Order { get; set; }

    [FirestoreProperty("description")]
    public string Description { get; set; } = string.Empty;
}
