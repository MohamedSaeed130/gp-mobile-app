import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Header from './components/Header';
import PersonalData from './components/PersonalData';
import HealthMetrics from './components/HealthMetrics';
import Notifications from './components/Notifications';

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Header 
        name="John Smith"
        model="SmartWheel 2023"
        imageSource={require('../../assets/adaptive-icon.png')}
      />
      <PersonalData />
      <HealthMetrics />
      <Notifications />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default ProfileScreen;
