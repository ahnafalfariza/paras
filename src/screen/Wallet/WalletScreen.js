import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';

import MainHeader from '../../component/MainHeader';
import Screen from '../../component/Screen';
import Colors from '../../utils/color';

class WalletScreen extends Component {
  render() {
    return (
      <>
        <MainHeader title={'Wallet'} />
        <Screen>
          <View style={{ margin: 16 }}>
            <Text
              style={{ fontFamily: 'Inconsolata-SemiBold', color: Colors['white-1'], fontSize: 18 }}
            >
              Your Balance
            </Text>
            <View style={{ marginVertical: 16 }}>
              <Text
                style={{ fontFamily: 'Inconsolata-Bold', color: Colors['white-1'], fontSize: 48 }}
              >
                0.000000000
              </Text>
            </View>
            <Text
              style={{ fontFamily: 'Inconsolata-Regular', color: Colors['white-1'], fontSize: 16 }}
            >
              Learn more about PAC
            </Text>
            <View
              style={{
                marginVertical: 16,
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderRadius: 8,
                backgroundColor: Colors['primary-5'],
                alignSelf: 'flex-start',
              }}
            >
              <Text
                style={{ fontFamily: 'Inconsolata-Bold', color: Colors['white-1'], fontSize: 18 }}
              >
                SEND
              </Text>
            </View>
            <Text
              style={{ fontFamily: 'Inconsolata-SemiBold', color: Colors['white-1'], fontSize: 18 }}
            >
              Recent Transaction
            </Text>
            <TouchableWithoutFeedback
              onPress={() => this.props.navigation.navigate('Wallet History')}
            >
              <Text
                style={{
                  fontFamily: 'Inconsolata-Regular',
                  color: Colors['white-1'],
                  fontSize: 18,
                  marginTop: 24,
                  textAlign: 'right',
                }}
              >
                All Transaction
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </Screen>
      </>
    );
  }
}

export default WalletScreen;
