import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import configureStore from './src/store';
import AppNavigator from './src/navigator/AppNavigator';

const { persistor, store } = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootSiblingParent>
          <SafeAreaProvider>
            <AppNavigator />
          </SafeAreaProvider>
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
};

export default App;
