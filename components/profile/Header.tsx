import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface HeaderProps {
  name: string;
  model: string;
  imageSource: any;
}

const Header = ({ name, model, imageSource }: HeaderProps) => {
  return (
    <View style={styles.header}>
      <Image source={imageSource} style={styles.profileImage} />
      <View style={styles.headerText}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.model}>{model}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  headerText: {
    marginLeft: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  model: {
    color: '#666',
    marginTop: 5,
  },
});

export default Header; 