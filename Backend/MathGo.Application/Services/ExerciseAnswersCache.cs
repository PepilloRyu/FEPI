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
        {
            Console.Error.WriteLine(
                $"[WARNING] answers.json no encontrado en '{filePath}' — " +
                "los ejercicios no podrán validarse hasta que se configure.");
            Answers = new Dictionary<string, JsonElement>();
            return;
        }

        var json = File.ReadAllText(filePath, System.Text.Encoding.UTF8);
        Answers = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(json)
                  ?? new Dictionary<string, JsonElement>();
    }
}
