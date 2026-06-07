using FluentValidation;
using MathGo.Application.DTOs.Requests;

namespace MathGo.Application.Validators;

public class SubmitAttemptValidator : AbstractValidator<SubmitAttemptRequest>
{
    public SubmitAttemptValidator()
    {
        RuleFor(x => x.TopicId)
            .NotEmpty().WithMessage("El ID del tema es obligatorio.");

        RuleFor(x => x.TimeMs)
            .GreaterThan(0).WithMessage("El tiempo de resolución debe ser mayor a 0.");
    }
}
