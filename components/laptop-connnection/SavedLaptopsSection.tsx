import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LaptopConnection } from "../../types/LaptopConnection";
import SavedLaptopCard from "./SavedLaptopCard";
import Colors from "../../constants/Colors";

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
    borderRadius: 12,
    padding: 15,
    shadowColor: Colors.textPrimary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 15,
  },
  list: {
    paddingHorizontal: 0,
  },
});

export default SavedLaptopsSection;
