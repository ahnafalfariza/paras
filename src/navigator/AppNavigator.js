import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import NewPostScreen from '../screen/NewPostScreen';
import TabNavigator from './TabNavigator';
import LandingNavigator from './LandingNavigator';

const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="LandingContainer" component={LandingNavigator} /> */}
        <Stack.Screen name="HomeTab" component={TabNavigator} />
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
