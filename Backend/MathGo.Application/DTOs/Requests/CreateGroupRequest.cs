using System.ComponentModel.DataAnnotations;

namespace MathGo.Application.DTOs.Requests;

public class CreateGroupRequest
{
    [Required(ErrorMessage = "El nombre del grupo es obligatorio.")]
    [StringLength(50, MinimumLength = 3, ErrorMessage = "El nombre debe tener entre 3 y 50 caracteres.")]
    public string Name { get; set; } = string.Empty;
}
