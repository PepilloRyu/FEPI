using MathGo.Application.DTOs.Requests;
using MathGo.Application.Interfaces.Repositories;
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
    private readonly IPracticeRepository _practiceRepository;

    public PracticeController(IPracticeRepository practiceRepository)
    {
        _practiceRepository = practiceRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetMySessions()
    {
        // Obtenemos el UID desde el token de Firebase Auth
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var sessions = await _practiceRepository.GetByUserIdAsync(userId);
        return Ok(sessions);
    }

    [HttpPost]
    public async Task<IActionResult> CreateSession([FromBody] CreatePracticeSessionRequest request)
    {
        // La validación se hace automáticamente si registramos los validadores con FluentValidation
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var session = new PracticeSession
        {
            UserId = userId,
            LessonId = request.LessonId,
            LessonTitle = request.LessonTitle,
            Score = request.Score,
            Questions = request.Questions.Select(q => new PracticeQuestion
            {
                QuestionText = q.QuestionText,
                ExpectedAnswer = q.ExpectedAnswer,
                UserAnswer = q.UserAnswer,
                IsCorrect = q.IsCorrect
            }).ToList(),
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        await _practiceRepository.AddAsync(session);
        return Created("", session);
    }
}
