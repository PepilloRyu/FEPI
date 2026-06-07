using MathGo.Application.DTOs.Requests;
using MathGo.Application.DTOs.Responses;

namespace MathGo.Application.Interfaces.Services;

/// <summary>
/// Gestión de perfiles de usuario.
/// </summary>
public interface IUserService
{
    /// <summary>Obtiene el perfil completo del usuario.</summary>
    Task<UserProfileResponse?> GetProfileAsync(string uid);

    /// <summary>Actualiza nombre y/o avatar del usuario.</summary>
    Task<UserProfileResponse> UpdateProfileAsync(string uid, UpdateProfileRequest request);

    /// <summary>Obtiene el dashboard del estudiante (perfil + progreso + misiones + logros).</summary>
    Task<DashboardResponse> GetDashboardAsync(string uid);

    /// <summary>Obtiene el leaderboard (top N usuarios por XP).</summary>
    Task<List<LeaderboardEntry>> GetLeaderboardAsync(int top = 20);
}
