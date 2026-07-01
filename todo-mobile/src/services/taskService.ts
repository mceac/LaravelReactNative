import { api } from "../api/client";
import { Task } from "../types/task";
import { ApiResponse } from "../types/api";

export const taskService = {
    async getAll(): Promise<Task[]> {
        const response = await api.get<ApiResponse<Task[]>>("/tasks");
        return response.data.data;
    },

    async create(title: string): Promise<Task> {
        const response = await api.post<ApiResponse<Task>>("/tasks", {
            title,
        });

        return response.data.data;
    },
    
    async remove(id: number): Promise<void> {
        await api.delete(`/tasks/${id}`);
    },

    async update(id: number, title: string): Promise<Task> {
        const response = await api.put<ApiResponse<Task>>(`/tasks/${id}`, {
            title,
        });

        return response.data.data;
    },
};
