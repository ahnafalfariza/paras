import React from 'react';
import { View, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import MainHeader from './MainHeader';
import Colors from '../../utils/color';
import { useNavigation } from '@react-navigation/native';
import RoutesName from '../../utils/RoutesName';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

const HomeHeader = ({ active = 'picks' }) => {
  return <MainHeader centerComponent={<CenterHeaderComponent active={active} />} />;
};

const CenterHeaderComponent = ({ active }) => {
  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableWithoutFeedback
        onPress={() => (active === 'picks' ? null : navigation.navigate(RoutesName.HomePicks))}
      >
        <Text
          style={{
            fontFamily: active === 'picks' ? 'Inconsolata-ExtraBold' : 'Inconsolata-Regular',
            color: Colors['white-1'],
            fontSize: ResponsiveFont(15),
            padding: 8,
          }}
        >
          Picks
        </Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() =>
          active === 'following' ? null : navigation.navigate(RoutesName.HomeFollowing)
        }
      >
        <Text
          style={{
            fontFamily: active === 'following' ? 'Inconsolata-ExtraBold' : 'Inconsolata-Regular',
            color: Colors['white-1'],
            fontSize: ResponsiveFont(15),
            padding: 8,
          }}
        >
          Following
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default HomeHeader;
