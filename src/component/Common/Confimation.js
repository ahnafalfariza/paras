import React from 'react';
import { View, Text, TouchableNativeFeedback, StyleSheet, ActivityIndicator } from 'react-native';

import Colors from '../../utils/color';
import { SCREEN_WIDTH } from '../../utils/constant';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

const Confirmation = ({
  onPressLeft,
  onPressRight,
  titleText,
  leftText = 'Cancel',
  rightText = 'Discard',
  loading = false,
}) => {
  return (
    <View style={_styles.containerView}>
      <Text style={_styles.titleText}>{titleText}</Text>
      <View style={_styles.subTitleContainer}>
        {loading ? (
          <View style={_styles.subTitleView}>
            <ActivityIndicator size={'small'} color={Colors['white-1']} />
          </View>
        ) : (
          <>
            <TouchableNativeFeedback onPress={onPressLeft}>
              <View style={_styles.subTitleView}>
                <Text style={_styles.subTitleText}>{leftText}</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={onPressRight}>
              <View style={_styles.subTitleView}>
                <Text style={_styles.subTitleText}>{rightText}</Text>
              </View>
            </TouchableNativeFeedback>
          </>
        )}
      </View>
    </View>
  );
};

export default Confirmation;

const _styles = StyleSheet.create({
  containerView: {
    backgroundColor: Colors['dark-2'],
    width: SCREEN_WIDTH - 96,
    borderRadius: 6,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  titleText: {
    marginVertical: 24,
    textAlign: 'center',
    color: Colors['white-1'],
    marginLeft: 12,
    fontFamily: 'Inconsolata-SemiBold',
    fontSize: ResponsiveFont(15),
  },
  subTitleContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: Colors['black-2'],
  },
  subTitleView: {
    flex: 1,
    borderRightWidth: 0.5,
    borderColor: Colors['black-2'],
    padding: 12,
  },
  subTitleText: {
    fontFamily: 'Inconsolata-Bold',
    fontSize: ResponsiveFont(13),
    color: Colors['white-1'],
    textAlign: 'center',
  },
});
