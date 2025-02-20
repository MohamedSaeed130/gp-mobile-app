import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import ActivityCard from "./components/ActivityCard";

import Controls from "./components/Controls";
import Road from "./components/controls-icons/Road";
import Speedometer from "./components/controls-icons/Speedometer";
import ScreenHeader from "../../components/ScreenHeader";
import CurrentLaptopConnection from "../../components/CurrentLaptopConnection";
import { LaptopControlProvider } from "../../contexts/LaptopControlContext";

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
    <ScrollView style={styles.container}>
      <ScreenHeader
        title="Remote Control"
        subtitle="Control your wheelchair movement"
        icon="gamepad"
      />
      <CurrentLaptopConnection />
      {renderMovementStatus()}
      <FlatList
        columnWrapperStyle={[styles.center, { marginVertical: 10 }]}
        numColumns={2}
        data={activityCards}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: "5%" }}>
            <ActivityCard
              Icon={item.icon}
              value={item.value}
              unit={item.unit}
            />
            <Text>{item.label}</Text>
          </View>
        )}
      />
      <View style={styles.separator} />
      <Controls />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 10,
  },
  header: {
    paddingVertical: 10,
  },
  separator: {
    marginVertical: 10,
    margin: "auto",
    width: "88%",
    height: 1,
    backgroundColor: "grey",
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
    marginLeft: 8,
  },
  statusText: {
    fontWeight: "500",
  },
  movementStatus: {
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
  },
  movementText: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default RemoteController;
