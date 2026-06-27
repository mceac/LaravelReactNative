<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function authenticated_user_can_create_task(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/tasks', [
                'title' => 'My First Task',
                'description' => 'Task description test',
            ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'message',
                'data' => [
                    'id',
                    'title',
                    'description',
                    'created_at',
                ]
            ]);

        $this->assertDatabaseHas('tasks', [
            'title' => 'My First Task',
            'user_id' => $user->id,
        ]);
    }

    /** @test */
    public function authenticated_user_can_list_their_tasks(): void
    {
        $user = User::factory()->create();

        Task::factory()->count(3)->create([
            'user_id' => $user->id,
        ]);

        Task::factory()->count(2)->create(); // tasks de otros usuarios

        $response = $this->actingAs($user, 'sanctum')
            ->getJson('/api/tasks');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'message',
                'data'
            ]);
    }

    /** @test */
    public function user_can_view_only_their_task(): void
    {
        $user = User::factory()->create();

        $task = Task::factory()->create([
            'user_id' => $user->id,
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->getJson("/api/tasks/{$task->id}");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'message',
                'data' => [
                    'id',
                    'title',
                    'description',
                ]
            ]);
    }

    /** @test */
    public function user_cannot_view_other_users_task(): void
    {
        $user = User::factory()->create();
        $otherTask = Task::factory()->create(); // otro usuario

        $response = $this->actingAs($user, 'sanctum')
            ->getJson("/api/tasks/{$otherTask->id}");

        $response->assertStatus(403);
    }

    /** @test */
    public function user_can_update_their_task(): void
    {
        $user = User::factory()->create();

        $task = Task::factory()->create([
            'user_id' => $user->id,
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->putJson("/api/tasks/{$task->id}", [
                'title' => 'Updated Title',
                'description' => 'Updated description',
            ]);

        $response->assertStatus(200)
            ->assertJsonFragment([
                'title' => 'Updated Title',
            ]);

        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'title' => 'Updated Title',
        ]);
    }

    /** @test */
    public function user_cannot_update_other_users_task(): void
    {
        $user = User::factory()->create();
        $otherTask = Task::factory()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->putJson("/api/tasks/{$otherTask->id}", [
                'title' => 'Hacked Title',
            ]);

        $response->assertStatus(403);
    }

    /** @test */
    public function user_can_delete_their_task(): void
    {
        $user = User::factory()->create();

        $task = Task::factory()->create([
            'user_id' => $user->id,
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->deleteJson("/api/tasks/{$task->id}");

        $response->assertStatus(200);

        $this->assertDatabaseMissing('tasks', [
            'id' => $task->id,
        ]);
    }

    /** @test */
    public function user_cannot_delete_other_users_task(): void
    {
        $user = User::factory()->create();
        $otherTask = Task::factory()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->deleteJson("/api/tasks/{$otherTask->id}");

        $response->assertStatus(403);
    }
}
