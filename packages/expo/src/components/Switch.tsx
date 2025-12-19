import React, { useEffect, useRef } from "react";
import { Pressable, Animated, StyleSheet } from "react-native";

import switchSpec from "@crossui/core/components/switch.json";
import colors from "@crossui/core/tokens/colors.json";

interface SwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
  size?: keyof typeof switchSpec.sizes;
  disabled?: boolean;
}

export function Switch({
  value,
  onChange,
  size = "md",
  disabled,
}: SwitchProps) {
  const dimensions = switchSpec.sizes[size];
  const onColor = colors[switchSpec.colors.on as keyof typeof colors];
  const offColor = colors[switchSpec.colors.off as keyof typeof colors];
  const thumbColor = colors[switchSpec.colors.thumb as keyof typeof colors];

  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: value ? 1 : 0,
      useNativeDriver: false, // Color interpolation requires false
      bounciness: 10,
      speed: 12,
    }).start();
  }, [value]);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, dimensions.width - dimensions.thumb - 2],
  });

  const backgroundColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [offColor, onColor],
  });

  return (
    <Pressable
      onPress={() => !disabled && onChange(!value)}
      style={{ opacity: disabled ? 0.5 : 1 }}
    >
      <Animated.View
        style={[
          styles.track,
          {
            width: dimensions.width,
            height: dimensions.height,
            borderRadius: dimensions.height / 2,
            backgroundColor,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              width: dimensions.thumb,
              height: dimensions.thumb,
              borderRadius: dimensions.thumb / 2,
              backgroundColor: thumbColor,
              transform: [{ translateX }],
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    justifyContent: "center",
  },
  thumb: {
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
