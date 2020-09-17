import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import Axios from 'axios';
import { connect } from 'react-redux';

import MainHeader from '../../component/Header/MainHeader';
import Screen from '../../component/Common/Screen';
import Colors from '../../utils/color';
import assetSvg from '../../assets/svg/svg';
import MainButton from '../../component/Common/MainButton';
import RoutesName from '../../utils/RoutesName';
import { ResponsiveFont } from '../../utils/ResponsiveFont';
import { WALLET_BALANCE, WALLET_HISTORY } from '../../utils/api';
import { setWalletBalance } from '../../actions/user';
import { prettyBalance } from '../../utils/utils';
import Transaction from '../../component/Wallet/TransactionList';

class WalletScreen extends Component {
  state = {
    transactionHistory: [],
  };

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getWalletData();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getWalletData = () => {
    const { walletBalance } = this.props;
    const { id } = this.props.profileData;

    Axios.get(WALLET_BALANCE(id)).then((res) => {
      if (res.data.data !== walletBalance) {
        this.props.dispatchsetWalletBalance({ walletBalance: res.data.data });
      }
    });
    Axios.get(WALLET_HISTORY(id, 1)).then((res) => {
      this.setState({ transactionHistory: res.data.data });
    });
  };

  render() {
    const { navigation, walletBalance } = this.props;
    const { transactionHistory } = this.state;
    return (
      <>
        <MainHeader title={'Wallet'} />
        <Screen>
          <Transaction
            headerComponent={
              <>
                <Text style={_styles.textSemiBold}>Your Balance</Text>
                <View style={_styles.balanceView}>
                  <Text style={_styles.balanceText} numberOfLines={1}>
                    {prettyBalance(walletBalance)}
                  </Text>
                  <SvgXml xml={assetSvg.wallet.pac} width="36" height="36" />
                </View>
                <Text style={_styles.textRegular}>Learn more about PAC</Text>
                <MainButton
                  title={'SEND'}
                  onPress={() => navigation.navigate(RoutesName.WalletTransaction)}
                />
                <Text style={_styles.textSemiBold}>Recent Transaction</Text>
              </>
            }
            footerComponent={
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate(RoutesName.WalletHistory, {
                    transactionHistory: transactionHistory,
                  })
                }
              >
                <Text style={[_styles.textRegular, { textAlign: 'right' }]}>All Transaction</Text>
              </TouchableWithoutFeedback>
            }
            onRefresh={this.getWalletData}
            list={transactionHistory.slice(0, 3)}
          />
        </Screen>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  profileData: state.user.profile,
  walletBalance: state.user.walletBalance,
});

const mapDispatchToProps = {
  dispatchsetWalletBalance: setWalletBalance,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletScreen);

const _styles = StyleSheet.create({
  balanceText: {
    fontFamily: 'Inconsolata-Bold',
    color: Colors['white-1'],
    fontSize: ResponsiveFont(40),
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
    fontSize: ResponsiveFont(15),
  },
  textRegular: {
    fontFamily: 'Inconsolata-Regular',
    color: Colors['white-1'],
    fontSize: ResponsiveFont(14),
  },
});
