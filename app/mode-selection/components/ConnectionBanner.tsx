import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ConnectionBannerProps {
  isConnected: boolean;
}

const ConnectionBanner = ({ isConnected }: ConnectionBannerProps) => {
  if (isConnected) return null;

  return (
    <View style={styles.container}>
      <MaterialIcons name="warning" size={24} color="#FF9500" />
      <Text style={styles.text}>
        Please connect to a laptop before selecting a control mode
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  text: {
    flex: 1,
    marginLeft: 10,
    color: '#996000',
    fontSize: 14,
  },
});

export default ConnectionBanner; 