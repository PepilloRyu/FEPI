using Google.Cloud.Firestore;
using MathGo.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace MathGo.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SeedController : ControllerBase
{
    private readonly FirestoreDb _db;

    public SeedController(FirestoreDb db)
    {
        _db = db;
    }

    [HttpGet("algebra")]
    public async Task<IActionResult> SeedAlgebraCourse()
    {
        try
        {
            // 1. Crear Materia (Subject)
            var subjectRef = _db.Collection("subjects").Document("algebra");
            var subject = new Subject
            {
                Id = "algebra",
                Title = "Álgebra",
                Description = "Aprende los fundamentos del álgebra, desde ecuaciones básicas hasta polinomios.",
                IsActive = true
            };
            await subjectRef.SetAsync(subject);

            // 2. Crear Unidad 1
            var unitRef = subjectRef.Collection("units").Document("unit-1");
            var unit = new Unit
            {
                Id = "unit-1",
                Title = "Conceptos Básicos",
                Order = 1,
                Description = "Introducción a variables y expresiones algebraicas."
            };
            await unitRef.SetAsync(unit);

            // 3. Crear Tema 1 con 10 Ejercicios
            var topicRef = unitRef.Collection("topics").Document("topic-1");
            var topic = new Topic
            {
                Id = "topic-1",
                Title = "Ecuaciones Lineales Simples",
                Order = 1,
                Theory = new TopicTheory
                {
                    Content = "Una ecuación lineal es una igualdad matemática que tiene una o más variables a la primera potencia. Para resolverla, el objetivo es 'despejar' la variable aislarla de un lado de la igualdad."
                },
                Example = new TopicExample
                {
                    ProblemStatement = "Resuelve: x + 5 = 12",
                    StepByStepSolution = new List<string>
                    {
                        "1. Observa que el 5 está sumando a la x.",
                        "2. Para dejar la x sola, resta 5 a ambos lados: x + 5 - 5 = 12 - 5.",
                        "3. Simplifica: x = 7."
                    }
                },
                Exercises = new List<TopicExercise>
                {
                    new TopicExercise { Id = "ex-1", Type = "multiple_choice", Question = "Resuelve para x: x + 4 = 10", Options = new List<string>{"4", "6", "10", "14"}, CorrectAnswer = "6" },
                    new TopicExercise { Id = "ex-2", Type = "multiple_choice", Question = "Resuelve para y: y - 3 = 8", Options = new List<string>{"5", "8", "11", "24"}, CorrectAnswer = "11" },
                    new TopicExercise { Id = "ex-3", Type = "multiple_choice", Question = "¿Cuál es el valor de z en 2z = 14?", Options = new List<string>{"6", "7", "12", "28"}, CorrectAnswer = "7" },
                    new TopicExercise { Id = "ex-4", Type = "multiple_choice", Question = "Resuelve: a/3 = 5", Options = new List<string>{"2", "8", "15", "18"}, CorrectAnswer = "15" },
                    new TopicExercise { Id = "ex-5", Type = "multiple_choice", Question = "Encuentra x: 3x + 2 = 11", Options = new List<string>{"2", "3", "4", "9"}, CorrectAnswer = "3" },
                    new TopicExercise { Id = "ex-6", Type = "multiple_choice", Question = "Resuelve para m: 5m - 4 = 16", Options = new List<string>{"2", "4", "5", "20"}, CorrectAnswer = "4" },
                    new TopicExercise { Id = "ex-7", Type = "multiple_choice", Question = "¿Cuánto vale b en 10 = b + 3?", Options = new List<string>{"3", "7", "13", "30"}, CorrectAnswer = "7" },
                    new TopicExercise { Id = "ex-8", Type = "multiple_choice", Question = "Resuelve: 4x = 20", Options = new List<string>{"4", "5", "16", "24"}, CorrectAnswer = "5" },
                    new TopicExercise { Id = "ex-9", Type = "multiple_choice", Question = "Encuentra y: y/2 + 1 = 6", Options = new List<string>{"5", "8", "10", "12"}, CorrectAnswer = "10" },
                    new TopicExercise { Id = "ex-10", Type = "multiple_choice", Question = "Resuelve para k: 2k - 5 = 5", Options = new List<string>{"0", "5", "10", "25"}, CorrectAnswer = "5" }
                }
            };
            await topicRef.SetAsync(topic);

            return Ok(new { Message = "Curso de Álgebra sembrado correctamente en Firestore." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = ex.Message });
        }
    }
}
