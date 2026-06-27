import { View, Text, TextInput, Button } from "react-native";
import { useState } from "react";

interface TaskInputProps {
    onCreate: (title: string) => void;
    creating: boolean;
}

export default function TaskInput({ onCreate, creating }: TaskInputProps) {
    const [title, setTitle] = useState("");

    const handleCreate = () => {
        if (!title.trim()) return;

        onCreate(title);
        setTitle("");
    };

    return (
        <View style={{ padding: 20, flex: 1 }}>
            {/* INPUT CREATE */}
            <View style={{ flexDirection: "row", marginBottom: 20, gap: 10 }}>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Escribe una tarea..."
                    style={{
                        borderWidth: 1,
                        borderColor: "#ddd",
                        flex: 1,
                        padding: 12,
                        borderRadius: 10,
                        backgroundColor: "#fafafa",
                    }}
                />

                <Button
                    title={creating ? "..." : "Agregar"}
                    disabled={creating}
                    onPress={handleCreate}
                />
            </View>
        </View>
    );
}