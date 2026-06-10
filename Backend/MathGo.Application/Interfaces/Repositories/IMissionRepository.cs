using MathGo.Domain.Entities;

namespace MathGo.Application.Interfaces.Repositories;

public interface IMissionRepository : IBaseRepository<Mission>
{
    Task<List<UserMission>> GetUserMissionsAsync(string uid);
    Task<UserMission?> GetUserMissionAsync(string uid, string missionId);
    Task SaveUserMissionAsync(string uid, UserMission userMission);
}
