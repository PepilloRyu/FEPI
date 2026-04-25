using System.ComponentModel.DataAnnotations;

namespace MathGo.Application.DTOs.Requests;

public class CreateUserRequest
{
    [Required]
    public string Name { get; set; } = string.Empty;

    // Puedes agregar más campos aquí si es necesario (ej: Age, Level)
}
