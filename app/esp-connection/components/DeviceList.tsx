import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import DeviceListItem from './DeviceListItem';
import { BluetoothDevice } from '../types';

interface DeviceListProps {
  devices: BluetoothDevice[];
  onDevicePress: (device: BluetoothDevice) => void;
}

const DeviceList = ({ devices, onDevicePress }: DeviceListProps) => {
  return (
    <FlatList
      data={devices}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <DeviceListItem
          device={item}
          onPress={() => onDevicePress(item)}
        />
      )}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
});

export default DeviceList; 