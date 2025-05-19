import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Colors from "../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

const CHART_CONTAINER_HORIZONTAL_PADDING = 16;
const CHART_CONTAINER_VERTICAL_PADDING = 14;

interface Dataset {
  data: number[];
  color: string;
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}

// --- Helper function to format dates for display (for dateRange) ---
const formatDateForRange = (
  date: Date,
  duration: "hour" | "day" | "week"
): string => {
  const options: Intl.DateTimeFormatOptions = {};
  if (duration === "hour") {
    options.hour = "2-digit";
    options.minute = "2-digit";
    options.day = "2-digit";
    options.month = "short";
  } else if (duration === "day") {
    options.weekday = "short";
    options.day = "2-digit";
    options.month = "short";
  } else {
    // week
    options.day = "2-digit";
    options.month = "short";
  }
  return date.toLocaleDateString(undefined, options);
};

// --- Helper function to generate chart labels ---
const generateChartLabels = (duration: "hour" | "day" | "week"): string[] => {
  const now = new Date();
  const newLabels: string[] = [];

  if (duration === "hour") {
    for (let i = 0; i <= 60; i += 10) {
      const d = new Date(now.getTime() - (60 - i) * 60 * 1000);
      newLabels.push(d.toLocaleTimeString([], { minute: "2-digit" }));
    }
  } else if (duration === "day") {
    for (let i = 0; i <= 24; i += 4) {
      const d = new Date();
      d.setHours(now.getHours() - (24 - i));
      newLabels.push(
        d.toLocaleTimeString([], { hour: "numeric", hour12: true })
      );
    }
  } else if (duration === "week") {
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      newLabels.push(d.toLocaleDateString(undefined, { weekday: "short" }));
    }
  }
  return newLabels;
};

// --- Helper function to generate date range string ---
const generateDateRangeString = (duration: "hour" | "day" | "week"): string => {
  const now = new Date();
  let fromDate: Date;
  let toDate: Date = now;

  if (duration === "hour") {
    fromDate = new Date(now.getTime() - 60 * 60 * 1000);
    return `${fromDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })} - ${toDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  } else if (duration === "day") {
    fromDate = new Date(now);
    fromDate.setDate(now.getDate() - 1);
    return `${formatDateForRange(fromDate, "day")} - ${formatDateForRange(
      toDate,
      "day"
    )}`;
  } else if (duration === "week") {
    fromDate = new Date(now);
    fromDate.setDate(now.getDate() - 6);
    return `${formatDateForRange(fromDate, "week")} - ${formatDateForRange(
      toDate,
      "week"
    )}`;
  }
  return ""; // Should not happen
};

const ActivityChart = () => {
  // Define fixed chart title
  const title = "Vital Statistics";

  // Define fixed datasets
  const staticDatasets: Dataset[] = [
    {
      data: [72, 75, 82, 78, 71, 73, 76],
      color: Colors.error || "#F44336", // Fallback color
      label: "Heart Rate",
      icon: "favorite" as const,
    },
    {
      data: [98, 97, 99, 96, 98, 97, 98],
      color: Colors.info || "#2196F3", // Fallback color
      label: "Blood Oxygen",
      icon: "water-drop" as const,
    },
    {
      data: [36.6, 36.8, 36.7, 36.9, 36.7, 36.6, 36.8],
      color: Colors.warning || "#FFC107", // Fallback color
      label: "Temperature",
      icon: "device-thermostat" as const,
    },
  ];

  const [visibleDatasets, setVisibleDatasets] = useState<Set<number>>(
    new Set(staticDatasets.map((_, index) => index))
  );

  const [selectedDuration, setSelectedDuration] = useState<
    "hour" | "day" | "week"
  >("day");
  const [dateRange, setDateRange] = useState<string>(() =>
    generateDateRangeString("day")
  );
  const [chartLabels, setChartLabels] = useState<string[]>(() =>
    generateChartLabels("day")
  );

  const chartWidth =
    screenWidth - 2 * 20 - 2 * CHART_CONTAINER_HORIZONTAL_PADDING;

  useEffect(() => {
    setDateRange(generateDateRangeString(selectedDuration));
    setChartLabels(generateChartLabels(selectedDuration));
  }, [selectedDuration]);

  const toggleDataset = (index: number) => {
    const newVisible = new Set(visibleDatasets);
    if (newVisible.has(index)) {
      newVisible.delete(index);
    } else {
      newVisible.add(index);
    }
    setVisibleDatasets(newVisible);
  };

  const handleDurationSelect = (duration: "hour" | "day" | "week") => {
    setSelectedDuration(duration);
    console.log(`Duration selected: ${duration}`);
  };

  // Filter based on the staticDatasets
  const filteredDatasets = staticDatasets.filter((_, index) =>
    visibleDatasets.has(index)
  );

  const chartData = {
    labels: chartLabels,
    datasets: filteredDatasets.map((dataset) => ({
      // IMPORTANT: In a real app, this `data` array should be fetched/filtered
      // based on `selectedDuration` to align with the generated labels.
      // For this example, we're still using the static data.
      data: dataset.data,
      color: (opacity = 1) => dataset.color,
      strokeWidth: 2,
    })),
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
        {/* Use the internally defined title */}
        {/* Duration Menu */}
        <View style={styles.durationMenu}>
          <Pressable
            style={[
              styles.durationOption,
              selectedDuration === "hour" && styles.durationOptionActive,
            ]}
            onPress={() => handleDurationSelect("hour")}
          >
            <Text
              style={[
                styles.durationText,
                selectedDuration === "hour" && styles.durationTextActive,
              ]}
            >
              Hour
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.durationOption,
              selectedDuration === "day" && styles.durationOptionActive,
            ]}
            onPress={() => handleDurationSelect("day")}
          >
            <Text
              style={[
                styles.durationText,
                selectedDuration === "day" && styles.durationTextActive,
              ]}
            >
              Day
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.durationOption,
              selectedDuration === "week" && styles.durationOptionActive,
            ]}
            onPress={() => handleDurationSelect("week")}
          >
            <Text
              style={[
                styles.durationText,
                selectedDuration === "week" && styles.durationTextActive,
              ]}
            >
              Week
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Display From-To Date Range */}
      {dateRange ? <Text style={styles.dateRangeText}>{dateRange}</Text> : null}

      <View style={styles.legendContainer}>
        {/* Iterate over the staticDatasets */}
        {staticDatasets.map((dataset, index) => (
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
                  : Colors.textSecondary || "#AAA"
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
          width={chartWidth}
          height={220}
          chartConfig={{
            backgroundColor: Colors.background || "#FFFFFF",
            backgroundGradientFrom: Colors.background || "#FFFFFF",
            backgroundGradientTo: Colors.background || "#FFFFFF",
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: () => Colors.textSecondary || "#777",
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
    backgroundColor: Colors.background || "#FFFFFF",
    paddingHorizontal: CHART_CONTAINER_HORIZONTAL_PADDING,
    paddingVertical: CHART_CONTAINER_VERTICAL_PADDING,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.textPrimary || "#333",
  },
  durationMenu: {
    flexDirection: "row",
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    overflow: "hidden",
  },
  durationOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  durationOptionActive: {
    backgroundColor: Colors.primary || "#4CAF50",
  },
  durationText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#555",
  },
  durationTextActive: {
    color: "#FFFFFF",
  },
  dateRangeText: {
    fontSize: 14,
    color: Colors.textSecondary || "#777",
    textAlign: "right",
    marginBottom: 16,
    fontWeight: "500",
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
    backgroundColor: Colors.textSecondary || "#AAA",
  },
  legendText: {
    fontSize: 12,
    color: Colors.textPrimary || "#333",
  },
  legendTextInactive: {
    color: Colors.textSecondary || "#AAA",
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
    color: Colors.textSecondary || "#777",
    fontSize: 16,
  },
});

export default ActivityChart;
