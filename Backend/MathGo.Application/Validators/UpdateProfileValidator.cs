using FluentValidation;
using MathGo.Application.DTOs.Requests;

namespace MathGo.Application.Validators;

public class UpdateProfileValidator : AbstractValidator<UpdateProfileRequest>
{
    public UpdateProfileValidator()
    {
        RuleFor(x => x.Name)
            .Length(2, 100).WithMessage("El nombre debe tener entre 2 y 100 caracteres.")
            .When(x => !string.IsNullOrEmpty(x.Name));
    }
}
