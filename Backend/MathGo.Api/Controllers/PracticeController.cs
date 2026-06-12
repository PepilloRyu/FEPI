using MathGo.Application.DTOs.Requests;
using MathGo.Application.Interfaces.Services;
using MathGo.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace MathGo.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PracticeController : ControllerBase
{
    private readonly IPracticeService _practiceService;

    public PracticeController(IPracticeService practiceService)
    {
        _practiceService = practiceService;
    }

    [HttpGet]
    public async Task<IActionResult> GetMySessions()
    {
        // Obtenemos el UID desde el token de Firebase Auth
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var sessions = await _practiceService.GetSessionsByUserIdAsync(userId);
        return Ok(sessions);
    }

    [HttpPost]
    public async Task<IActionResult> CreateSession([FromBody] CreatePracticeSessionRequest request)
    {
        // La validación se hace automáticamente si registramos los validadores con FluentValidation
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var session = await _practiceService.CreateSessionAsync(userId, request);
        return Created("", session);
    }
}
