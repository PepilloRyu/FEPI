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
public class GroupsController : ControllerBase
{
    private readonly IGroupRepository _groupRepository;
    private readonly IUserRepository _userRepository;

    public GroupsController(IGroupRepository groupRepository, IUserRepository userRepository)
    {
        _groupRepository = groupRepository;
        _userRepository = userRepository;
    }

    [HttpPost]
    public async Task<IActionResult> CreateGroup([FromBody] CreateGroupRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var uid = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(uid)) return Unauthorized();

        var currentUser = await _userRepository.GetByIdAsync(uid);
        if (currentUser == null || currentUser.Role != "teacher")
            return Forbid("Solo los profesores pueden crear grupos.");

        var newGroup = new Group
        {
            TeacherId = uid,
            Name = request.Name,
            AccessCode = GenerateAccessCode(),
            CreatedAt = DateTime.UtcNow,
            Members = new List<GroupMember>()
        };

        await _groupRepository.AddAsync(newGroup);

        return Ok(newGroup);
    }

    [HttpGet("my-groups")]
    public async Task<IActionResult> GetMyGroups()
    {
        var uid = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(uid)) return Unauthorized();

        var currentUser = await _userRepository.GetByIdAsync(uid);
        if (currentUser == null) return NotFound("Usuario no encontrado.");

        if (currentUser.Role == "teacher")
        {
            var groups = await _groupRepository.GetGroupsByTeacherIdAsync(uid);
            return Ok(groups);
        }
        else
        {
            var groups = await _groupRepository.GetGroupsByStudentIdAsync(uid);
            return Ok(groups);
        }
    }

    [HttpPost("join")]
    public async Task<IActionResult> JoinGroup([FromBody] JoinGroupRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var uid = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(uid)) return Unauthorized();

        var currentUser = await _userRepository.GetByIdAsync(uid);
        if (currentUser == null || currentUser.Role != "student")
            return Forbid("Solo los estudiantes pueden unirse a un grupo mediante código.");

        var group = await _groupRepository.GetGroupByAccessCodeAsync(request.AccessCode.ToUpper());
        if (group == null)
            return NotFound("Código de acceso inválido o grupo no encontrado.");

        // Verificar si ya está inscrito
        if (group.Members.Any(m => m.StudentId == uid))
            return Conflict("Ya estás inscrito en este grupo.");

        // Aplicamos la Desnormalización
        var newMember = new GroupMember
        {
            StudentId = uid,
            Name = currentUser.Name,
            AvatarUrl = currentUser.AvatarUrl,
            XpTotal = currentUser.Gamification?.XpTotal ?? 0
        };

        group.Members.Add(newMember);

        // Actualizamos el grupo en la base de datos
        await _groupRepository.UpdateAsync(group.Id, group);

        return Ok(new { Message = "Te has unido al grupo exitosamente.", Group = group });
    }

    private string GenerateAccessCode()
    {
        // Generador de código MTH-XXXX
        var random = new Random();
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var code = new string(Enumerable.Repeat(chars, 4)
            .Select(s => s[random.Next(s.Length)]).ToArray());
        return $"MTH-{code}";
    }
}
