import { Link } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

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
        <MaterialIcons name={icon} size={32} color="white" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#C7C7CC" />
    </Pressable>
  </Link>
);

export default function HomeScreen() {
  const menuItems: MenuItemProps[] = [
    {
      href: "/laptop-connection",
      title: "Laptop Connection",
      icon: "laptop",
      description: "Connect to your laptop for remote control",
      color: "#5856D6",
    },
    {
      href: "/esp-connection",
      title: "Connect Device",
      icon: "bluetooth",
      description: "Set up connection with your wheelchair",
      color: "#007AFF",
    },
    {
      href: "/mode-selection",
      title: "Control Modes",
      icon: "settings-input-component",
      description: "Select your preferred control method",
      color: "#FF9500",
    },
    {
      href: "/remote-controller",
      title: "Remote Control",
      icon: "gamepad",
      description: "Control your wheelchair remotely",
      color: "#FF3B30",
    },
    {
      href: "/profile",
      title: "Profile",
      icon: "person",
      description: "View and manage your profile",
      color: "#34C759",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Smart Wheelchair</Text>
        <Text style={styles.headerSubtitle}>Welcome back!</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        {menuItems.map((item) => (
          <MenuItem key={item.href} {...item} />
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Make sure your device is connected before using remote control
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#000",
  },
  headerSubtitle: {
    fontSize: 17,
    color: "#666",
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000",
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
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
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
  },
  footerText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
