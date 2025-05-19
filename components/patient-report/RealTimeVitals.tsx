// components/patient-report/RealTimeVitals.tsx
import React, { FC, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  Easing,
  interpolateColor,
} from "react-native-reanimated";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { useVitalStats } from "../../contexts/VitalStatsContext";

const { width } = Dimensions.get("window");

interface RealTimeVitalsProps {}

const RealTimeVitals: FC<RealTimeVitalsProps> = () => {
  const {
    temperature: contextTemperature,
    bloodOxygen: contextBloodOxygen,
    heartRate: contextHeartRate,
  } = useVitalStats();

  // Reanimated shared values for animations
  const hrPulse = useSharedValue<number>(1);
  const spo2Pulse = useSharedValue<number>(1);
  const tempPulse = useSharedValue<number>(1);

  const hrColor = useSharedValue<number>(0);
  const spo2Color = useSharedValue<number>(0);
  const tempColor = useSharedValue<number>(0);

  // Animate heart rate value change and update color based on context
  useEffect(() => {
    if (contextHeartRate !== null) {
      hrPulse.value = withSequence(
        withTiming(1.1, { duration: 200, easing: Easing.ease }),
        withTiming(1, { duration: 200, easing: Easing.ease })
      );

      let newHrColorValue: number = 0; // Normal
      if (contextHeartRate > 90) newHrColorValue = 1; // Warning
      if (contextHeartRate > 100) newHrColorValue = 2; // Critical
      hrColor.value = withTiming(newHrColorValue, { duration: 500 });
    }
  }, [contextHeartRate]);

  // Animate blood oxygen value change and update color based on context
  useEffect(() => {
    if (contextBloodOxygen !== null) {
      spo2Pulse.value = withSequence(
        withTiming(1.1, { duration: 200, easing: Easing.ease }),
        withTiming(1, { duration: 200, easing: Easing.ease })
      );

      let newSpo2ColorValue: number = 0; // Normal
      if (contextBloodOxygen < 97) newSpo2ColorValue = 1; // Warning
      if (contextBloodOxygen < 95) newSpo2ColorValue = 2; // Critical
      spo2Color.value = withTiming(newSpo2ColorValue, { duration: 500 });
    }
  }, [contextBloodOxygen]);

  // Animate temperature value change and update color based on context
  useEffect(() => {
    if (contextTemperature !== null) {
      tempPulse.value = withSequence(
        withTiming(1.1, { duration: 200, easing: Easing.ease }),
        withTiming(1, { duration: 200, easing: Easing.ease })
      );

      let newTempColorValue: number = 0; // Normal
      if (contextTemperature > 37.2) newTempColorValue = 1; // Warning (low-grade fever)
      if (contextTemperature > 37.8) newTempColorValue = 2; // Critical (fever)
      if (contextTemperature < 36.0) newTempColorValue = 2; // Critical (hypothermia)
      tempColor.value = withTiming(newTempColorValue, { duration: 500 });
    }
  }, [contextTemperature]);

  // Animated style for heart rate number and icon
  const animatedHrStyle = useAnimatedStyle(() => {
    const textColor = interpolateColor(
      hrColor.value,
      [0, 1, 2],
      [
        Colors.success || "#4CAF50",
        Colors.warning || "#FFC107",
        Colors.error || "#F44336",
      ] // Green, Yellow, Red
    );
    return {
      transform: [{ scale: hrPulse.value }],
      color: textColor,
    };
  });

  // Animated style for blood oxygen number and icon
  const animatedSpo2Style = useAnimatedStyle(() => {
    const textColor = interpolateColor(
      spo2Color.value,
      [0, 1, 2],
      [
        Colors.info || "#2196F3",
        Colors.warning || "#FFC107",
        Colors.error || "#F44336",
      ] // Blue, Yellow, Red
    );
    return {
      transform: [{ scale: spo2Pulse.value }],
      color: textColor,
    };
  });

  // Animated style for temperature number and icon
  const animatedTempStyle = useAnimatedStyle(() => {
    const textColor = interpolateColor(
      tempColor.value,
      [0, 1, 2],
      ["#00BCD4", Colors.warning || "#FF9800", Colors.error || "#E91E63"] // Cyan (normal), Orange (warning), Pink (critical)
    );
    return {
      transform: [{ scale: tempPulse.value }],
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

  // Animated style for the vital signs container background for Temperature
  const animatedTempContainerStyle = useAnimatedStyle(() => {
    const interpolatedBgColor = interpolateColor(
      tempColor.value,
      [0, 1, 2],
      ["#E0F7FA", "#FFF3E0", "#FCE4EC"] // Lighter shades of Cyan, Orange, Pink
    );
    return {
      backgroundColor: interpolatedBgColor,
    };
  });

  return (
    <View style={styles.vitalsSection}>
      {/* Heart Rate Card */}
      <Animated.View style={[styles.vitalCard, animatedHrContainerStyle]}>
        <View style={styles.vitalHeader}>
          <Animated.Text style={[styles.vitalIcon, animatedHrStyle]}>
            <FontAwesome5 name="heartbeat" size={24} />
          </Animated.Text>
          <Text style={styles.vitalLabel}>Heart Rate</Text>
        </View>
        <Animated.Text style={[styles.vitalValue, animatedHrStyle]}>
          {contextHeartRate !== null ? `${contextHeartRate}` : "--"}
          <Text style={styles.vitalUnit}> bpm</Text>
        </Animated.Text>
        <Text style={styles.statusText}>
          {contextHeartRate !== null
            ? contextHeartRate > 90
              ? "High"
              : contextHeartRate < 60
              ? "Low"
              : "Normal"
            : "---"}
        </Text>
      </Animated.View>

      {/* Blood Oxygen Card */}
      <Animated.View style={[styles.vitalCard, animatedSpo2ContainerStyle]}>
        <View style={styles.vitalHeader}>
          <Animated.Text style={[styles.vitalIcon, animatedSpo2Style]}>
            <MaterialCommunityIcons name="blood-bag" size={24} />
          </Animated.Text>
          <Text style={styles.vitalLabel}>Blood Oxygen</Text>
        </View>
        <Animated.Text style={[styles.vitalValue, animatedSpo2Style]}>
          {contextBloodOxygen !== null ? `${contextBloodOxygen}` : "--"}
          <Text style={styles.vitalUnit}> %</Text>
        </Animated.Text>
        <Text style={styles.statusText}>
          {contextBloodOxygen !== null
            ? contextBloodOxygen < 95
              ? "Low"
              : contextBloodOxygen < 97
              ? "Mildly Low"
              : "Normal"
            : "---"}
        </Text>
      </Animated.View>

      {/* Temperature Card - Full width */}
      <Animated.View
        style={[
          styles.vitalCard,
          styles.fullWidthVitalCard,
          animatedTempContainerStyle,
        ]}
      >
        <View style={styles.vitalHeader}>
          <Animated.Text style={[styles.vitalIcon, animatedTempStyle]}>
            <MaterialCommunityIcons name="thermometer" size={24} />
          </Animated.Text>
          <Text style={styles.vitalLabel}>Temperature</Text>
        </View>
        <Animated.Text style={[styles.vitalValue, animatedTempStyle]}>
          {contextTemperature !== null
            ? `${contextTemperature?.toFixed(1)}`
            : "--"}
          <Text style={styles.vitalUnit}> °C</Text>
        </Animated.Text>
        <Text style={styles.statusText}>
          {contextTemperature !== null
            ? contextTemperature > 37.8
              ? "Fever"
              : contextTemperature > 37.2
              ? "Elevated"
              : contextTemperature < 36.0
              ? "Low"
              : "Normal"
            : "---"}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  vitalsSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 15,
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
    marginBottom: 15, // Ensures consistent spacing when wrapping
  },
  fullWidthVitalCard: {
    width: width - 40, // Full screen width minus horizontal padding (20 left + 20 right)
    marginTop: 0,
    marginBottom: 0,
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
    color: "#888",
  },
});

export default RealTimeVitals;
