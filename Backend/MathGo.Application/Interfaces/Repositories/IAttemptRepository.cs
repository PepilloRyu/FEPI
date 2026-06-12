using MathGo.Domain.Entities;

namespace MathGo.Application.Interfaces.Repositories;

public interface IAttemptRepository : IBaseRepository<AttemptLog>
{
    Task<IEnumerable<AttemptLog>> GetByUserIdAsync(string userId);
}
