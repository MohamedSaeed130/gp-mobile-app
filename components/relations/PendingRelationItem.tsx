import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

export type RequestType = "incoming" | "outgoing";

interface PendingRelationItemProps {
  name: string;
  id: string;
  type: RequestType;
  onAccept?: () => void;
  onReject?: () => void;
  onCancel?: () => void;
}

const PendingRelationItem = ({
  name,
  id,
  type,
  onAccept,
  onReject,
  onCancel,
}: PendingRelationItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{name[0].toUpperCase()}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.requestInfo}>
            <MaterialIcons
              name={type === "incoming" ? "call-received" : "call-made"}
              size={16}
              color={Colors.textSecondary}
              style={styles.directionIcon}
            />
            <Text style={styles.id}>ID: {id}</Text>
          </View>
        </View>
      </View>
      <View style={styles.actions}>
        {type === "incoming" ? (
          <>
            <Pressable
              onPress={onAccept}
              style={({ pressed }) => [
                styles.actionButton,
                styles.acceptButton,
                pressed && { opacity: 0.7 },
              ]}
            >
              <MaterialIcons name="check" size={20} color={Colors.background} />
            </Pressable>
            <Pressable
              onPress={onReject}
              style={({ pressed }) => [
                styles.actionButton,
                styles.rejectButton,
                pressed && { opacity: 0.7 },
              ]}
            >
              <MaterialIcons name="close" size={20} color={Colors.background} />
            </Pressable>
          </>
        ) : (
          <Pressable
            onPress={onCancel}
            style={({ pressed }) => [
              styles.actionButton,
              styles.cancelButton,
              pressed && { opacity: 0.7 },
            ]}
          >
            <MaterialIcons name="cancel" size={20} color={Colors.background} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: Colors.background,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    justifyContent: "space-between",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
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
  requestInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  directionIcon: {
    marginRight: 4,
  },
  id: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  acceptButton: {
    backgroundColor: Colors.success,
  },
  rejectButton: {
    backgroundColor: Colors.error,
  },
  cancelButton: {
    backgroundColor: Colors.error,
  },
});

export default PendingRelationItem;
