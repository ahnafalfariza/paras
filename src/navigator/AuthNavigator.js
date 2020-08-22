import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screen/Auth/LoginScreen';
import RegistrationScreen from '../screen/Auth/RegistrationScreen';
import VerificationScreen from '../screen/Auth/VerificationScreen';
import SeedPasswordScreen from '../screen/Auth/SeedPasswordScreen';
import SeedConfirmationScreen from '../screen/Auth/SeedConfirmationScreen';
import RoutesName from '../utils/RoutesName';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={RoutesName.Registration}
    >
      <Stack.Screen name={RoutesName.Login} component={LoginScreen} />
      <Stack.Screen name={RoutesName.Registration} component={RegistrationScreen} />
      <Stack.Screen name={RoutesName.Verification} component={VerificationScreen} />
      <Stack.Screen name={RoutesName.SeedPassword} component={SeedPasswordScreen} />
      <Stack.Screen name={RoutesName.SeedConfirmation} component={SeedConfirmationScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
