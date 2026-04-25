using MathGo.Domain.Entities;

namespace MathGo.Application.Interfaces.Repositories;

public interface ITheoryRepository : IBaseRepository<TheoryLesson>
{
    Task<IEnumerable<TheoryLesson>> GetByTagsAsync(List<string> tags);
}
