import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Colors from '../../constants/Colors';

interface RolePickerProps {
  value: string;
  onChange: (role: string) => void;
  error?: boolean;
}

export const RolePicker = ({ value, onChange, error }: RolePickerProps) => (
  <View style={[styles.pickerContainer, error && styles.pickerError]}>
    <Picker
      selectedValue={value}
      onValueChange={onChange}
      style={styles.picker}
      testID="role-picker"
      accessibilityLabel="Select role"
    >
      <Picker.Item label="Select role..." value="" color={Colors.textLight} />
      <Picker.Item label="Caregiver" value="Caregiver" />
      <Picker.Item label="Ward" value="Ward" />
    </Picker>
  </View>
);

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: Colors.surfaceLight,
  },
  picker: {
    height: 56, // Increased height
    color: Colors.textPrimary,
    fontSize: 18, // Larger font size for visibility
    paddingHorizontal: 12, // Add horizontal padding
  },
  pickerError: {
    borderColor: Colors.error,
  },
});
