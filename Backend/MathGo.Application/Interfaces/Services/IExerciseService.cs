using MathGo.Application.DTOs.Requests;

namespace MathGo.Application.Interfaces.Services;

public interface IExerciseService
{
    Task<bool> ValidateAnswerAsync(string exerciseId, ValidateAnswerRequest request);
}
