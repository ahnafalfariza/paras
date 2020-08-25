import React from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';

const DismissKeyboard = ({ children, style }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={[{ flex: 1 }, style]}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboard;
