import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import BluetoothScanScreen from './components/BluetoothScanScreen';

const ESPConnectionScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <BluetoothScanScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ESPConnectionScreen;
