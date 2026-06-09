using MathGo.Domain.Entities;

namespace MathGo.Application.Interfaces.Services;

public interface IWorldService
{
    Task<IEnumerable<World>> GetAllWorldsAsync();
    Task<World?> GetWorldByIdAsync(string id);
    Task SeedWorldsAsync(List<World> worlds);
}
