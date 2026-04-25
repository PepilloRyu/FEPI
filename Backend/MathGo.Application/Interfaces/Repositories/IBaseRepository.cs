namespace MathGo.Application.Interfaces.Repositories;

public interface IBaseRepository<T> where T : class
{
    Task<T?> GetByIdAsync(string id);
    Task<IEnumerable<T>> GetAllAsync();
    Task AddAsync(T entity, string? id = null);
    Task UpdateAsync(string id, T entity);
    Task DeleteAsync(string id);
}
