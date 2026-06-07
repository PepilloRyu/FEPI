namespace MathGo.Domain.Enums;

/// <summary>
/// Roles disponibles en la plataforma MathGo.
/// </summary>
public enum UserRole
{
    /// <summary>Estudiante — rol por defecto.</summary>
    Student = 0,

    /// <summary>Profesor — puede crear grupos y ver reportes de alumnos.</summary>
    Teacher = 1,

    /// <summary>Administrador — acceso total al sistema.</summary>
    Admin = 2
}
