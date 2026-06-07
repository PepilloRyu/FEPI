using System.ComponentModel.DataAnnotations;

namespace MathGo.Application.DTOs.Requests;

public class ValidateAnswerRequest
{
    [Required]
    public string UserAnswer { get; set; } = string.Empty;
}
