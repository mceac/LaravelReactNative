import { View } from "react-native";

export function TaskSkeleton() {
  return (
    <View
      style={{
        height: 60,
        marginVertical: 6,
        borderRadius: 10,
        backgroundColor: "#e5e7eb",
        opacity: 0.7,
      }}
    />
  );
}
