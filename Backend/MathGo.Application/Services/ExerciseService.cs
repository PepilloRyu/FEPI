using MathGo.Application.DTOs.Responses;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Application.Interfaces.Services;
using MathGo.Domain.Entities;
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
    private readonly IAttemptRepository _attemptRepository;

    public ExerciseService(
        IExerciseRepository exerciseRepository,
        ExerciseAnswersCache cache,
        IProgressRepository progressRepository,
        IGamificationService gamificationService,
        IMissionService missionService,
        IAchievementService achievementService,
        IAttemptRepository attemptRepository)
    {
        _exerciseRepository = exerciseRepository;
        _cache = cache;
        _progressRepository = progressRepository;
        _gamificationService = gamificationService;
        _missionService = missionService;
        _achievementService = achievementService;
        _attemptRepository = attemptRepository;
    }

    public async Task<List<ExerciseDto>> GetExercisesByWorldAsync(int worldId, bool isAdmin = false)
    {
        var exercises = await _exerciseRepository.GetByWorldAsync(worldId);
        if (isAdmin)
        {
            foreach (var ex in exercises)
            {
                if (_cache.Answers.TryGetValue(ex.Id, out var entry))
                {
                    if (entry.TryGetProperty("answer", out var answer))
                    {
                        if (ex.Type == "mc" || ex.Type == "vf")
                        {
                            var correctStr = answer.GetString();
                            if (ex.Options != null)
                            {
                                foreach (var opt in ex.Options)
                                {
                                    opt.Correct = string.Equals(opt.Label, correctStr, StringComparison.OrdinalIgnoreCase);
                                }
                            }
                        }
                        else if (ex.Type == "build")
                        {
                            ex.Operands = JsonSerializer.Deserialize<List<string>>(answer.GetRawText());
                        }
                        else if (ex.Type == "buildSeq")
                        {
                            ex.Answers = JsonSerializer.Deserialize<List<List<string>>>(answer.GetRawText());
                        }
                        else if (ex.Type == "slots")
                        {
                            ex.Answer = JsonSerializer.Deserialize<List<string>>(answer.GetRawText());
                        }
                    }
                }
            }
        }
        return exercises;
    }

    public async Task<AnswerResultDto> CheckAnswerAsync(
        string exerciseId, string uid, JsonElement userAnswer, bool isAdmin = false)
    {
        if (!_cache.Answers.TryGetValue(exerciseId, out var entry))
            throw new KeyNotFoundException(
                $"No existe entrada de respuesta para el ejercicio '{exerciseId}' en answers.json.");

        var progress = await _progressRepository.GetByIdAsync(uid);

        // Aplicar regeneración antes de evaluar el guard, para que las vidas
        // regeneradas cuenten y no bloqueen innecesariamente al usuario.
        if (!isAdmin && progress != null)
        {
            var (newLives, newTs, changed) = LivesHelper.CalculateRegenerated(
                progress.Lives, progress.LastLifeLostAt);
            if (changed)
            {
                progress.Lives = newLives;
                progress.LastLifeLostAt = newTs;
                await _progressRepository.UpdateAsync(uid, progress);
            }
        }

        if (!isAdmin && progress != null && progress.Lives <= 0)
            throw new InvalidOperationException("Sin vidas disponibles");

        string type = entry.GetProperty("type").GetString() ?? "";
        var correct = entry.GetProperty("answer");

        bool commutative = entry.TryGetProperty("commutative", out var commProp) &&
                           commProp.ValueKind == JsonValueKind.True;

        bool isCorrect = type switch
        {
            "mc" or "vf" => ValidateMcVf(userAnswer, correct),
            "build"      => ValidateOrderedList(userAnswer, correct),
            "slots"      => commutative
                                ? ValidateUnorderedList(userAnswer, correct)
                                : ValidateOrderedList(userAnswer, correct),
            "buildSeq"   => ValidateBuildSeq(userAnswer, correct),
            "match"      => ValidateMatch(userAnswer, correct),
            _            => false
        };

        int xpAwarded = 0;

        if (isCorrect)
        {
            if (progress != null)
            {
                xpAwarded = _gamificationService.CalculateXpEarned(true, false, progress.DailyStreak);
                if (progress.XpBoostUntil.HasValue && progress.XpBoostUntil.Value > DateTime.UtcNow)
                    xpAwarded *= 2;
                progress.TotalXp += xpAwarded;
                progress.Level = _gamificationService.CalculateLevel(progress.TotalXp);

                progress.DailyStreak = await _gamificationService.UpdateDailyStreakAsync(
                    uid, progress.LastActiveDate);
                progress.LastActiveDate = DateTime.UtcNow.Date.ToString("yyyy-MM-dd");

                var mexicoNow = DateTime.UtcNow.Add(TimeSpan.FromHours(-6));
                var today = mexicoNow.Date;
                int daysFromMonday = ((int)today.DayOfWeek + 6) % 7;
                string currentWeekMonday = today.AddDays(-daysFromMonday).ToString("yyyy-MM-dd");
                if (progress.WeeklyActivityStart != currentWeekMonday)
                {
                    progress.WeeklyActivity = new List<int> { 0, 0, 0, 0, 0, 0, 0 };
                    progress.WeeklyActivityStart = currentWeekMonday;
                }
                if (progress.WeeklyActivity == null || progress.WeeklyActivity.Count != 7)
                    progress.WeeklyActivity = new List<int> { 0, 0, 0, 0, 0, 0, 0 };
                progress.WeeklyActivity[(int)today.DayOfWeek] += xpAwarded;
                progress.WeeklyXp = progress.WeeklyActivity.Sum();

                await _progressRepository.UpdateAsync(uid, progress);

                _ = _missionService.EvaluateMissionProgressAsync(uid, "xp_earned", xpAwarded)
                    .ContinueWith(t => Debug.WriteLine($"[MissionService] EvaluateMissionProgress error: {t.Exception}"), TaskContinuationOptions.OnlyOnFaulted);
                _ = _achievementService.EvaluateNewAchievementsAsync(uid)
                    .ContinueWith(t => Debug.WriteLine($"[AchievementService] EvaluateNewAchievements error: {t.Exception}"), TaskContinuationOptions.OnlyOnFaulted);
            }
        }
        else if (!isAdmin && progress != null)
        {
            bool wasAtMax = progress.Lives >= LivesHelper.MaxLives;
            progress.Lives = Math.Max(0, progress.Lives - 1);
            // Iniciar timer si: (a) acaba de bajar del máximo, o (b) timer nunca fue seteado
            // (b) cubre usuarios existentes que tienen LastLifeLostAt=null por ser campo nuevo
            if (wasAtMax || progress.LastLifeLostAt == null)
                progress.LastLifeLostAt = DateTime.UtcNow;
            // Si ya tenía timer activo: no tocarlo (preserva el countdown existente)
            await _progressRepository.UpdateAsync(uid, progress);
        }

        // Log attempt — fire-and-forget, nunca bloquea la respuesta al usuario
        var parts = exerciseId.Split('_');
        int worldId = parts.Length > 0 && int.TryParse(parts[0], out var wid) ? wid : 0;
        int levelId = parts.Length > 1 && int.TryParse(parts[1], out var lid) ? lid : 0;
        int exIdx   = parts.Length > 2 && int.TryParse(parts[2], out var eidx) ? eidx : -1;
        var attempt = new AttemptLog
        {
            Id           = Guid.NewGuid().ToString(),
            UserId       = uid,
            ExerciseId   = exerciseId,
            WorldId      = worldId,
            LevelId      = levelId,
            IsCorrect    = isCorrect,
            XpEarned     = xpAwarded,
            UserAnswer   = userAnswer.ValueKind != JsonValueKind.Undefined ? userAnswer.GetRawText() : "",
            CompletedAt  = DateTime.UtcNow,
        };
        _ = _attemptRepository.AddAsync(attempt, attempt.Id)
            .ContinueWith(t => Debug.WriteLine($"[AttemptRepository] AddAsync error: {t.Exception}"),
                          TaskContinuationOptions.OnlyOnFaulted);

        // Detectar si es el último ejercicio del nivel usando el cache en memoria (sin I/O extra).
        // El último índice del nivel es el máximo que exista en answers.json para ese prefijo.
        if (isCorrect && exIdx >= 0 && progress != null)
        {
            var prefix = $"{worldId}_{levelId}_";
            int maxIdx = _cache.Answers.Keys
                .Where(k => k.StartsWith(prefix, StringComparison.Ordinal))
                .Select(k => int.TryParse(k.AsSpan(prefix.Length), out var i) ? i : -1)
                .DefaultIfEmpty(-1)
                .Max();

            if (exIdx == maxIdx)
                _ = _missionService.EvaluateMissionProgressAsync(uid, "levels_completed", 1)
                    .ContinueWith(t => Debug.WriteLine($"[MissionService] levels_completed error: {t.Exception}"),
                                  TaskContinuationOptions.OnlyOnFaulted);
        }

        return new AnswerResultDto
        {
            Correct = isCorrect,
            XpAwarded = xpAwarded,
            RemainingLives = progress?.Lives ?? 15,
        };
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

    // slots con commutative:true — mismos elementos en cualquier orden
    private static bool ValidateUnorderedList(JsonElement user, JsonElement correct)
    {
        if (user.ValueKind != JsonValueKind.Array) return false;
        var ua = user.EnumerateArray().Select(e => e.GetString()?.Trim() ?? "").OrderBy(s => s, StringComparer.OrdinalIgnoreCase).ToList();
        var ca = correct.EnumerateArray().Select(e => e.GetString()?.Trim() ?? "").OrderBy(s => s, StringComparer.OrdinalIgnoreCase).ToList();
        return ua.Count == ca.Count &&
               ua.Zip(ca, (u, c) => string.Equals(u, c, StringComparison.OrdinalIgnoreCase))
                 .All(x => x);
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
