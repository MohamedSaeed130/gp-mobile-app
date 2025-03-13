import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

export type TabType = 'associated' | 'incoming' | 'outgoing';

interface RelationsTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  counts: {
    associated: number;
    incoming: number;
    outgoing: number;
  };
}

const RelationsTabs = ({ activeTab, onTabChange, counts }: RelationsTabsProps) => {
  const tabs: { id: TabType; icon: keyof typeof MaterialIcons.glyphMap }[] = [
    { id: 'associated', icon: 'people-alt' },
    { id: 'incoming', icon: 'call-received' },
    { id: 'outgoing', icon: 'call-made' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map(tab => (
        <Pressable
          key={tab.id}
          style={({ pressed }) => [
            styles.tab,
            activeTab === tab.id && styles.activeTab,
            pressed && { opacity: 0.7 }
          ]}
          onPress={() => onTabChange(tab.id)}
        >
          <MaterialIcons
            name={tab.icon}
            size={24}
            color={activeTab === tab.id ? Colors.primary : Colors.textSecondary}
          />
          {counts[tab.id] > 0 && (
            <View style={[
              styles.badge,
              { backgroundColor: activeTab === tab.id ? Colors.primary : Colors.textSecondary }
            ]}>
              <Text style={styles.badgeText}>{counts[tab.id]}</Text>
            </View>
          )}
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    position: 'relative',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: '30%',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: Colors.background,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default RelationsTabs; 