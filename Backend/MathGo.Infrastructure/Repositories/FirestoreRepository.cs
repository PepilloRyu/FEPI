using Google.Cloud.Firestore;
using MathGo.Application.Interfaces.Repositories;

namespace MathGo.Infrastructure.Repositories;

public class FirestoreRepository<T> : IBaseRepository<T> where T : class
{
    protected readonly FirestoreDb _firestoreDb;
    protected readonly string _collectionName;

    public FirestoreRepository(FirestoreDb firestoreDb, string collectionName)
    {
        _firestoreDb = firestoreDb;
        _collectionName = collectionName;
    }

    public async Task<T?> GetByIdAsync(string id)
    {
        var docRef = _firestoreDb.Collection(_collectionName).Document(id);
        var snapshot = await docRef.GetSnapshotAsync();
        
        if (!snapshot.Exists) return null;
        
        return snapshot.ConvertTo<T>();
    }

    public async Task<IEnumerable<T>> GetAllAsync()
    {
        var snapshot = await _firestoreDb.Collection(_collectionName).GetSnapshotAsync();
        var results = new List<T>();
        
        foreach (var doc in snapshot.Documents)
        {
            if (doc.Exists)
            {
                results.Add(doc.ConvertTo<T>());
            }
        }
        return results;
    }

    public async Task AddAsync(T entity, string? id = null)
    {
        var collection = _firestoreDb.Collection(_collectionName);
        if (string.IsNullOrEmpty(id))
        {
            await collection.AddAsync(entity);
        }
        else
        {
            await collection.Document(id).SetAsync(entity);
        }
    }

    public async Task UpdateAsync(string id, T entity)
    {
        await _firestoreDb.Collection(_collectionName).Document(id).SetAsync(entity, SetOptions.MergeAll);
    }

    public async Task DeleteAsync(string id)
    {
        await _firestoreDb.Collection(_collectionName).Document(id).DeleteAsync();
    }
}
