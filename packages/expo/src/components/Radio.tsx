import React from "react";
import { Pressable, View, StyleSheet } from "react-native";

import radioSpec from "@crossui/core/components/radio.json";
import colors from "@crossui/core/tokens/colors.json";

interface RadioProps {
  selected: boolean;
  onPress: () => void;
  size?: keyof typeof radioSpec.sizes;
  disabled?: boolean;
}

export function Radio({
  selected,
  onPress,
  size = "md",
  disabled,
}: RadioProps) {
  const sizeValue = radioSpec.sizes[size];
  const activeColor = colors[radioSpec.colors.selected as keyof typeof colors];
  const inactiveColor =
    colors[radioSpec.colors.unselected as keyof typeof colors];
  const dotColor = colors[radioSpec.colors.dot as keyof typeof colors];

  return (
    <Pressable
      onPress={!disabled ? onPress : undefined}
      style={[
        styles.container,
        {
          width: sizeValue,
          height: sizeValue,
          borderRadius: 9999, // Round
          borderColor: selected ? activeColor : inactiveColor,
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      {selected && (
        <View
          style={{
            width: sizeValue * 0.5,
            height: sizeValue * 0.5,
            borderRadius: 9999,
            backgroundColor: activeColor,
          }}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
});
