import { ScrollView, StyleSheet, View } from "react-native";
import { ReportHeader } from "../../components/patient-report/ReportHeader";
import { VitalStat } from "../../components/patient-report/VitalStats";
import ActivityChart from "../../components/patient-report/ActivityChart";
import { NotificationsSection } from "../../components/patient-report/NotificationsSection";
import { MaterialIcons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Colors from "../../constants/Colors";

export default function PatientReportScreen() {
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [72, 75, 82, 78, 71, 73, 76],
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

  const notifications = [
    {
      id: "1",
      title: "High Heart Rate Detected",
      datetime: "Today, 14:30",
      body: "Heart rate exceeded normal threshold (120 bpm). Immediate attention required.",
      level: "EMERGENCY" as const,
    },
    {
      id: "2",
      title: "Low Blood Oxygen Level",
      datetime: "Today, 13:15",
      body: "Blood oxygen saturation dropped to 92%. Please check on patient.",
      level: "WARNING" as const,
    },
    {
      id: "3",
      title: "Medication Reminder",
      datetime: "Today, 12:00",
      body: "Time for daily blood pressure medication.",
      level: "SCHEDULE" as const,
    },
    {
      id: "4",
      title: "Activity Goal Achieved",
      datetime: "Today, 11:30",
      body: "Daily movement goal has been reached. Great progress!",
      level: "NORMAL" as const,
    },
  ];

  const handleShowMoreNotifications = () => {
    // TODO: Implement show more logic
    console.log("Show more notifications pressed");
  };

  return (
    <ScrollView style={styles.container}>
      <ReportHeader fullName="John Doe" dateRange="March 1 - March 7, 2024" />

      <View style={styles.content}>
        <View style={styles.vitalsSection}>
          <VitalStat
            icon={
              <FontAwesome6
                name="heart-pulse"
                size={24}
                color={Colors.primary}
              />
            }
            label="Heart Rate"
            value="72"
            unit="bpm"
          />
          <VitalStat
            icon={
              <MaterialIcons
                name="water-drop"
                size={24}
                color={Colors.primary}
              />
            }
            label="Blood Oxygen"
            value="98"
            unit="%"
          />
          <VitalStat
            icon={
              <MaterialIcons
                name="device-thermostat"
                size={24}
                color={Colors.primary}
              />
            }
            label="Temperature"
            value="36.6"
            unit="°C"
          />
        </View>

        <NotificationsSection
          notifications={notifications}
          onShowMore={handleShowMoreNotifications}
        />

        <ActivityChart
          title="Weekly Vitals"
          labels={chartData.labels}
          datasets={chartData.datasets}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surfaceLight,
  },
  content: {
    padding: 16,
  },
  vitalsSection: {
    marginBottom: 24,
  },
});
