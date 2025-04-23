import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { LoginHeader } from "../../components/login/LoginHeader";
import { LoginForm } from "../../components/login/LoginForm";
import { useState } from "react";
import { useUserInfo } from "../../contexts/UserInfoContext";
import * as meAPI from "../../api/meAPI";
import { LoginStatusModal } from "../../components/login/LoginStatusModal";
import { useRouter } from "expo-router";
import * as authAPI from "../../api/authAPI";
import { useTokens } from "../../contexts/TokensContext";

export default function LoginScreen() {
  const router = useRouter();
  const { setTokens } = useTokens();
  const { setUserInfo } = useUserInfo();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSuccess, setModalSuccess] = useState<boolean | undefined>(
    undefined
  );
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setModalVisible(false);
    setModalSuccess(undefined);
    setModalMessage("");
    try {
      const tokens = await authAPI.login({ email, password });
      setTokens(tokens);
      // Fetch user info and set in context
      const userInfo = await meAPI.fetchMyInfo(tokens.accessToken);
      setUserInfo(userInfo);
      setModalSuccess(true);
      setModalMessage("Login successful! Redirecting to home page...");
    } catch (err: any) {
      setModalSuccess(false);
      setModalMessage(
        err?.message ||
          "Login failed. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
      setModalVisible(true);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="medical-bag"
            size={120}
            color={Colors.primary}
          />
        </View>
        <LoginHeader />
        <LoginForm onSubmit={handleLogin} loading={loading} />
      </View>
      <LoginStatusModal
        visible={modalVisible}
        success={modalSuccess}
        message={modalMessage}
        onClose={() => {
          setModalVisible(false);
          if (modalSuccess) {
            setTimeout(() => {
              router.replace("/home");
            }, 200);
          }
        }}
      />
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
