📱 Full Stack Task Manager (Laravel + React Native)

Aplicación full stack de gestión de tareas construida con arquitectura desacoplada, backend REST en Laravel y frontend móvil en React Native (Expo). El proyecto implementa autenticación con Sanctum, manejo de estado server-side con React Query y una separación clara por capas en el cliente móvil.

🚀 Stack técnico

Backend
Laravel 11+
Laravel Sanctum (auth token-based)
MySQL
REST API
Mobile App
React Native (Expo)
TypeScript
Expo Router
React Query (TanStack Query)
Axios

🧠 Arquitectura general

El sistema está diseñado bajo un enfoque layered architecture ligera en frontend y API REST en backend, separando responsabilidades claramente.

📦 Backend (Laravel API)

Arquitectura simple basada en controllers REST:

```text
app/
 ├── Http/
 │    ├── Controllers/
 │         ├── AuthController
 │         └── TaskController
 ├── Models/
 └── Services (implícito vía controllers en esta versión)
 ```

Características
API RESTful para autenticación y CRUD de tareas
Autenticación basada en tokens con Laravel Sanctum
Validación en controllers
Hash de passwords con bcrypt

📱 Frontend (React Native)

Arquitectura por capas orientada a separación de responsabilidades:

```text
src/
 ├── api/           # Cliente Axios
 ├── services/      # Acceso a API (data layer)
 ├── hooks/         # React Query hooks (state server-side)
 ├── components/    # UI reutilizable
 │    ├── TaskCard
 │    ├── TaskInput
 │    └── EmptyState
 ├── types/         # Tipos TypeScript
 └── screens/
      └── Tasks.tsx
```

⚙️ Decisiones de arquitectura

1. React Query como fuente de estado server-side

Se utiliza TanStack React Query para:

Fetch de tareas
Mutaciones (create / delete)
Cache invalidation automática
Eliminación de estado global innecesario

👉 Esto evita uso de Redux o estado manual para datos del backend.

2. Separación en capas

Se separa claramente:

UI Layer → componentes visuales (TaskCard, EmptyState)
Domain Layer → hooks (useTasks, useCreateTask)
Data Layer → servicios API (taskService, axios client)

Esto permite:

Mayor escalabilidad
Testabilidad
Reutilización de lógica
Menor acoplamiento

3. Axios centralizado

Se utiliza un cliente Axios único con:
baseURL configurada
interceptor para inyección automática de token

4. Autenticación
Login devuelve token Sanctum
Token persistido en AsyncStorage
Interceptor agrega token automáticamente en requests

🔐 Auth flow
Usuario inicia sesión
Backend retorna token Sanctum
Token se guarda en AsyncStorage
Axios lo adjunta automáticamente en requests
API protegida mediante middleware auth:sanctum

📋 Funcionalidades
Autenticación
Login de usuario
Persistencia de sesión (token)
Tasks
Listar tareas
Crear tarea
Eliminar tarea
Refresh automático con React Query
Empty state UI

🧩 UI / UX highlights
Componentes reutilizables (TaskCard, EmptyState)
Loading states globales
Pull-to-refresh en lista
Diseño limpio con React Native core components

📡 API Endpoints
Auth
POST /api/login
POST /api/register
POST /api/logout
Tasks (protegido)
GET    /api/tasks
POST   /api/tasks
DELETE /api/tasks/{id}

🧪 Estado del proyecto
```text
✔ Backend funcional (Laravel API + Sanctum)
✔ Mobile app funcional (Expo React Native)
✔ Auth completo con token
✔ CRUD de tareas
✔ Arquitectura frontend desacoplada
✔ Integración React Query
```

🧭 Posibles mejoras futuras
Optimistic updates en React Query
Refresh token / expiración de sesión
Testing (Jest + React Native Testing Library)
Dockerización del backend
CI/CD pipeline
UI kit / design system completo
Roles de usuario

📌 Autor

Proyecto desarrollado como práctica full stack para consolidación de:
arquitectura frontend moderna
integración móvil con API REST
patrones de estado server-side
backend Laravel con autenticación
