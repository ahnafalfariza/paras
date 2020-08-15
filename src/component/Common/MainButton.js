import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import Colors from '../../utils/color';

const MainButton = ({ title, onPress, textStyle, containerStyle }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[_styles.sendButton, containerStyle]}>
        <Text style={[_styles.sendText, textStyle]}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
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
