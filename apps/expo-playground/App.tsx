import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import {
  Button,
  Input,
  OTPInput,
  Checkbox,
  Radio,
  Switch,
  ThemeProvider,
} from "@crossui/expo";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const [otp, setOtp] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [radioValue, setRadioValue] = useState(1);
  const [switchValue, setSwitchValue] = useState(false);

  return (
    <ThemeProvider>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.headerTitle}>UI Playground</Text>
            <Text style={styles.headerSubtitle}>
              Universal JSON Design System
            </Text>

            {/* OTP Input Section */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>🔐 OTP Input</Text>
              <Text style={styles.sectionDesc}>
                Animated one-time password input with auto-focus.
              </Text>

              <View style={{ marginBottom: 20 }}>
                <Text style={styles.inputLabel}>Enter 6-digit code</Text>
                <OTPInput
                  length={6}
                  value={otp}
                  onChange={setOtp}
                  onComplete={(code) => Alert.alert("OTP Complete", code)}
                  size="md"
                />
              </View>

              <View style={{ marginBottom: 20 }}>
                <Text style={styles.inputLabel}>Secure PIN (4 digits)</Text>
                <OTPInput
                  length={4}
                  value=""
                  onChange={(pin) => console.log(pin)}
                  secureTextEntry
                  size="lg"
                  variant="filled"
                />
              </View>
            </View>

            {/* Enhanced Inputs Section */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>📝 Enhanced Inputs</Text>
              <Text style={styles.sectionDesc}>
                Inputs with icons, animations, and helper text.
              </Text>

              <Input
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChangeText={setEmail}
                leftIcon="mail-outline"
                helperText="We'll never share your email"
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter securely"
                value={password}
                onChangeText={setPassword}
                leftIcon="lock-closed-outline"
              />

              <Input
                label="Search"
                placeholder="Search anything..."
                value={search}
                onChangeText={setSearch}
                leftIcon="search-outline"
                rightIcon="close-circle"
                onRightIconPress={() => setSearch("")}
                helperText="Press X to clear"
              />

              <Input
                label="Phone Number"
                type="phone"
                placeholder="+1 (555) 000-0000"
                leftIcon="call-outline"
              />

              <Input
                label="Location"
                placeholder="Enter your address"
                leftIcon="location-outline"
                rightIcon="navigate-outline"
                onRightIconPress={() => Alert.alert("Get Location")}
              />

              <Input
                label="Bio"
                placeholder="Tell us about yourself..."
                multiline
                size="lg"
                helperText="Maximum 500 characters"
              />

              <Input
                label="Error State"
                placeholder="Invalid input"
                error="This field is required"
                leftIcon="alert-circle-outline"
              />
            </View>

            {/* Selecting Section */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>✅ Selection Controls</Text>

              <View style={styles.controlRow}>
                <Checkbox checked={isChecked} onChange={setIsChecked} />
                <Text style={styles.controlLabel}>
                  Accept Terms & Conditions
                </Text>
              </View>

              <View style={styles.controlRow}>
                <Switch value={switchValue} onChange={setSwitchValue} />
                <Text style={styles.controlLabel}>Enable Notifications</Text>
              </View>

              <Text style={[styles.sectionDesc, { marginTop: 16 }]}>
                Radio Group
              </Text>
              <View style={styles.controlRow}>
                <Radio
                  selected={radioValue === 1}
                  onPress={() => setRadioValue(1)}
                />
                <Text style={styles.controlLabel}>Option 1</Text>
                <View style={{ width: 16 }} />
                <Radio
                  selected={radioValue === 2}
                  onPress={() => setRadioValue(2)}
                />
                <Text style={styles.controlLabel}>Option 2</Text>
              </View>
            </View>

            {/* Existing Buttons Section (Kept for completeness) */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>✨ Buttons (Existing)</Text>
              <View style={styles.row}>
                <Button title="Login" variant="primary" />
                <Button title="Sign Up" variant="secondary" />
              </View>
            </View>

            <View style={{ height: 40 }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2F3F5",
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
  scrollContent: {
    padding: 24,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 32,
    fontWeight: "500",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  sectionDesc: {
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  controlRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  controlLabel: {
    marginLeft: 12,
    fontSize: 16,
    color: "#374151",
    fontWeight: "500",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 12,
  },
});
