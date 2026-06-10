using System.Text.Json;

namespace MathGo.Application.Services;

/// <summary>
/// Carga answers.json una sola vez al iniciar la app y lo expone como caché inmutable.
/// Registrar como Singleton en Program.cs.
/// </summary>
public sealed class ExerciseAnswersCache
{
    public IReadOnlyDictionary<string, JsonElement> Answers { get; }

    public ExerciseAnswersCache(string filePath)
    {
        if (!File.Exists(filePath))
            throw new FileNotFoundException(
                $"answers.json no encontrado en '{filePath}'. " +
                "Ejecuta migrate_exercises.py para generarlo.", filePath);

        var json = File.ReadAllText(filePath, System.Text.Encoding.UTF8);
        Answers = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(json)
                  ?? new Dictionary<string, JsonElement>();
    }
}
