using MathGo.Application.DTOs.Responses;

namespace MathGo.Application.Interfaces.Services;

/// <summary>
/// Analíticas y reportes de rendimiento.
/// </summary>
public interface IAnalyticsService
{
    /// <summary>Reporte personal del estudiante.</summary>
    Task<StatsResponse> GetPersonalStatsAsync(string uid);

    /// <summary>Reporte de un grupo (para teachers).</summary>
    Task<List<StatsResponse>> GetGroupStatsAsync(string groupId);
}
