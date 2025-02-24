import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PersonalData = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Personal Data</Text>
      
      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Emergency Contact</Text>
        <Text style={styles.placeholder}>Add contact</Text>
      </View>

      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Healthcare Provider</Text>
        <Text style={styles.placeholder}>Provider details</Text>
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
  subsection: {
    marginBottom: 15,
  },
  subsectionTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  placeholder: {
    color: '#999',
  },
});

export default PersonalData; 