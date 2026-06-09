using MathGo.Application.Interfaces.Repositories;
using MathGo.Application.Interfaces.Services;
using MathGo.Domain.Entities;

namespace MathGo.Application.Services;

public class WorldService : IWorldService
{
    private readonly IWorldRepository _worldRepository;

    public WorldService(IWorldRepository worldRepository)
    {
        _worldRepository = worldRepository;
    }

    public async Task<IEnumerable<World>> GetAllWorldsAsync()
    {
        // When sending to client, we should ideally strip out the "Answer" and "Correct" fields from challenges
        // But for now, let's just return the worlds. The stripping will happen in the Controller or a specific DTO mapping later.
        var worlds = await _worldRepository.GetAllAsync();
        return worlds.OrderBy(w => w.WorldId);
    }

    public async Task<World?> GetWorldByIdAsync(string id)
    {
        return await _worldRepository.GetByIdAsync(id);
    }

    public async Task SeedWorldsAsync(List<World> worlds)
    {
        foreach (var world in worlds)
        {
            // Use the worldId as the document ID for consistency (e.g. "world_1")
            var docId = $"world_{world.WorldId}";
            world.Id = docId;
            
            // Assign unique IDs to challenges if they don't have one
            foreach (var level in world.Levels)
            {
                foreach (var challenge in level.Challenges)
                {
                    if (string.IsNullOrEmpty(challenge.Id))
                    {
                        challenge.Id = Guid.NewGuid().ToString();
                    }
                }
            }

            // Save to Firestore
            var existing = await _worldRepository.GetByIdAsync(docId);
            if (existing == null)
            {
                await _worldRepository.AddAsync(world, docId);
            }
            else
            {
                await _worldRepository.UpdateAsync(docId, world);
            }
        }
    }
}
