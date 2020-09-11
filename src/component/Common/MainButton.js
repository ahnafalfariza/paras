import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-elements';

import Colors from '../../utils/color';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

const MainButton = ({
  title,
  onPress,
  textStyle,
  buttonStyle,
  containerStyle,
  loading = false,
  disabled = false,
}) => {
  return (
    <Button
      title={title}
      buttonStyle={StyleSheet.flatten([_styles.buttonStyle, buttonStyle])}
      titleStyle={StyleSheet.flatten([_styles.textStyle, textStyle])}
      onPress={onPress}
      disabled={disabled}
      disabledStyle={{ opacity: 0.75, backgroundColor: Colors['primary-5'] }}
      disabledTitleStyle={{ opacity: 0.75, color: Colors['white-1'] }}
      loading={loading}
      containerStyle={StyleSheet.flatten([_styles.containerStyle, containerStyle])}
      // TouchableComponent={TouchableWithoutFeedback}
    />
  );
};

export default MainButton;

const _styles = StyleSheet.create({
  containerStyle: {
    marginVertical: 16,
    height: 38,
    width: 96,
    borderRadius: 6,
    justifyContent: 'center',
  },
  buttonStyle: {
    backgroundColor: Colors['primary-5'],
  },
  textStyle: {
    fontFamily: 'Inconsolata-Bold',
    color: Colors['white-1'],
    fontSize: ResponsiveFont(14),
  },
});
