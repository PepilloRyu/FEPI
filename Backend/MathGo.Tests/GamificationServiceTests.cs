using MathGo.Application.Interfaces.Repositories;
using MathGo.Application.Services;
using MathGo.Domain.Entities;
using Moq;
using Xunit;

namespace MathGo.Tests;

public class GamificationServiceTests
{
    private readonly Mock<IUserRepository> _userRepositoryMock;
    private readonly GamificationService _gamificationService;

    public GamificationServiceTests()
    {
        _userRepositoryMock = new Mock<IUserRepository>();
        _gamificationService = new GamificationService(_userRepositoryMock.Object);
    }

    [Fact]
    public void CalculateXpEarned_IncorrectAnswer_ReturnsZero()
    {
        var xp = _gamificationService.CalculateXpEarned(false, false, 0);
        Assert.Equal(0, xp);
    }

    [Fact]
    public void CalculateXpEarned_CorrectWithoutHintNoStreak_Returns10()
    {
        var xp = _gamificationService.CalculateXpEarned(true, false, 0);
        Assert.Equal(10, xp);
    }

    [Fact]
    public void CalculateXpEarned_CorrectWithHintNoStreak_Returns5()
    {
        var xp = _gamificationService.CalculateXpEarned(true, true, 0);
        Assert.Equal(5, xp);
    }

    [Fact]
    public void CalculateXpEarned_CorrectWithoutHintWithStreak_Returns10PlusStreak()
    {
        var xp = _gamificationService.CalculateXpEarned(true, false, 3);
        Assert.Equal(13, xp); // 10 + 3
    }

    [Fact]
    public void CalculateXpEarned_CorrectWithoutHintWithMaxStreak_Returns15()
    {
        var xp = _gamificationService.CalculateXpEarned(true, false, 10);
        Assert.Equal(15, xp); // 10 + max streak bonus (5)
    }

    [Theory]
    [InlineData(0, 1)]
    [InlineData(99, 1)]
    [InlineData(100, 2)]
    [InlineData(250, 3)]
    public void CalculateLevel_ReturnsCorrectLevel(int xp, int expectedLevel)
    {
        var level = _gamificationService.CalculateLevel(xp);
        Assert.Equal(expectedLevel, level);
    }
}
