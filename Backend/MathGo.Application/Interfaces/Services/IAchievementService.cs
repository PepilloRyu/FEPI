using MathGo.Application.DTOs.Responses;

namespace MathGo.Application.Interfaces.Services;

/// <summary>
/// Gestión de logros desbloqueables.
/// </summary>
public interface IAchievementService
{
    /// <summary>Obtiene todos los logros con estado de desbloqueo para el usuario.</summary>
    Task<List<AchievementSummary>> GetAllAchievementsAsync(string uid);

    /// <summary>Desbloquea un logro para el usuario. Devuelve null si no existe o ya estaba desbloqueado.</summary>
    Task<AchievementSummary?> UnlockAchievementAsync(string uid, string achievementId);

    /// <summary>Evalúa y desbloquea todos los logros que el usuario ya cumple pero no tiene aún.</summary>
    Task<List<AchievementSummary>> EvaluateNewAchievementsAsync(string uid);
}
