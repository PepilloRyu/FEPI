using FirebaseAdmin.Auth;
using MathGo.Application.DTOs.Requests;
using MathGo.Application.DTOs.Responses;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Application.Interfaces.Services;
using MathGo.Domain.Entities;
using MathGo.Domain.Enums;

namespace MathGo.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IProgressRepository _progressRepository;
    private readonly IEmailService _emailService;
    private readonly IGamificationService _gamificationService;

    public AuthService(
        IUserRepository userRepository,
        IProgressRepository progressRepository,
        IEmailService emailService,
        IGamificationService gamificationService)
    {
        _userRepository = userRepository;
        _progressRepository = progressRepository;
        _emailService = emailService;
        _gamificationService = gamificationService;
    }

    public async Task<UserProfileResponse> RegisterAsync(RegisterRequest request)
    {
        // 1. Create in Firebase Auth
        var userRecordArgs = new UserRecordArgs
        {
            Email = request.Email,
            Password = request.Password,
            DisplayName = request.Name
        };

        var userRecord = await FirebaseAuth.DefaultInstance.CreateUserAsync(userRecordArgs);

        try
        {
            var verificationLink = await FirebaseAuth.DefaultInstance.GenerateEmailVerificationLinkAsync(request.Email);
            await _emailService.SendVerificationEmailAsync(request.Email, request.Name, verificationLink);
        }
        catch
        {
            // Opcional: Manejar si falla el envío del correo (ej. loggear).
            // No detenemos el proceso porque el usuario ya fue creado.
        }

        // 2. Create in Firestore users collection
        var user = new User
        {
            Uid = userRecord.Uid,
            Email = request.Email,
            Name = request.Name,
            Role = UserRole.Student.ToString().ToLower(),
            CreatedAt = DateTime.UtcNow
        };

        await _userRepository.AddAsync(user, user.Uid);

        // 3. Create initial progress document
        var progress = new UserProgress
        {
            Uid = userRecord.Uid,
            TotalXp = 0,
            DailyStreak = 0,
            Gems = 0,
            Lives = 15,
            Level = 1,
            LastActiveDate = DateTime.UtcNow.ToString("yyyy-MM-dd"),
            WeeklyActivity = new List<int> { 0, 0, 0, 0, 0, 0, 0 },
            Worlds = new Dictionary<string, WorldProgress>()
        };

        await _progressRepository.AddAsync(progress, progress.Uid);

        return new UserProfileResponse
        {
            Uid = user.Uid,
            Name = user.Name,
            Email = user.Email,
            Role = user.Role.ToString().ToLower(),
            Level = progress.Level,
            XpTotal = progress.TotalXp,
            DailyStreak = progress.DailyStreak,
            CurrentLeague = _gamificationService.CalculateLeague(progress.TotalXp),
            Gems = progress.Gems,
            Hearts = progress.Lives,
            CreatedAt = user.CreatedAt
        };
    }

    public async Task<UserProfileResponse?> GetCurrentUserAsync(string uid)
    {
        var user = await _userRepository.GetByIdAsync(uid);
        if (user == null) return null;

        var progress = await _progressRepository.GetByIdAsync(uid) ?? new UserProgress
        {
            Uid = uid,
            TotalXp = 0,
            DailyStreak = 0,
            Gems = 0,
            Lives = 15,
            Level = 1,
            WeeklyActivity = new List<int> { 0, 0, 0, 0, 0, 0, 0 }
        };

        return new UserProfileResponse
        {
            Uid = user.Uid,
            Name = user.Name,
            Email = user.Email,
            Role = user.Role.ToString().ToLower(),
            AvatarUrl = user.AvatarUrl ?? "",
            Level = progress.Level,
            XpTotal = progress.TotalXp,
            DailyStreak = progress.DailyStreak,
            CurrentLeague = _gamificationService.CalculateLeague(progress.TotalXp),
            Gems = progress.Gems,
            Hearts = progress.Lives,
            CreatedAt = user.CreatedAt
        };
    }

    public async Task RevokeRefreshTokensAsync(string uid)
    {
        await FirebaseAuth.DefaultInstance.RevokeRefreshTokensAsync(uid);
    }

    public async Task ForgotPasswordAsync(string email)
    {
        var resetLink = await FirebaseAuth.DefaultInstance.GeneratePasswordResetLinkAsync(email);
        await _emailService.SendPasswordResetEmailAsync(email, resetLink);
    }
}
