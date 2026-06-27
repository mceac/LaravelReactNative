import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../src/api/client";
import { saveToken } from "../src/auth/session";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/login", {
        email,
        password,
      });

      const token = res.data.token;

      await saveToken(token);

      Alert.alert("Login exitoso");

      router.replace("/"); // redirige a home
    } catch (err: any) {
      console.log(err.response?.data || err.message);
      Alert.alert("Error en login");
    }
  };

  return (
    <View style={{ padding: 20, gap: 10 }}>
      <Text style={{ fontSize: 22 }}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10 }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10 }}
      />

      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}
