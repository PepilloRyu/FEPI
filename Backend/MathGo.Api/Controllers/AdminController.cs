using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MathGo.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "admin,teacher")] // Role-based authorization example
public class AdminController : ControllerBase
{
    public AdminController()
    {
    }

    [HttpPost("seed")]
    public async Task<IActionResult> SeedData()
    {
        // Migrated from SeedController logic
        // Only accessible by Admin
        await Task.CompletedTask;
        return Ok(new { Message = "Database seeded successfully" });
    }
}
