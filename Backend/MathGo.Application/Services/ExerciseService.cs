using MathGo.Application.DTOs.Requests;
using MathGo.Application.Interfaces.Services;

namespace MathGo.Application.Services;

public class ExerciseService : IExerciseService
{
    public async Task<bool> ValidateAnswerAsync(string exerciseId, ValidateAnswerRequest request)
    {
        // Simple mock for now. Will be hooked into the actual exercises database if needed.
        await Task.CompletedTask;
        return true; 
    }
}
