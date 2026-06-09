using MathGo.Domain.Entities;

namespace MathGo.Application.Interfaces.Repositories;

public interface IProgressRepository : IBaseRepository<UserProgress>
{
    Task<IEnumerable<UserProgress>> GetTopByXpAsync(int limit);
}
