import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Notifications = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Notifications</Text>
      <View style={styles.notification}>
        <Text>🔧 Maintenance due in 3 days.</Text>
      </View>
      <View style={styles.notification}>
        <Text>🔔 New software update available.</Text>
      </View>
      <View style={styles.notification}>
        <Text>📅 Scheduled checkup on 15th Nov.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: 'white',
    marginTop: 15,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  notification: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default Notifications; 