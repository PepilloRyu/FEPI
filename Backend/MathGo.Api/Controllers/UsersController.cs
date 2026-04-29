using MathGo.Application.DTOs.Requests;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace MathGo.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserRepository _userRepository;

    public UsersController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    [HttpPost("register")]
    [Authorize] // Requiere que el usuario ya se haya registrado en Firebase Auth y envíe el Token
    public async Task<IActionResult> RegisterUser([FromBody] CreateUserRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        // Extraer la información validada y segura del Token JWT de Firebase
        var uid = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        // Firebase Auth usualmente incluye el email en una claim llamada "email" o ClaimTypes.Email
        var email = User.FindFirst(ClaimTypes.Email)?.Value ?? 
                    User.FindFirst("email")?.Value ?? string.Empty;

        if (string.IsNullOrEmpty(uid))
            return Unauthorized("No se pudo obtener la identidad del usuario.");

        // Verificar si el usuario ya existe para no sobreescribirlo accidentalmente
        var existingUser = await _userRepository.GetByIdAsync(uid);
        if (existingUser != null)
            return Conflict("El usuario ya se encuentra registrado en el sistema.");

        var newUser = new User
        {
            Uid = uid,
            Email = email,
            Name = request.Name,
            Role = "student",
            Gamification = new UserGamification(),
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        // Guardamos explícitamente con su UID en Firestore para que la auth y la bd estén sincronizadas
        await _userRepository.AddAsync(newUser, uid);

        return Created($"/api/Users/{uid}", newUser);
    }

    [HttpGet("me")]
    [Authorize] // Requiere Token de Firebase
    public async Task<IActionResult> GetCurrentUser()
    {
        var uid = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        if (string.IsNullOrEmpty(uid))
            return Unauthorized("No se pudo obtener la identidad del usuario.");

        var existingUser = await _userRepository.GetByIdAsync(uid);
        if (existingUser == null)
            return NotFound("Perfil de usuario no encontrado en la base de datos.");

        return Ok(existingUser);
    }
}
