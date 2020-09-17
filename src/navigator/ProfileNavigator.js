import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MementoScreen from '../screen/Common/MementoScreen';
import UserScreen from '../screen/Common/UserScreen';
import ProfileScreen from '../screen/Profile/ProfileScreen';
import RoutesName from '../utils/RoutesName';
import ProfileMementoScreen from '../screen/Profile/ProfileMementoScreen';
import ProfileFollowingScreen from '../screen/Profile/ProfileFollowingScreen';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={RoutesName.Profile}>
      <Stack.Screen
        name={RoutesName.Profile}
        component={ProfileScreen}
        initialParams={{ needToRefresh: false }}
      />
      <Stack.Screen name={RoutesName.ProfileMemento} component={ProfileMementoScreen} />
      <Stack.Screen name={RoutesName.ProfileFollowing} component={ProfileFollowingScreen} />
      <Stack.Screen name={RoutesName.Memento} component={MementoScreen} />
      <Stack.Screen name={RoutesName.UserProfile} component={UserScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
