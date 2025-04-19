import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

interface ConnectionFormProps {
  onConnect: (ipAddress: string, port: string, name: string) => void;
  isLoading: boolean;
}

const ConnectionForm = ({ onConnect, isLoading }: ConnectionFormProps) => {
  const [name, setName] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [port, setPort] = useState("");

  const isFormValid = ipAddress.trim() && port.trim() && name.trim();

  const handleConnect = () => {
    if (ipAddress && port && name) {
      onConnect(ipAddress, port, name);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Connection Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter a name for this connection"
          placeholderTextColor={Colors.textLight}
          editable={!isLoading}
        />
      </View>

      <View>
        <Text style={styles.label}>IP Address</Text>
        <TextInput
          style={styles.input}
          value={ipAddress}
          onChangeText={setIpAddress}
          placeholder="Enter IP address"
          placeholderTextColor={Colors.textLight}
          keyboardType="numeric"
          editable={!isLoading}
        />
      </View>

      <View>
        <Text style={styles.label}>Port</Text>
        <TextInput
          style={styles.input}
          value={port}
          onChangeText={setPort}
          placeholder="Enter port number"
          placeholderTextColor={Colors.textLight}
          keyboardType="numeric"
          editable={!isLoading}
        />
      </View>

      <Pressable
        style={[
          styles.button,
          (!isFormValid || isLoading) && styles.buttonDisabled,
        ]}
        onPress={handleConnect}
        disabled={isLoading || !isFormValid}
      >
        <MaterialIcons
          name={isLoading ? "hourglass-empty" : "link"}
          size={24}
          color={
            !isFormValid || isLoading ? Colors.textLight : Colors.background
          }
        />
        <Text
          style={[
            styles.buttonText,
            (!isFormValid || isLoading) && styles.buttonTextDisabled,
          ]}
        >
          {isLoading ? "Connecting..." : "Connect"}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 12,
  },
  label: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 5,
  },
  input: {
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  button: {
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  buttonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  buttonTextDisabled: {
    color: Colors.textLight,
  },
});

export default ConnectionForm;
