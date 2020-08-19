import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-elements';

import Colors from '../../utils/color';

const MainButton = ({ title, onPress, textStyle, buttonStyle, loading = false }) => {
  return (
    <Button
      title={title}
      buttonStyle={[_styles.sendButton, buttonStyle]}
      titleStyle={[_styles.sendText, textStyle]}
      onPress={onPress}
      loading={loading}
      // TouchableComponent={TouchableWithoutFeedback}
    />
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
