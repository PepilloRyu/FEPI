using FluentValidation;
using MathGo.Application.DTOs.Requests;

namespace MathGo.Application.Validators;

public class CreatePracticeSessionValidator : AbstractValidator<CreatePracticeSessionRequest>
{
    public CreatePracticeSessionValidator()
    {
        RuleFor(x => x.LessonId).NotEmpty().WithMessage("LessonId is required.");
        RuleFor(x => x.LessonTitle).NotEmpty().WithMessage("LessonTitle is required.");
        RuleFor(x => x.Score).GreaterThanOrEqualTo(0).WithMessage("Score must be a positive number.");
        RuleFor(x => x.Questions).NotEmpty().WithMessage("At least one question is required.");
        RuleForEach(x => x.Questions).SetValidator(new QuestionDtoValidator());
    }
}

public class QuestionDtoValidator : AbstractValidator<QuestionDto>
{
    public QuestionDtoValidator()
    {
        RuleFor(x => x.QuestionText).NotEmpty().WithMessage("QuestionText is required.");
        RuleFor(x => x.ExpectedAnswer).NotEmpty().WithMessage("ExpectedAnswer is required.");
        RuleFor(x => x.UserAnswer).NotEmpty().WithMessage("UserAnswer is required.");
    }
}
