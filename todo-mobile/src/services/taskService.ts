import { api } from "../api/client";
import { Task } from "../types/task";

export const taskService = {
    async getAll(): Promise<Task[]> {
        const response = await api.get<Task[]>("/tasks");
        return response.data;
    },

    async create(title: string): Promise<Task> {
        const response = await api.post<Task>("/tasks", {
            title,
        });

        return response.data;
    },

    async remove(id: number): Promise<void> {
        await api.delete(`/tasks/${id}`);
    },

    async update(id: number, title: string): Promise<Task> {
        const response = await api.put<Task>(`/tasks/${id}`, {
            title,
        });

        return response.data;
    },
};
