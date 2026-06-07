using Google.Cloud.Firestore;

namespace MathGo.Domain.Entities;

/// <summary>
/// Progreso de un usuario en una misión específica.
/// Almacenada en <c>user_missions</c>.
/// </summary>
[FirestoreData]
public class UserMission
{
    [FirestoreDocumentId]
    public string Id { get; set; } = string.Empty;

    [FirestoreProperty("userId")]
    public string UserId { get; set; } = string.Empty;

    [FirestoreProperty("missionId")]
    public string MissionId { get; set; } = string.Empty;

    [FirestoreProperty("progress")]
    public int Progress { get; set; }

    [FirestoreProperty("completed")]
    public bool Completed { get; set; }

    [FirestoreProperty("dateAssigned")]
    public DateTime DateAssigned { get; set; }

    [FirestoreProperty("dateCompleted")]
    public DateTime? DateCompleted { get; set; }
}
