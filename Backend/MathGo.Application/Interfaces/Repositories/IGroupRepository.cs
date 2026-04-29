using MathGo.Domain.Entities;

namespace MathGo.Application.Interfaces.Repositories;

public interface IGroupRepository : IBaseRepository<Group>
{
    Task<IEnumerable<Group>> GetGroupsByTeacherIdAsync(string teacherId);
    Task<Group?> GetGroupByAccessCodeAsync(string accessCode);
    Task<IEnumerable<Group>> GetGroupsByStudentIdAsync(string studentId);
}
