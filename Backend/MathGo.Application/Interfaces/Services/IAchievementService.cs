using MathGo.Application.DTOs.Responses;

namespace MathGo.Application.Interfaces.Services;

/// <summary>
/// Gestión de logros desbloqueables.
/// </summary>
public interface IAchievementService
{
    /// <summary>Obtiene todos los logros con estado de desbloqueo para el usuario.</summary>
    Task<List<AchievementSummary>> GetAllAchievementsAsync(string uid);

    /// <summary>Evalúa si el usuario ha desbloqueado nuevos logros.</summary>
    Task<List<AchievementSummary>> EvaluateNewAchievementsAsync(string uid);
}
