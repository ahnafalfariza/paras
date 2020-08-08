import React, { Component } from 'react';
import { Text } from 'react-native';

import Screen from '../component/Screen';
import MainHeader from '../component/MainHeader';
import Colors from '../utils/color';

class ProfileScreen extends Component {
  render() {
    return (
      <>
        <MainHeader title={'Profile'} />
        <Screen>
          <Text
            style={{ fontFamily: 'Inconsolata-Regular', color: Colors['white-1'], fontSize: 24 }}
          >
            ProfileScreen
          </Text>
        </Screen>
      </>
    );
  }
}

export default ProfileScreen;
