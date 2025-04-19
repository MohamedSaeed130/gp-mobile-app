import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import NotificationList from "./NotificationList";
import ScreenHeader from "../ScreenHeader";
import { MaterialIcons } from '@expo/vector-icons';
import Colors from "../../constants/Colors";
import { NotificationItemProps } from "./NotificationItem";

const mockNotifications: NotificationItemProps[] = [
  {
    type: "EMERGENCY",
    title: "Critical Alert",
    body: "Immediate attention required in Room 301.",
    createdAt: "2025-04-18T18:45:00+02:00",
    isRead: false,
    sender: {
      name: "Alice Brown",
      role: "Nurse",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    aboutUser: {
      name: "John Doe",
      role: "Patient",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  },
  {
    type: "SCHEDULE",
    title: "Medication Reminder",
    body: "Patient John Doe needs to take medication at 20:00.",
    createdAt: "2025-04-18T17:00:00+02:00",
    isRead: true,
    sender: "system",
    aboutUser: {
      name: "John Doe",
      role: "Patient",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  },
  {
    type: "WARNING",
    title: "High Temperature",
    body: "Temperature exceeded safe range for patient Jane Smith.",
    createdAt: "2025-04-18T15:30:00+02:00",
    isRead: false,
    sender: {
      name: "Dr. Ahmed Nasser",
      role: "Doctor",
      image: "https://randomuser.me/api/portraits/men/99.jpg",
    },
    aboutUser: {
      name: "Jane Smith",
      role: "Patient",
      image: "https://randomuser.me/api/portraits/women/55.jpg",
    },
  },
  {
    type: "NORMAL",
    title: "Daily Report Available",
    body: "The daily ward report is now available.",
    createdAt: "2025-04-18T14:00:00+02:00",
    isRead: true,
    sender: "system",
    aboutUser: {
      name: "Ward 3",
      role: "Ward",
      image: undefined,
    },
  },
];

export default function NotificationCenterScreen() {
  const [notifications, setNotifications] = useState<NotificationItemProps[]>(mockNotifications);

  const handleDelete = (index: number) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <NotificationList
          notifications={notifications}
          onDelete={handleDelete}
          ListHeaderComponent={
            <ScreenHeader
              title="Notification Center"
              icon={<MaterialIcons name="notifications-active" size={28} color={Colors.info} />}
            />
          }
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
