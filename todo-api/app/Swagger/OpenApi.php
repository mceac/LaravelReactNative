<?php

namespace App\Swagger;

use OpenApi\Attributes as OA;

#[OA\Info(
    version: '1.0.0',
    title: 'Task Manager API',
    description: 'REST API for Task Manager with Laravel Sanctum authentication'
)]
#[OA\Server(
    url: 'http://localhost:8000',
    description: 'Local Development Server'
)]
#[OA\SecurityScheme(
    securityScheme: 'sanctum',
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'Token'
)]
class OpenApi {}
