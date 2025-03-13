import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from "../../constants/Colors";
import { LoginHeader } from "../../components/login/LoginHeader";
import { LoginForm } from "../../components/login/LoginForm";

export default function LoginScreen() {
  const handleLogin = async (email: string, password: string) => {
    // TODO: Implement login logic
    console.log("Login attempt with:", email, password);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="medical-bag" size={120} color={Colors.primary} />
        </View>
        <LoginHeader />
        <LoginForm onSubmit={handleLogin} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginBottom: 20,
  },
});
