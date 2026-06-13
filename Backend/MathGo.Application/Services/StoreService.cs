using MathGo.Application.DTOs.Responses;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Application.Interfaces.Services;
using MathGo.Domain.Entities;

namespace MathGo.Application.Services;

public class StoreService : IStoreService
{
    private readonly IProgressRepository _progressRepository;

    public StoreService(IProgressRepository progressRepository)
    {
        _progressRepository = progressRepository;
    }

    public async Task<BuyLifeResponse> BuyLifeAsync(string uid)
    {
        var progress = await _progressRepository.GetByIdAsync(uid)
            ?? new UserProgress { Uid = uid };

        if (progress.Gems < 100)
            throw new InvalidOperationException("Gemas insuficientes");

        if (progress.Lives >= LivesHelper.MaxLives)
            throw new InvalidOperationException("Ya tienes el máximo de vidas");

        progress.Gems -= 100;
        progress.Lives += 1;

        if (progress.Lives >= LivesHelper.MaxLives)
            progress.LastLifeLostAt = null;

        await _progressRepository.UpdateAsync(uid, progress);

        return new BuyLifeResponse { Gems = progress.Gems, Lives = progress.Lives };
    }
}
