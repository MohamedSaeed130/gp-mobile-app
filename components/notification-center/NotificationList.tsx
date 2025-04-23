import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { Notification } from "../../types/api/Notifications";
import NotificationItem, { NotificationItemProps } from "./NotificationItem";

interface NotificationListProps {
  notifications: Notification[];
  onEndReached?: () => void;
  ListHeaderComponent?: React.ReactElement;
  onDelete?: (index: number) => void;
  onRead?: (id: number) => void;
}

export default function NotificationList({
  notifications,
  onEndReached,
  ListHeaderComponent,
  onDelete,
  onRead,
}: NotificationListProps) {
  if (!notifications.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No notifications yet.</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={notifications}
      renderItem={({ item, index }) => (
        <NotificationItem
          {...item}
          onDelete={() => onDelete && onDelete(index)}
          onRead={() => onRead && onRead(item.id)}
        />
      )}
      keyExtractor={(item, index) => item.id?.toString?.() ?? String(index)}
      contentContainerStyle={styles.list}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.2}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 24,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyText: {
    color: "#888",
    fontSize: 16,
  },
});
