import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Header from "../../components/profile/Header";
import PersonalData from "../../components/profile/PersonalData";
import HealthMetrics from "../../components/profile/HealthMetrics";
import Notifications from "../../components/profile/Notifications";

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Header
        name="John Smith"
        model="SmartWheel 2023"
        imageSource={require("../../assets/adaptive-icon.png")}
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
    backgroundColor: "#f5f5f5",
  },
});

export default ProfileScreen;
