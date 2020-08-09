import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreSearchScreen from '../screen/Explore/ExploreSeachScreen';
import ExploreScreen from '../screen/Explore/ExploreScreen';

const Stack = createStackNavigator();

const ExploreNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Explore" component={ExploreScreen} />
      <Stack.Screen name="Search" component={ExploreSearchScreen} />
    </Stack.Navigator>
  );
};

export default ExploreNavigator;
