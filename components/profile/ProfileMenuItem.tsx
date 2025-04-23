import { Text, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

interface ProfileMenuItemProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  value?: string;
  onPress?: () => void;
}

export const ProfileMenuItem = ({
  icon,
  label,
  value,
}: ProfileMenuItemProps) => {
  return (
    <View style={styles.container}>
      <MaterialIcons
        name={icon}
        size={24}
        color={Colors.textSecondary}
        style={styles.icon}
      />
      <View style={styles.textColumn}>
        <Text style={styles.label}>{label}</Text>
        {value && <Text style={styles.value}>{value}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 12,
  },
  icon: {
    marginTop: 2,
  },
  textColumn: {
    flex: 1,
    flexDirection: "column",
  },
  label: {
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 2,
    fontWeight: "500",
  },
  value: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
});
