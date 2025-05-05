import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

export type NotificationLevel = "EMERGENCY" | "WARNING" | "SCHEDULE" | "NORMAL";

interface NotificationItemProps {
  title: string;
  datetime: string;
  body: string;
  level: NotificationLevel;
}

const getLevelStyles = (level: NotificationLevel) => {
  switch (level) {
    case "EMERGENCY":
      return {
        backgroundColor: "rgba(255, 82, 82, 0.1)",
        borderColor: Colors.error,
        iconName: "error" as const,
        iconColor: Colors.error,
        titleColor: Colors.error,
      };
    case "WARNING":
      return {
        backgroundColor: "rgba(255, 193, 7, 0.1)",
        borderColor: Colors.warning,
        iconName: "warning" as const,
        iconColor: Colors.warning,
        titleColor: Colors.warning,
      };
    case "SCHEDULE":
      return {
        backgroundColor: "rgba(33, 150, 243, 0.1)",
        borderColor: Colors.info,
        iconName: "schedule" as const,
        iconColor: Colors.info,
        titleColor: Colors.info,
      };
    default:
      return {
        backgroundColor: "rgba(158, 158, 158, 0.1)",
        borderColor: Colors.textSecondary,
        iconName: "notifications" as const,
        iconColor: Colors.textSecondary,
        titleColor: Colors.textSecondary,
      };
  }
};

export const NotificationItem = ({
  title,
  datetime,
  body,
  level,
}: NotificationItemProps) => {
  const levelStyle = getLevelStyles(level);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: levelStyle.backgroundColor,
          borderColor: levelStyle.borderColor,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <MaterialIcons
            name={levelStyle.iconName}
            size={20}
            color={levelStyle.iconColor}
          />
          <Text
            style={[styles.title, { color: levelStyle.titleColor }]}
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.body} numberOfLines={2}>
          {body}
        </Text>
        <Text style={styles.datetime}>{datetime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
    flex: 1,
  },
  contentContainer: {
    flexDirection: "column",
  },
  body: {
    fontSize: 14,
    color: Colors.textPrimary,
    lineHeight: 20,
    marginBottom: 4,
  },
  datetime: {
    fontSize: 12,
    color: Colors.textSecondary,
    alignSelf: "flex-end",
  },
}); 