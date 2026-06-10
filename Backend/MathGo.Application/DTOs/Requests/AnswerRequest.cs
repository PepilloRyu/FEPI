using System.Text.Json;

namespace MathGo.Application.DTOs.Requests;

/// <summary>Body para POST /api/exercises/{id}/answer.</summary>
public class AnswerRequest
{
    /// <summary>UID del usuario (informativo; el servidor usa el token JWT para seguridad).</summary>
    public string UserId { get; set; } = string.Empty;

    /// <summary>
    /// Respuesta del usuario en formato JSON dinámico según el tipo de ejercicio:
    /// mc/vf → string | build/slots/buildSeq → string[] | match → {sym: desc}
    /// </summary>
    public JsonElement UserAnswer { get; set; }
}
