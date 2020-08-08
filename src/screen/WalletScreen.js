import React, { Component } from 'react';
import { Text } from 'react-native';

import Screen from '../component/Screen';
import MainHeader from '../component/MainHeader';
import Colors from '../utils/color';

class WalletScreen extends Component {
  render() {
    return (
      <>
        <MainHeader title={'Wallet'} />
        <Screen>
          <Text
            style={{
              fontFamily: 'Inconsolata-Regular',
              color: Colors['white-1'],
              fontSize: 24,
            }}
          >
            WalletScreen
          </Text>
        </Screen>
      </>
    );
  }
}

export default WalletScreen;
