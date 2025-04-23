import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.error,
    padding: 10,
    borderRadius: 8,
    margin: 10,
    alignItems: "center",
  },
  text: {
    color: Colors.background,
    fontSize: 15,
    textAlign: "center",
  },
});

export default ErrorMessage;
