import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Colors from '../../constants/Colors';

interface RelationItemProps {
  name: string;
  id: string;
  onPress?: () => void;
}

const RelationItem = ({ name, id, onPress }: RelationItemProps) => {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        pressed && { backgroundColor: Colors.ripple }
      ]}
      onPress={onPress}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{name[0].toUpperCase()}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.id}>ID: {id}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.background,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: Colors.background,
    fontSize: 20,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  id: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});

export default RelationItem; 