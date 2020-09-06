import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { connect, useSelector } from 'react-redux';
import Axios from 'axios';

import NewPostNavigator from './NewPostNavigator';
import TabNavigator from './TabNavigator';
import LandingNavigator from './LandingNavigator';
import AuthNavigator from './AuthNavigator';
import { VERIFY_TOKEN } from '../utils/api';
import CommentScreen from '../screen/Interaction/CommentScreen';

const Stack = createStackNavigator();

const AppNavigator = ({ isLoggedIn }) => {
  const token = useSelector((state) => state.user.token);
  const [tokenLoaded, setTokenLoaded] = useState(false);

  useEffect(() => {
    if (token) {
      Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      console.log(token);
      Axios.post(VERIFY_TOKEN)
        .then(() => setTokenLoaded(true))
        .catch((err) => console.log(err));
    } else {
      setTokenLoaded(true);
    }
  }, [token]);

  if (!tokenLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="LandingNavigator" component={LandingNavigator} />
            <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
          </>
        ) : (
          <>
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen
              name="New Post"
              component={NewPostNavigator}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                gestureEnabled: false,
              }}
            />
            <Stack.Screen
              name="Comment"
              component={CommentScreen}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                gestureDirection: 'vertical',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
});

export default connect(mapStateToProps)(AppNavigator);
