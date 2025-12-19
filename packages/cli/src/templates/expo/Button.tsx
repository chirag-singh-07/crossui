import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "default" | "primary" | "secondary";
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "default",
  disabled = false,
}) => {
  const backgroundColor =
    variant === "primary"
      ? "#2563eb" // blue-600
      : variant === "secondary"
      ? "#6b7280" // gray-500
      : "#e5e7eb"; // gray-200

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.6,
  },
});
