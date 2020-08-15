import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreSearchScreen from '../screen/Explore/ExploreSeachScreen';
import ExploreScreen from '../screen/Explore/ExploreScreen';
import MementoScreen from '../screen/Common/MementoScreen';
import UserScreen from '../screen/Common/UserScreen';

const Stack = createStackNavigator();

const ExploreNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Explore" component={ExploreScreen} />
      <Stack.Screen name="Search" component={ExploreSearchScreen} />
      <Stack.Screen name="Memento" component={MementoScreen} />
      <Stack.Screen name="UserProfile" component={UserScreen} />
    </Stack.Navigator>
  );
};

export default ExploreNavigator;
