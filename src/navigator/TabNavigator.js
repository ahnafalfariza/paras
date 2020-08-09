import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SvgXml } from 'react-native-svg';

import NewPostScreen from '../screen/NewPostScreen';
import ProfileScreen from '../screen/ProfileScreen';
import HomeNavigator from './HomeNavigator';
import WalletNavigator from './WalletNavigator';
import ExploreNavigator from './ExploreNavigator';

import Colors from '../utils/color';
import assetSvg from '../assets/svg/svg';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      tabBarOptions={tabBarOption}
      screenOptions={({ route }) => ({ tabBarIcon: ({ color }) => tabBarIcon(color, route) })}
    >
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Explore" component={ExploreNavigator} />
      <Tab.Screen
        name="NewPost"
        component={NewPostScreen}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('New Post');
          },
        })}
      />
      <Tab.Screen name="Wallet" component={WalletNavigator} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const tabBarOption = {
  activeTintColor: Colors['primary-5'],
  inactiveTintColor: Colors['white-1'],
  style: { backgroundColor: Colors['dark-12'], borderTopWidth: 0 },
  labelStyle: { fontFamily: 'Inconsolata-Bold' },
  showLabel: false,
};

const tabBarIcon = (color, route) => {
  const { name } = route;
  const xml = assetSvg.bottomTab[name];
  return <SvgXml xml={xml} width="60%" height="60%" fill={color} />;
};

export default TabNavigator;
