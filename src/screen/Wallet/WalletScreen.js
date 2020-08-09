import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';

import MainHeader from '../../component/Header/MainHeader';
import Screen from '../../component/Screen';
import Colors from '../../utils/color';
import assetSvg from '../../assets/svg/svg';
import { SvgXml } from 'react-native-svg';

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
            <View style={{ marginVertical: 8, flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{ fontFamily: 'Inconsolata-Bold', color: Colors['white-1'], fontSize: 48 }}
              >
                0.000000000
              </Text>
              <SvgXml
                xml={assetSvg.wallet.pac}
                width="36"
                height="36"
                fill={Colors['white-1']}
                style={{ marginLeft: 12 }}
              />
            </View>
            <Text
              style={{ fontFamily: 'Inconsolata-Regular', color: Colors['white-1'], fontSize: 16 }}
            >
              Learn more about PAC
            </Text>
            <View
              style={{
                marginVertical: 16,
                height: 38,
                width: 96,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 6,
                backgroundColor: Colors['primary-5'],
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
