import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  View,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';

import Screen from '../../component/Common/Screen';
import Colors from '../../utils/color';
import MainButton from '../../component/Common/MainButton';
import DismissKeyboard from '../../component/Common/DismissKeyboard';
import RoutesName from '../../utils/RoutesName';
import { LOGIN, WALLET_BALANCE, ALL_FOLLOWING_LIST } from '../../utils/api';
import { initUser, initFollowing, setWalletBalance } from '../../actions/user';
import { isIOS } from '../../utils/constant';
import { ResponsiveFont } from '../../utils/ResponsiveFont';
import { CustomToast } from '../../utils/CustomToast';

class LoginScreen extends Component {
  state = {
    isLoading: false,
  };

  onPressLogin = ({ username, seedpassword }) => {
    Keyboard.dismiss();
    const userId = `${username}.paras.testnet`;
    this.setState({ isLoading: true });

    Axios.post(LOGIN, { userId: userId, seed: seedpassword })
      .then((res) => {
        Axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.data.token;
        this.getUserFollowing();
        this.getWalletBalance(res.data.data.profile.id);
        this.props.dispatchInitUser(res.data.data);
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        CustomToast(err.response.data.message, 0, 'error', 1000);
        this.setState({ isLoading: false });
      });
  };

  getUserFollowing = () => {
    Axios.get(ALL_FOLLOWING_LIST).then((res) => {
      this.props.dispatchInitFollowing({
        followingList: res.data.data.map((following) => following.targetId),
      });
    });
  };

  getWalletBalance = (userId) => {
    Axios.get(WALLET_BALANCE(userId)).then((res) => {
      this.props.dispatchsetWalletBalance({
        walletBalance: res.data.data,
      });
    });
  };

  loginForm = ({
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleSubmit,
    setFieldTouched,
    setFieldValue,
  }) => {
    const { isLoading } = this.state;
    return (
      <>
        <View style={_styles.formContainer}>
          <TextInput
            value={values['username']}
            style={_styles.textInput}
            autoCorrect={false}
            autoCapitalize={'none'}
            selectionColor={Colors['white-1']}
            onBlur={() => setFieldTouched('username')}
            onChangeText={handleChange('username')}
            placeholder={'Username'}
            placeholderTextColor={Colors['white-3']}
          />
          <Text style={_styles.textHelper}>.paras.testnet</Text>
        </View>
        <Text style={_styles.errorText}>
          {touched.username && errors.username ? errors.username : ' '}
        </Text>
        <View style={_styles.formContainer}>
          <TextInput
            value={values['seedpassword']}
            style={[_styles.textInput, { paddingRight: 12 }]}
            autoCorrect={false}
            autoCapitalize={'none'}
            selectionColor={Colors['white-1']}
            onChangeText={handleChange('seedpassword')}
            onBlur={() => setFieldTouched('seedpassword')}
            placeholder={'Seed Password'}
            placeholderTextColor={Colors['white-3']}
            keyboardType={'default'}
            secureTextEntry
          />
          <TouchableWithoutFeedback
            onPress={async () => {
              const seedPassword = await Clipboard.getString();
              setFieldValue('seedpassword', seedPassword);
            }}
          >
            <Text style={_styles.textHelper}>paste</Text>
          </TouchableWithoutFeedback>
        </View>
        <Text style={_styles.errorText}>
          {touched.seedpassword && errors.seedpassword ? errors.seedpassword : ' '}
        </Text>
        <MainButton
          title={'Login'}
          onPress={handleSubmit}
          loading={isLoading}
          containerStyle={{ width: 120, marginBottom: 0 }}
          disabled={!isValid}
        />
      </>
    );
  };

  render() {
    return (
      <Screen style={{ flex: 1, padding: 32 }}>
        <KeyboardAvoidingView
          behavior={isIOS ? 'padding' : 'height'}
          style={{ flex: 1, justifyContent: 'center' }}
        >
          <DismissKeyboard style={{ justifyContent: 'center' }}>
            <Text style={_styles.title}>{'Welcome\nBack'}</Text>
            <Formik
              initialValues={{ username: '', seedpassword: '' }}
              validationSchema={yup.object().shape({
                username: yup.string().required('Username is required'),
                seedpassword: yup
                  .string()
                  .required('Seed password is required. It contains 12 words as signature'),
              })}
              onSubmit={this.onPressLogin}
            >
              {this.loginForm}
            </Formik>
            <Text style={_styles.registText}>
              {'Dont have an account? '}
              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.navigate(RoutesName.Registration)}
              >
                <Text style={{ fontFamily: 'Inconsolata-Bold' }}>Sign up</Text>
              </TouchableWithoutFeedback>
            </Text>
          </DismissKeyboard>
        </KeyboardAvoidingView>
      </Screen>
    );
  }
}

const mapDispatchToProps = {
  dispatchInitUser: initUser,
  dispatchInitFollowing: initFollowing,
  dispatchsetWalletBalance: setWalletBalance,
};

export default connect(null, mapDispatchToProps)(LoginScreen);

const _styles = StyleSheet.create({
  title: {
    fontSize: ResponsiveFont(36),
    color: Colors['white-1'],
    fontFamily: 'Inconsolata-Bold',
    marginBottom: 16,
  },
  formContainer: {
    borderRadius: 4,
    backgroundColor: Colors['dark-8'],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    fontFamily: 'Inconsolata-Regular',
    color: Colors['white-1'],
    fontSize: ResponsiveFont(16),
    padding: 12,
    paddingRight: 4,
    flex: 1,
  },
  textHelper: {
    fontFamily: 'Inconsolata-Regular',
    fontSize: ResponsiveFont(14),
    color: Colors['white-1'],
    marginRight: 16,
  },
  errorText: {
    fontFamily: 'Inconsolata-Regular',
    fontSize: ResponsiveFont(12),
    color: 'red',
    marginBottom: 2,
    marginLeft: 4,
  },
  registText: {
    fontFamily: 'Inconsolata-Regular',
    color: Colors['white-1'],
    fontSize: ResponsiveFont(13),
    marginTop: 32,
  },
});
