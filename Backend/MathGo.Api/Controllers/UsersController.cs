using MathGo.Application.DTOs.Requests;
using MathGo.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace MathGo.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize] // All user endpoints require authentication
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("me")]
    public async Task<IActionResult> GetCurrentUser()
    {
        var uid = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(uid)) return Unauthorized();

        var profile = await _userService.GetProfileAsync(uid);
        if (profile == null) return NotFound(new { Message = "User profile not found." });

        return Ok(profile);
    }

    [HttpPut("me")]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileRequest request)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var uid = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(uid)) return Unauthorized();

        try
        {
            var updatedProfile = await _userService.UpdateProfileAsync(uid, request);
            return Ok(updatedProfile);
        }
        catch (Exception ex)
        {
            return BadRequest(new { Message = ex.Message });
        }
    }

    [HttpGet("dashboard")]
    public async Task<IActionResult> GetDashboard()
    {
        var uid = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(uid)) return Unauthorized();

        try
        {
            var dashboard = await _userService.GetDashboardAsync(uid);
            return Ok(dashboard);
        }
        catch (Exception ex)
        {
            return BadRequest(new { Message = ex.Message });
        }
    }

    [HttpGet("leaderboard")]
    [AllowAnonymous] // Leaderboard can be public or authenticated
    public async Task<IActionResult> GetLeaderboard([FromQuery] int top = 20)
    {
        var leaderboard = await _userService.GetLeaderboardAsync(top);
        return Ok(leaderboard);
    }
}
