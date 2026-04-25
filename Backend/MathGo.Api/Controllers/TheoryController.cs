using MathGo.Application.Interfaces.Repositories;
using MathGo.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MathGo.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TheoryController : ControllerBase
{
    private readonly ITheoryRepository _theoryRepository;

    public TheoryController(ITheoryRepository theoryRepository)
    {
        _theoryRepository = theoryRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllLessons()
    {
        var lessons = await _theoryRepository.GetAllAsync();
        return Ok(lessons);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetLessonById(string id)
    {
        var lesson = await _theoryRepository.GetByIdAsync(id);
        if (lesson == null) return NotFound();
        return Ok(lesson);
    }
}
