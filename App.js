import React from 'react';
import { Provider } from 'react-redux';

import AppNavigator from './src/navigator/AppNavigator';
import store from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
