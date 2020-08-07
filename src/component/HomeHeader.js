import React from 'react';
import { Header } from 'react-native-elements';
import { View, Text } from 'react-native';
import Colors from '../helper/color';

const HomeHeader = () => {
  return (
    <Header
      centerComponent={<CenterHeaderComponent />}
      containerStyle={{
        backgroundColor: Colors['dark-12'],
        borderBottomWidth: 0,
      }}
    />
  );
};

const CenterHeaderComponent = () => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text
        style={{
          fontFamily: 'Inconsolata-ExtraBold',
          color: Colors['white-1'],
          fontSize: 18,
          paddingHorizontal: 8,
        }}
      >
        Picks
      </Text>
      <Text
        style={{
          fontFamily: 'Inconsolata-Regular',
          color: Colors['white-1'],
          fontSize: 18,
          paddingHorizontal: 8,
        }}
      >
        Following
      </Text>
    </View>
  );
};

export default HomeHeader;
