namespace MathGo.Application.DTOs.Requests;

public class CreatePracticeSessionRequest
{
    public string LessonId { get; set; } = string.Empty;
    public string LessonTitle { get; set; } = string.Empty;
    public List<QuestionDto> Questions { get; set; } = new();
    public int Score { get; set; }
}

public class QuestionDto
{
    public string QuestionText { get; set; } = string.Empty;
    public string ExpectedAnswer { get; set; } = string.Empty;
    public string UserAnswer { get; set; } = string.Empty;
    public bool IsCorrect { get; set; }
}
