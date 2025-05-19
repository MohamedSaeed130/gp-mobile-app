import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import NotificationList from "../../components/notification-center/NotificationList";
import NewNotificationModal from "../../components/notification-center/NewNotificationModal";
import ScreenHeader from "../../components/ScreenHeader";
import * as notificationsAPI from "../../api/notificationsAPI";
import { useNotifications } from "../../contexts/NotificationsContext";
import { useTokens } from "../../contexts/TokensContext";
import { postNotification } from "../../api/usersAPI";
import { NotificationType } from "../../types/api/Notifications";

export type onSubmitNewNotification = (
  type: NotificationType,
  title: string,
  body: string,
  receiverId: number,
  aboutUserId: number
) => Promise<void>;

export default function NotificationCenterScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [sending, setSending] = useState(false);
  const { accessToken } = useTokens();
  const { notifications, loading, error, setNotifications } =
    useNotifications();

  // Mark as read
  const handleRead = async (notificationId: number) => {
    try {
      await notificationsAPI.readNotification(notificationId, accessToken);
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId
            ? { ...n, isRead: true, updatedAt: new Date().toISOString() }
            : n
        )
      );
    } catch {}
  };

  // Delete notification
  const handleDelete = async (index: number, notificationId: number) => {
    try {
      await notificationsAPI.deleteNotification(notificationId, accessToken);
      setNotifications((prev) => prev.filter((_, i) => i !== index));
    } catch {}
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={[
            styles.content,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  const handleNewNotification: onSubmitNewNotification = async (
    type,
    title,
    body,
    receiverId,
    aboutUserId
  ) => {
    setSending(true);
    await postNotification(
      { type, title, body, relatedUserId: aboutUserId },
      receiverId,
      accessToken
    );
    setTimeout(() => {
      setSending(false);
      setModalVisible(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {error && (
          <Text
            style={{
              color: Colors.error,
              textAlign: "center",
              marginVertical: 8,
            }}
          >
            {error}
          </Text>
        )}
        <NotificationList
          notifications={notifications}
          onDelete={(index) => handleDelete(index, notifications[index].id)}
          onRead={handleRead}
          ListHeaderComponent={
            <ScreenHeader
              title="Notification Center"
              icon={
                <MaterialIcons
                  name="notifications-active"
                  size={28}
                  color={Colors.info}
                />
              }
            />
          }
        />
        <NewNotificationModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleNewNotification}
          loading={sending}
        />
        {/* Floating Action Button */}
        <Pressable
          style={styles.fab}
          onPress={() => setModalVisible(true)}
          accessibilityLabel="Create new notification"
        >
          <MaterialIcons name="add" size={28} color={Colors.background} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surfaceLight,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 32,
    backgroundColor: Colors.primary,
    borderRadius: 32,
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
  },
});
