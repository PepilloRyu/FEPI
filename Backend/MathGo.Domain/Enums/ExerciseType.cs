namespace MathGo.Domain.Enums;

/// <summary>
/// Tipos de ejercicio soportados por el motor MathGo.
/// Refleja los tipos definidos en los archivos world-*-data.js del frontend.
/// </summary>
public enum ExerciseType
{
    /// <summary>Opción múltiple con una respuesta correcta.</summary>
    MultipleChoice = 0,

    /// <summary>Verdadero o Falso.</summary>
    TrueFalse = 1,

    /// <summary>Construir una expresión seleccionando bloques.</summary>
    Build = 2,

    /// <summary>Construir una secuencia ordenada de bloques.</summary>
    BuildSequence = 3,

    /// <summary>Emparejar descripciones con símbolos (drag &amp; drop).</summary>
    Match = 4,

    /// <summary>Rellenar huecos arrastrando bloques.</summary>
    Slots = 5
}
