import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { removeToken } from "../src/auth/session";

export default function Home() {
  const router = useRouter();

  const logout = async () => {
    await removeToken();
    router.replace("/login");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>Home</Text>
      <Button title="Ver Tasks" onPress={() => router.push("/tasks")} />
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
