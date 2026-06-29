<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Services\AuthService;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class AuthController extends Controller
{
    use ApiResponse;

    public function __construct(
        private AuthService $authService
    ) {}

    #[OA\Post(
        path: '/api/auth/login',
        operationId: 'login',
        summary: 'Authenticate user',
        tags: ['Authentication']
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ['email', 'password'],
            properties: [
                new OA\Property(property: 'email', type: 'string', format: 'email', example: 'john@example.com'),
                new OA\Property(property: 'password', type: 'string', format: 'password', example: 'password'),
            ]
        )
    )]
    #[OA\Response(
        response: 200,
        description: 'Authentication successful'
    )]
    #[OA\Response(
        response: 401,
        description: 'Invalid credentials'
    )]
    public function login(LoginRequest $request)
    {
        $result = $this->authService->login($request->validated());

        return $this->success([
            'user' => new UserResource($result['user']),
            'token' => $result['token'],
            'token_type' => $result['token_type'],
        ], 'Login successful');
    }

    #[OA\Post(
        path: '/api/auth/register',
        operationId: 'register',
        summary: 'Register a new user',
        tags: ['Authentication']
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ['name', 'email', 'password'],
            properties: [
                new OA\Property(property: 'name', type: 'string', example: 'John Doe'),
                new OA\Property(property: 'email', type: 'string', format: 'email', example: 'john@example.com'),
                new OA\Property(property: 'password', type: 'string', format: 'password', example: 'password'),
            ]
        )
    )]
    #[OA\Response(
        response: 201,
        description: 'User registered'
    )]
    public function register(RegisterRequest $request)
    {
        $result = $this->authService->register($request->validated());

        return $this->success([
            'user' => new UserResource($result['user']),
            'token' => $result['token'],
            'token_type' => $result['token_type'],
        ], 'User registered successfully');
    }

    #[OA\Post(
        path: '/api/auth/logout',
        operationId: 'logout',
        summary: 'Logout current user',
        security: [['sanctum' => []]],
        tags: ['Authentication']
    )]
    #[OA\Response(
        response: 200,
        description: 'Logged out successfully'
    )]
    public function logout(Request $request)
    {
        $this->authService->logout($request->user());

        return $this->success(null, 'Logged out successfully');
    }

    #[OA\Get(
        path: '/api/me',
        operationId: 'me',
        summary: 'Authenticated user profile',
        security: [['sanctum' => []]],
        tags: ['Authentication']
    )]
    #[OA\Response(
        response: 200,
        description: 'Authenticated user'
    )]
    #[OA\Response(
        response: 401,
        description: 'Unauthenticated'
    )]
    public function me(Request $request)
    {
        return $this->success(
            new UserResource($request->user()),
            'User profile'
        );
    }
}
