# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MathGo is a gamified algebra learning platform inspired by Duolingo. Users progress through 6 "worlds", each containing levels with theory cards and interactive exercises. The backend is ASP.NET Core 8 with Firestore; the frontend is vanilla HTML/CSS/JS with Firebase SDK loaded from CDN.

## Commands

### Backend
```bash
# Run API (from repo root)
dotnet run --project Backend/MathGo.Api

# Build entire solution
dotnet build Backend/MathGo.slnx

# Run all tests
dotnet test Backend/MathGo.Tests

# Run a single test class
dotnet test Backend/MathGo.Tests --filter "FullyQualifiedName~GamificationServiceTests"
```

Swagger UI is available at `http://localhost:5000/swagger` in Development mode. The Swagger UI is pre-configured with a Bearer token input field.

### Frontend
```bash
cd Frontend
npm run dev      # Vite dev server (http://localhost:5173)
npm run build    # Production build
npm run preview  # Preview production build
```

### Docker (production image)
```bash
docker build -t mathgo .
docker run -p 8080:8080 -e FIREBASE_CREDENTIALS_JSON='...' mathgo
```

## Backend Architecture (Clean Architecture)

```
Backend/
  MathGo.Domain/         # Entities + Enums (no dependencies)
  MathGo.Application/    # Interfaces, Services, DTOs, FluentValidation validators
  MathGo.Infrastructure/ # Firestore repos, Firebase init, Email service
  MathGo.Api/            # Controllers, middleware, Program.cs (composition root)
  MathGo.Tests/          # xUnit + Moq unit tests
```

**Key flow**: Controllers → Application Services (via `IXxxService`) → Infrastructure Repositories (via `IXxxRepository`) → Firestore.

All services and repositories are registered in `Program.cs` and `FirebaseServiceCollectionExtensions.cs`. Adding a new service requires: interface in `Application/Interfaces`, implementation in `Application/Services` or `Infrastructure/Services`, and DI registration in `Program.cs`.

**Auth**: Firebase JWT tokens are validated via `JwtBearer` with `securetoken.google.com/{projectId}` as authority. The `role` claim drives role-based authorization (`[Authorize(Roles = "admin")]`). User roles are `student`, `teacher`, `admin`. The `Firebase:ProjectId` config key is required in `appsettings.json`.

**answers.json**: Exercise answer keys are loaded once at startup into `ExerciseAnswersCache` (singleton). The file lives at `Backend/MathGo.Api/answers.json`. Key format: `"{worldId}_{levelIndex}_{challengeIndex}"` (indices are 0-based).

**Firebase credentials**:
- Local dev: place `firebase-credentials.json` in `Backend/MathGo.Api/`
- Production (Render): set env var `FIREBASE_CREDENTIALS_JSON` with the JSON content

**Middleware**: `GlobalExceptionMiddleware` catches unhandled exceptions and returns a JSON `{ StatusCode, Message }` with HTTP 500. It must be registered in `Program.cs` before `UseAuthentication`.

## Frontend Architecture

```
Frontend/
  html/           # One HTML file per page
  js/
    firebaseConfig.js      # Firebase init (app, auth, db exports)
    mathgo-engine.js       # Core game loop: exercises, lives, XP, theory flow
    services/api.js        # Centralized HTTP client — all backend calls go here
    services/auth.js       # Auth helpers (login, signup, session guards)
    components/sidebar.js  # Shared sidebar (hearts, XP, streak); injected into every world page
    worlds/
      world-N-meta.js      # World definition: levels[], theory[], challenges: [] (empty — served from API)
      world-N-answers.js   # Admin preview answers only (auto-generated, NOT used in normal gameplay)
  css/design-system.css   # Single design system (CSS custom properties)
  assets/
    JSON/           # i18n landing page strings
    json-animations/ # Lottie animation data
```

The frontend uses **native ES modules** (`type="module"` in HTML). Firebase SDK is loaded from `https://www.gstatic.com/firebasejs/12.11.0/` CDN — no npm install needed for runtime code. Vite is only for bundling/dev-serving.

**API client** (`services/api.js`): auto-attaches the Firebase JWT to every request. Detects localhost vs production to switch `BASE_URL` between `http://localhost:5000/api` and `https://mathgo-backend.onrender.com/api`. All callers receive `{ data, error }`.

**Game engine** (`mathgo-engine.js`): `initEngine()` is the entry point called by each `world-N.html` via an inline `<script type="module">` block. It loads world exercises from `GET /api/Exercises/world/{worldId}`, renders theory cards and challenges, handles the lives system (403 → `NO_LIVES`), XP awards, and the jump-exam flow (12 questions, pass threshold 83%).

**Progress tracking — dual path**: The frontend writes streak/daily-activity directly to Firestore (`mathgo_progress/{uid}`) using the Firebase client SDK. XP, level-completion, missions, and achievements go through the backend REST API (`/api/Progress/complete-level`, etc.) and are also persisted in Firestore server-side.

**World unlock logic** (enforced in `initEngine`):
- World 1: always unlocked
- Worlds 2–6: require `raw.worlds[prereqWorldId].allComplete === true` OR `raw.worlds[worldId].jumpExam.passed === true`
- Admin role: bypasses all unlock checks

## Data Model (Firestore)

| Collection | Document key | Notes |
|---|---|---|
| `users` | `{uid}` | Profile: name, email, role, avatarUrl |
| `mathgo_progress` | `{uid}` | XP, streak, lives, world/level progress |
| `worlds` | auto-id | `worldId` (int 1–6), levels[], each level has theory[] and challenges[] |

**Challenge types**: `mc`, `vf`, `build`, `buildSeq`, `slots`, `match`. The `WorldsController` strips `correct`/`answer` fields before sending to the client; real answers come from `answers.json` on the server.

## Key Conventions

- All backend HTTP routes use `api/[controller]` convention (e.g. `/api/Auth/register`).
- FluentValidation validators live in `Application/Validators/` and are auto-registered from the assembly.
- New Firestore entities need `[FirestoreData]` and `[FirestoreProperty("field")]` attributes on all mapped properties.
- Each `world-N.html` contains an inline `<script type="module">` that imports from `worlds/world-N-meta.js` (world structure) and `worlds/world-N-answers.js` (admin preview) and calls `initEngine()`.
- `worlds/world-N-answers.js` files are auto-generated snapshots for admin preview only — the authoritative answers live in `answers.json` and are never sent to the client.
- CORS is configured in `Program.cs`; to allow a new origin add it to the `WithOrigins(...)` list in the `AllowFrontend` policy.
