import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import Colors from '../../utils/color';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

const MainButton = ({
  title,
  onPress,
  textStyle,
  buttonStyle,
  containerStyle,
  secondary = false,
  loading = false,
  loadingColor = Colors['white-1'],
  loadingSize = 'small',
  disabled = false,
}) => {
  return (
    <Button
      title={title}
      buttonStyle={StyleSheet.flatten([
        _styles.buttonStyle,
        secondary && _styles.buttonStyleSecondary,
        buttonStyle,
      ])}
      titleStyle={StyleSheet.flatten([
        _styles.textStyle,
        secondary && _styles.textStyleSecondary,
        textStyle,
      ])}
      onPress={onPress}
      disabled={disabled}
      disabledStyle={{ opacity: 0.75, backgroundColor: Colors['primary-5'] }}
      disabledTitleStyle={{ opacity: 0.75, color: Colors['white-1'] }}
      loading={loading}
      loadingProps={{
        color: loadingColor,
        size: loadingSize,
      }}
      containerStyle={StyleSheet.flatten([
        _styles.containerStyle,
        secondary && _styles.containerStyleSecondary,
        containerStyle,
      ])}
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
  containerStyleSecondary: {
    borderColor: Colors['primary-5'],
    borderWidth: 1,
  },
  buttonStyle: {
    backgroundColor: Colors['primary-5'],
  },
  buttonStyleSecondary: {
    backgroundColor: 'transparent',
  },
  textStyle: {
    fontFamily: 'Inconsolata-Bold',
    color: Colors['white-1'],
    fontSize: ResponsiveFont(14),
  },
  textStyleSecondary: {
    color: Colors['primary-5'],
  },
});
