import React, { useState, useEffect, FC } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  Easing,
  interpolateColor,
} from "react-native-reanimated";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons"; // Assuming you have @expo/vector-icons installed
import { useLocalSearchParams } from "expo-router";
import ActivityChart from "../../components/patient-report/ActivityChart";
import Colors from "../../constants/Colors";
import { fetchUserInfo } from "../../api/usersAPI";
import { useTokens } from "../../contexts/TokensContext";

const { width } = Dimensions.get("window");

// --- Interfaces for Type Safety ---
interface PatientData {
  heartRate: number;
  bloodOxygen: number;
}

// --- Helper function to simulate real-time data ---
const generateRandomData = (): PatientData => ({
  heartRate: Math.floor(Math.random() * (100 - 60 + 1)) + 60, // 60-100 bpm
  bloodOxygen: Math.floor(Math.random() * (100 - 95 + 1)) + 95, // 95-100% SpO2
});

// --- MedicalReportScreen Component ---
const MedicalReportScreen: FC = () => {
  const { userId } = useLocalSearchParams();
  const { accessToken } = useTokens();

  const [patientName, setPatientName] = useState<string>("");
  const [heartRate, setHeartRate] = useState<number>(80);
  const [bloodOxygen, setBloodOxygen] = useState<number>(98);

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

  // Reanimated shared values for animations
  const hrPulse = useSharedValue<number>(1);
  const spo2Pulse = useSharedValue<number>(1);
  const hrColor = useSharedValue<number>(0); // 0 for normal, 1 for warning, 2 for critical
  const spo2Color = useSharedValue<number>(0); // 0 for normal, 1 for warning, 2 for critical

  // fake chart data
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [72, 75, 82, 78, 71, 73, 76, 88],
        color: Colors.error,
        label: "Heart Rate",
        icon: "favorite" as const,
      },
      {
        data: [98, 97, 99, 96, 98, 97, 98],
        color: Colors.info,
        label: "Blood Oxygen",
        icon: "water-drop" as const,
      },
      {
        data: [36.6, 36.8, 36.7, 36.9, 36.7, 36.6, 36.8],
        color: Colors.warning,
        label: "Temperature",
        icon: "device-thermostat" as const,
      },
    ],
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newData: PatientData = generateRandomData();
      setHeartRate(newData.heartRate);
      setBloodOxygen(newData.bloodOxygen);
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  // Animate heart rate value change and update color
  useEffect(() => {
    hrPulse.value = withSequence(
      withTiming(1.1, { duration: 200, easing: Easing.ease }),
      withTiming(1, { duration: 200, easing: Easing.ease })
    );

    let newHrColorValue: number = 0; // Normal
    if (heartRate > 90) newHrColorValue = 1; // Warning
    if (heartRate > 100) newHrColorValue = 2; // Critical
    hrColor.value = withTiming(newHrColorValue, { duration: 500 });
  }, [heartRate]);

  // Animate blood oxygen value change and update color
  useEffect(() => {
    spo2Pulse.value = withSequence(
      withTiming(1.1, { duration: 200, easing: Easing.ease }),
      withTiming(1, { duration: 200, easing: Easing.ease })
    );

    let newSpo2ColorValue: number = 0; // Normal
    if (bloodOxygen < 97) newSpo2ColorValue = 1; // Warning
    if (bloodOxygen < 95) newSpo2ColorValue = 2; // Critical
    spo2Color.value = withTiming(newSpo2ColorValue, { duration: 500 });
  }, [bloodOxygen]);

  // Animated style for heart rate number and icon
  const animatedHrStyle = useAnimatedStyle(() => {
    // Interpolate color based on hrColor value
    const textColor = interpolateColor(
      hrColor.value,
      [0, 1, 2],
      ["#4CAF50", "#FFC107", "#F44336"] // Green, Yellow, Red
    );
    return {
      transform: [{ scale: hrPulse.value }],
      color: textColor,
    };
  });

  // Animated style for blood oxygen number and icon
  const animatedSpo2Style = useAnimatedStyle(() => {
    // Interpolate color based on spo2Color value
    const textColor = interpolateColor(
      spo2Color.value,
      [0, 1, 2],
      ["#2196F3", "#FFC107", "#F44336"] // Blue, Yellow, Red
    );
    return {
      transform: [{ scale: spo2Pulse.value }],
      color: textColor,
    };
  });

  // Animated style for the vital signs container background for Heart Rate
  const animatedHrContainerStyle = useAnimatedStyle(() => {
    const interpolatedBgColor = interpolateColor(
      hrColor.value,
      [0, 1, 2],
      ["#E8F5E9", "#FFFDE7", "#FFEBEE"] // Lighter shades of Green, Yellow, Red
    );
    return {
      backgroundColor: interpolatedBgColor,
    };
  });

  // Animated style for the vital signs container background for Blood Oxygen
  const animatedSpo2ContainerStyle = useAnimatedStyle(() => {
    const interpolatedBgColor = interpolateColor(
      spo2Color.value,
      [0, 1, 2],
      ["#E3F2FD", "#FFFDE7", "#FFEBEE"] // Lighter shades of Blue, Yellow, Red
    );
    return {
      backgroundColor: interpolatedBgColor,
    };
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <StatusBar barStyle="dark-content" backgroundColor="#F5F7FA" />
        <View style={styles.container}>
          <Text style={styles.header}>Patient Report</Text>

          <View style={styles.patientInfoCard}>
            <Text style={styles.patientNameLabel}>Patient Name:</Text>
            <Text style={styles.patientName}>{patientName}</Text>
          </View>

          <View style={styles.vitalsSection}>
            <Animated.View style={[styles.vitalCard, animatedHrContainerStyle]}>
              <View style={styles.vitalHeader}>
                <Animated.Text style={[styles.vitalIcon, animatedHrStyle]}>
                  <FontAwesome5 name="heartbeat" size={24} />
                </Animated.Text>
                <Text style={styles.vitalLabel}>Heart Rate</Text>
              </View>
              <Animated.Text style={[styles.vitalValue, animatedHrStyle]}>
                {heartRate} <Text style={styles.vitalUnit}>bpm</Text>
              </Animated.Text>
              <Text style={styles.statusText}>
                {heartRate > 90 ? "High" : heartRate < 60 ? "Low" : "Normal"}
              </Text>
            </Animated.View>

            <Animated.View
              style={[styles.vitalCard, animatedSpo2ContainerStyle]}
            >
              <View style={styles.vitalHeader}>
                <Animated.Text style={[styles.vitalIcon, animatedSpo2Style]}>
                  <MaterialCommunityIcons name="blood-bag" size={24} />
                </Animated.Text>
                <Text style={styles.vitalLabel}>Blood Oxygen</Text>
              </View>
              <Animated.Text style={[styles.vitalValue, animatedSpo2Style]}>
                {bloodOxygen} <Text style={styles.vitalUnit}>%</Text>
              </Animated.Text>
              <Text style={styles.statusText}>
                {bloodOxygen < 95
                  ? "Low"
                  : bloodOxygen < 97
                  ? "Mildly Low"
                  : "Normal"}
              </Text>
            </Animated.View>
          </View>

          <View style={styles.activityBarView}>
            <ActivityChart
              title="Vital Statistics"
              labels={chartData.labels}
              datasets={chartData.datasets}
            />
          </View>

          {/* You could add more sections here, e.g., trends, medication, etc. */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F7FA", // Light grey background
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
  vitalsSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: 15, // spacing between cards
  },
  vitalCard: {
    width: (width - 60) / 2, // Half screen width minus padding, adjust for gap
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  vitalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  vitalIcon: {
    marginRight: 10,
  },
  vitalLabel: {
    fontSize: 18,
    fontWeight: "500",
    color: "#555",
  },
  vitalValue: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 5,
  },
  vitalUnit: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#777",
  },
  statusText: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 5,
    color: "#888", // Default status text color
  },
  activityBarView: {
    paddingTop: 10,
  },
});

export default MedicalReportScreen;
