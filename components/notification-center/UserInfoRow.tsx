import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Colors from "../../constants/Colors";
import { UserInfo } from "../../types/api/Users";

interface UserInfoRowProps {
  user: UserInfo;
  label?: string; // e.g. "Sender", "About"
  small?: boolean;
  hideRole?: boolean;
}

export default function UserInfoRow({ user, label, small, hideRole }: UserInfoRowProps) {
  return (
    <View style={[styles.row, small && styles.rowSmall]}>
      {
        <Image 
          source={user.img ? { uri: user.img } : require('../../assets/default-avatar.webp')} 
          style={[styles.avatar, small && styles.avatarSmall]} 
        />
      }
      <View style={styles.infoText}>
        <Text style={[styles.name, small && styles.nameSmall]}>{user.fullName}</Text>
        {!hideRole && user.role && (
          <Text style={[styles.role, small && styles.roleSmall]}>{user.role}</Text>
        )}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  rowSmall: {
    gap: 6,
    marginBottom: 2,
  },
  avatarSmall: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginRight: 5,
  },
  nameSmall: {
    fontSize: 11,
    fontWeight: "500",
  },
  roleSmall: {
    fontSize: 9,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 4,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
    backgroundColor: Colors.surfaceMed,
  },
  infoText: {
    flex: 1,
  },
  name: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  role: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  label: {
    fontSize: 11,
    color: Colors.textLight,
    fontStyle: "italic",
    marginLeft: 8,
  },
});
