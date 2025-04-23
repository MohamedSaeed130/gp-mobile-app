import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Link, usePathname, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useUserInfo } from "../../contexts/UserInfoContext";
import Colors from "../../constants/Colors";
import { HeaderDropdown } from "./HeaderDropdown";
import * as authAPI from "../../api/authAPI";
import { useTokens } from "../../contexts/TokensContext";
import capitalize from "../../utils/capitalize";

export default function AppHeader() {
  const { userInfo } = useUserInfo();
  const { accessToken } = useTokens();

  const pathname = usePathname();
  const router = useRouter();
  const isHomeScreen = pathname === "/home";
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      if (authAPI.logout) {
        await authAPI.logout(accessToken);
      }
    } catch (e) {
      // Optionally handle logout error
    } finally {
      router.push("/login");
    }
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Pressable
              style={styles.avatarContainer}
              onPress={() => setShowDropdown(!showDropdown)}
              disabled={!userInfo}
            >
              <Image
                source={
                  userInfo && userInfo.img
                    ? { uri: userInfo.img }
                    : require("../../assets/default-avatar.webp")
                }
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
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {userInfo?.title ? (
                  <Text style={styles.userTitle}>{userInfo.title} </Text>
                ) : null}
                <Text style={styles.userName}>
                  {userInfo?.fullName || "Unknown"}
                </Text>
              </View>
              <Text style={styles.userRole}>
                {(userInfo && capitalize(userInfo.role)) || "No-role"}
              </Text>
            </View>
          </View>

          {!isHomeScreen && (
            <Link href="/home" asChild>
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
  userTitle: {
    fontSize: 15,
    color: "#cbd2de",
    fontWeight: "bold",
    marginRight: 4,
  },
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
