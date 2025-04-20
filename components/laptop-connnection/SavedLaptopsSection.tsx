import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LaptopConnection } from "../../types/ui/LaptopConnection";
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
    marginBottom: 20,
    padding: 15,
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
