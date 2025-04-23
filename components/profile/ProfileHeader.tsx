import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import * as Clipboard from "expo-clipboard";
import { MaterialIcons } from "@expo/vector-icons";
import Fontisto from "@expo/vector-icons/Fontisto";
import Colors from "../../constants/Colors";
import { useState } from "react";
import { UserRole } from "../../types/api/Users";
import capitalize from "../../utils/capitalize";

interface ProfileHeaderProps {
  fullName: string;
  role: UserRole;
  accountId: string;
  imageUri?: string;
  onEditPhoto?: () => void;
}

export const ProfileHeader = ({
  fullName,
  role,
  accountId,
  imageUri,
  onEditPhoto,
}: ProfileHeaderProps) => {
  const [showCopied, setShowCopied] = useState(false);

  const handleCopyId = async () => {
    await Clipboard.setStringAsync(accountId);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            <MaterialIcons name="person" size={40} color={Colors.textLight} />
          </View>
        )}
        {onEditPhoto && (
          <TouchableOpacity style={styles.editButton} onPress={onEditPhoto}>
            <MaterialIcons
              name="camera-alt"
              size={20}
              color={Colors.background}
            />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.name}>{fullName}</Text>
      <View style={styles.roleContainer}>
        <MaterialIcons
          name={role === "caregiver" ? "medical-services" : "accessibility"}
          size={16}
          color={Colors.textSecondary}
        />
        <Text style={styles.role}>{capitalize(role)}</Text>
      </View>
      <TouchableOpacity onPress={handleCopyId} style={styles.idContainer}>
        <Fontisto name="hashtag" size={16} color={Colors.textSecondary} />
        <Text style={styles.accountId}>{accountId}</Text>
        <MaterialIcons
          name={showCopied ? "check" : "content-copy"}
          size={16}
          color={showCopied ? Colors.success : Colors.textSecondary}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 16,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.surfaceLight,
  },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.surfaceLight,
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: Colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: Colors.background,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  roleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  role: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  idContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
    padding: 8,
    backgroundColor: Colors.surfaceMed,
    borderRadius: 8,
  },
  accountId: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontFamily: "monospace",
  },
});
