using Google.Cloud.Firestore;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Domain.Entities;

namespace MathGo.Infrastructure.Repositories;

public class ProgressRepository : FirestoreRepository<UserProgress>, IProgressRepository
{
    public ProgressRepository(FirestoreDb firestoreDb) : base(firestoreDb, "mathgo_progress")
    {
    }
}
