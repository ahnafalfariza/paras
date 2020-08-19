import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import NewPostScreen from '../screen/NewPost/NewPostScreen';
import TabNavigator from './TabNavigator';
import LandingNavigator from './LandingNavigator';
import AuthNavigator from './AuthNavigator';

const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LandingNavigator" component={LandingNavigator} />
        <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen
          name="New Post"
          component={NewPostScreen}
          options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
