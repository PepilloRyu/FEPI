namespace MathGo.Application.DTOs.Responses;

/// <summary>Ejercicio serializado para el cliente (sin respuesta correcta).</summary>
public class ExerciseDto
{
    /// <summary>Clave compuesta "{worldId}_{levelId}_{exerciseId}".</summary>
    public string Id { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Tag { get; set; } = string.Empty;
    public string Prompt { get; set; } = string.Empty;
    public string? Hint { get; set; }

    /// <summary>mc / vf — lista de opciones sin campo "correct".</summary>
    public List<ExerciseOptionDto>? Options { get; set; }

    /// <summary>build / buildSeq / slots — banco de tokens disponibles.</summary>
    public List<string>? Bank { get; set; }

    /// <summary>slots — número de huecos a rellenar.</summary>
    public int? Slots { get; set; }

    /// <summary>slots — prefijo visual opcional (ej: "Grado =").</summary>
    public string? Prefix { get; set; }

    /// <summary>match — pares {desc, sym} completos.</summary>
    public List<ExercisePairDto>? Pairs { get; set; }

    /// <summary>match — orden visual de los símbolos en la UI.</summary>
    public List<string>? SymOrder { get; set; }
}

public class ExerciseOptionDto
{
    public string Label { get; set; } = string.Empty;
}

public class ExercisePairDto
{
    public string Desc { get; set; } = string.Empty;
    public string Sym { get; set; } = string.Empty;
}
