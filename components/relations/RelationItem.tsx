import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { UserInfo } from "../../types/api/Users";
import { useState } from "react";
import { useRouter } from "expo-router";
import * as relationsAPI from "../../api/relationsAPI";
import { useTokens } from "../../contexts/TokensContext";
import capitalize from "../../utils/capitalize";
import { useUserInfo } from "../../contexts/UserInfoContext";

interface RelationItemProps {
  user: UserInfo;
  relationType: string;
  relationId: number;
  onDelete?: () => void;
}

const RelationItem = ({
  user,
  relationType,
  relationId,
  onDelete,
}: RelationItemProps) => {
  const { userInfo } = useUserInfo();
  const myRole = userInfo?.role;
  const { accessToken } = useTokens();
  const { fullName, role, img, id } = user;
  const initial =
    fullName && fullName.length > 0 ? fullName[0].toUpperCase() : "?";
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShowProfile = () => {
    setMenuVisible(false);
    router.push({ pathname: "/user-profile", params: { userId: id } });
  };

  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await relationsAPI.deleteRelation(relationId, accessToken);
      if (typeof onDelete === "function") {
        onDelete();
      }
    } finally {
      setLoading(false);
      setMenuVisible(false);
      setConfirmDelete(false);
    }
  };

  const handleAskDelete = () => {
    setConfirmDelete(true);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };

  const handleShowReport = () => {
    setMenuVisible(false);
    router.push({ pathname: "/patient-report", params: { userId: id } });
  };

  const renderMenu = () =>
    menuVisible && (
      <View style={styles.menuOverlay}>
        <View style={styles.menuBox}>
          {!confirmDelete ? (
            <>
              <Pressable style={styles.menuItem} onPress={handleShowProfile}>
                <View style={styles.menuRow}>
                  <Ionicons name="person-outline" size={20} color={Colors.textPrimary} style={styles.menuIcon} />
                  <Text style={styles.menuText}>Show Profile</Text>
                </View>
              </Pressable>
              {role === "patient" && myRole === "caregiver" && (
                <Pressable style={styles.menuItem} onPress={handleShowReport}>
                  <View style={styles.menuRow}>
                    <Ionicons name="document-text-outline" size={20} color={Colors.textPrimary} style={styles.menuIcon} />
                    <Text style={styles.menuText}>Show Report</Text>
                  </View>
                </Pressable>
              )}
              <Pressable
                style={styles.menuItem}
                onPress={handleAskDelete}
                disabled={loading}
              >
                <View style={styles.menuRow}>
                  <Ionicons name="trash-outline" size={20} color={Colors.error} style={styles.menuIcon} />
                  <Text style={[styles.menuText, { color: Colors.error }]}>
                    {loading ? "Deleting..." : "Delete Relation"}
                  </Text>
                </View>
              </Pressable>
              <Pressable
                style={styles.menuItem}
                onPress={() => setMenuVisible(false)}
              >
                <View style={styles.menuRow}>
                  <Ionicons name="close-outline" size={20} color={Colors.textPrimary} style={styles.menuIcon} />
                  <Text style={styles.menuText}>Cancel</Text>
                </View>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={[styles.menuText, { marginBottom: 12 }]}>
                Are you sure you want to delete this relation?
              </Text>
              <Pressable
                style={styles.menuItem}
                onPress={handleDelete}
                disabled={loading}
              >
                <View style={styles.menuRow}>
                  <Ionicons name="trash-outline" size={20} color={Colors.error} style={styles.menuIcon} />
                  <Text style={[styles.menuText, { color: Colors.error }]}>
                    Yes, Delete
                  </Text>
                </View>
              </Pressable>
              <Pressable
                style={styles.menuItem}
                onPress={handleCancelDelete}
                disabled={loading}
              >
                <View style={styles.menuRow}>
                  <Ionicons name="close-outline" size={20} color={Colors.textPrimary} style={styles.menuIcon} />
                  <Text style={styles.menuText}>Cancel</Text>
                </View>
              </Pressable>
            </>
          )}
        </View>
      </View>
    );

  if (relationType !== "relation") {
    return (
      <View style={styles.container}>
        <View style={styles.avatar}>
          {img ? (
            <Image source={{ uri: img }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatarText}>{initial}</Text>
          )}
        </View>
        <View style={styles.info}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {user.title && <Text style={styles.title}>{user.title} </Text>}
            <Text style={styles.name}>{fullName}</Text>
          </View>
          {role && (
            <Text style={styles.field}>
              {capitalize(role)}
              {id ? ` • ID: ${id}` : ""}
            </Text>
          )}
        </View>
      </View>
    );
  }

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.container,
          pressed && { backgroundColor: Colors.ripple },
        ]}
        onPress={() => setMenuVisible(true)}
      >
        <View style={styles.avatar}>
          {img ? (
            <Image source={{ uri: img }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatarText}>{initial}</Text>
          )}
        </View>
        <View style={styles.info}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {user.title && <Text style={styles.title}>{user.title} </Text>}
            <Text style={styles.name}>{fullName}</Text>
          </View>
          {role && (
            <Text style={styles.field}>
              {capitalize(role)}
              {id ? ` • ID: ${id}` : ""}
            </Text>
          )}
        </View>
      </Pressable>
      {renderMenu()}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    color: "#6C7A89", // blue-grey
    fontWeight: "bold",
    marginRight: 4,
  },
  container: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: Colors.background,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    overflow: "hidden",
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: "cover",
  },
  avatarText: {
    color: Colors.background,
    fontSize: 20,
    fontWeight: "bold",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  id: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  field: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  menuOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  menuBox: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 18,
    minWidth: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  menuIcon: {
    marginRight: 10,
  },
  menuText: {
    fontSize: 16,
    color: Colors.textPrimary,
    textAlign: "center",
  },
});

export default RelationItem;
