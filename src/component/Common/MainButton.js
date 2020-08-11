import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Colors from '../../utils/color';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

const MainButton = ({ title, onPress, textStyle, containerStyle }) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={[_styles.sendButton, containerStyle]}>
        <Text style={[_styles.sendText, textStyle]}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default MainButton;

const _styles = StyleSheet.create({
  sendButton: {
    marginVertical: 16,
    height: 38,
    width: 96,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: Colors['primary-5'],
  },

  sendText: {
    fontFamily: 'Inconsolata-Bold',
    color: Colors['white-1'],
    fontSize: 18,
  },
});
