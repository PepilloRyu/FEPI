namespace MathGo.Application.DTOs.Responses;

/// <summary>Resultado de validar una respuesta de ejercicio.</summary>
public class AnswerResultDto
{
    public bool Correct { get; set; }
    public int XpAwarded { get; set; }
    public int RemainingLives { get; set; }
}
