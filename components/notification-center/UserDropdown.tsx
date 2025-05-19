import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { UserInfo } from "../../types/api/Users";
import Colors from "../../constants/Colors";

interface UserDropdownProps {
  users: UserInfo[];
  selectedUser: UserInfo | null;
  onSelect: (user: UserInfo) => void;
  label: string;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export const UserDropdown: React.FC<UserDropdownProps> = ({
  users,
  selectedUser,
  onSelect,
  label,
  open: controlledOpen,
  setOpen: controlledSetOpen,
}) => {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen =
    controlledSetOpen !== undefined ? controlledSetOpen : setInternalOpen;

  // Close dropdown when tapping outside
  const renderDropdown = () => (
    <Pressable style={styles.dropdownOverlay} onPress={() => setOpen(false)}>
      <View style={styles.dropdownListBox}>
        <View style={styles.dropdownHeader}>
          <Text style={styles.dropdownLabel}>{label}</Text>
          <Pressable
            onPress={() => setOpen(false)}
            style={styles.closeButton}
            accessibilityLabel="Close dropdown"
          >
            <Text style={styles.closeButtonText}>×</Text>
          </Pressable>
        </View>
        <ScrollView
          style={{ maxHeight: 600, minHeight: 88 }}
          showsVerticalScrollIndicator={true}
        >
          {users.map((item) => (
            <Pressable
              key={item.id}
              style={styles.userRow}
              onPress={() => {
                onSelect(item);
                setOpen(false);
              }}
            >
              {item.img ? (
                <Image source={{ uri: item.img }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder} />
              )}
              <Text style={styles.userName}>{item.fullName}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        style={styles.dropdown}
        onPress={() => setOpen(!open)}
        accessibilityLabel={`Select ${label}`}
      >
        {selectedUser ? (
          <View style={styles.userRow}>
            {selectedUser.img ? (
              <Image source={{ uri: selectedUser.img }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder} />
            )}
            <Text style={styles.userName}>{selectedUser.fullName}</Text>
          </View>
        ) : (
          <Text style={styles.placeholderText}>Select...</Text>
        )}
      </Pressable>
      {open && renderDropdown()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  label: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginBottom: 4,
    marginLeft: 2,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: Colors.divider,
    borderRadius: 8,
    padding: 10,
    backgroundColor: Colors.surfaceLight,
    flexDirection: "row",
    alignItems: "center",
    minHeight: 44,
  },
  placeholderText: {
    color: Colors.textLight,
    fontSize: 15,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
    backgroundColor: Colors.divider,
  },
  avatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
    backgroundColor: Colors.divider,
  },
  userName: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  dropdownOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.08)",
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownListBox: {
    borderWidth: 1,
    borderColor: Colors.divider,
    borderRadius: 10,
    backgroundColor: Colors.surfaceLight,
    minWidth: 220,
    maxWidth: 320,
    maxHeight: 600,
    width: "90%",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 8,
  },
  dropdownHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    paddingBottom: 4,
  },
  dropdownLabel: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
  closeButton: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: Colors.divider,
    marginLeft: 8,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  dropdownList: {
    display: "none", // legacy, replaced by dropdownOverlay and dropdownListBox
  },
});
