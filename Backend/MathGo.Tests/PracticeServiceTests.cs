using MathGo.Application.DTOs.Requests;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Application.Services;
using MathGo.Domain.Entities;
using Moq;
using Xunit;

namespace MathGo.Tests;

public class PracticeServiceTests
{
    private readonly Mock<IPracticeRepository> _practiceRepoMock;
    private readonly PracticeService _practiceService;

    public PracticeServiceTests()
    {
        _practiceRepoMock = new Mock<IPracticeRepository>();
        _practiceService = new PracticeService(_practiceRepoMock.Object);
    }

    [Fact]
    public async Task GetSessionsByUserIdAsync_ReturnsUserSessions()
    {
        // Arrange
        var userId = "user123";
        var expectedSessions = new List<PracticeSession>
        {
            new PracticeSession { SessionId = "s1", UserId = userId, LessonTitle = "Intro" },
            new PracticeSession { SessionId = "s2", UserId = userId, LessonTitle = "Equations" }
        };

        _practiceRepoMock.Setup(repo => repo.GetByUserIdAsync(userId))
            .ReturnsAsync(expectedSessions);

        // Act
        var result = await _practiceService.GetSessionsByUserIdAsync(userId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.Count());
        _practiceRepoMock.Verify(repo => repo.GetByUserIdAsync(userId), Times.Once);
    }

    [Fact]
    public async Task CreateSessionAsync_CreatesAndSavesSession()
    {
        // Arrange
        var userId = "user123";
        var request = new CreatePracticeSessionRequest
        {
            LessonId = "lesson_1",
            LessonTitle = "Algebra Basics",
            Score = 80,
            Questions = new List<QuestionDto>
            {
                new QuestionDto
                {
                    QuestionText = "2+2",
                    ExpectedAnswer = "4",
                    UserAnswer = "4",
                    IsCorrect = true
                }
            }
        };

        // Act
        var result = await _practiceService.CreateSessionAsync(userId, request);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(userId, result.UserId);
        Assert.Equal(request.LessonId, result.LessonId);
        Assert.Equal(request.LessonTitle, result.LessonTitle);
        Assert.Equal(request.Score, result.Score);
        Assert.Single(result.Questions);
        Assert.Equal("2+2", result.Questions[0].QuestionText);
        Assert.Equal("4", result.Questions[0].ExpectedAnswer);
        Assert.Equal("4", result.Questions[0].UserAnswer);
        Assert.True(result.Questions[0].IsCorrect);

        _practiceRepoMock.Verify(repo => repo.AddAsync(It.Is<PracticeSession>(s => 
            s.UserId == userId && 
            s.LessonId == request.LessonId &&
            s.LessonTitle == request.LessonTitle &&
            s.Score == request.Score
        )), Times.Once);
    }
}
