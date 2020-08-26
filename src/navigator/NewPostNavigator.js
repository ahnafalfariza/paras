import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import RoutesName from '../utils/RoutesName';
import NewMementoScreen from '../screen/NewPost/NewMementoScreen';
import NewPostScreen from '../screen/NewPost/NewPostScreen';
import ChooseMementoScreen from '../screen/NewPost/ChooseMementoScreen';

const Stack = createStackNavigator();

const NewPostNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RoutesName.NewPost} component={NewPostScreen} />
      <Stack.Screen name={RoutesName.ChooseMemento} component={ChooseMementoScreen} />
      <Stack.Screen name={RoutesName.NewMemento} component={NewMementoScreen} />
    </Stack.Navigator>
  );
};

export default NewPostNavigator;
