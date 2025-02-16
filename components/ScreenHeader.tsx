import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  iconColor?: string;
}

const ScreenHeader = ({
  title,
  subtitle,
  icon,
  iconColor = "#666",
}: ScreenHeaderProps) => {
  return (
    <View style={styles.header}>
      {icon && (
        <View style={styles.iconContainer}>
          <MaterialIcons name={icon} size={28} color={iconColor} />
        </View>
      )}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 15,
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F8FF",
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 17,
    color: "#666",
    marginTop: 5,
  },
});

export default ScreenHeader;
