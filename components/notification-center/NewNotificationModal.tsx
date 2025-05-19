import React, { useState } from "react";
import { useRelations } from "../../contexts/RelationsContext";
import { UserDropdown } from "./UserDropdown";
import { UserInfo } from "../../types/api/Users";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import Colors from "../../constants/Colors";
import { onSubmitNewNotification } from "../../app/notification-center";

const NOTIF_TYPES = [
  { label: "Emergency", value: "emergency" },
  { label: "Warning", value: "warning" },
  { label: "Schedule", value: "schedule" },
  { label: "Normal", value: "normal" },
];

interface NewNotificationModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: onSubmitNewNotification;
  loading?: boolean;
}

export default function NewNotificationModal({
  visible,
  onClose,
  onSubmit,
  loading = false,
}: NewNotificationModalProps) {
  const [openKey, setOpenKey] = useState<null | "receiver" | "aboutUser">(null);
  const { relations } = useRelations();
  // Only use relations with complete UserInfo
  const users: UserInfo[] = relations
    .map((r) => r.user)
    .filter(
      (u): u is UserInfo =>
        !!(u && (u as UserInfo).fullName && (u as UserInfo).img !== undefined)
    );
  const [receiver, setReceiver] = useState<UserInfo | null>(null);
  const [aboutUser, setAboutUser] = useState<UserInfo | null>(null);
  const [type, setType] = useState(NOTIF_TYPES[0].value);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSend = () => {
    if (!title.trim() || !body.trim() || !receiver || !aboutUser) return;
    onSubmit(type as any, title, body, receiver.id, aboutUser.id);
  };

  const reset = () => {
    setType(NOTIF_TYPES[0].value);
    setTitle("");
    setBody("");
    setReceiver(null);
    setAboutUser(null);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.header}>New Notification</Text>
          <View style={styles.row}>
            {NOTIF_TYPES.map((item) => (
              <Pressable
                key={item.value}
                style={[
                  styles.typeButton,
                  (styles as any)[`${item.value}Button`],
                  type === item.value && [
                    {
                      backgroundColor:
                        item.value === "emergency"
                          ? "#e53935" // Strong red
                          : item.value === "warning"
                          ? "#ffc107" // Bright yellow
                          : item.value === "schedule"
                          ? "#42a5f5" // Vivid blue
                          : item.value === "normal"
                          ? "#66bb6a" // Vivid green
                          : undefined,
                    },
                  ],
                ]}
                onPress={() => setType(item.value)}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    (styles as any)[`${item.value}ButtonText`],
                    type === item.value && styles.typeButtonTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            editable={!loading}
          />
          <TextInput
            style={styles.bodyInput}
            placeholder="Body"
            value={body}
            onChangeText={setBody}
            multiline
            numberOfLines={5}
            editable={!loading}
          />
          <UserDropdown
            users={users.filter((u) => u.role === "caregiver")}
            selectedUser={receiver}
            onSelect={setReceiver}
            label="Receiver"
            open={openKey === "receiver"}
            setOpen={(v: boolean) => setOpenKey(v ? "receiver" : null)}
          />
          <UserDropdown
            users={users.filter((u) => u.role === "patient")}
            selectedUser={aboutUser}
            onSelect={setAboutUser}
            label="About User"
            open={openKey === "aboutUser"}
            setOpen={(v: boolean) => setOpenKey(v ? "aboutUser" : null)}
          />
          <View style={styles.actions}>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={() => {
                reset();
                onClose();
              }}
            >
              <Text style={[styles.buttonText, { color: "#434060" }]}>
                Cancel
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.button,
                styles.sendButton,
                (!title.trim() || !body.trim() || !receiver || !aboutUser) && {
                  opacity: 0.6,
                },
              ]}
              onPress={handleSend}
              disabled={
                loading ||
                !title.trim() ||
                !body.trim() ||
                !receiver ||
                !aboutUser
              }
            >
              <Text style={styles.buttonText}>
                {loading ? "Sending..." : "Send"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: Colors.background,
    borderRadius: 14,
    padding: 20,
    minWidth: 320,
    maxWidth: 400,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: Colors.textPrimary,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  typeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: "#fff",
  },
  // Emergency: Red
  emergencyButton: {
    borderColor: "#c62828",
  },
  emergencyButtonText: {
    color: "#c62828",
  },
  // Warning: Yellow/Orange
  warningButton: {
    borderColor: "#ff9800",
  },
  warningButtonText: {
    color: "#ff9800",
  },
  // Schedule: Blue
  scheduleButton: {
    borderColor: "#1976d2",
  },
  scheduleButtonText: {
    color: "#1976d2",
  },
  // Normal: Green
  normalButton: {
    borderColor: "#388e3c",
  },
  normalButtonText: {
    color: "#388e3c",
  },
  typeButtonText: {
    color: Colors.textSecondary,
    fontWeight: "500",
  },
  typeButtonTextActive: {
    color: Colors.background,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.divider,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 14,
    color: Colors.textPrimary,
    backgroundColor: Colors.surfaceLight,
  },
  bodyInput: {
    borderWidth: 1,
    borderColor: Colors.divider,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    minHeight: 80,
    maxHeight: 180,
    marginBottom: 18,
    color: Colors.textPrimary,
    backgroundColor: Colors.surfaceLight,
    textAlignVertical: "top",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: Colors.divider,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: Colors.primary,
  },
  buttonText: {
    color: Colors.background,
    fontWeight: "bold",
    fontSize: 16,
  },
});
