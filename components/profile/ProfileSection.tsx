import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
}

export const ProfileSection = ({ title, children }: ProfileSectionProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  content: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    paddingVertical: 8,
  },
});