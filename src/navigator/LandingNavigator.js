import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import LandingScreen from '../screen/Landing/LandingScreen';
import LoginScreen from '../screen/Landing/LoginScreen';
import RegistrationScreen from '../screen/Landing/RegistrationScreen';
import VerificationScreen from '../screen/Landing/VerificationScreen';
import SeedPasswordScreen from '../screen/Landing/SeedPasswordScreen';
import RoutesName from '../utils/RoutesName';
import SeedConfirmationScreen from '../screen/Landing/SeedConfirmationScreen';

const Stack = createStackNavigator();

const LandingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name={RoutesName.Landing} component={LandingScreen} />
      <Stack.Screen name={RoutesName.Login} component={LoginScreen} />
      <Stack.Screen name={RoutesName.Registration} component={RegistrationScreen} />
      <Stack.Screen name={RoutesName.Verification} component={VerificationScreen} />
      <Stack.Screen name={RoutesName.SeedPassword} component={SeedPasswordScreen} />
      <Stack.Screen name={RoutesName.SeedConfirmation} component={SeedConfirmationScreen} />
    </Stack.Navigator>
  );
};

export default LandingNavigator;
