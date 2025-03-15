import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Colors from "../constants/Colors";
import React from "react";

export interface MenuItemProps {
  href: string;
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  description: string;
  color: string;
}

const MenuItem = ({ href, title, icon, description, color }: MenuItemProps) => (
  <Link href={href} asChild>
    <Pressable
      style={styles.menuItem}
      android_ripple={{ color: Colors.ripple }}
    >
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <MaterialIcons name={icon} size={32} color={Colors.background} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.menuItemTitle}>{title}</Text>
        <Text style={styles.menuItemDescription}>{description}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color={Colors.textLight} />
    </Pressable>
  </Link>
);

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: Colors.componentBg,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: Colors.textPrimary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    shadowColor: Colors.textPrimary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  menuItemDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});

export default MenuItem;
