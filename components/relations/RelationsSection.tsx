import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

interface RelationsSectionProps {
  title: string;
  children: React.ReactNode;
  count: number;
  icon: React.ReactNode;
  collapsible?: boolean;
}

const RelationsSection = ({ 
  title, 
  children, 
  count, 
  icon,
  collapsible = false 
}: RelationsSectionProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable 
        onPress={() => collapsible && setIsCollapsed(!isCollapsed)}
        style={({ pressed }) => [
          styles.header,
          collapsible && pressed && { opacity: 0.7 }
        ]}
      >
        <View style={styles.titleContainer}>
          {icon}
          <Text style={styles.title}>{title}</Text>
          <View style={styles.badge}>
            <Text style={styles.count}>{count}</Text>
          </View>
        </View>
        {collapsible && (
          <MaterialIcons
            name={isCollapsed ? 'expand-more' : 'expand-less'}
            size={24}
            color={Colors.textSecondary}
          />
        )}
      </Pressable>
      {!isCollapsed && children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginLeft: 12,
  },
  badge: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  count: {
    color: Colors.background,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default RelationsSection; 