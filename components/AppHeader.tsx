import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Link, usePathname } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

export default function AppHeader() {
  const pathname = usePathname();
  const isHomeScreen = pathname === "/";

  return (
    <View style={styles.header}>
      <View style={styles.userInfo}>
        <View style={styles.avatarContainer}>
          <Image
            source={require("../assets/default-avatar.webp")}
            style={styles.avatar}
          />
        </View>
        <View style={styles.userTextContainer}>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userRole}>User</Text>
        </View>
      </View>

      {!isHomeScreen && (
        <Link href="/" asChild>
          <Pressable 
            style={styles.homeButton}
            android_ripple={{ color: Colors.headerIconBg }}
          >
            <MaterialIcons name="home" size={24} color={Colors.headerIconColor} />
          </Pressable>
        </Link>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 15,
    backgroundColor: Colors.headerBackground,
    borderBottomWidth: 2,
    borderBottomColor: Colors.headerBorder,
    elevation: 4,
    shadowColor: Colors.headerBackground,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    padding: 2,
    borderRadius: 22,
    backgroundColor: Colors.headerIconBg,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceMed,
  },
  userTextContainer: {
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.headerText,
  },
  userRole: {
    fontSize: 14,
    color: Colors.headerSubtext,
  },
  homeButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: Colors.headerIconBg,
  },
});
