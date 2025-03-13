import { ScrollView, StyleSheet } from "react-native";
import { useState } from "react";
import Colors from "../../constants/Colors";
import { ProfileHeader } from "../../components/profile/ProfileHeader";
import { ProfileSection } from "../../components/profile/ProfileSection";
import { ProfileMenuItem } from "../../components/profile/ProfileMenuItem";

export default function ProfileScreen() {
  const [userProfile, setUserProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    organization: "Healthcare Center",
    phoneNumber: "+1 234 567 8900",
    role: "Caregiver" as const,
    imageUri: undefined,
    accountId: "CG-2024-1234",
  });

  const handleEditPhoto = () => {
    // TODO: Implement photo editing logic
    console.log("Edit photo pressed");
  };

  const handleEditPersonalInfo = () => {
    // TODO: Implement edit personal info navigation
    console.log("Edit personal info pressed");
  };

  const handleEditOrganization = () => {
    // TODO: Implement organization edit logic
    console.log("Edit organization pressed");
  };

  const handleEditPhoneNumber = () => {
    // TODO: Implement phone number edit logic
    console.log("Edit phone number pressed");
  };

  const handleChangeEmail = () => {
    // TODO: Implement email change logic
    console.log("Change email pressed");
  };

  const handleChangePassword = () => {
    // TODO: Implement password change logic
    console.log("Change password pressed");
  };

  return (
    <ScrollView style={styles.container}>
      <ProfileHeader
        fullName={`${userProfile.firstName} ${userProfile.lastName}`}
        role={userProfile.role}
        accountId={userProfile.accountId}
        imageUri={userProfile.imageUri}
        onEditPhoto={handleEditPhoto}
      />

      <ProfileSection title="Personal Information">
        <ProfileMenuItem
          icon="person"
          label="Name"
          value={`${userProfile.firstName} ${userProfile.lastName}`}
          onPress={handleEditPersonalInfo}
        />
        <ProfileMenuItem
          icon="business"
          label="Organization"
          value={userProfile.organization}
          onPress={handleEditOrganization}
        />
        <ProfileMenuItem
          icon="phone"
          label="Phone Number"
          value={userProfile.phoneNumber}
          onPress={handleEditPhoneNumber}
        />
      </ProfileSection>

      <ProfileSection title="Account Information">
        <ProfileMenuItem
          icon="email"
          label="Email"
          value={userProfile.email}
          onPress={handleChangeEmail}
        />
        <ProfileMenuItem
          icon="lock"
          label="Password"
          value="••••••••"
          onPress={handleChangePassword}
        />
      </ProfileSection>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surfaceLight,
  },
});
