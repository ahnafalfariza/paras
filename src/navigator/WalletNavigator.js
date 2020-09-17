import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WalletScreen from '../screen/Wallet/WalletScreen';
import WalletHistoryScreen from '../screen/Wallet/WalletHistoryScreen';
import WalletTransactionScreen from '../screen/Wallet/WalletTransactionScreen';
import RoutesName from '../utils/RoutesName';

const Stack = createStackNavigator();

const WalletNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RoutesName.Wallet} component={WalletScreen} />
      <Stack.Screen
        name={RoutesName.WalletHistory}
        component={WalletHistoryScreen}
        initialParams={{ transactionHistory: [] }}
      />
      <Stack.Screen name={RoutesName.WalletTransaction} component={WalletTransactionScreen} />
    </Stack.Navigator>
  );
};

export default WalletNavigator;
