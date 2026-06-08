using System.ComponentModel.DataAnnotations;

namespace MathGo.Application.DTOs.Requests;

/// <summary>
/// Solicitud para recuperar contraseña.
/// </summary>
public class ForgotPasswordRequest
{
    [Required(ErrorMessage = "El email es obligatorio.")]
    [EmailAddress(ErrorMessage = "Formato de email inválido.")]
    public string Email { get; set; } = string.Empty;
}
