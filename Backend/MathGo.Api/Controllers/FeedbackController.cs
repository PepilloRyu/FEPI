using MathGo.Application.Interfaces.Repositories;
using MathGo.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MathGo.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class FeedbackController : ControllerBase
{
    private readonly IFeedbackRepository _feedbackRepository;

    public FeedbackController(IFeedbackRepository feedbackRepository)
    {
        _feedbackRepository = feedbackRepository;
    }

    [HttpGet("session/{sessionId}")]
    public async Task<IActionResult> GetBySessionId(string sessionId)
    {
        var feedbacks = await _feedbackRepository.GetBySessionIdAsync(sessionId);
        return Ok(feedbacks);
    }
}
