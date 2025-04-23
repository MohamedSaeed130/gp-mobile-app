import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRelations } from "../../contexts/RelationsContext"; // Adjust path as needed
import { useNotifications } from "../../contexts/NotificationsContext"; // Adjust path as needed
import { useUserInfo } from "../../contexts/UserInfoContext";
import { useLaptopConnection } from "../../contexts/LaptopConnectionContext";

export interface MenuItem {
  href: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

const clientMenuItemsBase: MenuItem[] = [
  {
    href: "/laptop-connection", // Ensure this matches your file path in the 'app' directory
    title: "Laptop Connection",
    icon: "laptop-outline",
    color: "#007AFF", // Default Blue
  },
  {
    href: "/mode-selection",
    title: "Control Modes",
    icon: "settings-outline",
    color: "#FF9500", // Orange
  },
  // {
  //   href: "/profile",
  //   title: "Profile",
  //   icon: "person-circle-outline",
  //   color: "#34C759", // Green
  // },
  {
    href: "/relations",
    title: "Relations",
    icon: "people-outline",
    color: "#5856D6", // Purple
  },
  // {
  //   href: "/ward-report",
  //   title: "Ward Report",
  //   icon: "document-text-outline",
  //   color: "#4CD964", // Light Green
  // },
  {
    href: "/notification-center",
    title: "Notifications",
    icon: "notifications-outline",
    color: "#64B5F6", // A different shade of blue
  },
];

const HomeScreen = () => {
  const router = useRouter();
  const { userInfo } = useUserInfo();
  const { relations } = useRelations();
  const { notifications } = useNotifications();
  const { laptopConnection } = useLaptopConnection();

  const clientMenuItems = clientMenuItemsBase.map((item) => {
    if (item.href === "/relations") {
      // Assuming 'relations' array contains all relation types,
      // you might want to filter for 'incoming' relations based on your data structure.
      const incomingRelationCount = relations.filter(
        (relation) => relation.type === "incoming"
      ).length;
      return {
        ...item,
        badge:
          incomingRelationCount > 0
            ? incomingRelationCount.toString()
            : undefined,
      };
    }
    if (item.href === "/notifications") {
      // Assuming your Notification type has an 'isRead' property
      const unreadNotificationCount = notifications.filter(
        (notification) => !notification.isRead
      ).length;
      return {
        ...item,
        badge:
          unreadNotificationCount > 0
            ? unreadNotificationCount.toString()
            : undefined,
      };
    }
    if (item.href === "/laptop-connection") {
      let connectionColor = "#F44336"; // Red for Not Connected
      let connectionStatusText = "Not Connected";
      if (laptopConnection?.connectionStatus === "connected") {
        connectionColor = "#4CAF50"; // Green for Connected
        connectionStatusText = "Connected";
      } else if (laptopConnection?.connectionStatus === "connecting") {
        connectionColor = "#FFC107"; // Amber for Connecting
        connectionStatusText = "Connecting...";
      } else if (
        laptopConnection?.connectionStatus === "disconnected" ||
        !laptopConnection
      ) {
        connectionColor = "#F44336"; // Red for Disconnected
        connectionStatusText = "Not Connected";
      }
      return { ...item, status: connectionStatusText, color: connectionColor };
    }
    return item;
  });

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.item, { backgroundColor: item.color }]}
      onPress={() => router.push(item.href)} // Use router.push for navigation in Expo Router
    >
      <View style={styles.iconContainer}>
        <Ionicons name={item.icon} size={30} color="white" />
        {item.badge !== undefined && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        )}
      </View>
      <Text style={styles.itemTitle}>{item.title}</Text>
      {item.status && item.href === "/laptop-connection" ? (
        <Text style={styles.itemStatus}>
          {item.status === "Connected" && (
            <Ionicons name="wifi" size={14} color="white" />
          )}
          {item.status === "Connecting" && (
            <Ionicons name="wifi-outline" size={14} color="white" />
          )}
          {item.status === "Not Connected" && (
            <Ionicons name="alert-circle-sharp" size={14} color="white" />
          )}{" "}
          {item.status}
        </Text>
      ) : item.status ? (
        <Text style={styles.itemStatus}>{item.status}</Text>
      ) : null}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {userInfo?.fullName && (
          <Text style={styles.headerTitle}>
            Welcome,{"\n"}{" "}
            {userInfo?.title && (
              <Text style={styles.headerSubtitle}>
                {userInfo.title} {userInfo.fullName}
              </Text>
            )}{" "}
          </Text>
        )}

        {!userInfo?.fullName && (
          <Text style={styles.headerTitle}>Welcome!</Text>
        )}
      </View>

      <FlatList
        data={clientMenuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.href}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    paddingTop: 60, // Adjust for status bar
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  headerSubtitle: {
    fontSize: 20,
    color: "#777",
    marginTop: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  gridContainer: {
    paddingHorizontal: 10,
  },
  item: {
    flex: 1,
    backgroundColor: "#ddd",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 170, // Increased height to accommodate status
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  itemTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#FF4D4D", // Red color for badge
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  itemStatus: {
    marginTop: 5,
    fontSize: 12,
    color: "white",
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default HomeScreen;
