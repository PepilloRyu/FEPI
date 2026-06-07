using System.ComponentModel.DataAnnotations;

namespace MathGo.Application.DTOs.Requests;

/// <summary>
/// Solicitud para actualizar el perfil de usuario.
/// </summary>
public class UpdateProfileRequest
{
    [StringLength(100, MinimumLength = 2, ErrorMessage = "El nombre debe tener entre 2 y 100 caracteres.")]
    public string? Name { get; set; }

    public string? AvatarUrl { get; set; }
}
