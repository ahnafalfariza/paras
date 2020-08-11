import React, { Component } from 'react';
import { Text } from 'react-native';

import HomeHeader from '../../component/Header/HomeHeader';
import Screen from '../../component/Screen';
import Colors from '../../utils/color';

class HomePicks extends Component {
  render() {
    return (
      <>
        <HomeHeader active={'picks'} />
        <Screen>
          <Text
            style={{
              fontFamily: 'Inconsolata-Regular',
              color: Colors['white-1'],
              fontSize: 24,
            }}
          >
            Picks
          </Text>
        </Screen>
      </>
    );
  }
}

export default HomePicks;
