import React, { useRef, useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Animated,
  Platform,
} from "react-native";

import otpSpec from "@crossui/core/components/otp-input.json";
import colors from "@crossui/core/tokens/colors.json";
import radius from "@crossui/core/tokens/radius.json";

type OTPSize = keyof typeof otpSpec.sizes;
type OTPVariant = keyof typeof otpSpec.variants;

export interface OTPInputProps {
  length?: number;
  size?: OTPSize;
  variant?: OTPVariant;
  value?: string;
  onChange?: (otp: string) => void;
  onComplete?: (otp: string) => void;
  autoFocus?: boolean;
  secureTextEntry?: boolean;
  error?: boolean;
}

export function OTPInput({
  length = 6,
  size = "md",
  variant = "default",
  value = "",
  onChange,
  onComplete,
  autoFocus = true,
  secureTextEntry = false,
  error = false,
}: OTPInputProps) {
  const [otp, setOtp] = useState(value.split("").slice(0, length));
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const animatedValues = useRef(
    Array.from({ length }, () => new Animated.Value(1))
  ).current;

  // Config
  const sizeConfig = otpSpec.sizes[size];
  const variantConfig = error
    ? otpSpec.variants.error
    : otpSpec.variants[variant];

  const bgColor = colors[variantConfig.background as keyof typeof colors];
  const textColor = colors[variantConfig.text as keyof typeof colors];
  const borderColor = colors[variantConfig.border as keyof typeof colors];
  const radiusValue = radius[sizeConfig.radius as keyof typeof radius];

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [autoFocus]);

  useEffect(() => {
    setOtp(value.split("").slice(0, length));
  }, [value, length]);

  const handleChange = (text: string, index: number) => {
    // Only allow single digit/character
    const sanitized = text.slice(-1);

    const newOtp = [...otp];
    newOtp[index] = sanitized;
    setOtp(newOtp);

    const otpString = newOtp.join("");
    onChange?.(otpString);

    // Animate the box
    Animated.sequence([
      Animated.timing(animatedValues[index], {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValues[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Move to next input
    if (sanitized && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if complete
    if (sanitized && index === length - 1) {
      const finalOtp = newOtp.join("");
      if (finalOtp.length === length) {
        onComplete?.(finalOtp);
        inputRefs.current[index]?.blur();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        onChange?.(newOtp.join(""));
      } else {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        onChange?.(newOtp.join(""));
      }
    }
  };

  const handleBoxPress = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  return (
    <View style={styles.container}>
      {Array.from({ length }).map((_, index) => {
        const isFocused = focusedIndex === index;
        const hasValue = !!otp[index];

        return (
          <Pressable
            key={index}
            onPress={() => handleBoxPress(index)}
            style={{ marginHorizontal: otpSpec.defaults.gap / 2 }}
          >
            <Animated.View
              style={[
                styles.box,
                {
                  width: sizeConfig.width,
                  height: sizeConfig.height,
                  backgroundColor: bgColor,
                  borderColor: isFocused ? colors.primary : borderColor,
                  borderWidth: isFocused
                    ? variantConfig.borderWidth + 0.5
                    : variantConfig.borderWidth,
                  borderRadius: radiusValue,
                  transform: [{ scale: animatedValues[index] }],
                },
                isFocused && styles.focusedBox,
              ]}
            >
              <TextInput
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={[
                  styles.input,
                  {
                    fontSize: sizeConfig.fontSize,
                    color: textColor,
                  },
                ]}
                value={otp[index] || ""}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
                secureTextEntry={secureTextEntry && hasValue}
                textAlign="center"
                caretHidden={Platform.OS === "ios"}
              />
            </Animated.View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  focusedBox: {
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  input: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    fontWeight: "700",
  },
});
