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

    [HttpPost("{id}/validate")]
    public async Task<IActionResult> ValidateAnswer(string id, [FromBody] ValidateAnswerRequest request)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var isValid = await _exerciseService.ValidateAnswerAsync(id, request);
        return Ok(new { IsCorrect = isValid });
    }

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
