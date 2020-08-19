import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';

import Colors from '../../utils/color';

const Screen = ({ children, style, transparent = false }) => {
  return (
    <SafeAreaView
      style={[{ flex: 1, backgroundColor: transparent ? 'transparent' : Colors['dark-0'] }]}
    >
      <StatusBar barStyle={'light-content'} backgroundColor={Colors['dark-2']} />
      <View style={[{ flex: 1 }, style]}>{children}</View>
    </SafeAreaView>
  );
};

export default Screen;
