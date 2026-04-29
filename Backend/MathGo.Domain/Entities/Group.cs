using Google.Cloud.Firestore;

namespace MathGo.Domain.Entities;

[FirestoreData]
public class Group
{
    [FirestoreDocumentId]
    public string Id { get; set; } = string.Empty;

    [FirestoreProperty("teacherId")]
    public string TeacherId { get; set; } = string.Empty;

    [FirestoreProperty("name")]
    public string Name { get; set; } = string.Empty;

    [FirestoreProperty("accessCode")]
    public string AccessCode { get; set; } = string.Empty;

    [FirestoreProperty("createdAt")]
    public DateTime CreatedAt { get; set; }

    [FirestoreProperty("members")]
    public List<GroupMember> Members { get; set; } = new();
}

[FirestoreData]
public class GroupMember
{
    [FirestoreProperty("studentId")]
    public string StudentId { get; set; } = string.Empty;

    [FirestoreProperty("name")]
    public string Name { get; set; } = string.Empty;

    [FirestoreProperty("avatarUrl")]
    public string AvatarUrl { get; set; } = string.Empty;

    [FirestoreProperty("xpTotal")]
    public int XpTotal { get; set; }
}
