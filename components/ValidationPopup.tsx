import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

interface ValidationPopupProps {
  message: string;
}

export const ValidationPopup = ({ message }: ValidationPopupProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -45,
    left: 24,
    right: 24,
    backgroundColor: Colors.error,
    padding: 8,
    borderRadius: 8,
    zIndex: 1000,
  },
  text: {
    color: Colors.background,
    fontSize: 14,
    textAlign: 'center',
  },
}); 