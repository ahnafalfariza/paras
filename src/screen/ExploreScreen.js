import React, { Component } from 'react';
import { Text } from 'react-native';

import Screen from '../component/Screen';
import MainHeader from '../component/MainHeader';
import Colors from '../helper/color';

class ExploreScreen extends Component {
  render() {
    return (
      <>
        <MainHeader title={'Explore'} />
        <Screen>
          <Text
            style={{
              fontFamily: 'Inconsolata-Regular',
              color: Colors['white-1'],
              fontSize: 24,
            }}
          >
            ExploreScreen
          </Text>
        </Screen>
      </>
    );
  }
}

export default ExploreScreen;
