import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import HomePicks from '../screen/Home/HomePicksScreen';
import HomeFollowing from '../screen/Home/HomeFollowingScreen';
import RoutesName from '../utils/RoutesName';
import UserScreen from '../screen/Common/UserScreen';
import MementoScreen from '../screen/Common/MementoScreen';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={RoutesName.HomeFollowing}
    >
      <Stack.Screen
        name={RoutesName.HomePicks}
        component={HomePicks}
        options={{ cardStyleInterpolator: CardStyleInterpolators.forNoAnimation }}
      />
      <Stack.Screen
        name={RoutesName.HomeFollowing}
        component={HomeFollowing}
        options={{ cardStyleInterpolator: CardStyleInterpolators.forNoAnimation }}
      />
      <Stack.Screen name={RoutesName.Memento} component={MementoScreen} />
      <Stack.Screen name={RoutesName.UserProfile} component={UserScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
