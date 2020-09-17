import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeTopScreen from '../screen/Home/HomeTopScreen';
import HomeFollowingScreen from '../screen/Home/HomeFollowingScreen';
import RoutesName from '../utils/RoutesName';
import UserScreen from '../screen/Common/UserScreen';
import MementoScreen from '../screen/Common/MementoScreen';
import HomeNotification from '../screen/Home/HomeNotificationScreen';
import SinglePostScreen from '../screen/Common/SinglePostScreen';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={RoutesName.HomeFollowing}
    >
      <Stack.Screen
        name={RoutesName.HomeTop}
        component={TabHomeNavigator}
        options={{ cardStyleInterpolator: CardStyleInterpolators.forNoAnimation }}
      />
      <Stack.Screen name={RoutesName.HomeNotification} component={HomeNotification} />
      <Stack.Screen name={RoutesName.Memento} component={MementoScreen} />
      <Stack.Screen name={RoutesName.UserProfile} component={UserScreen} />
      <Stack.Screen name={RoutesName.SinglePost} component={SinglePostScreen} />
    </Stack.Navigator>
  );
};

const TabHome = createBottomTabNavigator();
const TabHomeNavigator = () => {
  return (
    <TabHome.Navigator screenOptions={{ headerShown: false, tabBarVisible: false }}>
      <TabHome.Screen
        name={RoutesName.HomeTop}
        component={HomeTopScreen}
        options={{ cardStyleInterpolator: CardStyleInterpolators.forNoAnimation }}
      />
      <TabHome.Screen
        name={RoutesName.HomeFollowing}
        component={HomeFollowingScreen}
        options={{ cardStyleInterpolator: CardStyleInterpolators.forNoAnimation }}
      />
    </TabHome.Navigator>
  );
};

export default HomeNavigator;
