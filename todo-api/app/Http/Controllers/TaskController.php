<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Resources\TaskResource;
use App\Services\TaskService;
use App\Traits\ApiResponse;

class TaskController extends Controller
{
    use ApiResponse;

    public function __construct(
        private TaskService $taskService
    ) {}

    public function index()
    {
        $tasks = $this->taskService->getAllForUser(auth()->id());

        return $this->success(
            TaskResource::collection($tasks),
            'Tasks retrieved successfully'
        );
    }

    public function show(Task $task)
    {
        $this->authorize('view', $task);

        return $this->success(
            new TaskResource($task),
            'Task retrieved successfully'
        );
    }

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

    public function update(StoreTaskRequest $request, Task $task)
    {
        $this->authorize('update', $task);

        $updatedTask = $this->taskService->update(
            $task,
            $request->validated()
        );

        return $this->success(
            new TaskResource($updatedTask),
            'Task updated successfully'
        );
    }

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
