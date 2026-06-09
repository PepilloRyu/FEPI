using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Firestore;
using MathGo.Application.Interfaces.Repositories;
using MathGo.Infrastructure.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace MathGo.Infrastructure.Extensions;

public static class FirebaseServiceCollectionExtensions
{
    public static IServiceCollection AddFirebaseServices(this IServiceCollection services, IConfiguration configuration)
    {
        var projectId = configuration["Firebase:ProjectId"];
        var credentialsPath = configuration["Firebase:CredentialsPath"];

        // En Railway (produccion) se usa la variable de entorno FIREBASE_CREDENTIALS_JSON
        // con el contenido del JSON de credenciales como string.
        // En local se usa el archivo firebase-credentials.json.
        var credentialsJson = Environment.GetEnvironmentVariable("FIREBASE_CREDENTIALS_JSON");

        if (FirebaseApp.DefaultInstance == null)
        {
            var options = new AppOptions { ProjectId = projectId };

            if (!string.IsNullOrEmpty(credentialsJson))
            {
                // Credenciales desde variable de entorno (Railway / produccion)
                options.Credential = GoogleCredential.FromJson(credentialsJson);
            }
            else if (!string.IsNullOrEmpty(credentialsPath) && File.Exists(credentialsPath))
            {
                // Credenciales desde archivo local (desarrollo)
                options.Credential = GoogleCredential.FromFile(credentialsPath);
            }
            else
            {
                try
                {
                    options.Credential = GoogleCredential.GetApplicationDefault();
                }
                catch (Exception ex)
                {
                    throw new InvalidOperationException(
                        "No se encontraron credenciales de Firebase. " +
                        "Configura la variable de entorno FIREBASE_CREDENTIALS_JSON en Railway, " +
                        "o el archivo firebase-credentials.json para desarrollo local.", ex);
                }
            }

            FirebaseApp.Create(options);
        }

        FirestoreDb firestoreDb;
        if (!string.IsNullOrEmpty(credentialsJson))
        {
            firestoreDb = new FirestoreDbBuilder
            {
                ProjectId = projectId,
                JsonCredentials = credentialsJson
            }.Build();
        }
        else if (!string.IsNullOrEmpty(credentialsPath) && File.Exists(credentialsPath))
        {
            firestoreDb = new FirestoreDbBuilder
            {
                ProjectId = projectId,
                CredentialsPath = credentialsPath
            }.Build();
        }
        else
        {
            firestoreDb = FirestoreDb.Create(projectId);
        }

        services.AddSingleton(firestoreDb);

        services.AddScoped(typeof(IBaseRepository<>), typeof(FirestoreRepository<>));
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<ITheoryRepository, TheoryRepository>();
        services.AddScoped<IPracticeRepository, PracticeRepository>();
        services.AddScoped<IFeedbackRepository, FeedbackRepository>();
        services.AddScoped<IGroupRepository, GroupRepository>();

        // Gamification and progress repositories
        services.AddScoped<IProgressRepository, ProgressRepository>();
        services.AddScoped<IAttemptRepository, AttemptRepository>();
        services.AddScoped<IMissionRepository, MissionRepository>();
        services.AddScoped<IAchievementRepository, AchievementRepository>();

        return services;
    }
}
