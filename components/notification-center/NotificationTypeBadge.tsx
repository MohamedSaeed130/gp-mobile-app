import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

export type NotificationType = "NORMAL" | "WARNING" | "EMERGENCY" | "SCHEDULE";

interface NotificationTypeBadgeProps {
  type: NotificationType;
}

const typeConfig = {
  NORMAL: {
    icon: "notifications-none",
    color: Colors.textSecondary,
    bg: "rgba(158,158,158,0.12)",
  },
  WARNING: {
    icon: "warning",
    color: Colors.warning,
    bg: "rgba(255,193,7,0.12)",
  },
  EMERGENCY: {
    icon: "error",
    color: Colors.error,
    bg: "rgba(255,82,82,0.12)",
  },
  SCHEDULE: {
    icon: "schedule",
    color: Colors.info,
    bg: "rgba(33,150,243,0.12)",
  },
};

export default function NotificationTypeBadge({ type }: NotificationTypeBadgeProps) {
  const { icon, color, bg } = typeConfig[type];
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}> 
      <MaterialIcons name={icon as any} size={18} color={color} />
      <Text style={[styles.text, { color }]}>{type.charAt(0) + type.slice(1).toLowerCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
    textTransform: "capitalize",
  },
});
