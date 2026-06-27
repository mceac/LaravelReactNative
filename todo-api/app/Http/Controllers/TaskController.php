<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;
use App\Services\TaskService;

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
            TaskResource::collection($tasks);
        );
    }

    public function show(Task $task)
    {
        $this->authorizeTask($task);

        return $this->success($task);
    }

    public function store(StoreTaskRequest $request)
    {
        return $this->success(
            $this->taskService->create($request->validated(), auth()->id())
        );
    }

    public function update(StoreTaskRequest $request, Task $task)
    {
        $this->authorizeTask($task);

        return $this->success(
            $this->taskService->update($task, $request->validated())
        );
    }

    public function destroy(Task $task)
    {
        $this->authorizeTask($task);

        $this->taskService->delete($task);

        return $this->success(null, 'Task deleted successfully');
    }

    private function authorizeTask(Task $task): void
    {
        if ($task->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }
    }
}
