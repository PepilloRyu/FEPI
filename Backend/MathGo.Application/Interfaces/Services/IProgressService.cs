using MathGo.Application.DTOs.Requests;
using MathGo.Application.DTOs.Responses;

namespace MathGo.Application.Interfaces.Services;

/// <summary>
/// Gestión del progreso del estudiante.
/// </summary>
public interface IProgressService
{
    /// <summary>Obtiene el progreso completo del usuario.</summary>
    Task<ProgressSummary> GetProgressAsync(string uid);

    /// <summary>Registra un intento de ejercicio y actualiza XP/streak.</summary>
    Task<AttemptResultResponse> SubmitAttemptAsync(string uid, SubmitAttemptRequest request);

    /// <summary>Marca un nivel como completado en mathgo_progress y dispara evaluación de logros/misiones.</summary>
    Task CompleteLevelAsync(string uid, CompleteLevelRequest request);

    /// <summary>Obtiene estadísticas de rendimiento.</summary>
    Task<StatsResponse> GetStatsAsync(string uid);
}
