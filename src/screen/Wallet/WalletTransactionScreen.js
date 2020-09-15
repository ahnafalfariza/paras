import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicator,
  View,
  Keyboard,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import Axios from 'axios';
import Toast from 'react-native-root-toast';

import MainHeader from '../../component/Header/MainHeader';
import Screen from '../../component/Common/Screen';
import Colors from '../../utils/color';
import { SEARCH_USER_SEND, WALLET_SEND } from '../../utils/api';
import DismissKeyboard from '../../component/Common/DismissKeyboard';
import { ResponsiveFont } from '../../utils/ResponsiveFont';
import DropDownInput from '../../component/Common/DropDownInput';
import assetSvg from '../../assets/svg/svg';
import MainTextInput from '../../component/Common/MainTextInput';
import { connect } from 'react-redux';
import { setWalletBalance } from '../../actions/user';
import MainButton from '../../component/Common/MainButton';
import { SCREEN_WIDTH } from '../../utils/constant';
import { CustomToast } from '../../utils/CustomToast';

class WalletTransactionScreen extends Component {
  state = {
    sendPacAmount: null,
    sendPacUser: null,
    userData: [],
    isSearchResultVisible: false,
    isLoading: false,
  };

  searchUser = (query) => {
    if (query === '') {
      this.setState({ userData: [] });
    } else {
      Axios.get(SEARCH_USER_SEND(query))
        .then((res) => {
          this.setState({ userData: res.data.data });
        })
        .catch((err) => console.log(err));
    }
  };

  validateSend = () => {
    const { sendPacAmount, sendPacUser } = this.state;
    if (
      sendPacAmount > 0 &&
      sendPacAmount !== null &&
      sendPacAmount !== '' &&
      sendPacUser !== null
    ) {
      return true;
    }
    return false;
  };

  onChangeSearchUser = (text) => {
    this.setState({ sendPacUser: text });
    this.searchUser(text);
  };

  onChangeAmount = (text) => {
    const number = text.replace(/[^0-9]/g, '');
    this.setState({ sendPacAmount: number });
  };

  onPressSend = () => {
    Keyboard.dismiss();

    const { sendPacAmount, sendPacUser } = this.state;
    const { walletBalance } = this.props;
    const valueSend = sendPacAmount * 10 ** 18;

    if (walletBalance < valueSend) {
      CustomToast('You dont have enough coins', 0, 'error');
    } else {
      setTimeout(() => {
        this.setState({ isLoading: true });
        Axios.post(WALLET_SEND, {
          targetUserId: sendPacUser,
          value: valueSend,
        })
          .then((res) => {
            this.props.dispatchsetWalletBalance({ walletBalance: res.data.data });
            CustomToast('Your coin has been sent successfully', 1000, 'success');
            this.setState({ isLoading: false });
          })
          .catch((err) => {
            console.log(err.response.message);
            this.setState({ isLoading: false });
          });
      }, 2000);
    }
  };

  render() {
    const { userData, isLoading, sendPacAmount } = this.state;
    return (
      <>
        <MainHeader
          title={'Send PAC'}
          leftComponent={'back'}
          rightComponent={() => (
            <TouchableWithoutFeedback onPress={this.onPressSend} disabled={!this.validateSend()}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors['white-1']} />
              ) : (
                <SvgXml
                  xml={assetSvg.header.check}
                  width="24"
                  height="24"
                  style={{ opacity: !this.validateSend() ? 0.7 : 1 }}
                />
              )}
            </TouchableWithoutFeedback>
          )}
        />
        <Screen style={{ margin: 16 }}>
          <DismissKeyboard>
            <Text style={_styles.textMain}>To</Text>
            <DropDownInput
              onChange={this.onChangeSearchUser}
              options={userData.map((user) => user.id)}
              searchable={true}
              placeholder={'Search User'}
            >
              <View style={{ marginTop: 12 }}>
                <Text style={_styles.textMain}>Amount</Text>
                <MainTextInput
                  value={sendPacAmount}
                  keyboardType={'number-pad'}
                  placeholder={'Amount to send'}
                  onChangeText={this.onChangeAmount}
                />
              </View>
            </DropDownInput>
          </DismissKeyboard>
        </Screen>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  walletBalance: state.user.walletBalance,
});

const mapDispatchToProps = {
  dispatchsetWalletBalance: setWalletBalance,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletTransactionScreen);

const _styles = StyleSheet.create({
  textMain: {
    fontFamily: 'Inconsolata-SemiBold',
    color: Colors['white-1'],
    fontSize: ResponsiveFont(15),
    marginBottom: 8,
  },
});
