import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { RootSiblingParent } from 'react-native-root-siblings';

import configureStore from './src/store';
import FlashMessage from "react-native-flash-message";
import AppNavigator from './src/navigator/AppNavigator';
import { View } from 'react-native';

const { persistor, store } = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootSiblingParent>
          <AppNavigator />
          <FlashMessage position='center' />
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
};

export default App;
