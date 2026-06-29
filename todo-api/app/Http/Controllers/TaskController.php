<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Resources\TaskResource;
use App\Services\TaskService;
use App\Traits\ApiResponse;
use OpenApi\Attributes as OA;

class TaskController extends Controller
{
    use ApiResponse;

    public function __construct(
        private TaskService $taskService
    ) {}

    #[OA\Get(
        path: '/api/tasks',
        operationId: 'listTasks',
        summary: 'List user tasks',
        security: [['sanctum' => []]],
        tags: ['Tasks']
    )]
    #[OA\Response(
        response: 200,
        description: 'Task list'
    )]
    public function index()
    {
        $tasks = $this->taskService->getAllForUser(auth()->id());

        return $this->success(
            TaskResource::collection($tasks),
            'Tasks retrieved successfully'
        );
    }

    #[OA\Get(
        path: '/api/tasks/{id}',
        operationId: 'showTask',
        summary: 'Show a task',
        security: [['sanctum' => []]],
        tags: ['Tasks']
    )]
    #[OA\Parameter(
        name: 'id',
        in: 'path',
        required: true,
        schema: new OA\Schema(type: 'integer')
    )]
    #[OA\Response(
        response: 200,
        description: 'Task details'
    )]
    #[OA\Response(
        response: 403,
        description: 'Forbidden'
    )]
    public function show(Task $task)
    {
        $this->authorize('view', $task);

        return $this->success(
            new TaskResource($task),
            'Task retrieved successfully'
        );
    }

    #[OA\Post(
        path: '/api/tasks',
        operationId: 'createTask',
        summary: 'Create task',
        security: [['sanctum' => []]],
        tags: ['Tasks']
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ['title'],
            properties: [
                new OA\Property(property: 'title', type: 'string', example: 'Buy groceries'),
                new OA\Property(property: 'description', type: 'string', example: 'Milk, Bread, Eggs')
            ]
        )
    )]
    #[OA\Response(
        response: 201,
        description: 'Task created'
    )]
    public function store(StoreTaskRequest $request)
    {
        $task = $this->taskService->create(
            $request->validated(),
            auth()->id()
        );

        return $this->success(
            new TaskResource($task),
            'Task created successfully'
        );
    }

    #[OA\Put(
        path: '/api/tasks/{id}',
        operationId: 'updateTask',
        summary: 'Update task',
        security: [['sanctum' => []]],
        tags: ['Tasks']
    )]
    #[OA\Parameter(
        name: 'id',
        in: 'path',
        required: true,
        schema: new OA\Schema(type: 'integer')
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: 'title', type: 'string'),
                new OA\Property(property: 'description', type: 'string')
            ]
        )
    )]
    #[OA\Response(
        response: 200,
        description: 'Task updated'
    )]
    public function update(StoreTaskRequest $request, Task $task)
    {
        $this->authorize('update', $task);

        $task = $this->taskService->update($task, $request->validated());

        return $this->success(
            new TaskResource($task),
            'Task updated successfully'
        );
    }

    #[OA\Delete(
        path: '/api/tasks/{id}',
        operationId: 'deleteTask',
        summary: 'Delete task',
        security: [['sanctum' => []]],
        tags: ['Tasks']
    )]
    #[OA\Parameter(
        name: 'id',
        in: 'path',
        required: true,
        schema: new OA\Schema(type: 'integer')
    )]
    #[OA\Response(
        response: 200,
        description: 'Task deleted'
    )]
    public function destroy(Task $task)
    {
        $this->authorize('delete', $task);

        $this->taskService->delete($task);

        return $this->success(
            null,
            'Task deleted successfully'
        );
    }
}
