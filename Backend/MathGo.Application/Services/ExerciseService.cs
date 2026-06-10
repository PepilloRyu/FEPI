using MathGo.Application.DTOs.Responses;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Application.Interfaces.Services;
using System.Diagnostics;
using System.Text.Json;

namespace MathGo.Application.Services;

public class ExerciseService : IExerciseService
{
    private readonly IExerciseRepository _exerciseRepository;
    private readonly ExerciseAnswersCache _cache;
    private readonly IProgressRepository _progressRepository;
    private readonly IGamificationService _gamificationService;
    private readonly IMissionService _missionService;
    private readonly IAchievementService _achievementService;

    public ExerciseService(
        IExerciseRepository exerciseRepository,
        ExerciseAnswersCache cache,
        IProgressRepository progressRepository,
        IGamificationService gamificationService,
        IMissionService missionService,
        IAchievementService achievementService)
    {
        _exerciseRepository = exerciseRepository;
        _cache = cache;
        _progressRepository = progressRepository;
        _gamificationService = gamificationService;
        _missionService = missionService;
        _achievementService = achievementService;
    }

    public Task<List<ExerciseDto>> GetExercisesByWorldAsync(int worldId)
        => _exerciseRepository.GetByWorldAsync(worldId);

    public async Task<AnswerResultDto> CheckAnswerAsync(
        string exerciseId, string uid, JsonElement userAnswer)
    {
        if (!_cache.Answers.TryGetValue(exerciseId, out var entry))
            throw new KeyNotFoundException(
                $"No existe entrada de respuesta para el ejercicio '{exerciseId}' en answers.json.");

        string type = entry.GetProperty("type").GetString() ?? "";
        var correct = entry.GetProperty("answer");

        bool isCorrect = type switch
        {
            "mc" or "vf" => ValidateMcVf(userAnswer, correct),
            "build"      => ValidateOrderedList(userAnswer, correct),
            "slots"      => ValidateOrderedList(userAnswer, correct),
            "buildSeq"   => ValidateBuildSeq(userAnswer, correct),
            "match"      => ValidateMatch(userAnswer, correct),
            _            => false
        };

        int xpAwarded = 0;

        if (isCorrect)
        {
            var progress = await _progressRepository.GetByIdAsync(uid);
            if (progress != null)
            {
                xpAwarded = _gamificationService.CalculateXpEarned(true, false, progress.DailyStreak);
                progress.TotalXp += xpAwarded;
                progress.Level = _gamificationService.CalculateLevel(progress.TotalXp);

                // Actualizar racha (igual que ProgressService.SubmitAttemptAsync)
                progress.DailyStreak = await _gamificationService.UpdateDailyStreakAsync(
                    uid, progress.LastActiveDate);
                progress.LastActiveDate = DateTime.UtcNow.Date.ToString("yyyy-MM-dd");

                int dayOfWeek = (int)DateTime.UtcNow.DayOfWeek;
                if (progress.WeeklyActivity == null || progress.WeeklyActivity.Count != 7)
                    progress.WeeklyActivity = new List<int> { 0, 0, 0, 0, 0, 0, 0 };
                progress.WeeklyActivity[dayOfWeek] += xpAwarded;

                await _progressRepository.UpdateAsync(uid, progress);

                _ = _missionService.EvaluateMissionProgressAsync(uid, "xp_earned", xpAwarded)
                    .ContinueWith(t => Debug.WriteLine($"[MissionService] EvaluateMissionProgress error: {t.Exception}"), TaskContinuationOptions.OnlyOnFaulted);
                _ = _achievementService.EvaluateNewAchievementsAsync(uid)
                    .ContinueWith(t => Debug.WriteLine($"[AchievementService] EvaluateNewAchievements error: {t.Exception}"), TaskContinuationOptions.OnlyOnFaulted);
            }
        }

        return new AnswerResultDto { Correct = isCorrect, XpAwarded = xpAwarded };
    }

    // ── Validadores por tipo ───────────────────────────────────────────────────

    private static bool ValidateMcVf(JsonElement user, JsonElement correct)
    {
        if (user.ValueKind != JsonValueKind.String) return false;
        return string.Equals(
            user.GetString()?.Trim(),
            correct.GetString()?.Trim(),
            StringComparison.OrdinalIgnoreCase);
    }

    // build y slots: arrays con orden exacto
    private static bool ValidateOrderedList(JsonElement user, JsonElement correct)
    {
        if (user.ValueKind != JsonValueKind.Array) return false;
        var ua = user.EnumerateArray().Select(e => e.GetString()?.Trim() ?? "").ToList();
        var ca = correct.EnumerateArray().Select(e => e.GetString()?.Trim() ?? "").ToList();
        return ua.Count == ca.Count &&
               ua.Zip(ca, (u, c) => string.Equals(u, c, StringComparison.OrdinalIgnoreCase))
                 .All(x => x);
    }

    // buildSeq: coincide con ALGUNA de las secuencias válidas
    private static bool ValidateBuildSeq(JsonElement user, JsonElement correctSeqs)
    {
        if (user.ValueKind != JsonValueKind.Array) return false;
        var ua = user.EnumerateArray().Select(e => e.GetString()?.Trim() ?? "").ToList();

        foreach (var seq in correctSeqs.EnumerateArray())
        {
            var ca = seq.EnumerateArray().Select(e => e.GetString()?.Trim() ?? "").ToList();
            if (ua.Count == ca.Count &&
                ua.Zip(ca, (u, c) => string.Equals(u, c, StringComparison.OrdinalIgnoreCase))
                  .All(x => x))
                return true;
        }
        return false;
    }

    // match: objeto {sym: desc} — todos los pares deben coincidir
    private static bool ValidateMatch(JsonElement user, JsonElement correct)
    {
        if (user.ValueKind != JsonValueKind.Object) return false;

        var ca = correct.EnumerateObject()
            .ToDictionary(p => p.Name, p => p.Value.GetString()?.Trim() ?? "",
                          StringComparer.OrdinalIgnoreCase);
        var ua = user.EnumerateObject()
            .ToDictionary(p => p.Name, p => p.Value.GetString()?.Trim() ?? "",
                          StringComparer.OrdinalIgnoreCase);

        if (ca.Count != ua.Count) return false;
        return ca.All(p => ua.TryGetValue(p.Key, out var uv) &&
                           string.Equals(uv, p.Value, StringComparison.OrdinalIgnoreCase));
    }
}
