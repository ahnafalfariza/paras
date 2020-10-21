import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import Colors from '../../utils/color';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

const MainTextInput = ({
  style,
  value,
  onChangeText,
  onBlur,
  onFocus,
  placeholder,
  keyboardType = 'default',
  maxLength = null,
  multiline = false,
}) => {
  return (
    <TextInput
      style={[_styles.textInput, style]}
      autoCorrect={false}
      value={value}
      autoCapitalize={'none'}
      selectionColor={Colors['white-1']}
      placeholder={placeholder}
      maxLength={maxLength}
      multiline={multiline}
      placeholderTextColor={Colors['white-3']}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
};

export default MainTextInput;

const _styles = StyleSheet.create({
  textInput: {
    fontFamily: 'Inconsolata-Regular',
    color: Colors['white-1'],
    borderRadius: 4,
    fontSize: ResponsiveFont(16),
    padding: 12,
    backgroundColor: Colors['dark-8'],
  },
});
