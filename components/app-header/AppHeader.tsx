import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Link, usePathname, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import Colors from "../../constants/Colors";
import { HeaderDropdown } from "./HeaderDropdown";

export default function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const isHomeScreen = pathname === "/";
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log("Logout pressed");
    router.push("/login");
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Pressable
              style={styles.avatarContainer}
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <Image
                source={require("../../assets/default-avatar.webp")}
                style={styles.avatar}
              />
              <MaterialIcons
                name={showDropdown ? "arrow-drop-up" : "arrow-drop-down"}
                size={24}
                color={Colors.headerText}
                style={styles.dropdownIcon}
              />
            </Pressable>
            <View style={styles.userTextContainer}>
              <Text style={styles.userName}>Graduation Project 2025</Text>
              <Text style={styles.userRole}>User</Text>
            </View>
          </View>

          {!isHomeScreen && (
            <Link href="/" asChild>
              <Pressable
                style={styles.homeButton}
                android_ripple={{ color: Colors.headerIconBg }}
              >
                <MaterialIcons
                  name="home"
                  size={24}
                  color={Colors.headerIconColor}
                />
              </Pressable>
            </Link>
          )}
        </View>
      </View>
      {showDropdown && (
        <HeaderDropdown
          visible={showDropdown}
          onClose={() => setShowDropdown(false)}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: "relative",
    zIndex: 1,
    backgroundColor: Colors.headerBackground,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 15,
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
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    paddingRight: 8,
    borderRadius: 22,
    backgroundColor: Colors.headerIconBg,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceMed,
  },
  dropdownIcon: {
    marginLeft: 4,
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
