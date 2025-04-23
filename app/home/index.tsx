import { ScrollView, View, Text, StyleSheet } from "react-native";

import CurrentLaptopConnection from "../../components/CurrentLaptopConnection";
import Colors from "../../constants/Colors";
import MenuItem, { MenuItemProps } from "../../components/MenuItem";

export default function HomeScreen() {
  // TODO: implement esp bluetooth connection functionality
  // const [espConnected, setEspConnected] = useState(false);

  const devMenuItems: MenuItemProps[] = [
    {
      href: "/login",
      title: "Login",
      icon: "login",
      description: "Sign in to your account",
      color: Colors.info,
    },
    {
      href: "/register",
      title: "Register",
      icon: "person-add",
      description: "Create a new account",
      color: Colors.success,
    },
    {
      href: "/laptop-connection",
      title: "Laptop Connection",
      icon: "laptop",
      description: "Connect to your laptop for remote control",
      color: Colors.primary,
    },
    {
      href: "/mode-selection",
      title: "Control Modes",
      icon: "settings-input-component",
      description: "Select your preferred control method",
      color: Colors.secondary,
    },
    {
      href: "/remote-control",
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
    {
      href: "/relations",
      title: "Relations",
      icon: "people",
      description: "Manage your connections and friends",
      color: Colors.info,
    },
    {
      href: "/ward-report",
      title: "Ward Report",
      icon: "assessment",
      description: "View medical status and activity reports",
      color: Colors.info,
    },
    {
      href: "/notification-center",
      title: "Notification Center",
      icon: "notifications-none",
      description: "View and manage notifications",
      color: Colors.info,
    },
  ];

  const clientMenuItems: MenuItemProps[] = [
    {
      href: "/laptop-connection",
      title: "Laptop Connection",
      icon: "laptop",
      description: "Connect to your laptop for remote control",
      color: Colors.primary,
    },
    {
      href: "/mode-selection",
      title: "Control Modes",
      icon: "settings-input-component",
      description: "Select your preferred control method",
      color: Colors.secondary,
    },
    {
      href: "/profile",
      title: "Profile",
      icon: "person",
      description: "View and manage your profile",
      color: "#34C759",
    },
    {
      href: "/relations",
      title: "Relations",
      icon: "people",
      description: "Manage your connections and friends",
      color: Colors.info,
    },
    {
      href: "/ward-report",
      title: "Ward Report",
      icon: "assessment",
      description: "View medical status and activity reports",
      color: Colors.info,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Connection Status</Text>
        <CurrentLaptopConnection />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Actions</Text>
        {devMenuItems.map((item) => (
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
    marginBottom: 10,
  },
  iconContainer: {
    width: 50,
    height: 50,
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
