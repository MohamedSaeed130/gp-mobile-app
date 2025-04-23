import { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Text,
} from "react-native";
import Colors from "../../constants/Colors";
import { ProfileHeader } from "../../components/profile/ProfileHeader";
import { ProfileSection } from "../../components/profile/ProfileSection";
import { ProfileMenuItem } from "../../components/profile/ProfileMenuItem";
import { UserProfile } from "../../types/api/Users";
import * as usersAPI from "../../api/usersAPI";
import { useTokens } from "../../contexts/TokensContext";
import { useLocalSearchParams } from "expo-router";

export default function UserProfileScreen() {
  const { userId } = useLocalSearchParams();

  const { accessToken } = useTokens();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setError("No user ID provided.");
      setLoading(false);
      return;
    }
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await usersAPI.fetchUserProfile(
          Number(userId),
          accessToken
        );
        setProfile(data);
      } catch (e) {
        setError("Failed to fetch user profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId, usersAPI, accessToken]);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  if (error || !profile) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ color: Colors.error }}>
          {error || "Profile not found."}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <ProfileHeader
          fullName={`${profile.firstName} ${profile.lastName}`}
          role={profile.role}
          accountId={profile.id?.toString()}
          imageUri={profile.img}
          // No edit photo allowed
        />
        <ProfileSection title="Personal Information">
          <ProfileMenuItem
            icon="person"
            label="First Name"
            value={profile.firstName}
          />
          <ProfileMenuItem
            icon="person"
            label="Last Name"
            value={profile.lastName}
          />
          <ProfileMenuItem
            icon="phone"
            label="Phone Number"
            value={profile.phoneNumber}
          />
          {profile.role === "caregiver" && (
            <>
              <ProfileMenuItem
                icon="star"
                label="Title"
                value={profile.title}
              />
              <ProfileMenuItem
                icon="business"
                label="Organization"
                value={profile.organization}
              />
            </>
          )}
          {profile.role === "ward" && (
            <ProfileMenuItem
              icon="healing"
              label="Impairment"
              value={profile.impairment}
            />
          )}
        </ProfileSection>
        <ProfileSection title="Account Information">
          <ProfileMenuItem icon="email" label="Email" value={profile.email} />
        </ProfileSection>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surfaceLight,
  },
});
