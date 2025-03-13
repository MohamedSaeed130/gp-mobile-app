import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NotificationItem, NotificationLevel } from "./NotificationItem";
import Colors from "../../constants/Colors";

export interface Notification {
  id: string;
  title: string;
  datetime: string;
  body: string;
  level: NotificationLevel;
}

interface NotificationsSectionProps {
  notifications: Notification[];
  onShowMore: () => void;
}

export const NotificationsSection = ({ 
  notifications, 
  onShowMore 
}: NotificationsSectionProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Recent Notifications</Text>
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          title={notification.title}
          datetime={notification.datetime}
          body={notification.body}
          level={notification.level}
        />
      ))}
      <Pressable
        onPress={onShowMore}
        style={({ pressed }) => [
          styles.showMoreButton,
          pressed && { opacity: 0.7 }
        ]}
      >
        <Text style={styles.showMoreText}>Show More Notifications</Text>
        <MaterialIcons 
          name="expand-more" 
          size={24} 
          color={Colors.primary}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  showMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    backgroundColor: Colors.surfaceMed,
    borderRadius: 12,
    marginTop: 8,
  },
  showMoreText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600",
    marginRight: 4,
  },
}); 