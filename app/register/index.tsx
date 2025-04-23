import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import Colors from "../../constants/Colors";
import { RegisterHeader } from "../../components/register/RegisterHeader";
import { RegisterForm } from "../../components/register/RegisterForm";

import { useState } from "react";
import { RegisterStatusModal } from "../../components/register/RegisterStatusModal";
import { UserRole } from "../../types/api/Users";
import { useRouter } from "expo-router";
import * as authAPI from "../../api/authAPI";

export default function RegisterScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSuccess, setModalSuccess] = useState<boolean | undefined>(
    undefined
  );
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    password: string;
    repeatPassword: string;
  }) => {
    setLoading(true);
    setModalVisible(false);
    setModalSuccess(undefined);
    setModalMessage("");
    try {
      await authAPI.register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
        password: data.password,
        repeatPassword: data.repeatPassword,
      });
      setModalSuccess(true);
      setModalMessage("Your account has been created! You can now log in.");
    } catch (err: any) {
      setModalSuccess(false);
      setModalMessage(
        err?.message ||
          "Registration failed. Please check your details or try again later."
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
        <RegisterHeader />
        <RegisterForm onSubmit={handleRegister} loading={loading} />
      </View>
      <RegisterStatusModal
        visible={modalVisible}
        success={modalSuccess}
        message={modalMessage}
        onClose={() => {
          setModalVisible(false);
          if (modalSuccess) {
            setTimeout(() => {
              router.replace("/login");
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
});
