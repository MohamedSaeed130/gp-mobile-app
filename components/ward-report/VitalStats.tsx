import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

interface VitalStatProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
}

export const VitalStat = ({ icon, label, value, unit }: VitalStatProps) => (
  <View style={styles.statContainer}>
    <View style={styles.iconContainer}>
      {icon}
    </View>
    <View style={styles.statInfo}>
      <Text style={styles.statLabel}>{label}</Text>
      <View style={styles.valueContainer}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statUnit}>{unit}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.background,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statInfo: {
    marginLeft: 12,
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  statUnit: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
}); 