# ─── Etapa 1: Build ───────────────────────────────────────
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiar archivos de proyecto para restaurar dependencias
COPY Backend/MathGo.Domain/MathGo.Domain.csproj           Backend/MathGo.Domain/
COPY Backend/MathGo.Application/MathGo.Application.csproj Backend/MathGo.Application/
COPY Backend/MathGo.Infrastructure/MathGo.Infrastructure.csproj Backend/MathGo.Infrastructure/
COPY Backend/MathGo.Api/MathGo.Api.csproj                 Backend/MathGo.Api/

RUN dotnet restore Backend/MathGo.Api/MathGo.Api.csproj

# Copiar todo el codigo fuente del backend
COPY Backend/ Backend/

# Publicar en modo Release
WORKDIR /src/Backend/MathGo.Api
RUN dotnet publish MathGo.Api.csproj -c Release -o /app/publish /p:UseAppHost=false

# ─── Etapa 2: Runtime ─────────────────────────────────────
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Copiar los archivos publicados
COPY --from=build /app/publish .

# Railway inyecta el puerto via variable de entorno PORT
ENV ASPNETCORE_URLS=http://+:${PORT:-8080}

EXPOSE 8080

ENTRYPOINT ["dotnet", "MathGo.Api.dll"]
