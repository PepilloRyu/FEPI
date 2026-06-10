using MathGo.Application.DTOs.Responses;

namespace MathGo.Application.Interfaces.Repositories;

public interface IExerciseRepository
{
    Task<List<ExerciseDto>> GetByWorldAsync(int worldId);
}
