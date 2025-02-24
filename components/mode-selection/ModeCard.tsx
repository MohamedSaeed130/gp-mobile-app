import React, { ReactElement } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { useLaptopConnection } from "../../contexts/LaptopConnectionContext";

export interface ModeCardProps {
  title: string;
  description: string;
  icon: ReactElement;
  isSelected: boolean;
  onSelect: () => void;
}

const ModeCard = ({
  title,
  description,
  icon,
  isSelected,
  onSelect,
}: ModeCardProps) => {
  const { isConnected } = useLaptopConnection();
  const isDisabled = !isConnected;

  return (
    <Pressable
      style={[
        styles.container,
        isSelected && styles.selected,
        isDisabled && styles.disabled,
      ]}
      onPress={onSelect}
      disabled={isDisabled}
    >
      <View style={[styles.iconContainer, isSelected && styles.selectedIcon]}>
        {icon}
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, isDisabled && styles.disabledText]}>
          {title}
        </Text>
        <Text style={[styles.description, isDisabled && styles.disabledText]}>
          {description}
        </Text>
      </View>
      {isSelected && (
        <MaterialCommunityIcons
          name="check-circle"
          size={24}
          color={Colors.primary}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: Colors.componentBg,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.textPrimary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selected: {
    borderColor: Colors.primary,
    backgroundColor: `${Colors.primary}10`, // 10% opacity version of primary color
  },
  disabled: {
    opacity: 0.5,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.surfaceLight,
    marginRight: 15,
  },
  selectedIcon: {
    backgroundColor: Colors.primary,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  disabledText: {
    color: Colors.textLight,
  },
});

export default ModeCard;
