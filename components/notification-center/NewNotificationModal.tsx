import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import Colors from "../../constants/Colors";

const NOTIF_TYPES = [
  { label: "Info", value: "info" },
  { label: "Warning", value: "warning" },
  { label: "Success", value: "success" },
  { label: "Error", value: "error" },
];

interface NewNotificationModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (type: string, title: string, body: string) => void;
  loading?: boolean;
}

export default function NewNotificationModal({
  visible,
  onClose,
  onSubmit,
  loading = false,
}: NewNotificationModalProps) {
  const [type, setType] = useState(NOTIF_TYPES[0].value);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSend = () => {
    if (!title.trim() || !body.trim()) return;
    onSubmit(type, title, body);
  };

  const reset = () => {
    setType(NOTIF_TYPES[0].value);
    setTitle("");
    setBody("");
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.header}>New Notification</Text>
          <View style={styles.row}>
            {NOTIF_TYPES.map((item) => (
              <Pressable
                key={item.value}
                style={[
                  styles.typeButton,
                  type === item.value && styles.typeButtonActive,
                ]}
                onPress={() => setType(item.value)}
              >
                <Text
                  style={[
                    styles.typeButtonText,
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
          <View style={styles.actions}>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={() => {
                reset();
                onClose();
              }}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.sendButton, (!title.trim() || !body.trim()) && { opacity: 0.6 }]}
              onPress={handleSend}
              disabled={loading || !title.trim() || !body.trim()}
            >
              <Text style={styles.buttonText}>{loading ? "Sending..." : "Send"}</Text>
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
    backgroundColor: Colors.surfaceLight,
    marginHorizontal: 2,
  },
  typeButtonActive: {
    backgroundColor: Colors.primary,
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
