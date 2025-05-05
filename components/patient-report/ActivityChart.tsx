import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import Colors from "../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

interface Dataset {
  data: number[];
  color: string;
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}

interface ActivityChartProps {
  title: string;
  labels: string[];
  datasets: Dataset[];
}

const ActivityChart = ({ title, labels, datasets }: ActivityChartProps) => {
  const [visibleDatasets, setVisibleDatasets] = useState<Set<number>>(
    new Set(datasets.map((_, index) => index))
  );

  const toggleDataset = (index: number) => {
    const newVisible = new Set(visibleDatasets);
    if (newVisible.has(index)) {
      newVisible.delete(index);
    } else {
      newVisible.add(index);
    }
    setVisibleDatasets(newVisible);
  };

  const filteredDatasets = datasets.filter((_, index) => visibleDatasets.has(index));

  const chartData = {
    labels,
    datasets: filteredDatasets.map((dataset) => ({
      data: dataset.data,
      color: (opacity = 1) => dataset.color,
      strokeWidth: 2,
    })),
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.legendContainer}>
        {datasets.map((dataset, index) => (
          <Pressable
            key={dataset.label}
            style={({ pressed }) => [
              styles.legendItem,
              !visibleDatasets.has(index) && styles.legendItemInactive,
              pressed && { opacity: 0.7 },
            ]}
            onPress={() => toggleDataset(index)}
          >
            <MaterialIcons
              name={dataset.icon}
              size={16}
              color={
                visibleDatasets.has(index)
                  ? dataset.color
                  : Colors.textSecondary
              }
            />
            <View
              style={[
                styles.legendLine,
                { backgroundColor: dataset.color },
                !visibleDatasets.has(index) && styles.legendLineInactive,
              ]}
            />
            <Text
              style={[
                styles.legendText,
                !visibleDatasets.has(index) && styles.legendTextInactive,
              ]}
            >
              {dataset.label}
            </Text>
          </Pressable>
        ))}
      </View>
      {filteredDatasets.length > 0 ? (
        <LineChart
          data={chartData}
          width={Dimensions.get("window").width - 32}
          height={220}
          chartConfig={{
            backgroundColor: Colors.background,
            backgroundGradientFrom: Colors.background,
            backgroundGradientTo: Colors.background,
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: () => Colors.textSecondary,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "4",
              strokeWidth: "2",
            },
          }}
          bezier
          style={styles.chart}
        />
      ) : (
        <View style={styles.emptyChartContainer}>
          <Text style={styles.emptyChartText}>No data selected.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  legendItemInactive: {
    opacity: 0.5,
  },
  legendLine: {
    width: 12,
    height: 2,
    borderRadius: 1,
  },
  legendLineInactive: {
    backgroundColor: Colors.textSecondary,
  },
  legendText: {
    fontSize: 12,
    color: Colors.textPrimary,
  },
  legendTextInactive: {
    color: Colors.textSecondary,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  emptyChartContainer: {
    height: 220,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyChartText: {
    color: Colors.textSecondary,
    fontSize: 16,
  },
});

export default ActivityChart;