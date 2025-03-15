import React, { ReactElement } from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

interface ScreenHeaderProps {
  title: string;
  icon?: ReactElement;
}

const ScreenHeader = ({ title, icon }: ScreenHeaderProps) => {
  return (
    <View style={styles.header}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
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
    backgroundColor: Colors.surfaceLight,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 17,
    color: Colors.textSecondary,
    marginTop: 5,
  },
});

export default ScreenHeader;
