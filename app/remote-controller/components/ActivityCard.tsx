import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ActivityCardProps {
  Icon: React.ReactElement;
  value: number;
  unit: string;
}

const ActivityCard = ({ Icon, value, unit }: ActivityCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>{Icon}</View>
      <View style={styles.infoContainer}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 5,
  },
  iconContainer: {
    padding: 15,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(214 213 213)",
  },
  value: {
    fontSize: 44,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
  unit: {
    fontSize: 16,
  },
});

export default ActivityCard;
