using MathGo.Domain.Entities;

namespace MathGo.Application.Interfaces.Repositories;

public interface IPracticeRepository : IBaseRepository<PracticeSession>
{
    Task<IEnumerable<PracticeSession>> GetByUserIdAsync(string userId);
}
