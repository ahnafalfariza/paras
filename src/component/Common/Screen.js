import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';

import Colors from '../../utils/color';

const Screen = ({ children, style }) => {
  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: Colors['dark-0'] }]}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors['dark-2']} translucent />
      <View style={[{ flex: 1 }, style]}>{children}</View>
    </SafeAreaView>
  );
};

export default Screen;
