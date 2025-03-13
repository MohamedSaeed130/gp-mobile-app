import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const LoginHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
}); 