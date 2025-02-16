import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ConnectionStatusProps {
  isConnected: boolean;
  statusMessage: string;
}

const ConnectionStatus = ({ isConnected, statusMessage }: ConnectionStatusProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.indicator, { backgroundColor: isConnected ? '#34C759' : '#FF3B30' }]}>
        <MaterialIcons 
          name={isConnected ? 'check-circle' : 'error'} 
          size={24} 
          color="white" 
        />
      </View>
      <Text style={styles.status}>
        Status: <Text style={styles.message}>{statusMessage}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 15,
  },
  indicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  status: {
    fontSize: 16,
    color: '#666',
  },
  message: {
    fontWeight: '600',
    color: '#000',
  },
});

export default ConnectionStatus; 