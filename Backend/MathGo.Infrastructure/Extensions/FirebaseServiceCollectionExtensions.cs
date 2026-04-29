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
        
        if (FirebaseApp.DefaultInstance == null)
        {
            var options = new AppOptions { ProjectId = projectId };
            
            if (!string.IsNullOrEmpty(credentialsPath))
            {
                if (!File.Exists(credentialsPath))
                {
                    throw new FileNotFoundException($"El archivo de credenciales de Firebase no se encontró en la ruta: {credentialsPath}");
                }
                options.Credential = GoogleCredential.FromFile(credentialsPath);
            }

            FirebaseApp.Create(options);
        }

        FirestoreDb firestoreDb;
        if (!string.IsNullOrEmpty(credentialsPath) && File.Exists(credentialsPath))
        {
            firestoreDb = new FirestoreDbBuilder
            {
                ProjectId = projectId,
                CredentialsPath = credentialsPath
            }.Build();
        }
        else
        {
            // Ojo: Esto fallará si no está la variable de entorno GOOGLE_APPLICATION_CREDENTIALS
            firestoreDb = FirestoreDb.Create(projectId);
        }
        
        services.AddSingleton(firestoreDb);

        services.AddScoped(typeof(IBaseRepository<>), typeof(FirestoreRepository<>));
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<ITheoryRepository, TheoryRepository>();
        services.AddScoped<IPracticeRepository, PracticeRepository>();
        services.AddScoped<IFeedbackRepository, FeedbackRepository>();
        services.AddScoped<IGroupRepository, GroupRepository>();

        return services;
    }
}
