import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import LandingDetailScreen from '../screen/Landing/LandingDetailScreen';
import RoutesName from '../utils/RoutesName';
import LandingScreen from '../screen/Landing/LandingScreen';

const Stack = createStackNavigator();

const LandingNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RoutesName.Landing} component={LandingScreen} />
      <Stack.Screen
        name={RoutesName.LandingDetail}
        component={LandingDetailScreen}
        options={{ cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS }}
      />
    </Stack.Navigator>
  );
};

export default LandingNavigator;
