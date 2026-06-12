namespace MathGo.Application.Services;

/// <summary>
/// Lógica pura de regeneración de vidas — sin I/O.
/// Consumible desde ExerciseService y ProgressService sin dependencias circulares.
/// </summary>
public static class LivesHelper
{
    public const int MaxLives = 15;
    public const int RegenIntervalMinutes = 20;

    /// <summary>
    /// Calcula las vidas regeneradas desde la última pérdida.
    /// </summary>
    /// <returns>
    /// Tupla (NewLives, NewLastLifeLostAt, Changed).
    /// Changed=false indica que no hubo cambio y no se necesita persistir.
    /// </returns>
    public static (int NewLives, DateTime? NewLastLifeLostAt, bool Changed)
        CalculateRegenerated(int currentLives, DateTime? lastLifeLostAt)
    {
        // Ya está lleno o el timer nunca arrancó: sin cambios
        if (currentLives >= MaxLives || lastLifeLostAt == null)
            return (currentLives, lastLifeLostAt, false);

        double minutesElapsed = (DateTime.UtcNow - lastLifeLostAt.Value).TotalMinutes;

        // Menos de un intervalo completo: demasiado pronto
        if (minutesElapsed < RegenIntervalMinutes)
            return (currentLives, lastLifeLostAt, false);

        int intervalsElapsed = (int)(minutesElapsed / RegenIntervalMinutes); // floor
        int livesToAdd       = Math.Min(MaxLives - currentLives, intervalsElapsed);
        int newLives         = currentLives + livesToAdd;

        // Avanzar el timer exactamente por los intervalos APLICADOS, no por los transcurridos.
        // Esto preserva el remainder de tiempo parcial para el siguiente intervalo.
        DateTime? newLastLifeLostAt = newLives >= MaxLives
            ? null                                                              // lleno: timer apagado
            : lastLifeLostAt.Value.AddMinutes(livesToAdd * RegenIntervalMinutes);

        return (newLives, newLastLifeLostAt, true);
    }
}
