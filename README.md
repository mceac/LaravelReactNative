📱 Full Stack Task Manager (Laravel + React Native)

A full-stack task management application built with a decoupled architecture, featuring a RESTful Laravel backend and a React Native (Expo) mobile frontend. The project implements token-based authentication using Laravel Sanctum, server-state management with TanStack Query, and a clear layered structure on the client side.

🚀 Tech Stack
Backend
Laravel 11+
Laravel Sanctum (token-based authentication)
MySQL
RESTful API architecture
Mobile App
React Native (Expo)
TypeScript
Expo Router
TanStack Query (React Query)
Axios

🧠 High-Level Architecture

The system follows a lightweight layered architecture on the frontend and a REST API-driven backend, with a strong separation of concerns across all layers.

📦 Backend (Laravel API)

The backend follows a simple REST-oriented controller-based structure:

```text
app/
 ├── Http/
 │    ├── Controllers/
 │         ├── AuthController
 │         └── TaskController
 ├── Models/
 └── Services (implicitly handled within controllers in this version)
```

Key Features
RESTful API for authentication and task CRUD operations
Token-based authentication using Laravel Sanctum
Request validation handled at controller level
Password hashing using bcrypt

📱 Frontend (React Native)

The mobile app is structured using a layered architecture focused on separation of concerns and scalability:

```text
src/
 ├── api/           # Axios HTTP client
 ├── services/      # API abstraction layer (data access)
 ├── hooks/         # React Query hooks (server-state management)
 ├── components/    # Reusable UI components
 │    ├── TaskCard
 │    ├── TaskInput
 │    └── EmptyState
 ├── types/         # TypeScript definitions
 └── screens/
      └── Tasks.tsx
```

⚙️ Architectural Decisions

1. React Query as Server-State Layer

TanStack Query is used as the primary server-state management solution for:

Fetching tasks
Handling mutations (create / delete)
Automatic cache invalidation
Eliminating the need for global state management (e.g., Redux)

👉 This approach avoids unnecessary global client state for backend-driven data.

2. Layered Frontend Architecture

The frontend is separated into distinct layers:

UI Layer → Presentational components (TaskCard, EmptyState)
Domain Layer → Custom hooks (useTasks, useCreateTask)
Data Layer → API services (taskService, Axios client)

This structure improves:

Scalability
Testability
Code reuse
Separation of concerns

3. Centralized Axios Client

A single Axios instance is used with:

Configured base URL
Request interceptor for automatic token injection

4. Authentication Strategy
Login returns a Laravel Sanctum token
Token is persisted using AsyncStorage
Axios interceptor automatically attaches the token to requests

🔐 Authentication Flow

User logs in
Backend returns Sanctum token
Token is stored in AsyncStorage
Axios attaches token on every request
Protected routes enforced via auth:sanctum middleware

📋 Features

Authentication
User login
Session persistence via token storage
Tasks
Fetch task list
Create task
Delete task
Automatic refetching via React Query
Empty state handling

🧩 UI / UX Highlights

Reusable components (TaskCard, EmptyState)
Global loading states
Pull-to-refresh support
Clean UI built with React Native core components

📡 API Endpoints

Authentication
POST /api/login
POST /api/register
POST /api/logout
Tasks (Protected)
GET /api/tasks
POST /api/tasks
DELETE /api/tasks/{id}

🧪 Project Status
```text
✔ Functional backend (Laravel API + Sanctum)
✔ Functional mobile app (Expo React Native)
✔ Complete authentication flow
✔ Full CRUD for tasks
✔ Decoupled frontend architecture
✔ React Query integration
```

🧭 Future Improvements

Optimistic updates with React Query
Token refresh / session expiration handling
Testing (Jest + React Native Testing Library)
Backend Dockerization
CI/CD pipeline
UI kit / design system
Role-based access control (RBAC)

📌 Author

This project was developed as a full-stack practice project to strengthen:

Modern frontend architecture patterns
Mobile integration with REST APIs
Server-state management strategies
Laravel backend development with authentication
