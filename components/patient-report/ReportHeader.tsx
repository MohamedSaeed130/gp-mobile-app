import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

interface ReportHeaderProps {
  fullName: string;
  dateRange: string;
}

export const ReportHeader = ({ fullName, dateRange }: ReportHeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medical Report</Text>
      <Text style={styles.name}>{fullName}</Text>
      <Text style={styles.dateRange}>{dateRange}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  dateRange: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
}); 