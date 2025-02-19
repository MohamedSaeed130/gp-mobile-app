import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LaptopConnection } from "../../../types/LaptopConnection";
import SavedLaptopCard from "./SavedLaptopCard";

interface SavedLaptopsSectionProps {
  laptops: LaptopConnection[];
  onConnect: (laptop: LaptopConnection) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
  connectingLaptopId: string | null;
}

const SavedLaptopsSection = ({
  laptops,
  onConnect,
  onDelete,
  isLoading,
  connectingLaptopId,
}: SavedLaptopsSectionProps) => {
  if (laptops.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Previously Connected</Text>
      <ScrollView style={styles.list}>
        {laptops.map((laptop) => (
          <SavedLaptopCard
            key={laptop.id}
            laptop={laptop}
            onConnect={onConnect}
            onDelete={onDelete}
            isLoading={isLoading}
            connectingLaptopId={connectingLaptopId}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  list: {
    paddingHorizontal: 15,
  },
});

export default SavedLaptopsSection;
