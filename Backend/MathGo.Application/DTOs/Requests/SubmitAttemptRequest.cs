using System.ComponentModel.DataAnnotations;

namespace MathGo.Application.DTOs.Requests;

/// <summary>
/// Solicitud para registrar un intento de ejercicio.
/// </summary>
public class SubmitAttemptRequest
{
    [Required]
    public int WorldId { get; set; }

    [Required]
    public int LevelId { get; set; }

    [Required]
    public string ExerciseId { get; set; } = string.Empty;

    public string TopicId { get; set; } = string.Empty;

    [Required]
    public bool IsCorrect { get; set; }

    [Required]
    public string UserAnswer { get; set; } = string.Empty;

    [Required]
    public string CorrectAnswer { get; set; } = string.Empty;

    /// <summary>Tiempo en milisegundos que tardó el usuario.</summary>
    public long TimeMs { get; set; }

    /// <summary>Si el usuario usó pista.</summary>
    public bool UsedHint { get; set; }
}
