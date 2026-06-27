import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { api } from "../src/api/client";

type Task = {
  id: number;
  title: string;
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTasks();
    setRefreshing(false);
  };

  const renderItem = ({ item }: any) => (
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
      <Text style={{ fontSize: 16 }}>{item.title}</Text>

      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={{ color: "#ff3b30", fontWeight: "600" }}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  const loadTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const createTask = async () => {
    if (!title.trim()) return;

    try {
      setCreating(true);

      const res = await api.post("/tasks", {
        title,
      });

      setTasks((prev) => [res.data, ...prev]);
      setTitle("");
    } catch (e) {
      console.log(e);
    } finally {
      setCreating(false);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <Text style={{ fontSize: 22, marginBottom: 10 }}>Tasks</Text>

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
          onPress={createTask}
          disabled={creating}
        />
      </View>

      {/* LISTA */}
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListEmptyComponent={
            <View style={{ padding: 20, alignItems: "center" }}>
                <Text style={{ color: "#999" }}>No hay tareas aún</Text>
            </View>
            }
        />
    </View>
  );
}
