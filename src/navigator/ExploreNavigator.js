import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreSearchScreen from '../screen/Explore/ExploreSeachScreen';
import ExploreScreen from '../screen/Explore/ExploreScreen';
import MementoScreen from '../screen/Common/MementoScreen';
import UserScreen from '../screen/Common/UserScreen';
import RoutesName from '../utils/RoutesName';
import ListMementoScreen from '../screen/Common/ListMementoScreen';

const Stack = createStackNavigator();

const ExploreNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={RoutesName.Explore}>
      <Stack.Screen name={RoutesName.Explore} component={ExploreScreen} />
      <Stack.Screen name={RoutesName.ExploreSerach} component={ExploreSearchScreen} />
      <Stack.Screen name={RoutesName.Memento} component={MementoScreen} />
      <Stack.Screen name={RoutesName.UserProfile} component={UserScreen} />
      <Stack.Screen name={RoutesName.ListMemento} component={ListMementoScreen} />
    </Stack.Navigator>
  );
};

export default ExploreNavigator;
