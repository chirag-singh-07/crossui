import React, { useEffect, useRef } from "react";
import { Pressable, View, StyleSheet, Animated, Easing } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import checkboxSpec from "@crossui/core/components/checkbox.json";
import colors from "@crossui/core/tokens/colors.json";
import radius from "@crossui/core/tokens/radius.json";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: keyof typeof checkboxSpec.sizes;
  disabled?: boolean;
}

export function Checkbox({
  checked,
  onChange,
  size = "md",
  disabled,
}: CheckboxProps) {
  const sizeValue = checkboxSpec.sizes[size];
  const activeColor =
    colors[checkboxSpec.colors.checked as keyof typeof colors];
  const inactiveColor =
    colors[checkboxSpec.colors.unchecked as keyof typeof colors];
  const checkmarkColor =
    colors[checkboxSpec.colors.checkmark as keyof typeof colors];

  // Animation Values
  const scale = useRef(new Animated.Value(checked ? 1 : 0)).current;
  const opacity = useRef(new Animated.Value(checked ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: checked ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.5)), // Bouncy effect
      }),
      Animated.timing(opacity, {
        toValue: checked ? 1 : 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [checked]);

  return (
    <Pressable
      onPress={() => !disabled && onChange(!checked)}
      style={({ pressed }) => [
        styles.container,
        {
          width: sizeValue,
          height: sizeValue,
          backgroundColor: checked ? activeColor : "transparent",
          borderColor: checked ? activeColor : inactiveColor,
          borderRadius: radius[checkboxSpec.radius as keyof typeof radius],
          opacity: disabled ? 0.5 : 1,
          transform: [{ scale: pressed ? 0.95 : 1 }], // Subtle press effect
        },
      ]}
    >
      <Animated.View style={{ transform: [{ scale }], opacity }}>
        <Ionicons
          name="checkmark"
          size={sizeValue * 0.7}
          color={checkmarkColor}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
