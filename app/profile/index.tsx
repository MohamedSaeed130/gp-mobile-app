import {
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import { useState, useEffect } from "react";
import Colors from "../../constants/Colors";
import { ProfileHeader } from "../../components/profile/ProfileHeader";
import { ProfileSection } from "../../components/profile/ProfileSection";
import { ProfileMenuItem } from "../../components/profile/ProfileMenuItem";
import { EditProfileModal } from "../../components/profile/EditProfileModal";
import { UserProfile, UserProfileChange } from "../../types/api/Users";
import * as meAPI from "../../api/meAPI";
import { useTokens } from "../../contexts/TokensContext";
import { useUserInfo } from "../../contexts/UserInfoContext";

export default function ProfileScreen() {
  const { setUserInfo } = useUserInfo();
  const { accessToken } = useTokens();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editVisible, setEditVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const profile = await meAPI.fetchMyProfile(accessToken);
        setUserProfile(profile);
      } catch (e: any) {
        setError("Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [meAPI, accessToken]);

  // Save changes
  const handleSaveChanges = async (changes: UserProfileChange) => {
    if (!Object.keys(changes).length) {
      setEditVisible(false);
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await meAPI.changeProfile(changes, accessToken);
      // refetch profile
      const profile = await meAPI.fetchMyProfile(accessToken);
      setUserProfile(profile);
      // Update UserInfoContext with new user info
      setUserInfo({
        id: profile.id,
        role: profile.role,
        title: profile.title,
        fullName: `${profile.firstName} ${profile.lastName}`,
        img: profile.img,
      });
      setEditVisible(false);
    } catch (e: any) {
      setError("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !userProfile) {
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

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <ProfileHeader
          fullName={`${userProfile.firstName} ${userProfile.lastName}`}
          role={userProfile.role}
          accountId={userProfile.id?.toString()}
          imageUri={userProfile.img}
          onEditPhoto={() => {}}
        />

        <ProfileSection title="Personal Information">
          <ProfileMenuItem
            icon="person"
            label="First Name"
            value={userProfile.firstName}
          />
          <ProfileMenuItem
            icon="person"
            label="Last Name"
            value={userProfile.lastName}
          />
          <ProfileMenuItem
            icon="phone"
            label="Phone Number"
            value={userProfile.phoneNumber}
          />
          {userProfile.role === "caregiver" && (
            <>
              <ProfileMenuItem
                icon="star"
                label="Title"
                value={userProfile.title}
              />
              <ProfileMenuItem
                icon="business"
                label="Organization"
                value={userProfile.organization}
              />
            </>
          )}
          {userProfile.role === "ward" && (
            <ProfileMenuItem
              icon="healing"
              label="Impairment"
              value={userProfile.impairment}
            />
          )}
          {/* Edit Profile button at bottom-left under Personal Information section */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginRight: 20,
              marginTop: 8,
            }}
          >
            <Text
              style={{
                backgroundColor: Colors.primary,
                color: Colors.background,
                paddingHorizontal: 24,
                paddingVertical: 10,
                borderRadius: 8,
                fontWeight: "bold",
                fontSize: 16,
                overflow: "hidden",
              }}
              onPress={() => setEditVisible(true)}
            >
              Edit Profile
            </Text>
          </View>
        </ProfileSection>
        <ProfileSection title="Account Information">
          <ProfileMenuItem
            icon="email"
            label="Email"
            value={userProfile.email}
          />
        </ProfileSection>
        {error && (
          <Text
            style={{
              color: Colors.error,
              textAlign: "center",
              marginVertical: 8,
            }}
          >
            {error}
          </Text>
        )}
      </ScrollView>
      <EditProfileModal
        visible={editVisible}
        profile={userProfile}
        onSave={handleSaveChanges}
        onClose={() => setEditVisible(false)}
      />
      {saving && (
        <View style={styles.savingOverlay}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surfaceLight,
  },
  savingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.15)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});
