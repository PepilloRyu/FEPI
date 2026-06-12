using MathGo.Application.DTOs.Requests;
using MathGo.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MathGo.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var profile = await _authService.RegisterAsync(request);
            return Ok(profile);
        }
        catch (Exception ex)
        {
            return BadRequest(new { Message = ex.Message });
        }
    }

    [HttpPost("logout")]
    [Authorize]
    public async Task<IActionResult> Logout()
    {
        var uid = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(uid)) return Unauthorized();

        await _authService.RevokeRefreshTokensAsync(uid);
        return Ok(new { Message = "Logged out successfully" });
    }

    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            await _authService.ForgotPasswordAsync(request.Email);
        }
        catch (Exception ex)
        {
            // Evitar enumeración de usuarios: registramos el error y retornamos éxito de todas formas.
            Console.WriteLine($"ForgotPassword debug info (prevented enumeration): {ex.Message}");
        }

        return Ok(new { Message = "Enlace de recuperación enviado exitosamente." });
    }
}
