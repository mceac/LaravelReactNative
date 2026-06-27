import { View, Text, TouchableOpacity } from "react-native";
import { Task } from "../types/task";

interface TaskCardProps {
    task: Task;
    onDelete: (id: number) => void;
    deleting: boolean;
}

export default function TaskCard({
    task,
    onDelete,
    deleting,
}: TaskCardProps) {
    return (
        <View
            style={{
                padding: 14,
                borderRadius: 12,
                backgroundColor: "#fff",
                marginBottom: 12,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 6,
                elevation: 3,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Text style={{ fontSize: 16 }}>
                {task.title}
            </Text>

            <TouchableOpacity
                onPress={() => onDelete(task.id)}
                disabled={deleting}
            >
                <Text
                    style={{
                        color: "#ff3b30",
                        fontWeight: "600",
                    }}
                >
                    Eliminar
                </Text>
            </TouchableOpacity>
        </View>
    );
}
