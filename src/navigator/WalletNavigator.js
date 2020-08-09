import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WalletScreen from '../screen/Wallet/WalletScreen';
import WalletHistoryScreen from '../screen/Wallet/WalletHistoryScreen';

const Stack = createStackNavigator();

const WalletNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Wallet" component={WalletScreen} />
      <Stack.Screen name="Wallet History" component={WalletHistoryScreen} />
    </Stack.Navigator>
  );
};

export default WalletNavigator;
