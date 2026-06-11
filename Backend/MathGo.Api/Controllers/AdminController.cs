using MathGo.Application.Interfaces.Services;
using MathGo.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MathGo.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "admin,teacher")] // Role-based authorization example
public class AdminController : ControllerBase
{
    private readonly IWorldService _worldService;

    public AdminController(IWorldService worldService)
    {
        _worldService = worldService;
    }

    [HttpPost("seed-worlds")]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> SeedWorlds([FromBody] List<World> worlds)
    {
        await _worldService.SeedWorldsAsync(worlds);
        return Ok(new { Message = $"Seeded {worlds.Count} worlds successfully" });
    }
}
