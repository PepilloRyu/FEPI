using MathGo.Application.DTOs.Requests;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Application.Interfaces.Services;
using MathGo.Application.Services;
using MathGo.Domain.Entities;
using Moq;
using Xunit;

namespace MathGo.Tests;

public class ProgressServiceTests
{
    private readonly Mock<IProgressRepository> _progressRepoMock;
    private readonly Mock<IUserRepository> _userRepoMock;
    private readonly Mock<IGamificationService> _gamificationServiceMock;
    private readonly Mock<IAttemptRepository> _attemptRepoMock;
    private readonly Mock<IMissionService> _missionServiceMock;
    private readonly Mock<IAchievementService> _achievementServiceMock;
    private readonly ProgressService _progressService;

    public ProgressServiceTests()
    {
        _progressRepoMock = new Mock<IProgressRepository>();
        _userRepoMock = new Mock<IUserRepository>();
        _gamificationServiceMock = new Mock<IGamificationService>();
        _attemptRepoMock = new Mock<IAttemptRepository>();
        _missionServiceMock = new Mock<IMissionService>();
        _achievementServiceMock = new Mock<IAchievementService>();

        _progressService = new ProgressService(
            _progressRepoMock.Object,
            _userRepoMock.Object,
            _gamificationServiceMock.Object,
            _attemptRepoMock.Object,
            _missionServiceMock.Object,
            _achievementServiceMock.Object);
    }

    [Fact]
    public async Task SubmitAttemptAsync_CorrectAnswer_UpdatesUserAndProgress()
    {
        // Arrange
        string uid = "user123";
        var user = new User
        {
            Uid = uid
        };
        var progress = new UserProgress
        {
            Uid = uid,
            TotalXp = 10,
            DailyStreak = 2
        };

        _userRepoMock.Setup(x => x.GetByIdAsync(uid)).ReturnsAsync(user);
        _progressRepoMock.Setup(x => x.GetByIdAsync(uid)).ReturnsAsync(progress);
        
        _gamificationServiceMock.Setup(x => x.CalculateXpEarned(true, false, 2)).Returns(12);
        _gamificationServiceMock.Setup(x => x.CalculateLevel(It.IsAny<int>())).Returns(1);
        _gamificationServiceMock.Setup(x => x.CalculateLeague(It.IsAny<int>())).Returns("Bronce");
        _gamificationServiceMock.Setup(x => x.UpdateDailyStreakAsync(uid, It.IsAny<string>())).ReturnsAsync(3);

        var request = new SubmitAttemptRequest
        {
            TopicId = "topic_1",
            IsCorrect = true,
            TimeMs = 5000,
            UsedHint = false,
            UserAnswer = "42",
            WorldId = 1,
            LevelId = 1
        };

        // Act
        var result = await _progressService.SubmitAttemptAsync(uid, request);

        // Assert
        Assert.True(result.IsCorrect);
        Assert.Equal(12, result.XpEarned);
        Assert.Equal(22, result.NewXpTotal); // 10 + 12

        _attemptRepoMock.Verify(x => x.AddAsync(It.IsAny<AttemptLog>(), It.IsAny<string>()), Times.Once);
        _progressRepoMock.Verify(x => x.UpdateAsync(uid, It.IsAny<UserProgress>()), Times.Once);
    }
}
