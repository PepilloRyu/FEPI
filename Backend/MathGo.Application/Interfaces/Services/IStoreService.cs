using MathGo.Application.DTOs.Responses;

namespace MathGo.Application.Interfaces.Services;

public interface IStoreService
{
    Task<BuyLifeResponse> BuyLifeAsync(string uid);
}
