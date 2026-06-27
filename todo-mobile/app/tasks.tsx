import { View, Text, FlatList, ActivityIndicator } from "react-native";

import { useTasks } from "../src/hooks/useTasks";
import { useCreateTask } from "../src/hooks/useCreateTask";
import { useDeleteTask } from "../src/hooks/useDeleteTask";

import TaskCard from "../src/components/TaskCard";
import TaskInput from "../src/components/TaskInput";
import EmptyComponent from "../src/components/EmptyComponent";

export default function Tasks() {

    const {
        data: tasks = [],
        isLoading,
    } = useTasks();

    const createTaskMutation = useCreateTask();
    const deleteTaskMutation = useDeleteTask();

    const createTask = (title: string) => {
        createTaskMutation.mutate(title);
    };

    const deleteTask = (id: number) => {
        deleteTaskMutation.mutate(id);
    };

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, padding: 20 }}>

            <Text
                style={{
                    fontSize: 22,
                    marginBottom: 15,
                    fontWeight: "600",
                }}
            >
                Tasks
            </Text>

            <TaskInput
                creating={createTaskMutation.isPending}
                onCreate={createTask}
            />

            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TaskCard
                        task={item}
                        onDelete={deleteTask}
                        deleting={deleteTaskMutation.isPending}
                    />
                )}
                ListEmptyComponent={
                    <EmptyComponent
                        title="No hay tareas"
                        description="Agrega tu primera tarea para comenzar."
                    />
                }
            />

        </View>
    );
}
