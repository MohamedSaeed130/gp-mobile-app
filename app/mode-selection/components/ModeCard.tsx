import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export interface ModeCardProps {
  title: string;
  description: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: () => void;
}

const ModeCard = ({ 
  title, 
  description, 
  icon, 
  isSelected, 
  isDisabled,
  onSelect 
}: ModeCardProps) => {
  return (
    <Pressable 
      style={[
        styles.container,
        isSelected && styles.selected,
        isDisabled && styles.disabled,
      ]}
      onPress={onSelect}
      disabled={isDisabled}
    >
      <View style={[styles.iconContainer, isSelected && styles.selectedIcon]}>
        <MaterialIcons 
          name={icon} 
          size={28} 
          color={isSelected ? "white" : "#007AFF"} 
        />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, isDisabled && styles.disabledText]}>
          {title}
        </Text>
        <Text style={[styles.description, isDisabled && styles.disabledText]}>
          {description}
        </Text>
      </View>
      {isSelected && (
        <MaterialIcons name="check-circle" size={24} color="#007AFF" />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  selected: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  disabled: {
    opacity: 0.5,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    marginRight: 15,
  },
  selectedIcon: {
    backgroundColor: '#007AFF',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  disabledText: {
    color: '#999',
  },
});

export default ModeCard; 