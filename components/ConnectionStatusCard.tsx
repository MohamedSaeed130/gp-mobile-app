import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

interface ConnectionStatusCardProps {
  title: string;
  isConnected: boolean;
  icon: keyof typeof MaterialIcons.glyphMap;
  href: string;
  onDisconnect?: () => void;
}

const ConnectionStatusCard = ({
  title,
  isConnected,
  icon,
  href,
  onDisconnect,
}: ConnectionStatusCardProps) => {
  return (
    <View style={[styles.card, isConnected && styles.cardConnected]}>
      <View style={styles.mainContent}>
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

      {isConnected ? (
        <Pressable style={styles.disconnectButton} onPress={onDisconnect}>
          <MaterialIcons name="link-off" size={20} color="#FF3B30" />
          <Text style={styles.disconnectText}>Disconnect</Text>
        </Pressable>
      ) : (
        <Link href={href} asChild>
          <Pressable style={styles.connectButton}>
            <Text style={styles.connectText}>Connect</Text>
            <MaterialIcons name="chevron-right" size={20} color="#007AFF" />
          </Pressable>
        </Link>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#FF3B30",
  },
  cardConnected: {
    borderColor: "#34C759",
  },
  mainContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  textContainer: {
    marginLeft: 12,
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
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
  },
  disconnectButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
  },
  connectText: {
    color: "#007AFF",
    fontSize: 15,
    fontWeight: "600",
    marginRight: 4,
  },
  disconnectText: {
    color: "#FF3B30",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 4,
  },
});

export default ConnectionStatusCard;
