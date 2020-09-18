import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { SvgXml } from 'react-native-svg';
import Axios from 'axios';

import Screen from '../../component/Common/Screen';
import Colors from '../../utils/color';
import { TextInput } from 'react-native-gesture-handler';
import MainButton from '../../component/Common/MainButton';
import DismissKeyboard from '../../component/Common/DismissKeyboard';
import { initUser, initFollowing, setWalletBalance } from '../../actions/user';
import assetSvg from '../../assets/svg/svg';
import { LOGIN, FOLLOWING_LIST, WALLET_BALANCE } from '../../utils/api';
import { ResponsiveFont } from '../../utils/ResponsiveFont';
import { CustomToast } from '../../utils/CustomToast';

const numb = Math.floor(Math.random() * 12 + 1);

const SeedConfirmationScreen = ({
  navigation,
  route,
  dispatchInitUser,
  dispatchInitFollowing,
  dispatchsetWalletBalance,
}) => {
  const { data } = route.params;
  const seedPassword = data.seedPassword.split(' ');

  const [isLoading, setIsLoading] = useState(false);
  const [confirmText, setConfirmText] = useState(null);

  const onChangeText = (text) => setConfirmText(text);

  const onPress = () => {
    Keyboard.dismiss();
    const isCorrect = seedPassword[numb - 1] === confirmText;
    if (isCorrect) {
      setIsLoading(true);
      Axios.post(LOGIN, { userId: data.username + '.paras.testnet', seed: data.seedPassword })
        .then((res) => {
          Axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.data.token;
          getUserFollowing();
          getWalletBalance(res.data.data.profile.id);
          dispatchInitUser(res.data.data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err.response.data));
    } else {
      CustomToast('Please enter the correct word', 0, 'error', 1000);
      setIsLoading(false);
    }
  };

  const getUserFollowing = () => {
    Axios.get(FOLLOWING_LIST).then((res) => {
      dispatchInitFollowing({
        followingList: res.data.data.map((following) => following.targetId),
      });
    });
  };

  const getWalletBalance = (userId) => {
    Axios.get(WALLET_BALANCE(userId)).then((res) => {
      dispatchsetWalletBalance({
        walletBalance: res.data.data,
      });
    });
  };

  return (
    <Screen style={{ margin: 32, flex: 1 }}>
      <DismissKeyboard style={{ justifyContent: 'center' }}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View style={{ position: 'absolute', top: 0 }}>
            <SvgXml xml={assetSvg.header.back} width="24" height="24" />
          </View>
        </TouchableWithoutFeedback>
        <Text style={_styles.textDesc}>{`Whats the ${numb} word?`}</Text>
        <TextInput
          style={_styles.textInput}
          value={confirmText}
          autoCapitalize={'none'}
          selectionColor={Colors['white-1']}
          onChangeText={onChangeText}
        />
        <MainButton title={'CONFIRM'} onPress={onPress} loading={isLoading} />
      </DismissKeyboard>
    </Screen>
  );
};

const mapDispatchToProps = {
  dispatchInitUser: initUser,
  dispatchInitFollowing: initFollowing,
  dispatchsetWalletBalance: setWalletBalance,
};

export default connect(null, mapDispatchToProps)(SeedConfirmationScreen);

const _styles = StyleSheet.create({
  textDesc: {
    fontFamily: 'Inconsolata-SemiBold',
    fontSize: ResponsiveFont(16),
    color: Colors['white-1'],
  },
  textInput: {
    marginTop: 8,
    fontFamily: 'Inconsolata-Regular',
    color: Colors['white-1'],
    borderRadius: 4,
    fontSize: ResponsiveFont(16),
    padding: 12,
    backgroundColor: Colors['dark-8'],
  },
});
