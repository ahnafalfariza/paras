import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SvgXml } from 'react-native-svg';

import NewPostScreen from '../screen/NewPostScreen';
import ProfileScreen from '../screen/ProfileScreen';
import HomeNavigator from './HomeNavigator';
import WalletNavigator from './WalletNavigator';
import ExploreNavigator from './ExploreNavigator';

import Colors from '../utils/color';
import assetSvg from '../assets/svg/svg';
import { getImageUrl } from '../utils/image';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      tabBarOptions={tabBarOption}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => tabBarIcon(color, route, user),
      })}
    >
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Explore" component={ExploreNavigator} />
      <Tab.Screen name="NewPost" component={NewPostScreen} listeners={newPostListener} />
      <Tab.Screen name="Wallet" component={WalletNavigator} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const newPostListener = ({ navigation }) => ({
  tabPress: (e) => {
    e.preventDefault();
    navigation.navigate('New Post');
  },
});

const tabBarOption = {
  activeTintColor: Colors['primary-5'],
  inactiveTintColor: Colors['white-1'],
  style: { backgroundColor: Colors['dark-12'], borderTopWidth: 0 },
  labelStyle: { fontFamily: 'Inconsolata-Bold' },
  showLabel: false,
};

const tabBarIcon = (color, route, user) => {
  const { name } = route;
  const xml = assetSvg.bottomTab[name];

  if (name === 'Profile') {
    return (
      <View style={{ borderWidth: 3, borderRadius: 20, borderColor: color }}>
        <FastImage
          source={{ uri: getImageUrl(user.imgAvatar) }}
          style={{ width: 32, height: 32 }}
        />
      </View>
    );
  }

  return <SvgXml xml={xml} width="30" height="30" fill={color} />;
};

export default TabNavigator;
