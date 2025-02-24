import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import ActivityCard from "../../components/remote-control/ActivityCard";

import Controls from "../../components/remote-control/Controls";
import Road from "../../components/remote-control/controls-icons/Road";
import Speedometer from "../../components/remote-control/controls-icons/Speedometer";
import ScreenHeader from "../../components/ScreenHeader";
import CurrentLaptopConnection from "../../components/CurrentLaptopConnection";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Colors from "../../constants/Colors";

const activityCardSize = 50;

const RemoteController = () => {
  const [currentMovement, setCurrentMovement] = useState<string>("");
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(0);

  const activityCards = [
    {
      icon: <Road width={activityCardSize} height={activityCardSize} />,
      value: distance,
      unit: "m",
      label: "Traveled Distance:",
    },
    {
      icon: <Speedometer width={activityCardSize} height={activityCardSize} />,
      value: speed,
      unit: "Km/hr",
      label: "Current Speed:",
    },
  ];

  const renderMovementStatus = () => (
    <View style={styles.movementStatus}>
      <Text style={styles.movementText}>{currentMovement || "Stationary"}</Text>
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <ScreenHeader
          title="Remote Control"
          subtitle="Control your wheelchair movement"
          icon={
            <MaterialCommunityIcons
              name="remote-tv"
              size={28}
              color={Colors.textSecondary}
            />
          }
        />
        <CurrentLaptopConnection />
        {renderMovementStatus()}
        <View
          style={[styles.center, { flexDirection: "row", marginVertical: 5 }]}
        >
          {activityCards.map((item, i) => (
            <View style={{ paddingHorizontal: "5%" }} key={i}>
              <ActivityCard
                Icon={item.icon}
                value={item.value}
                unit={item.unit}
              />
              <Text>{item.label}</Text>
            </View>
          ))}
        </View>
        <View style={styles.separator} />
        <Controls />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 10,
    backgroundColor: Colors.surfaceLight,
  },
  header: {
    paddingVertical: 10,
  },
  separator: {
    marginVertical: 10,
    margin: "auto",
    width: "88%",
    height: 1,
    backgroundColor: Colors.divider,
  },
  center: { justifyContent: "center", alignItems: "center" },
  connectionStatus: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  deviceText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginLeft: 8,
  },
  statusText: {
    fontWeight: "500",
    color: Colors.textSecondary,
  },
  movementStatus: {
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    backgroundColor: Colors.surfaceLight,
  },
  movementText: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.textPrimary,
  },
});

export default RemoteController;
