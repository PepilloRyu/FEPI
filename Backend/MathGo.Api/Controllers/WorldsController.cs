using MathGo.Application.Interfaces.Services;
using MathGo.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MathGo.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class WorldsController : ControllerBase
{
    private readonly IWorldService _worldService;

    public WorldsController(IWorldService worldService)
    {
        _worldService = worldService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllWorlds()
    {
        var worlds = await _worldService.GetAllWorldsAsync();
        
        // In a strict production app we should map this to a DTO to remove Correct/Answer fields
        // But the front end already strips them when loading if necessary, or we can strip here:
        foreach (var world in worlds)
        {
            foreach (var level in world.Levels)
            {
                foreach (var challenge in level.Challenges)
                {
                    // Wipe the answers before sending to the client
                    if (challenge.Options != null)
                    {
                        foreach(var opt in challenge.Options) opt.Correct = false;
                    }
                    challenge.Answer = null;
                    challenge.Answers = null;
                }
            }
        }

        return Ok(worlds);
    }
}
