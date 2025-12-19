import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInputProps,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import inputSpec from "@crossui/core/components/input.json";
import colors from "@crossui/core/tokens/colors.json";
import radius from "@crossui/core/tokens/radius.json";
import spacing from "@crossui/core/tokens/spacing.json";

type InputSize = keyof typeof inputSpec.sizes;

export interface InputProps extends Omit<TextInputProps, "style"> {
  label?: string;
  error?: string;
  helperText?: string;
  type?: "text" | "email" | "password" | "number" | "search" | "url" | "phone";
  size?: InputSize;
  disabled?: boolean;
  multiline?: boolean;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
}

export function Input({
  label,
  error,
  helperText,
  type = "text",
  size = "md",
  disabled = false,
  placeholder,
  value,
  onChangeText,
  multiline = false,
  secureTextEntry,
  leftIcon,
  rightIcon,
  onRightIconPress,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const focusAnim = useState(new Animated.Value(0))[0];

  // JSON Configs
  const sizeConfig = inputSpec.sizes[size];
  const variants = inputSpec.variants;

  // State Logic
  let currentState: keyof typeof variants = "default";
  if (disabled) currentState = "disabled";
  else if (error) currentState = "error";
  else if (isFocused) currentState = "focused";

  const stateStyle = variants[currentState] as any;
  const defaultStyle = variants.default;

  // Resolve Colors
  const borderColorKey = (stateStyle.border ||
    defaultStyle.border) as keyof typeof colors;
  const bgColorKey = (stateStyle.background ||
    defaultStyle.background) as keyof typeof colors;
  const textColorKey = (stateStyle.text ||
    defaultStyle.text) as keyof typeof colors;
  const placeholderColorKey = (stateStyle.placeholder ||
    defaultStyle.placeholder) as keyof typeof colors;

  const borderColor = colors[borderColorKey];
  const backgroundColor = colors[bgColorKey];
  const textColor = colors[textColorKey];
  const placeholderColor = colors[placeholderColorKey];

  // Resolve spacing tokens
  const paddingHorizontal =
    spacing[sizeConfig.paddingHorizontal as keyof typeof spacing];

  // Logic for Password Toggle
  const isPassword = type === "password";
  const shouldSecureText = isPassword && !isPasswordVisible;

  // Logic for Keyboard Types
  const getKeyboardType = () => {
    if (type === "email") return "email-address";
    if (type === "number") return "numeric";
    if (type === "phone") return "phone-pad";
    if (type === "url") return "url";
    return "default";
  };

  // Handle focus animations
  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(focusAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(focusAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const animatedBorderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [borderColor, colors.primary],
  });

  const iconSize =
    size === "xs" ? 16 : size === "sm" ? 18 : size === "lg" ? 24 : 20;

  return (
    <View style={[styles.container, { opacity: disabled ? 0.6 : 1 }]}>
      {label && (
        <Text style={[styles.label, { color: colors.inputText }]}>{label}</Text>
      )}

      <Animated.View
        style={[
          styles.inputWrapper,
          {
            height: multiline ? undefined : sizeConfig.height,
            minHeight: sizeConfig.height,
            borderColor: animatedBorderColor,
            backgroundColor,
            borderRadius: radius.medium,
            borderWidth: isFocused || error ? 2 : 1,
            paddingHorizontal,
            shadowColor: isFocused ? colors.primary : "#000",
            shadowOffset: { width: 0, height: isFocused ? 4 : 2 },
            shadowOpacity: isFocused ? 0.15 : 0.05,
            shadowRadius: isFocused ? 8 : 4,
            elevation: isFocused ? 3 : 1,
          },
        ]}
      >
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            <Ionicons
              name={leftIcon}
              size={iconSize}
              color={isFocused ? colors.primary : placeholderColor}
            />
          </View>
        )}

        <TextInput
          style={[
            styles.input,
            {
              fontSize: sizeConfig.fontSize,
              color: textColor,
              height: "100%",
              paddingLeft: leftIcon ? 8 : 0,
              paddingRight: isPassword || rightIcon ? 8 : 0,
            },
          ]}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          value={value}
          onChangeText={onChangeText}
          editable={!disabled}
          multiline={multiline}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={shouldSecureText}
          keyboardType={getKeyboardType()}
          textAlignVertical={multiline ? "top" : "center"}
          {...props}
        />

        {isPassword && (
          <Pressable
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.icon}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
              size={iconSize}
              color={isFocused ? colors.primary : placeholderColor}
            />
          </Pressable>
        )}

        {!isPassword && rightIcon && (
          <Pressable
            onPress={onRightIconPress}
            style={styles.icon}
            disabled={!onRightIconPress}
          >
            <Ionicons
              name={rightIcon}
              size={iconSize}
              color={isFocused ? colors.primary : placeholderColor}
            />
          </Pressable>
        )}
      </Animated.View>

      {error && (
        <View style={styles.errorContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={14}
            color={colors.danger}
          />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {!error && helperText && (
        <Text style={styles.helperText}>{helperText}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20, // Increased spacing between inputs
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginLeft: 2, // Slight alignment with input curve
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  input: {
    flex: 1,
  },
  leftIconContainer: {
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    padding: 8,
    marginRight: -8, // Balance the padding
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginLeft: 2,
    gap: 4,
  },
  errorText: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: "500",
  },
  helperText: {
    fontSize: 13,
    color: colors.inputPlaceholder,
    marginTop: 6,
    marginLeft: 2,
  },
});
