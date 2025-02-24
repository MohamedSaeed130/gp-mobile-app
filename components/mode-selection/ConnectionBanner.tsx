import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

interface ConnectionBannerProps {
  isConnected: boolean;
}

const ConnectionBanner = ({ isConnected }: ConnectionBannerProps) => {
  if (isConnected) return null;

  return (
    <View style={styles.container}>
      <MaterialIcons name="warning" size={24} color={Colors.warning} />
      <Text style={styles.text}>
        Please connect to a laptop before selecting a control mode
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.warning}10`, // 10% opacity version of warning color
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.warning,
  },
  text: {
    flex: 1,
    marginLeft: 10,
    color: Colors.textPrimary,
    fontSize: 14,
  },
});

export default ConnectionBanner; 