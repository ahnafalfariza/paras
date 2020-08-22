import React, { Component } from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback, TextInput, Alert, View } from 'react-native';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';

import Screen from '../../component/Common/Screen';
import Colors from '../../utils/color';
import MainButton from '../../component/Common/MainButton';
import DismissKeyboard from '../../component/Common/DismissKeyboard';
import RoutesName from '../../utils/RoutesName';
import { LOGIN, PROFILE_URL } from '../../utils/api';
import { initUser } from '../../actions/user';

class LoginScreen extends Component {
  state = {
    isLoading: false,
  };

  onPressLogin = ({ username, seedpassword }) => {
    const userId = `${username}.paras.testnet`;
    this.setState({ isLoading: true });

    Axios.post(LOGIN, { userId: userId, seed: seedpassword })
      .then((res) => {
        Axios.defaults.headers.common['Authorization'] = res.data.data;
        this.getUserData(userId, res);
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        Alert.alert(
          'Error',
          err.response.data.message,
          [{ text: 'OK', onPress: () => this.setState({ isLoading: false }) }],
          { cancelable: false },
        );
      });
  };

  getUserData = (userId, token) => {
    Axios.get(PROFILE_URL(userId)).then((profileres) => {
      // console.log('responnya', profileres.data.data);
      this.props.dispatchInitUser({
        profile: profileres.data.data[0],
        token: token,
      });
    });
  };

  loginForm = ({ errors, touched, isValid, handleChange, handleSubmit, setFieldTouched }) => {
    const { isLoading } = this.state;
    return (
      <>
        <View style={_styles.formContainer}>
          <TextInput
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
        <Text style={{ fontSize: 10, color: 'red' }}>
          {touched.username && errors.username ? errors.username : ' '}
        </Text>
        <View style={_styles.formContainer}>
          <TextInput
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
          <Text style={_styles.textHelper}>paste</Text>
        </View>
        <Text style={{ fontSize: 10, color: 'red' }}>
          {touched.seedpassword && errors.seedpassword ? errors.seedpassword : ' '}
        </Text>
        <MainButton
          title={'Login'}
          onPress={handleSubmit}
          loading={isLoading}
          disabled={!isValid}
        />
      </>
    );
  };

  render() {
    return (
      <Screen style={{ margin: 16 }}>
        <DismissKeyboard>
          <Text style={{ color: '#ffffff', fontSize: 55 }}>Login</Text>
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
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.navigate(RoutesName.Registration)}
          >
            <Text style={{ fontFamily: 'Inconsolata-Regular', color: Colors['white-1'] }}>
              Dont have an account? Sign up
            </Text>
          </TouchableWithoutFeedback>
        </DismissKeyboard>
      </Screen>
    );
  }
}

const mapDispatchToProps = {
  dispatchInitUser: initUser,
};

export default connect(null, mapDispatchToProps)(LoginScreen);

const _styles = StyleSheet.create({
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
    fontSize: 20,
    padding: 12,
    paddingRight: 4,
    flex: 1,
  },
  textHelper: {
    fontFamily: 'Inconsolata-Bold',
    fontSize: 18,
    color: Colors['white-1'],
    marginRight: 16,
  },
});
