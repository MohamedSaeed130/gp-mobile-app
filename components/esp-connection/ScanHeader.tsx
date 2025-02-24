import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ScanHeaderProps {
  isScanning: boolean;
  onScanPress: () => void;
}

const ScanHeader = ({ isScanning, onScanPress }: ScanHeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Devices</Text>
      <TouchableOpacity 
        style={[styles.button, isScanning && styles.buttonScanning]} 
        onPress={onScanPress}
      >
        <Text style={styles.buttonText}>
          {isScanning ? 'Stop Scan' : 'Start Scan'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonScanning: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ScanHeader; 