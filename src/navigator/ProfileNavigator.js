import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MementoScreen from '../screen/Common/MementoScreen';
import UserScreen from '../screen/Common/UserScreen';
import ProfileScreen from '../screen/Profile/ProfileScreen';
import RoutesName from '../utils/RoutesName';
import UserMementoScreen from '../screen/Profile/UserMementoScreen';
import UserFollowingScreen from '../screen/Profile/UserFollowingScreen';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RoutesName.Profile} component={ProfileScreen} />
      <Stack.Screen name={RoutesName.UserMemento} component={UserMementoScreen} />
      <Stack.Screen name={RoutesName.UserFollowing} component={UserFollowingScreen} />
      <Stack.Screen name={RoutesName.Memento} component={MementoScreen} />
      <Stack.Screen name={RoutesName.UserProfile} component={UserScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
