using MathGo.Domain.Entities;

namespace MathGo.Application.Interfaces.Repositories;

public interface IFeedbackRepository : IBaseRepository<FeedbackReport>
{
    Task<IEnumerable<FeedbackReport>> GetBySessionIdAsync(string sessionId);
}
