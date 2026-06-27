import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "../services/taskService";

export function useDeleteTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: taskService.remove,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tasks"],
            });
        },
    });
}
