import React from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";

type InputProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  disabled?: boolean;
};

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  disabled = false,
}) => {
  const colors = {
    text: "#111827", // gray-900
    border: "#d1d5db", // gray-300
    muted: "#9ca3af", // gray-400
  };
  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          { borderColor: colors.border, color: colors.text },
          disabled && styles.disabled,
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        editable={!disabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  disabled: {
    opacity: 0.6,
  },
});
