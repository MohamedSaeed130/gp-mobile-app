import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import Colors from "../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useTokens } from "../../contexts/TokensContext";
import { fetchUserVitalStats } from "../../api/usersAPI"; // Ensure this path is correct
import { VitalStatsResponse, VitalStat } from "../../types/api/VitalStats";

const screenWidth = Dimensions.get("window").width;
const CHART_CONTAINER_HORIZONTAL_PADDING = 16;
const CHART_CONTAINER_VERTICAL_PADDING = 14;

type Duration = "hour" | "day" | "week"; // Define Duration type

interface Dataset {
  data: number[];
  color: string;
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}

// --- Helper function to format dates for display (for dateRange) ---
const formatDateForRange = (date: Date, duration: Duration): string => {
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
    options.day = "2-digit";
    options.month = "short";
  }
  return date.toLocaleDateString(undefined, options);
};

// // --- Updated generateChartLabels function ---
// const generateChartLabels = (
//   data: VitalStat[],
//   duration: Duration
// ): string[] => {
//   if (!data || data.length === 0) return [];

//   const sortedData = [...data].sort(
//     (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
//   );

//   return sortedData.map((d) => {
//     const date = new Date(d.timestamp);
//     switch (duration) {
//       case "hour":
//         return date.toLocaleTimeString([], { minute: "2-digit" });
//       case "day":
//         return date.toLocaleTimeString([], { hour: "numeric", hour12: true });
//       case "week":
//         return date.toLocaleDateString(undefined, { weekday: "short" });
//       default:
//         return "";
//     }
//   });
// };

// --- Helper function to generate chart labels based on fetched data ---
const generateChartLabels = (
  data: VitalStat[],
  duration: Duration
): string[] => {
  if (!data || data.length === 0) return [];

  // Sort data by timestamp to ensure correct ordering for labels
  const sortedData = [...data].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  if (duration === "hour") {
    const labels: string[] = [];
    if (sortedData.length > 0) {
      const firstTime = new Date(sortedData[0].timestamp);
      const lastTime = new Date(sortedData[sortedData.length - 1].timestamp);
      // Generate labels every 10 minutes from the start of the data range, or a reasonable subset
      const interval = 10 * 60 * 1000; // 10 minutes
      for (
        let t = firstTime.getTime();
        t <= lastTime.getTime();
        t += interval
      ) {
        labels.push(new Date(t).toLocaleTimeString([], { minute: "2-digit" }));
      }
      // Ensure the last data point's time is included if it's not near an interval
      if (
        labels.length > 0 &&
        new Date(labels[labels.length - 1]).getTime() < lastTime.getTime()
      ) {
        labels.push(lastTime.toLocaleTimeString([], { minute: "2-digit" }));
      }
    }
    // Limit to a reasonable number of labels to avoid clutter
    if (labels.length > 7) {
      // Example limit
      const step = Math.ceil(labels.length / 7);
      return labels.filter((_, i) => i % step === 0);
    }
    return labels;
  } else if (duration === "day") {
    // For day, generate labels for relevant hours (e.g., every 4 hours)
    const labels: string[] = [];
    if (sortedData.length > 0) {
      const firstHour = new Date(sortedData[0].timestamp);
      firstHour.setMinutes(0, 0, 0); // Start at the beginning of the hour
      const lastHour = new Date(sortedData[sortedData.length - 1].timestamp);
      lastHour.setMinutes(0, 0, 0);

      for (
        let h = firstHour.getTime();
        h <= lastHour.getTime();
        h += 4 * 60 * 60 * 1000
      ) {
        // Every 4 hours
        labels.push(
          new Date(h).toLocaleTimeString([], { hour: "numeric", hour12: true })
        );
      }
      // Ensure the last data point's hour is included
      if (
        labels.length > 0 &&
        new Date(labels[labels.length - 1]).getHours() !== lastHour.getHours()
      ) {
        labels.push(
          lastHour.toLocaleTimeString([], { hour: "numeric", hour12: true })
        );
      }
    }
    return labels;
  } else if (duration === "week") {
    // Labels for "week" (last 7 days) typically show daily labels
    const uniqueLabels = new Set<string>();
    sortedData.forEach((d) => {
      const date = new Date(d.timestamp);
      uniqueLabels.add(
        date.toLocaleDateString(undefined, { weekday: "short" })
      );
    });
    return Array.from(uniqueLabels);
  }
  return [];
};

// --- Helper function to generate date range string based on fetched data ---
const generateDateRangeString = (
  data: VitalStat[],
  duration: Duration
): string => {
  if (!data || data.length === 0) return "";

  const sortedData = [...data].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  const firstTimestamp = new Date(sortedData[0].timestamp);
  const lastTimestamp = new Date(sortedData[sortedData.length - 1].timestamp);

  const formattedFrom = formatDateForRange(firstTimestamp, duration);
  const formattedTo = formatDateForRange(lastTimestamp, duration);

  return `${formattedFrom} - ${formattedTo}`;
};

// --- Helper function to round a date to the nearest interval based on duration ---
const roundDateToInterval = (date: Date, duration: Duration): Date => {
  const newDate = new Date(date);
  switch (duration) {
    case "hour":
      const minutes = newDate.getMinutes();
      newDate.setMinutes(Math.floor(minutes / 10) * 10);
      newDate.setSeconds(0, 0);
      break;
    case "day":
      newDate.setMinutes(0, 0, 0);
      break;
    case "week":
      newDate.setHours(0, 0, 0, 0);
      break;
    default:
      break;
  }
  return newDate;
};

// --- Helper function to process data by averaging within intervals ---
const processData = (data: VitalStat[], duration: Duration): VitalStat[] => {
  const groups = new Map<string, VitalStat[]>();

  for (const stat of data) {
    const roundedDate = roundDateToInterval(new Date(stat.timestamp), duration);
    const key = roundedDate.toISOString();

    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(stat);
  }

  const processed: VitalStat[] = [];

  groups.forEach((stats, key) => {
    if (stats.length === 0) return;

    const heartRateAvg =
      stats.reduce((sum, s) => sum + s.heartRate, 0) / stats.length;
    const bloodOxygenAvg =
      stats.reduce((sum, s) => sum + s.bloodOxygen, 0) / stats.length;
    const temperatureAvg =
      stats.reduce((sum, s) => sum + s.temperature, 0) / stats.length;

    processed.push({
      timestamp: new Date(key),
      heartRate: heartRateAvg,
      bloodOxygen: bloodOxygenAvg,
      temperature: temperatureAvg,
    });
  });

  processed.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  return processed;
};

const ActivityChart = ({ userId }: { userId: number }) => {
  const { accessToken } = useTokens();

  const [isLoading, setIsLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState<VitalStat[]>([]); // To store the extracted vitalStats array

  const title = "Vital Statistics";

  const staticDatasetsConfig: Omit<Dataset, "data">[] = [
    {
      color: Colors.error || "#F44336",
      label: "Heart Rate",
      icon: "favorite" as const,
    },
    {
      color: Colors.info || "#2196F3",
      label: "Blood Oxygen",
      icon: "water-drop" as const,
    },
    {
      color: Colors.warning || "#FFC107",
      label: "Temperature",
      icon: "device-thermostat" as const,
    },
  ];

  const [visibleDatasets, setVisibleDatasets] = useState<Set<number>>(
    new Set(staticDatasetsConfig.map((_, index) => index))
  );

  const [selectedDuration, setSelectedDuration] = useState<Duration>("day");
  const [dateRange, setDateRange] = useState<string>("");
  const [chartLabels, setChartLabels] = useState<string[]>([]);

  const chartWidth =
    screenWidth - 2 * 20 - 2 * CHART_CONTAINER_HORIZONTAL_PADDING;

  // --- Effect to fetch data when dependencies change ---
  useEffect(() => {
    const fetchData = async () => {
      if (!userId || !accessToken) {
        setFetchedData([]);
        setDateRange("");
        setChartLabels([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // --- IMPORTANT CHANGE HERE ---
        // Fetch the raw response object
        // Replace the existing data handling with:
        const apiResponse: VitalStatsResponse = await fetchUserVitalStats(
          userId,
          selectedDuration,
          accessToken
        );

        const vitalStatsArray = apiResponse?.vitalStats || [];
        const processedData = processData(vitalStatsArray, selectedDuration);

        setFetchedData(processedData);
        setChartLabels(generateChartLabels(processedData, selectedDuration));
        setDateRange(generateDateRangeString(processedData, selectedDuration));
      } catch (error) {
        console.error("Failed to fetch vital stats:", error);
        setFetchedData([]); // Ensure state is reset on error
        setChartLabels([]);
        setDateRange("Error loading data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId, accessToken, selectedDuration]); // Re-fetch when these change

  const toggleDataset = (index: number) => {
    const newVisible = new Set(visibleDatasets);
    if (newVisible.has(index)) {
      newVisible.delete(index);
    } else {
      newVisible.add(index);
    }
    setVisibleDatasets(newVisible);
  };

  const handleDurationSelect = (duration: Duration) => {
    setSelectedDuration(duration);
    // Labels and date range will be updated by the useEffect
  };

  // Prepare chart datasets from fetched data
  const chartDatasets: Dataset[] = staticDatasetsConfig.map((config) => {
    let dataForChart: number[] = [];

    // Map fetchedData (which is now the vitalStats array) to the respective vital sign data
    if (fetchedData.length > 0) {
      if (config.label === "Heart Rate") {
        dataForChart = fetchedData.map((d) => d.heartRate);
      } else if (config.label === "Blood Oxygen") {
        dataForChart = fetchedData.map((d) => d.bloodOxygen);
      } else if (config.label === "Temperature") {
        dataForChart = fetchedData.map((d) => d.temperature);
      }
    }

    return {
      ...config,
      data: dataForChart,
    };
  });

  const filteredChartDatasets = chartDatasets.filter((_, index) =>
    visibleDatasets.has(index)
  );

  const chartData = {
    labels: chartLabels,
    datasets: filteredChartDatasets.map((dataset) => ({
      data: dataset.data,
      color: (opacity = 1) => dataset.color,
      strokeWidth: 2,
    })),
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.durationMenu}>
          {["hour", "day", "week"].map((duration) => (
            <Pressable
              key={duration}
              style={[
                styles.durationOption,
                selectedDuration === duration && styles.durationOptionActive,
              ]}
              onPress={() => handleDurationSelect(duration as Duration)}
            >
              <Text
                style={[
                  styles.durationText,
                  selectedDuration === duration && styles.durationTextActive,
                ]}
              >
                {duration.charAt(0).toUpperCase() + duration.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {dateRange ? <Text style={styles.dateRangeText}>{dateRange}</Text> : null}

      <View style={styles.legendContainer}>
        {staticDatasetsConfig.map((dataset, index) => (
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

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading vital stats...</Text>
        </View>
      ) : filteredChartDatasets.length > 0 && chartLabels.length > 0 ? (
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
            propsForLabels: {
              fontSize: 10,
            },
          }}
          bezier
          style={styles.chart}
        />
      ) : (
        <View style={styles.emptyChartContainer}>
          <Text style={styles.emptyChartText}>
            {visibleDatasets.size == 0
              ? "No dataset selected."
              : "No vital data available for this period."}
          </Text>
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
  loadingContainer: {
    height: 220,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.textSecondary || "#777",
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
