<?php

namespace App\Services;

use App\Models\Task;

class TaskService
{
    public function getAllForUser($userId)
    {
        return Task::where('user_id', $userId)->latest()->get();
    }

    public function create(array $data, $userId)
    {
        return Task::create([
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'user_id' => $userId,
        ]);
    }

    public function update(Task $task, array $data): Task
    {
        $task->update($data);

        return $task->fresh();
    }

    public function delete(Task $task)
    {
        return $task->delete();
    }
}
