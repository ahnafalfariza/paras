import React from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';

import Colors from '../../utils/color';
import { SCREEN_WIDTH } from '../../utils/constant';

const Confirmation = ({ onPressLeft, onPressRight, titleText }) => {
  return (
    <View
      style={{
        backgroundColor: Colors['dark-2'],
        width: SCREEN_WIDTH - 96,
        borderRadius: 6,
      }}
    >
      <Text
        style={{
          marginVertical: 24,
          textAlign: 'center',
          color: Colors['white-1'],
          marginLeft: 12,
          fontFamily: 'Inconsolata-SemiBold',
          fontSize: 18,
        }}
      >
        {titleText}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          borderTopWidth: 1,
          borderColor: Colors['black-2'],
        }}
      >
        <TouchableNativeFeedback onPress={onPressLeft}>
          <View style={{ flex: 1, borderRightWidth: 0.5, borderColor: Colors['black-2'] }}>
            <Text
              style={{
                fontFamily: 'Inconsolata-Bold',
                fontSize: 16,
                color: Colors['white-1'],
                textAlign: 'center',
                padding: 12,
              }}
            >
              Cancel
            </Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={onPressRight}>
          <View style={{ flex: 1, borderLeftWidth: 0.5, borderColor: Colors['black-2'] }}>
            <Text
              style={{
                fontFamily: 'Inconsolata-Bold',
                fontSize: 16,
                color: Colors['white-1'],
                textAlign: 'center',
                padding: 12,
              }}
            >
              Discard
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

export default Confirmation;
