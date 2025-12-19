# CrossUI

Cross-platform, theme-driven UI system powered by JSON design tokens.

## 🧠 Architecture Explanation

This repository implements a **platform-agnostic** design system architecture.

### 📁 Folder Structure

- **packages/core** (`@crossui/core`):
  - **WHY**: Defines the *contract* of your UI system without any React or platform dependencies. It contains tokens (colors, spacing) and interface definitions (TypeScript types for component props).
  - **HOW it enables "all language support"**: Since it's pure TypeScript/JSON-like constants, it can be mathematically, logically, or code-generated into other languages (Swift, Dart for Flutter, XML for Android) without dragging in React logic.
  - **NO REACT**: Keeping this pure ensures that when you build `packages/flutter-ui`, you don't accidentaly depend on `react` or `react-native`.

- **packages/expo** (`@crossui/expo`):
  - **WHY**: The specific React Native implementation of the core contracts.
  - **Dependencies**: Depends on `@crossui/core`. Uses `react-native` components to fulfill the interfaces defined in core.

- **apps/expo-playground**:
  - **WHY**: A sandbox environment to test your components in Expo Go.
  - **SDK**: Forced to Expo SDK 51.

### 🚀 Extensibility

- **Web**: Create `packages/web-ui`. Import tokens from `core`. Implement using `div`, `span`, or `react-dom`.
- **Flutter**: Create `packages/flutter-ui`. Write a script to convert `core/tokens/colors.ts` to `core/tokens/colors.dart`.
- **Native iOS/Android**: Similarly, use code generation or direct import (if using a bridge) of the JSON tokens.

## ⚙️ Install & Run

1.  **Install pnpm** (if not installed):
    ```bash
    npm install -g pnpm
    ```

2.  **Install dependencies**:
    ```bash
    pnpm install
    ```

3.  **Start Expo Go**:
    ```bash
    pnpm --filter expo-playground start --clear
    ```

## 🚨 Troubleshooting & Error Prevention

### Expo Go SDK Mismatch
- **Issue**: Expo Go on your phone is version 51, but the project installs 52 (latest).
- **Prevention**: We have hardcoded `expo: "~51.0.0"` in `apps/expo-playground/package.json`.
- **Fix**: Ensure your `package.json` matches the Expo Go version on your device.

### TurboModuleRegistry / PlatformConstants Errors
- **Issue**: These usually happen when `react-native` version doesn't match `expo` expectation or when trying to run native modules without a dev client.
- **Prevention**: Use standard `expo-status-bar` and avoid generic `react-native` libraries that require linking unless you use a Dev Client. We use `exact` versions in this repo.

### Metro resolving wrong node_modules
- **Issue**: Monorepos hoist packages to root `node_modules`, but Metro looks in project `node_modules`.
- **Prevention**: We added a custom `metro.config.js` in `apps/expo-playground` that sets `watchFolders` to the workspace root and properly configures `nodeModulesPaths`.

### pnpm workspace linking issues
- **Issue**: Components not updating.
- **Prevention**: Use `workspace:*` in `package.json` to ensure the local version is always used. `pnpm install` links them via symlinks.

## 🧪 Success Criteria Checklist
- [ ] Run `pnpm install`
- [ ] Run `pnpm --filter expo-playground start`
- [ ] Scan QR code with Expo Go (SDK 51)
- [ ] Verify "Expo Playground" text is visible
- [ ] Verify the "Works!" button is visible and clickable
