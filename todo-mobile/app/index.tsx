import { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { getToken } from "../src/auth/session";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    const token = await getToken();

    if (token) {
      router.replace("/home"); // si tienes home
    } else {
      router.replace("/login");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      <Text>Verificando sesión...</Text>
    </View>
  );
}
