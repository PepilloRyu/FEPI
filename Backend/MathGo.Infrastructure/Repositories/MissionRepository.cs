using Google.Cloud.Firestore;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Domain.Entities;

namespace MathGo.Infrastructure.Repositories;

public class MissionRepository : FirestoreRepository<Mission>, IMissionRepository
{
    public MissionRepository(FirestoreDb firestoreDb) : base(firestoreDb, "missions") { }

    public async Task<List<UserMission>> GetUserMissionsAsync(string uid)
    {
        var snapshot = await _firestoreDb
            .Collection("user_missions").Document(uid).Collection("missions")
            .GetSnapshotAsync();

        return snapshot.Documents
            .Where(d => d.Exists)
            .Select(d => d.ConvertTo<UserMission>())
            .ToList();
    }

    public async Task<UserMission?> GetUserMissionAsync(string uid, string missionId)
    {
        var snapshot = await _firestoreDb
            .Collection("user_missions").Document(uid).Collection("missions").Document(missionId)
            .GetSnapshotAsync();

        return snapshot.Exists ? snapshot.ConvertTo<UserMission>() : null;
    }

    public async Task SaveUserMissionAsync(string uid, UserMission userMission)
    {
        await _firestoreDb
            .Collection("user_missions").Document(uid).Collection("missions").Document(userMission.MissionId)
            .SetAsync(userMission);
    }
}
