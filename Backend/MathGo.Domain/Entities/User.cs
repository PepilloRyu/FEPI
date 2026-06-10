using Google.Cloud.Firestore;

namespace MathGo.Domain.Entities;

/// <summary>
/// Representa un usuario registrado en la plataforma MathGo.
/// Almacenado en la colección Firestore <c>users/{uid}</c>.
/// </summary>
[FirestoreData]
public class User
{
    [FirestoreDocumentId]
    public string Uid { get; set; } = string.Empty;
    
    [FirestoreProperty("email")]
    public string Email { get; set; } = string.Empty;

    /// <summary>Rol del usuario: "student", "teacher" o "admin".</summary>
    [FirestoreProperty("role")]
    public string Role { get; set; } = "student";

    [FirestoreProperty("name")]
    public string Name { get; set; } = string.Empty;

    [FirestoreProperty("avatarUrl")]
    public string AvatarUrl { get; set; } = string.Empty;

    [FirestoreProperty("createdAt")]
    public DateTime CreatedAt { get; set; }
}

