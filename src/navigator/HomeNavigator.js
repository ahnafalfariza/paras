import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import HomePicks from '../screen/Home/HomePicksScreen';
import HomeFollowing from '../screen/Home/HomeFollowingScreen';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="HomePicks"
        component={HomePicks}
        options={{ cardStyleInterpolator: CardStyleInterpolators.forNoAnimation }}
      />
      <Stack.Screen
        name="HomeFollowing"
        component={HomeFollowing}
        options={{ cardStyleInterpolator: CardStyleInterpolators.forNoAnimation }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
