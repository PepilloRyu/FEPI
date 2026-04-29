using System.ComponentModel.DataAnnotations;

namespace MathGo.Application.DTOs.Requests;

public class JoinGroupRequest
{
    [Required(ErrorMessage = "El código de acceso es obligatorio.")]
    [StringLength(8, MinimumLength = 4, ErrorMessage = "Código de acceso inválido.")]
    public string AccessCode { get; set; } = string.Empty;
}
