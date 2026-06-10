using System.ComponentModel.DataAnnotations;

namespace MathGo.Application.DTOs.Requests;

public class CompleteLevelRequest
{
    [Required]
    public int WorldId { get; set; }

    [Required]
    public int LevelId { get; set; }

    /// <summary>El cliente indica si este nivel era el último del mundo.</summary>
    public bool IsWorldComplete { get; set; }
}
