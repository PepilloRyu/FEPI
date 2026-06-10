using MathGo.Application.DTOs.Requests;
using MathGo.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace MathGo.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProgressController : ControllerBase
{
    private readonly IProgressService _progressService;

    public ProgressController(IProgressService progressService)
    {
        _progressService = progressService;
    }

    [HttpGet]
    public async Task<IActionResult> GetProgress()
    {
        var uid = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(uid)) return Unauthorized();

        var progress = await _progressService.GetProgressAsync(uid);
        return Ok(progress);
    }

    [HttpPost("complete-level")]
    public async Task<IActionResult> CompleteLevel([FromBody] CompleteLevelRequest request)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var uid = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(uid)) return Unauthorized();

        try
        {
            await _progressService.CompleteLevelAsync(uid, request);
            return NoContent();
        }
        catch (Exception ex)
        {
            return BadRequest(new { Message = ex.Message });
        }
    }
}
