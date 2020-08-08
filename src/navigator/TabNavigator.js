import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SvgXml } from 'react-native-svg';

import HomeScreen from '../screen/HomeScreen';
import ExploreScreen from '../screen/ExploreScreen';
import NewPostScreen from '../screen/NewPostScreen';
import WalletScreen from '../screen/WalletScreen';
import ProfileScreen from '../screen/ProfileScreen';
import Colors from '../utils/color';
import assetSvg from '../assets/svg/svg';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      tabBarOptions={{
        activeTintColor: Colors['primary-5'],
        inactiveTintColor: Colors['white-1'],
        style: { backgroundColor: Colors['dark-12'], borderTopWidth: 0 },
        labelStyle: { fontFamily: 'Inconsolata-Bold' },
        showLabel: false,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => tabBarIcon(color, route),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
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
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const tabBarIcon = (color, route) => {
  const { name } = route;
  const xml = assetSvg.bottomTab[name];
  return <SvgXml xml={xml} width="60%" height="60%" fill={color} />;
};

export default TabNavigator;
