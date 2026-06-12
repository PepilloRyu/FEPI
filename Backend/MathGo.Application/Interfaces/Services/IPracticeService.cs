using MathGo.Application.DTOs.Requests;
using MathGo.Domain.Entities;

namespace MathGo.Application.Interfaces.Services;

public interface IPracticeService
{
    Task<IEnumerable<PracticeSession>> GetSessionsByUserIdAsync(string userId);
    Task<PracticeSession> CreateSessionAsync(string userId, CreatePracticeSessionRequest request);
}
