using MathGo.Application.DTOs.Responses;

namespace MathGo.Application.Interfaces.Services;

/// <summary>
/// Gestión de misiones diarias y semanales.
/// </summary>
public interface IMissionService
{
    /// <summary>Obtiene las misiones activas del usuario.</summary>
    Task<List<MissionSummary>> GetActiveMissionsAsync(string uid);

    /// <summary>Completa una misión y otorga la recompensa XP.</summary>
    Task<MissionSummary?> CompleteMissionAsync(string uid, string missionId);

    /// <summary>Evalúa y actualiza el progreso de todas las misiones activas tras un evento.</summary>
    Task EvaluateMissionProgressAsync(string uid, string eventType, int value);
}
