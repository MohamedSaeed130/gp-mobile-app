import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import Colors from "../../constants/Colors";
import { UserProfile, UserProfileChange } from "../../types/api/Users";
import { validateName } from "../../utils/validation";

interface EditProfileModalProps {
  visible: boolean;
  profile: UserProfile;
  onSave: (changes: UserProfileChange) => void;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  visible,
  profile,
  onSave,
  onClose,
}) => {
  const [form, setForm] = useState<UserProfileChange>({});

  useEffect(() => {
    setForm({
      firstName: profile.firstName,
      lastName: profile.lastName,
      title: profile.title,
      phoneNumber: profile.phoneNumber,
      organization: profile.organization,
      impairment: profile.impairment,
    });
  }, [profile, visible]);

  // Track changes for save
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const handleChange = (key: keyof UserProfileChange, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setTouched((prev) => ({ ...prev, [key]: true }));
  };

  const getChangedFields = (): UserProfileChange => {
    const changed: UserProfileChange = {};
    Object.keys(form).forEach((key) => {
      // Only send changed fields
      if (touched[key]) {
        changed[key as keyof UserProfileChange] =
          form[key as keyof UserProfileChange];
      }
    });
    return changed;
  };

  // Validation helpers
  const isFirstNameInvalid =
    touched.firstName && !validateName(form.firstName || "");
  const isLastNameInvalid =
    touched.lastName && !validateName(form.lastName || "");
  const isSaveDisabled = isFirstNameInvalid || isLastNameInvalid;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Edit Profile</Text>
          <ScrollView style={{ width: "100%" }}>
            <TextInput
              style={[
                styles.input,
                isFirstNameInvalid && { borderColor: Colors.error },
              ]}
              placeholder="First Name"
              value={form.firstName || ""}
              onChangeText={(text) => handleChange("firstName", text)}
              onBlur={() =>
                setTouched((prev) => ({ ...prev, firstName: true }))
              }
            />
            {isFirstNameInvalid && (
              <Text style={styles.errorText}>
                Please enter a valid first name
              </Text>
            )}
            <TextInput
              style={[
                styles.input,
                isLastNameInvalid && { borderColor: Colors.error },
              ]}
              placeholder="Last Name"
              value={form.lastName || ""}
              onChangeText={(text) => handleChange("lastName", text)}
              onBlur={() => setTouched((prev) => ({ ...prev, lastName: true }))}
            />
            {isLastNameInvalid && (
              <Text style={styles.errorText}>
                Please enter a valid last name
              </Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={form.title || ""}
              onChangeText={(text) => handleChange("title", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={form.phoneNumber || ""}
              onChangeText={(text) => handleChange("phoneNumber", text)}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Organization"
              value={form.organization || ""}
              onChangeText={(text) => handleChange("organization", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Impairment"
              value={form.impairment || ""}
              onChangeText={(text) => handleChange("impairment", text)}
            />
          </ScrollView>
          <View style={styles.buttonRow}>
            <Pressable style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.saveButton, isSaveDisabled && { opacity: 0.6 }]}
              onPress={() => onSave(getChangedFields())}
              disabled={isSaveDisabled}
            >
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: 340,
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    elevation: 8,
    shadowColor: Colors.textPrimary,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    maxHeight: 540,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: Colors.textPrimary,
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 16,
  },
  saveButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginLeft: 8,
  },
  saveButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cancelButtonText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: Colors.error,
    fontSize: 13,
    marginBottom: 6,
    marginLeft: 4,
  },
});
