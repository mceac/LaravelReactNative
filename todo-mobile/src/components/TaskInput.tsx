import { View, TextInput, Pressable, Text } from "react-native";
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
    <View style={{ padding: 20 }}>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Escribe una tarea..."
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#e5e7eb",
            padding: 12,
            borderRadius: 10,
            backgroundColor: "#fafafa",
          }}
        />

        <Pressable
          onPress={handleCreate}
          disabled={creating}
          style={({ pressed }) => [
            {
              backgroundColor: creating ? "#9ca3af" : "#111827",
              paddingVertical: 12,
              paddingHorizontal: 14,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <Text style={{ color: "white", fontWeight: "600" }}>
            {creating ? "..." : "Agregar"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
