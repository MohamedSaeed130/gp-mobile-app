import React from 'react';
import { Pressable, View, Text, Image, StyleSheet } from 'react-native'; 
import DownArrow from './Arrows/DownArrow';
import UpArrow from './Arrows/UpArrow';
import RightArrow from './Arrows/RightArrow';
import LeftArrow from './Arrows/LeftArrow';

const ControlPad = () => {
  return (
    <View style={styles.pad}>
      <Pressable>
        <UpArrow />
      </Pressable>
      <View>
        <Pressable>
          <LeftArrow />
        </Pressable>
        <Pressable>
          <RightArrow />
        </Pressable>
      </View>
      <Pressable>
        <DownArrow />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  pad: {
    backgroundColor: "white"
  }
});

export default ControlPad; 