using MailKit.Net.Smtp;
using MathGo.Application.Interfaces.Services;
using MathGo.Infrastructure.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MimeKit;

namespace MathGo.Infrastructure.Services;

public class EmailService : IEmailService
{
    private readonly EmailSettings _settings;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IOptions<EmailSettings> options, ILogger<EmailService> logger)
    {
        _settings = options.Value;
        _logger = logger;
    }

    public async Task SendVerificationEmailAsync(string toEmail, string userName, string verificationLink)
    {
        // Si no hay configuración SMTP válida, hacer un "mock" y registrar en log.
        if (string.IsNullOrEmpty(_settings.SmtpHost))
        {
            _logger.LogWarning("SMTP Host is not configured. Mocking email sending.");
            _logger.LogInformation("--- MOCK EMAIL ---");
            _logger.LogInformation($"To: {toEmail} ({userName})");
            _logger.LogInformation($"Verification Link: {verificationLink}");
            _logger.LogInformation("------------------");
            return;
        }

        try
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(_settings.FromName, _settings.FromEmail));
            message.To.Add(new MailboxAddress(userName, toEmail));
            message.Subject = "Verifica tu cuenta en MathGo";

            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = $@"
                    <h2>¡Hola {userName}!</h2>
                    <p>Gracias por registrarte en MathGo. Por favor, haz clic en el siguiente enlace para verificar tu correo electrónico:</p>
                    <p><a href='{verificationLink}'>Verificar mi cuenta</a></p>
                    <br>
                    <p>Si no puedes hacer clic, copia y pega este enlace en tu navegador:</p>
                    <p>{verificationLink}</p>
                "
            };

            message.Body = bodyBuilder.ToMessageBody();

            using var client = new SmtpClient();
            await client.ConnectAsync(_settings.SmtpHost, _settings.SmtpPort, MailKit.Security.SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(_settings.SmtpUser, _settings.SmtpPass);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
            
            _logger.LogInformation($"Verification email sent successfully to {toEmail}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error sending verification email to {toEmail}");
            throw; // Puedes decidir si arrojar la excepción o tragarla dependiendo de tus requisitos.
        }
    }

    public async Task SendPasswordResetEmailAsync(string toEmail, string resetLink)
    {
        // Si no hay configuración SMTP válida, hacer un "mock" y registrar en log.
        if (string.IsNullOrEmpty(_settings.SmtpHost))
        {
            _logger.LogWarning("SMTP Host is not configured. Mocking password reset email sending.");
            _logger.LogInformation("--- MOCK PASSWORD RESET EMAIL ---");
            _logger.LogInformation($"To: {toEmail}");
            _logger.LogInformation($"Reset Link: {resetLink}");
            _logger.LogInformation("---------------------------------");
            return;
        }

        try
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(_settings.FromName, _settings.FromEmail));
            message.To.Add(new MailboxAddress(toEmail, toEmail));
            message.Subject = "Restablece tu contraseña en MathGo";

            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = $@"
                    <h2>¡Hola!</h2>
                    <p>Has solicitado restablecer tu contraseña en MathGo. Por favor, haz clic en el siguiente enlace para continuar:</p>
                    <p><a href='{resetLink}'>Restablecer mi contraseña</a></p>
                    <br>
                    <p>Si no puedes hacer clic, copia y pega este enlace en tu navegador:</p>
                    <p>{resetLink}</p>
                "
            };

            message.Body = bodyBuilder.ToMessageBody();

            using var client = new SmtpClient();
            await client.ConnectAsync(_settings.SmtpHost, _settings.SmtpPort, MailKit.Security.SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(_settings.SmtpUser, _settings.SmtpPass);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
            
            _logger.LogInformation($"Password reset email sent successfully to {toEmail}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error sending password reset email to {toEmail}");
            throw;
        }
    }
}
