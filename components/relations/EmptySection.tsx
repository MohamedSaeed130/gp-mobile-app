import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

interface EmptySectionProps {
  message: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}

const EmptySection = ({ message, icon }: EmptySectionProps) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name={icon} size={48} color={Colors.textSecondary} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  message: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

export default EmptySection; 