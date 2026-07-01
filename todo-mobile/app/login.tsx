import { useState } from "react";
import { View, Text, TextInput, Pressable, ActivityIndicator } from "react-native";
import { api } from "../src/api/client";
import { saveToken } from "../src/auth/session";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const res = await api.post("/login", {
        email,
        password,
      });

      const token = res.data?.data?.token;

      await saveToken(token);

      router.replace("/");
    } catch (err: any) {
      console.log("LOGIN ERROR:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20, gap: 12 }}>
      
      <Text style={{ fontSize: 26, fontWeight: "700", marginBottom: 10 }}>
        ¡Bienvenido a TaskManager!
      </Text>

      {/* EMAIL */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          borderColor: "#e5e7eb",
          padding: 12,
          borderRadius: 10,
          backgroundColor: "#fafafa",
        }}
      />

      {/* PASSWORD */}
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: "#e5e7eb",
          padding: 12,
          borderRadius: 10,
          backgroundColor: "#fafafa",
        }}
      />

      {/* BUTTON */}
      <Pressable
        onPress={handleLogin}
        disabled={loading}
        style={({ pressed }) => [
          {
            backgroundColor: loading ? "#9ca3af" : "#111827",
            padding: 14,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            opacity: pressed ? 0.8 : 1,
          },
        ]}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: "white", fontWeight: "600" }}>
            Entrar
          </Text>
        )}
      </Pressable>
    </View>
  );
}
