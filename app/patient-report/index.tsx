import React, { useState, useEffect, FC } from "react";
import { useLaptopControl } from "../../contexts/LaptopControlContext"; // Import the hook
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import ActivityChart from "../../components/patient-report/ActivityChart";
import RealTimeVitals from "../../components/patient-report/RealTimeVitals"; // Import the new component
import Colors from "../../constants/Colors";
import { fetchUserInfo } from "../../api/usersAPI";
import { useTokens } from "../../contexts/TokensContext";

// Define possible view modes
type ViewMode = "realtime" | "chart";

// --- MedicalReportScreen Component ---
const MedicalReportScreen: FC = () => {
  const { userId } = useLocalSearchParams();
  const { accessToken } = useTokens();

  const [patientName, setPatientName] = useState<string>("");
  const [viewMode, setViewMode] = useState<ViewMode>("realtime"); // State for view mode

  useEffect(() => {
    const fetchName = async () => {
      if (!userId || !accessToken) return;
      try {
        const info = await fetchUserInfo(Number(userId), accessToken);
        setPatientName(info.fullName || "");
      } catch (e) {
        setPatientName("");
      }
    };
    fetchName();
  }, [userId, accessToken]);

  // Start and stop real-time data streaming
  const { sendRealTime, stopRealTime } = useLaptopControl();
  useEffect(() => {
    sendRealTime();
    return () => {
      stopRealTime();
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <StatusBar barStyle="dark-content" backgroundColor="#F5F7FA" />
        <View style={styles.container}>
          <Text style={styles.header}>Patient Report</Text>

          <View style={styles.patientInfoCard}>
            <Text style={styles.patientNameLabel}>Patient Name:</Text>
            <Text style={styles.patientName}>{patientName}</Text>
          </View>

          {/* Tab/Header Navigation */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tabOption,
                viewMode === "realtime" && styles.tabOptionActive,
              ]}
              onPress={() => setViewMode("realtime")}
            >
              <MaterialCommunityIcons
                name="heart-pulse"
                size={22}
                color={viewMode === "realtime" ? Colors.primary : "#777"}
              />
              <Text
                style={[
                  styles.tabOptionText,
                  viewMode === "realtime" && styles.tabOptionTextActive,
                ]}
              >
                Real-Time
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabOption,
                viewMode === "chart" && styles.tabOptionActive,
              ]}
              onPress={() => setViewMode("chart")}
            >
              <MaterialCommunityIcons
                name="chart-line"
                size={22}
                color={viewMode === "chart" ? Colors.primary : "#777"}
              />
              <Text
                style={[
                  styles.tabOptionText,
                  viewMode === "chart" && styles.tabOptionTextActive,
                ]}
              >
                History
              </Text>
            </TouchableOpacity>
          </View>

          {/* Conditional Rendering based on viewMode */}
          {viewMode === "realtime" ? (
            <RealTimeVitals />
          ) : (
            <View style={styles.chartSection}>
              <ActivityChart userId={Number(userId)} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 25,
    textAlign: "center",
  },
  patientInfoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    alignItems: "center",
  },
  patientNameLabel: {
    fontSize: 16,
    color: "#777",
    marginBottom: 5,
  },
  patientName: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
  },
  // --- Tab/Header Navigation Styles ---
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  tabOption: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderBottomWidth: 3,
    borderColor: "transparent",
  },
  tabOptionActive: {
    borderColor: Colors.primary,
  },
  tabOptionText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
    color: "#777",
  },
  tabOptionTextActive: {
    color: Colors.primary,
  },
  // --- Chart Section (styles for the container of the ActivityChart) ---
  chartSection: {
    // This view simply acts as a container for the ActivityChart
    // If you need specific padding/margin around the chart, you can add it here.
  },
});

export default MedicalReportScreen;
