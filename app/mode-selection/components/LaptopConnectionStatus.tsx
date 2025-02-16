import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface LaptopConnectionStatusProps {
  isConnected: boolean;
  connectedLaptopName?: string;
}

const LaptopConnectionStatus = ({
  isConnected,
  connectedLaptopName,
}: LaptopConnectionStatusProps) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialIcons
            name="computer"
            size={24}
            color={isConnected ? "#34C759" : "#FF3B30"}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Laptop Connection</Text>
          <Text
            style={[
              styles.status,
              { color: isConnected ? "#34C759" : "#FF3B30" },
            ]}
          >
            {isConnected
              ? `Connected to ${connectedLaptopName}`
              : "Not Connected"}
          </Text>
        </View>
      </View>
      {!isConnected && (
        <Pressable
          style={styles.connectButton}
          onPress={() => router.push("/laptop-connection")}
        >
          <Text style={styles.buttonText}>Connect</Text>
          <MaterialIcons name="chevron-right" size={20} color="#007AFF" />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#F0F8FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  status: {
    fontSize: 14,
    marginTop: 2,
  },
  connectButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
  },
  buttonText: {
    color: "#007AFF",
    fontSize: 15,
    fontWeight: "600",
    marginRight: 4,
  },
});

export default LaptopConnectionStatus; 