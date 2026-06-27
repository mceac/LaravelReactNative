import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "../services/taskService";

export function useCreateTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: taskService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tasks"],
            });
        },
    });
}
