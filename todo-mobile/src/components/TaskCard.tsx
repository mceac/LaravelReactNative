import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors, spacing, radius } from "../theme";
import { Ionicons } from "@expo/vector-icons";

export function TaskCard({ task, onDelete }: any) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{task.title}</Text>

        <Pressable onPress={() => onDelete(task.id)}>
          <Ionicons name="trash-outline" size={18} color={colors.danger} />
        </Pressable>
      </View>

      {task.description ? (
        <Text style={styles.description}>{task.description}</Text>
      ) : null}

      <View style={styles.footer}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Pending</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,

    // sombra ligera (clave para look pro)
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    flex: 1,
  },

  description: {
    fontSize: 13,
    color: colors.muted,
    marginBottom: spacing.sm,
  },

  footer: {
    flexDirection: "row",
    marginTop: spacing.sm,
  },

  badge: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  badgeText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: "500",
  },
});