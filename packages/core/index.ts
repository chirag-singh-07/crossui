import colors from "./tokens/colors.json";
import spacing from "./tokens/spacing.json";
import radius from "./tokens/radius.json";
import buttonDef from "./components/button.json";
import inputDef from "./components/input.json";
import otpInputDef from "./components/otp-input.json";
import checkboxDef from "./components/checkbox.json";
import radioDef from "./components/radio.json";
import switchDef from "./components/switch.json";
import pressAnim from "./animations/press.json";

// Export Tokens
export const Tokens = {
  colors,
  spacing,
  radius,
};

// Export Component Definitions (Contracts)
export const Components = {
  Button: buttonDef,
  Input: inputDef,
  OTPInput: otpInputDef,
  Checkbox: checkboxDef,
  Radio: radioDef,
  Switch: switchDef,
};

// Export Animation configs
export const Animations = {
  Press: pressAnim,
};

// Type Definitions
export type ColorToken = keyof typeof colors;
export type SpacingToken = keyof typeof spacing;
export type ButtonVariant = keyof typeof buttonDef.variants;
