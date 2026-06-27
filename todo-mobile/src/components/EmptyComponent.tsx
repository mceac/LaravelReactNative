import { View, Text } from "react-native";

interface EmptyComponentProps {
    title: string;
    description?: string;
    icon?: React.ReactNode;
}

export default function EmptyComponent({
    title,
    description,
    icon,
}: EmptyComponentProps) {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                padding: 30,
            }}
        >
            {icon && (
                <View style={{ marginBottom: 10 }}>
                    {icon}
                </View>
            )}

            <Text
                style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#333",
                    textAlign: "center",
                    marginBottom: description ? 6 : 0,
                }}
            >
                {title}
            </Text>

            {description && (
                <Text
                    style={{
                        fontSize: 14,
                        color: "#888",
                        textAlign: "center",
                    }}
                >
                    {description}
                </Text>
            )}
        </View>
    );
}
