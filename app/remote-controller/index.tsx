import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ActivityCard from "./components/ActivityCard";

import Controls from "./components/Controls";
import Road from "./components/controls-icons/Road";
import Speedometer from "./components/controls-icons/Speedometer";
import Chip from "./components/controls-icons/Chip";

const activityCardSize = 50;
const chipSize = 30;

const RemoteController = () => {
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(0);

  const activityCards = [
    {
      icon: <Road width={activityCardSize} height={activityCardSize} />,
      value: 30,
      unit: "m",
      label: "Traveled Distance:",
    },
    {
      icon: <Speedometer width={activityCardSize} height={activityCardSize} />,
      value: 63,
      unit: "Km/hr",
      label: "Current Speed:",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>🎮 ESP32 Remote Controller</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Chip width={chipSize} height={chipSize} />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>ESP32: </Text>
        <Text style={{ color: "green" }}>Connected *</Text>
      </View>
      <View
        style={{
          marginVertical: 10,
          padding: 10,
          borderWidth: 1,
          borderColor: "grey",
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 32, fontWeight: "bold" }}>
          Moving Forward
        </Text>
      </View>
      <FlatList
        columnWrapperStyle={[styles.center, { marginVertical: 10 }]}
        numColumns={2}
        data={activityCards}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 10 }}>
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
    </View>
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
});

export default RemoteController;
