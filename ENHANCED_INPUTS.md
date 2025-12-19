# Enhanced Input Components

## Overview
We've significantly enhanced the CrossUI input system with modern, production-ready components featuring animations, icons, and multiple input types.

## New Components

### 1. **OTPInput Component** 🔐
A premium one-time password input component with:
- **Auto-focus**: Automatically focuses the first input
- **Smooth animations**: Scale animations on input
- **Auto-advance**: Moves to next field automatically
- **Backspace handling**: Smart navigation on delete
- **Secure mode**: Optional password masking
- **Customizable length**: Support for 4, 6, or any digit length
- **Multiple variants**: default, filled, error, success
- **Multiple sizes**: sm, md, lg
- **Completion callback**: Triggers when all digits are entered

**Usage:**
```tsx
<OTPInput
  length={6}
  value={otp}
  onChange={setOtp}
  onComplete={(code) => Alert.alert("Complete!", code)}
  size="md"
  variant="default"
/>
```

### 2. **Enhanced Input Component** ✨
Upgraded the existing Input with:
- **Left/Right Icons**: Support for Ionicons on both sides
- **Focus Animations**: Smooth border color transitions
- **Helper Text**: Additional guidance below input
- **Improved Shadows**: Dynamic shadows based on focus state
- **Icon Callbacks**: Clickable right icons (e.g., clear button)
- **Better Visual Hierarchy**: Enhanced border widths and colors

**New Props:**
- `leftIcon`: Icon name from Ionicons
- `rightIcon`: Icon name from Ionicons
- `onRightIconPress`: Callback for right icon press
- `helperText`: Helper text displayed below input

**Usage:**
```tsx
<Input
  label="Email"
  placeholder="john@example.com"
  leftIcon="mail-outline"
  rightIcon="close-circle"
  onRightIconPress={() => setValue("")}
  helperText="We'll never share your email"
/>
```

## Enhanced JSON Configurations

### Input Variants
Added new style variants to `input.json`:
- **filled**: Light background, no border
- **outlined**: Transparent background, visible border
- **underlined**: Transparent background, bottom border only
- **focused**: Enhanced border width (2px) for better visibility
- **error**: Improved border width (1.5px)

### OTP Input Configuration
New `otp-input.json` with:
- **Variants**: default, filled, error, success
- **Sizes**: sm (40x48), md (50x56), lg (60x64)
- **Defaults**: 6-digit length, 12px gap between boxes

## Visual Improvements

### Animations
1. **Focus Animation**: Border color smoothly transitions to primary color
2. **OTP Scale Animation**: Each box scales on input for tactile feedback
3. **Icon Color Transition**: Icons change color on focus

### Shadows
- **Default State**: Subtle shadow (opacity: 0.05, radius: 4)
- **Focused State**: Enhanced shadow (opacity: 0.15, radius: 8, primary color)
- **OTP Boxes**: Individual shadows with focus enhancement

### Typography & Spacing
- **Helper Text**: 13px, subtle color
- **Error Text**: 13px, danger color, with icon
- **Labels**: 14px, semibold, consistent spacing
- **Icon Sizing**: Responsive to input size (16-24px)

## Demo Features in App.tsx

The playground now showcases:
1. **OTP Input Section**:
   - 6-digit verification code
   - 4-digit secure PIN with masking
   
2. **Enhanced Inputs Section**:
   - Email with mail icon
   - Password with lock icon
   - Search with clear button
   - Phone with call icon
   - Location with navigation icon
   - Multiline bio with helper text
   - Error state with alert icon

## File Structure

```
packages/
├── core/
│   └── components/
│       ├── input.json (enhanced)
│       └── otp-input.json (new)
└── expo/
    └── src/
        └── components/
            ├── Input.tsx (enhanced)
            └── OTPInput.tsx (new)
```

## Best Practices

1. **Use helper text** for additional context
2. **Add icons** for better visual hierarchy
3. **Implement clear buttons** for better UX
4. **Use OTP input** for verification codes
5. **Leverage animations** for premium feel
6. **Maintain consistent spacing** with design tokens

## Next Steps

Potential enhancements:
- Floating label inputs
- Input masks (phone, credit card)
- Autocomplete support
- Voice input integration
- Custom keyboard types
- Input groups/compound inputs
