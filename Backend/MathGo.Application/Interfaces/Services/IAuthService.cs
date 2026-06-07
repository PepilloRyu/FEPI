using MathGo.Application.DTOs.Requests;
using MathGo.Application.DTOs.Responses;

namespace MathGo.Application.Interfaces.Services;

/// <summary>
/// Gestión de autenticación y registro de usuarios vía Firebase Auth.
/// </summary>
public interface IAuthService
{
    /// <summary>Registra un nuevo usuario en Firebase Auth y Firestore.</summary>
    Task<UserProfileResponse> RegisterAsync(RegisterRequest request);

    /// <summary>Obtiene el perfil del usuario autenticado a partir de su UID (del JWT).</summary>
    Task<UserProfileResponse?> GetCurrentUserAsync(string uid);

    /// <summary>Revoca los refresh tokens del usuario (logout server-side).</summary>
    Task RevokeRefreshTokensAsync(string uid);
}
