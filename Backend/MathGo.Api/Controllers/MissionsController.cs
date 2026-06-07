using MathGo.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace MathGo.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class MissionsController : ControllerBase
{
    private readonly IMissionService _missionService;

    public MissionsController(IMissionService missionService)
    {
        _missionService = missionService;
    }

    [HttpGet]
    public async Task<IActionResult> GetMissions()
    {
        var uid = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(uid)) return Unauthorized();

        var missions = await _missionService.GetActiveMissionsAsync(uid);
        return Ok(missions);
    }

    [HttpPost("{id}/complete")]
    public async Task<IActionResult> CompleteMission(string id)
    {
        var uid = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(uid)) return Unauthorized();

        var result = await _missionService.CompleteMissionAsync(uid, id);
        if (result == null) return BadRequest(new { Message = "Failed to complete mission or mission not found." });

        return Ok(result);
    }
}
