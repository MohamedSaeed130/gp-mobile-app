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
        prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
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

  const handleNewNotification = async (
    type: string,
    title: string,
    body: string
  ) => {
    setSending(true);
    // TODO: Implement actual notification sending logic (API call)
    setTimeout(() => {
      setSending(false);
      setModalVisible(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginBottom: 10,
          }}
        >
          <Pressable
            style={{
              backgroundColor: Colors.primary,
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 8,
            }}
            onPress={() => setModalVisible(true)}
          >
            <Text
              style={{
                color: Colors.background,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              New Notification
            </Text>
          </Pressable>
        </View>
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
});
