using Google.Cloud.Firestore;
using MathGo.Application.DTOs.Responses;
using MathGo.Application.Interfaces.Repositories;

namespace MathGo.Infrastructure.Repositories;

public class ExerciseRepository : IExerciseRepository
{
    private readonly FirestoreDb _db;

    public ExerciseRepository(FirestoreDb db) => _db = db;

    public async Task<List<ExerciseDto>> GetByWorldAsync(int worldId)
    {
        var exercises = new List<ExerciseDto>();

        var levelsRef = _db
            .Collection("subjects").Document("algebra")
            .Collection("units").Document(worldId.ToString())
            .Collection("levels");

        var levelsSnap = await levelsRef.GetSnapshotAsync();

        foreach (var levelDoc in levelsSnap.Documents)
        {
            var exSnap = await levelDoc.Reference.Collection("exercises").GetSnapshotAsync();
            foreach (var exDoc in exSnap.Documents)
                exercises.Add(MapToDto(exDoc, worldId, levelDoc.Id, exDoc.Id));
        }

        return exercises;
    }

    private static ExerciseDto MapToDto(
        DocumentSnapshot doc, int worldId, string levelId, string exId)
    {
        var data = doc.ToDictionary() ?? new Dictionary<string, object>();

        string Str(string key) =>
            data.TryGetValue(key, out var v) ? v?.ToString() ?? "" : "";

        var dto = new ExerciseDto
        {
            Id     = $"{worldId}_{levelId}_{exId}",
            Type   = Str("type"),
            Tag    = Str("tag"),
            Prompt = Str("prompt"),
            Hint   = data.ContainsKey("hint") ? Str("hint") : null,
        };

        switch (dto.Type)
        {
            case "mc":
            case "vf":
                if (data.TryGetValue("options", out var optsRaw) && optsRaw is List<object> optsList)
                {
                    dto.Options = optsList
                        .OfType<Dictionary<string, object>>()
                        .Select(o => new ExerciseOptionDto
                        {
                            Label = o.TryGetValue("label", out var l) ? l?.ToString() ?? "" : ""
                        })
                        .ToList();
                }
                break;

            case "build":
            case "buildSeq":
                dto.Bank = ExtractStringList(data, "bank");
                break;

            case "slots":
                dto.Bank = ExtractStringList(data, "bank");
                if (data.TryGetValue("slots", out var slotsRaw))
                    dto.Slots = Convert.ToInt32(slotsRaw);
                if (data.TryGetValue("prefix", out var prefixRaw))
                    dto.Prefix = prefixRaw?.ToString();
                break;

            case "match":
                if (data.TryGetValue("pairs", out var pairsRaw) && pairsRaw is List<object> pairsList)
                {
                    dto.Pairs = pairsList
                        .OfType<Dictionary<string, object>>()
                        .Select(p => new ExercisePairDto
                        {
                            Desc = p.TryGetValue("desc", out var d) ? d?.ToString() ?? "" : "",
                            Sym  = p.TryGetValue("sym",  out var s) ? s?.ToString() ?? "" : ""
                        })
                        .ToList();
                }
                dto.SymOrder = ExtractStringList(data, "symOrder");
                break;
        }

        return dto;
    }

    private static List<string>? ExtractStringList(Dictionary<string, object> data, string key)
    {
        if (!data.TryGetValue(key, out var raw) || raw is not List<object> list)
            return null;
        return list.Select(x => x?.ToString() ?? "").ToList();
    }
}
