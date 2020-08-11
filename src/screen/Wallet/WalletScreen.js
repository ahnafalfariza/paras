import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

import MainHeader from '../../component/Header/MainHeader';
import Screen from '../../component/Screen';
import Colors from '../../utils/color';
import assetSvg from '../../assets/svg/svg';
import MainButton from '../../component/Common/MainButton';

class WalletScreen extends Component {
  render() {
    return (
      <>
        <MainHeader title={'Wallet'} />
        <Screen style={{ margin: 16 }}>
          <Text style={_styles.textSemiBold}>Your Balance</Text>
          <View style={_styles.balanceView}>
            <Text style={_styles.balanceText}>0.000000000</Text>
            <SvgXml xml={assetSvg.wallet.pac} width="36" height="36" fill={Colors['white-1']} />
          </View>
          <Text style={_styles.textRegular}>Learn more about PAC</Text>
          <MainButton title={'SEND'} />
          <Text style={_styles.textSemiBold}>Recent Transaction</Text>
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.navigate('Wallet History')}
          >
            <Text style={[_styles.textRegular, { marginTop: 24, textAlign: 'right' }]}>
              All Transaction
            </Text>
          </TouchableWithoutFeedback>
        </Screen>
      </>
    );
  }
}

export default WalletScreen;

const _styles = StyleSheet.create({
  balanceText: {
    fontFamily: 'Inconsolata-Bold',
    color: Colors['white-1'],
    fontSize: 48,
    marginRight: 12,
  },

  balanceView: {
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },

  textSemiBold: {
    fontFamily: 'Inconsolata-SemiBold',
    color: Colors['white-1'],
    fontSize: 18,
  },

  textRegular: {
    fontFamily: 'Inconsolata-Regular',
    color: Colors['white-1'],
    fontSize: 16,
  },
});
