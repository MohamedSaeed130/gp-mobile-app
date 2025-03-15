import { View, Text, Pressable, StyleSheet, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Colors from "../../constants/Colors";

interface HeaderDropdownProps {
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const HeaderDropdown = ({
  visible,
  onClose,
  onLogout,
}: HeaderDropdownProps) => {
  if (!visible) return null;

  return (
    <View style={styles.dropdownContainer}>
      <Pressable style={styles.overlay} onPress={onClose} />
      <View style={styles.container}>
        <View style={styles.dropdown}>
          <Link href="/profile" asChild>
            <Pressable
              style={styles.menuItem}
              android_ripple={{ color: Colors.ripple }}
              onPress={onClose}
            >
              <MaterialIcons
                name="person"
                size={20}
                color={Colors.textPrimary}
              />
              <Text style={styles.menuText}>Profile</Text>
            </Pressable>
          </Link>

          <View style={styles.divider} />

          <Pressable
            style={styles.menuItem}
            android_ripple={{ color: Colors.ripple }}
            onPress={() => {
              onClose();
              onLogout();
            }}
          >
            <MaterialIcons name="logout" size={20} color={Colors.error} />
            <Text style={[styles.menuText, styles.logoutText]}>Log Out</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    elevation: 9999,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },
  container: {
    position: "absolute",
    top: 85,
    left: 0,
    right: 0,
    backgroundColor: Colors.background,
    elevation: 4,
    shadowColor: Colors.textPrimary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdown: {
    width: "100%",
    backgroundColor: Colors.background,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  menuText: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  logoutText: {
    color: Colors.error,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
  },
});
