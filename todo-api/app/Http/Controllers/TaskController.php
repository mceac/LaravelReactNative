<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return auth()->user()->tasks;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $task = auth()->user()->tasks()->create([
            'title' => $request->title,
            'description' => $request->description,
            'completed' => false,
        ]);

        return response()->json($task, 201);
    }   

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
        return $task;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        //
        $task->update($request->all());
        return $task;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
        $task->delete();
        return response()->noContent();
    }
}
