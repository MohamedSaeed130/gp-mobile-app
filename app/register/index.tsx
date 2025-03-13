import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import Colors from "../../constants/Colors";
import { RegisterHeader } from "../../components/register/RegisterHeader";
import { RegisterForm } from "../../components/register/RegisterForm";

export default function RegisterScreen() {
  const handleRegister = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    // TODO: Implement registration logic
    console.log("Register attempt with:", data);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <RegisterHeader />
        <RegisterForm onSubmit={handleRegister} />
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
});
