import React, { useState, useRef } from "react";
import { Animated } from "react-native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

import UserInfoRow from "./UserInfoRow";

export interface NotificationItemProps extends Notification {
  onDelete?: () => void;
  onRead?: () => void;
}

const typeConfig = {
  normal: {
    icon: "notifications-none",
    color: Colors.textSecondary,
    bg: "rgba(158,158,158,0.12)",
  },
  warning: {
    icon: "warning",
    color: Colors.warning,
    bg: "rgba(255,193,7,0.12)",
  },
  emergency: {
    icon: "error",
    color: Colors.error,
    bg: "rgba(255,82,82,0.12)",
  },
  schedule: {
    icon: "schedule",
    color: Colors.info,
    bg: "rgba(33,150,243,0.12)",
  },
};

import { Alert } from "react-native";

import { Notification } from "../../types/api/Notifications";

export default function NotificationItem({
  type,
  title,
  body,
  createdAt,
  isRead: initialIsRead,
  sender,
  about: aboutUser,
  updatedAt,
  onDelete,
  onRead,
}: NotificationItemProps) {
  const initialReadAt = updatedAt || createdAt;
  const [showStatusDetails, setShowStatusDetails] = useState(false);
  const [localIsRead, setLocalIsRead] = useState(initialIsRead);
  const [localReadAt, setLocalReadAt] = useState<string | undefined>(
    initialReadAt
  );
  const { icon, color, bg } = typeConfig[type];
  // Animated opacity for fade-out of checkbox only
  const checkboxFadeAnim = useRef(new Animated.Value(1)).current;
  const [checkboxVisible, setCheckboxVisible] = useState(!initialIsRead);

  const handleRead = () => {
    if (!localIsRead) {
      setLocalIsRead(true);
      setLocalReadAt(new Date().toISOString());
      // Animate fade out of checkbox only
      Animated.timing(checkboxFadeAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) setCheckboxVisible(false);
      });
      if (onRead) {
        onRead();
      }
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: bg },
        styles.unread,
        { borderColor: Colors.border },
      ]}
    >
      <View
        style={[
          styles.headerRow,
          { flexDirection: "row", alignItems: "center" },
        ]}
      >
        <View style={[styles.iconCircle, { backgroundColor: bg }]}>
          <MaterialIcons name={icon as any} size={22} color={color} />
        </View>
        <Text style={[styles.title, { color }]} numberOfLines={1}>
          {title}
        </Text>
        {checkboxVisible && (
          <Animated.View style={{ opacity: checkboxFadeAnim }}>
            <TouchableOpacity
              style={styles.checkBoxHeader}
              onPress={handleRead}
              activeOpacity={0.7}
              disabled={localIsRead}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <MaterialIcons
                name={localIsRead ? "check-box" : "check-box-outline-blank"}
                size={28}
                color={localIsRead ? Colors.success : Colors.info}
              />
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
      {/* Sender info below title, smaller */}
      {sender && sender !== "system" && (
        <View style={styles.senderRowTight}>
          <Text style={[styles.infoLabel, styles.senderLabel]}>Sender:</Text>
          <UserInfoRow user={sender} small />
        </View>
      )}
      {/* About user info below sender, similar style */}
      <View style={styles.aboutRowTight}>
        <Text style={[styles.infoLabel, styles.aboutLabel]}>About:</Text>
        <UserInfoRow user={aboutUser} small />
      </View>
      <Text style={[styles.body]} numberOfLines={3}>
        {body}
      </Text>
      <View style={styles.footerRow}>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => {
            Alert.alert(
              "Delete Notification",
              "Are you sure you want to delete this notification?",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: () => {
                    if (onDelete) {
                      onDelete();
                    } else {
                      Alert.alert(
                        "Not Implemented",
                        "Delete action is not implemented by parent."
                      );
                    }
                  },
                },
              ],
              { cancelable: true }
            );
          }}
          activeOpacity={0.7}
        >
          <MaterialIcons name="delete" size={16} color={Colors.error} />
          <Text style={styles.deleteBtnText}>Delete</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={() => setShowStatusDetails((v) => !v)}>
          <View style={styles.statusAreaFixedHeight}>
            {showStatusDetails ? (
              <>
                <Text style={styles.statusDetail}>
                  Sent: {formatDate(createdAt)}
                </Text>
                {localIsRead && (
                  <Text style={styles.statusDetail}>
                    Read: {localReadAt ? formatDate(localReadAt) : "—"}
                  </Text>
                )}
              </>
            ) : (
              <Text style={styles.status}>{localIsRead ? "Read" : "Sent"}</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function formatDate(date: string) {
  const d = new Date(date);
  // Remove milliseconds from time string
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 14,
    shadowColor: Colors.divider,
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    backgroundColor: Colors.background,
    position: "relative",
  },
  unread: {
    borderColor: Colors.info,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  unreadTitle: {
    color: Colors.info,
  },
  body: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
    marginBottom: 8,
  },
  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginLeft: 6,
    marginBottom: 2,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,0,0,0.18)",
  },
  deleteBtnText: {
    color: Colors.error,
    fontWeight: "normal",
    fontSize: 12,
    marginLeft: 2,
    letterSpacing: 0.2,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 8,
    minHeight: 40,
    position: "relative",
  },
  status: {
    fontSize: 12,
    color: Colors.info,
    marginLeft: 8,
    textDecorationLine: "underline",
    fontWeight: "bold",
    paddingVertical: 2,
    paddingHorizontal: 8,
    minHeight: 19, // To match statusDetail line height
    textAlignVertical: "center",
  },
  statusAreaFixedHeight: {
    minHeight: 42, // Enough for 2 lines of statusDetail
    justifyContent: "center",
    alignItems: "flex-end",
    alignSelf: "flex-end",
    // minWidth removed for responsiveness
  },
  date: {
    fontSize: 12,
    color: Colors.textLight,
    marginLeft: 8,
  },
  statusDetail: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginLeft: 8,
    fontStyle: "italic",
    marginBottom: 1,
  },
  markReadBtn: {
    display: "none",
  },
  checkBoxHeader: {
    minWidth: 44, // recommended minimum touch size
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    marginLeft: 8,
    backgroundColor: "rgba(0,0,0,0.03)",
    borderRadius: 8,
  },
  markReadBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  senderRowTight: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 0,
    marginBottom: 8, // more space below sender row
    marginLeft: 0,
    gap: 4,
  },
  infoLabel: {
    minWidth: 48,
    alignSelf: "flex-start",
    textAlign: "left",
    marginRight: 3,
  },
  senderLabel: {
    fontSize: 11,
    color: Colors.textLight,
    fontWeight: "bold",
  },
  senderRow: {
    marginTop: 2,
    marginBottom: 4,
    marginLeft: 40, // aligns with text after icon
  },
  aboutRowTight: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 0,
    marginBottom: 2,
    marginLeft: 0,
    gap: 4,
  },
  aboutLabel: {
    fontSize: 11,
    color: Colors.textLight,
    fontWeight: "bold",
  },
  aboutSubtitle: {
    fontSize: 11,
    color: Colors.textLight,
    marginBottom: 2,
    marginLeft: 2,
    fontWeight: "500",
  },
  aboutUserBottomLeft: {
    backgroundColor: "rgba(245,247,250,0.7)", // semi-transparent
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: "column",
    alignItems: "flex-start",
    minWidth: 120,
  },
  aboutUserInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
});
