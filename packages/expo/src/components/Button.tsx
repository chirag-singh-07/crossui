import { Pressable, Text, StyleSheet, ViewStyle, Animated } from "react-native";
import React, { useRef } from "react";

import buttonSpec from "@crossui/core/components/button.json";
import colors from "@crossui/core/tokens/colors.json";
import spacing from "@crossui/core/tokens/spacing.json";
import radius from "@crossui/core/tokens/radius.json";

type ButtonProps = {
  title: string;
  variant?: keyof typeof buttonSpec.variants;
  size?: keyof typeof buttonSpec.sizes;
  onPress?: () => void;
};

export function Button({
  title,
  variant = buttonSpec.defaults.variant as keyof typeof buttonSpec.variants,
  size = buttonSpec.defaults.size as keyof typeof buttonSpec.sizes,
  onPress,
}: ButtonProps) {
  const variantConfig = buttonSpec.variants[variant];
  const sizeConfig = buttonSpec.sizes[size];

  // Animations
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  const bgColor = colors[variantConfig.background as keyof typeof colors];
  const txtColor = colors[variantConfig.text as keyof typeof colors];

  const borderColor =
    "border" in variantConfig
      ? colors[variantConfig.border as keyof typeof colors]
      : "transparent";
  const borderWidth =
    "borderWidth" in variantConfig ? variantConfig.borderWidth : 0;

  const borderRadius =
    "radius" in sizeConfig
      ? radius[sizeConfig.radius as keyof typeof radius]
      : radius.medium;

  const textDecoration =
    "underline" in variantConfig && variantConfig.underline === true
      ? "underline"
      : "none";

  // Apply shadows if defined in JSON
  const shadowStyle =
    "shadow" in variantConfig && variantConfig.shadow ? styles.shadow : {};

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }) => [
          styles.base,
          shadowStyle,
          {
            backgroundColor: bgColor,
            paddingVertical:
              spacing[sizeConfig.paddingVertical as keyof typeof spacing],
            paddingHorizontal:
              spacing[sizeConfig.paddingHorizontal as keyof typeof spacing],
            borderColor: borderColor,
            borderWidth: borderWidth,
            borderRadius: borderRadius,
            opacity: pressed ? 0.9 : 1,
          },
        ]}
      >
        <Text
          style={{
            color: txtColor,
            fontSize: sizeConfig.fontSize,
            fontWeight: "700",
            textDecorationLine: textDecoration,
            textAlign: "center",
          }}
        >
          {title}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
