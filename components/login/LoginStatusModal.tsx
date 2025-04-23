import React from "react";
import { Modal, View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

interface LoginStatusModalProps {
  visible: boolean;
  success?: boolean;
  message: string;
  onClose: () => void;
}

export const LoginStatusModal: React.FC<LoginStatusModalProps> = ({
  visible,
  success,
  message,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View
            style={[
              styles.iconContainer,
              success === undefined
                ? styles.iconNeutral
                : success
                ? styles.iconSuccess
                : styles.iconError,
            ]}
          >
            <MaterialIcons
              name={success === undefined ? "info" : success ? "check-circle" : "error"}
              size={48}
              color={Colors.background}
            />
          </View>
          <Text style={styles.title}>
            {success === undefined
              ? "Login"
              : success
              ? "Login Successful"
              : "Login Failed"}
          </Text>
          <Text style={styles.message}>{message}</Text>
          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: 320,
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    elevation: 8,
    shadowColor: Colors.textPrimary,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  iconContainer: {
    marginBottom: 16,
    borderRadius: 50,
    padding: 10,
  },
  iconSuccess: {
    backgroundColor: Colors.success || "#4BB543",
  },
  iconError: {
    backgroundColor: Colors.error || "#D7263D",
  },
  iconNeutral: {
    backgroundColor: Colors.primary,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: Colors.textPrimary,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 28,
    marginTop: 10,
  },
  buttonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: "600",
  },
});
