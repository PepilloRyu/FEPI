namespace MathGo.Application.Interfaces.Services;

public interface IEmailService
{
    Task SendVerificationEmailAsync(string toEmail, string userName, string verificationLink);
    Task SendPasswordResetEmailAsync(string toEmail, string resetLink);
}
