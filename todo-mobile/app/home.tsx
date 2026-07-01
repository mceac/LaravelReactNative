import { View, Text, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import { removeToken } from "../src/auth/session";

export default function Home() {
  const router = useRouter();

  const logout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await removeToken();
          router.replace("/login");
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1, padding: 20, gap: 16 }}>

      {/* HEADER */}
      <Text style={{ fontSize: 28, fontWeight: "700" }}>
        Dashboard
      </Text>

      <Text style={{ color: "#6b7280" }}>
        Bienvenido 👋
      </Text>

      {/* CARD NAVIGATION */}
      <Pressable
        onPress={() => router.push("/tasks")}
        style={{
          padding: 16,
          borderRadius: 12,
          backgroundColor: "#111827",
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
          Go to Tasks →
        </Text>

        <Text style={{ color: "#d1d5db", marginTop: 4 }}>
          Manage your tasks list
        </Text>
      </Pressable>

      {/* SECONDARY CARD (future expansion ready) */}
      <View
        style={{
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "#e5e7eb",
        }}
      >
        <Text style={{ fontWeight: "600" }}>Stats</Text>
        <Text style={{ color: "#6b7280", marginTop: 4 }}>
          Coming soon
        </Text>
      </View>

      {/* LOGOUT */}
      <Pressable
        onPress={logout}
        style={({ pressed }) => [
          {
            marginTop: "auto",
            padding: 14,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#ef4444",
            alignItems: "center",
            opacity: pressed ? 0.6 : 1,
          },
        ]}
      >
        <Text style={{ color: "#ef4444", fontWeight: "600" }}>
          Logout
        </Text>
      </Pressable>
    </View>
  );
}
