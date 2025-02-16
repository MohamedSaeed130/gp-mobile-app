import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ConnectionStatus from './components/ConnectionStatus';
import ConnectionForm from './components/ConnectionForm';
import { useWebSocket } from './hooks/useWebSocket';

export default function LaptopConnectionScreen() {
  const { 
    connect, 
    disconnect, 
    isConnected, 
    isLoading, 
    statusMessage 
  } = useWebSocket();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Laptop Connection</Text>
        <Text style={styles.headerSubtitle}>
          Connect to your laptop to enable remote control
        </Text>
      </View>

      <View style={styles.content}>
        <ConnectionStatus 
          isConnected={isConnected} 
          statusMessage={statusMessage} 
        />

        <ConnectionForm 
          onConnect={connect}
          isLoading={isLoading}
        />

        {isConnected && (
          <Pressable 
            style={styles.disconnectButton}
            onPress={disconnect}
          >
            <MaterialIcons name="link-off" size={24} color="white" />
            <Text style={styles.disconnectText}>Disconnect</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.footer}>
        <MaterialIcons name="info" size={20} color="#666" />
        <Text style={styles.footerText}>
          Make sure your laptop is running the required server application
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#000',
  },
  headerSubtitle: {
    fontSize: 17,
    color: '#666',
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  disconnectButton: {
    backgroundColor: '#FF3B30',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },
  disconnectText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
});
