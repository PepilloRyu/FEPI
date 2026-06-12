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
        string? json = null;

        // 1. Intentar cargar desde variable de entorno (útil si se configura como variable de entorno)
        var envJson = Environment.GetEnvironmentVariable("ANSWERS_JSON");
        if (!string.IsNullOrEmpty(envJson))
        {
            json = envJson;
        }
        // 2. Intentar cargar desde la ruta especificada por parámetro (desarrollo local)
        else if (File.Exists(filePath))
        {
            json = File.ReadAllText(filePath, System.Text.Encoding.UTF8);
        }
        // 3. Intentar cargar desde la ruta por defecto de Secret Files en Render (/etc/secrets/answers.json)
        else if (File.Exists("/etc/secrets/answers.json"))
        {
            json = File.ReadAllText("/etc/secrets/answers.json", System.Text.Encoding.UTF8);
        }
        // 4. Fallback al directorio base de ejecución
        else
        {
            var fallbackPath = Path.Combine(AppContext.BaseDirectory, "answers.json");
            if (File.Exists(fallbackPath))
            {
                json = File.ReadAllText(fallbackPath, System.Text.Encoding.UTF8);
            }
        }

        if (json == null)
        {
            Console.Error.WriteLine(
                $"[WARNING] answers.json no encontrado en '{filePath}', '/etc/secrets/answers.json' " +
                "ni en la variable de entorno ANSWERS_JSON — los ejercicios no podrán validarse.");
            Answers = new Dictionary<string, JsonElement>();
            return;
        }

        Answers = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(json)
                  ?? new Dictionary<string, JsonElement>();
    }
}
