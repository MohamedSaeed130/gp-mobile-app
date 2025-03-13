import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

interface RelationsSearchProps {
  onSearch: (text: string) => void;
  value: string;
}

const RelationsSearch = ({ onSearch, value }: RelationsSearchProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <MaterialIcons 
          name="search" 
          size={24} 
          color={Colors.textLight} 
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Search by name or ID..."
          placeholderTextColor={Colors.textLight}
          value={value}
          onChangeText={onSearch}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLight,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: Colors.textPrimary,
  },
});

export default RelationsSearch; 