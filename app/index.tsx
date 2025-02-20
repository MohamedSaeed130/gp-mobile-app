import { Link } from "expo-router";
import { ScrollView, View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import CurrentLaptopConnection from "../components/CurrentLaptopConnection";
import Colors from "../constants/Colors";

interface MenuItemProps {
  href: string;
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  description: string;
  color: string;
}

const MenuItem = ({ href, title, icon, description, color }: MenuItemProps) => (
  <Link href={href} asChild>
    <Pressable style={styles.menuItem}>
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

export default function HomeScreen() {
  // TODO: implement esp bluetooth connection functionality
  // const [espConnected, setEspConnected] = useState(false);

  const menuItems: MenuItemProps[] = [
    {
      href: "/laptop-connection",
      title: "Laptop Connection",
      icon: "laptop",
      description: "Connect to your laptop for remote control",
      color: Colors.primary,
    },
    // {
    //   href: "/esp-connection",
    //   title: "Connect Device",
    //   icon: "bluetooth",
    //   description: "Set up connection with your wheelchair",
    //   color: "#007AFF",
    // },
    {
      href: "/mode-selection",
      title: "Control Modes",
      icon: "settings-input-component",
      description: "Select your preferred control method",
      color: Colors.secondary,
    },
    // {
    //   href: "/remote-control",
    //   title: "Remote Control",
    //   icon: "gamepad",
    //   description: "Control your wheelchair remotely",
    //   color: "#FF3B30",
    // },
    // {
    //   href: "/profile",
    //   title: "Profile",
    //   icon: "person",
    //   description: "View and manage your profile",
    //   color: "#34C759",
    // },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Smart Wheelchair</Text>
        <Text style={styles.headerSubtitle}>Welcome back!</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Connection Status</Text>
        <CurrentLaptopConnection />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        {menuItems.map((item) => (
          <MenuItem key={item.href} {...item} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surfaceLight,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 17,
    color: Colors.textSecondary,
    marginTop: 5,
  },
  content: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 15,
  },
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
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
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
  section: {
    padding: 20,
  },
});
