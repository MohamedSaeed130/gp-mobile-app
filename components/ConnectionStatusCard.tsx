import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface ConnectionStatusCardProps {
  title: string;
  isConnected: boolean;
  icon: keyof typeof MaterialIcons.glyphMap;
}

const ConnectionStatusCard = ({
  title,
  isConnected,
  icon,
}: ConnectionStatusCardProps) => {
  return (
    <View style={[styles.card, isConnected && styles.cardConnected]}>
      <MaterialIcons
        name={icon}
        size={24}
        color={isConnected ? "#34C759" : "#FF3B30"}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text
          style={[
            styles.status,
            { color: isConnected ? "#34C759" : "#FF3B30" },
          ]}
        >
          {isConnected ? "Connected" : "Not Connected"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#FF3B30",
  },
  cardConnected: {
    borderColor: "#34C759",
  },
  textContainer: {
    marginLeft: 12,
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
});

export default ConnectionStatusCard; 