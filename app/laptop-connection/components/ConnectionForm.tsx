import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

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
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Connection Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter a name for this connection"
          editable={!isLoading}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>IP Address</Text>
        <TextInput
          style={styles.input}
          value={ipAddress}
          onChangeText={setIpAddress}
          placeholder="Enter IP address"
          keyboardType="numeric"
          editable={!isLoading}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Port</Text>
        <TextInput
          style={styles.input}
          value={port}
          onChangeText={setPort}
          placeholder="Enter port number"
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
          color={!isFormValid || isLoading ? "#ccc" : "white"}
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
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#F2F2F7",
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  buttonTextDisabled: {
    color: "#999",
  },
});

export default ConnectionForm;
