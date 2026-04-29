using Google.Cloud.Firestore;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Domain.Entities;

namespace MathGo.Infrastructure.Repositories;

public class GroupRepository : FirestoreRepository<Group>, IGroupRepository
{
    public GroupRepository(FirestoreDb firestoreDb) : base(firestoreDb, "groups")
    {
    }

    public async Task<IEnumerable<Group>> GetGroupsByTeacherIdAsync(string teacherId)
    {
        var snapshot = await _firestoreDb.Collection(_collectionName)
            .WhereEqualTo("teacherId", teacherId)
            .GetSnapshotAsync();

        var results = new List<Group>();
        foreach (var doc in snapshot.Documents)
        {
            if (doc.Exists)
                results.Add(doc.ConvertTo<Group>());
        }
        return results;
    }

    public async Task<Group?> GetGroupByAccessCodeAsync(string accessCode)
    {
        var snapshot = await _firestoreDb.Collection(_collectionName)
            .WhereEqualTo("accessCode", accessCode)
            .Limit(1)
            .GetSnapshotAsync();

        if (snapshot.Documents.Count == 0) return null;

        return snapshot.Documents[0].ConvertTo<Group>();
    }

    public async Task<IEnumerable<Group>> GetGroupsByStudentIdAsync(string studentId)
    {
        // En Firestore, no podemos hacer un query directo "WhereArrayContains" sobre un arreglo de objetos buscando una propiedad específica del objeto.
        // Dado que el alumno no pertenece a tantos grupos, y esta operación se hace en el GET del alumno, 
        // podríamos usar una estrategia alternativa o traer todos sus grupos buscando por un arreglo auxiliar de IDs.
        // Para solucionar esto, buscaremos localmente o asumimos que en el futuro añadiremos un array simple 'memberIds' al documento Group para consultas.
        // Por ahora, usaremos una solución temporal (traer todos y filtrar en memoria) solo aplicable porque es prototipo.
        
        var snapshot = await _firestoreDb.Collection(_collectionName).GetSnapshotAsync();
        var results = new List<Group>();
        
        foreach (var doc in snapshot.Documents)
        {
            if (doc.Exists)
            {
                var group = doc.ConvertTo<Group>();
                if (group.Members.Any(m => m.StudentId == studentId))
                {
                    results.Add(group);
                }
            }
        }
        return results;
    }
}
