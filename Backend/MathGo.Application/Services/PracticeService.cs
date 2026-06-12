using MathGo.Application.DTOs.Requests;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Application.Interfaces.Services;
using MathGo.Domain.Entities;

namespace MathGo.Application.Services;

public class PracticeService : IPracticeService
{
    private readonly IPracticeRepository _practiceRepository;

    public PracticeService(IPracticeRepository practiceRepository)
    {
        _practiceRepository = practiceRepository;
    }

    public async Task<IEnumerable<PracticeSession>> GetSessionsByUserIdAsync(string userId)
    {
        return await _practiceRepository.GetByUserIdAsync(userId);
    }

    public async Task<PracticeSession> CreateSessionAsync(string userId, CreatePracticeSessionRequest request)
    {
        var session = new PracticeSession
        {
            UserId = userId,
            LessonId = request.LessonId,
            LessonTitle = request.LessonTitle,
            Score = request.Score,
            Questions = request.Questions.Select(q => new PracticeQuestion
            {
                QuestionText = q.QuestionText,
                ExpectedAnswer = q.ExpectedAnswer,
                UserAnswer = q.UserAnswer,
                IsCorrect = q.IsCorrect
            }).ToList(),
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        await _practiceRepository.AddAsync(session);
        return session;
    }
}
