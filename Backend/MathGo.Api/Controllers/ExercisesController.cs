using MathGo.Application.DTOs.Requests;
using MathGo.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace MathGo.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ExercisesController : ControllerBase
{
    private readonly IExerciseService _exerciseService;
    private readonly IProgressService _progressService;

    public ExercisesController(IExerciseService exerciseService, IProgressService progressService)
    {
        _exerciseService = exerciseService;
        _progressService = progressService;
    }

    /// <summary>
    /// Devuelve todos los ejercicios de un mundo en lista plana, sin respuestas correctas.
    /// Cada ejercicio incluye su id compuesto "{worldId}_{levelId}_{exerciseId}".
    /// </summary>
    [HttpGet("world/{worldId:int}")]
    public async Task<IActionResult> GetByWorld(int worldId)
    {
        try
        {
            var exercises = await _exerciseService.GetExercisesByWorldAsync(worldId);
            return Ok(exercises);
        }
        catch (Exception ex)
        {
            return BadRequest(new { Message = ex.Message });
        }
    }

    /// <summary>
    /// Valida la respuesta del usuario para un ejercicio y otorga XP si es correcta.
    /// Body: { userId: string, userAnswer: any }
    /// Response: { correct: bool, xpAwarded: int }
    /// </summary>
    [HttpPost("{id}/answer")]
    public async Task<IActionResult> SubmitAnswer(string id, [FromBody] AnswerRequest request)
    {
        var uid = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(uid)) return Unauthorized();

        try
        {
            var result = await _exerciseService.CheckAnswerAsync(id, uid, request.UserAnswer);
            return Ok(result);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { Message = ex.Message });
        }
        catch (Exception ex)
        {
            return BadRequest(new { Message = ex.Message });
        }
    }

    /// <summary>Registra un intento de ejercicio y actualiza el progreso del usuario.</summary>
    [HttpPost("attempt")]
    public async Task<IActionResult> SubmitAttempt([FromBody] SubmitAttemptRequest request)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var uid = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(uid)) return Unauthorized();

        try
        {
            var result = await _progressService.SubmitAttemptAsync(uid, request);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { Message = ex.Message });
        }
    }
}
