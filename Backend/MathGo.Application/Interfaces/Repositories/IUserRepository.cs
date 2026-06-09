using MathGo.Domain.Entities;

namespace MathGo.Application.Interfaces.Repositories;

public interface IUserRepository : IBaseRepository<User>
{
    Task<User?> GetByEmailAsync(string email);
}
