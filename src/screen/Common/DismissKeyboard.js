import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

const DismissKeyboard = ({ children, onPress }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        console.log('kybdismiss');
        Keyboard.dismiss();
        onPress();
      }}
    >
      {children}
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboard;
