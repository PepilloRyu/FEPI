using MathGo.Application.DTOs.Responses;
using System.Text.Json;

namespace MathGo.Application.Interfaces.Services;

public interface IExerciseService
{
    /// <summary>Devuelve todos los ejercicios de un mundo (sin respuestas correctas para estudiantes, con respuestas para admins).</summary>
    Task<List<ExerciseDto>> GetExercisesByWorldAsync(int worldId, bool isAdmin = false);

    /// <summary>Valida la respuesta del usuario y otorga XP si es correcta.</summary>
    Task<AnswerResultDto> CheckAnswerAsync(string exerciseId, string uid, JsonElement userAnswer);
}
