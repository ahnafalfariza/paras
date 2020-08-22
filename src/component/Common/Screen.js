import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';

import Colors from '../../utils/color';

const Screen = ({ children, style, transparent = false, containerStyle }) => {
  return (
    <View
      style={[
        { flex: 1, backgroundColor: transparent ? 'transparent' : Colors['dark-0'] },
        containerStyle,
      ]}
    >
      <SafeAreaView style={[{ flex: 1 }]}>
        <StatusBar barStyle={'light-content'} backgroundColor={Colors['dark-2']} />
        <View style={[{ flex: 1 }, style]}>{children}</View>
      </SafeAreaView>
    </View>
  );
};

export default Screen;
