import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import Screen from '../../component/Common/Screen';
import Colors from '../../utils/color';
import MainButton from '../../component/Common/MainButton';
import DismissKeyboard from '../../component/Common/DismissKeyboard';
import Axios from 'axios';
import { CREATE_USER } from '../../utils/api';
import RoutesName from '../../utils/RoutesName';
import { isIOS } from '../../utils/constant';
import { ResponsiveFont } from '../../utils/ResponsiveFont';
import { CustomToast } from '../../utils/CustomToast';

class RegistrationScreen extends Component {
  state = {
    isLoading: false,
  };

  registerUser = ({ username, email }) => {
    Keyboard.dismiss();
    this.setState({ isLoading: true });
    Axios.post(CREATE_USER, { username, email })
      .then(() => {
        setTimeout(() => {
          this.props.navigation.navigate(RoutesName.Verification, { username, email });
          this.setState({ isLoading: false });
        }, 1000);
      })
      .catch((err) => {
        CustomToast(err.response.data.message, 0, 'error', 1000);
        this.setState({ isLoading: false });
      });
  };

  registForm = ({ errors, touched, isValid, handleChange, handleSubmit, setFieldTouched }) => {
    const { isLoading } = this.state;
    return (
      <>
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
        <Text style={_styles.errorText}>
          {touched.username && errors.username ? errors.username : ' '}
        </Text>
        <TextInput
          style={_styles.textInput}
          autoCorrect={false}
          autoCapitalize={'none'}
          selectionColor={Colors['white-1']}
          onChangeText={handleChange('email')}
          onBlur={() => setFieldTouched('email')}
          placeholder={'Email'}
          placeholderTextColor={Colors['white-3']}
          keyboardType={'email-address'}
        />
        <Text style={_styles.errorText}>{touched.email && errors.email ? errors.email : ' '}</Text>
        <MainButton
          title={'Register'}
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
      <Screen style={{ padding: 32, flex: 1 }}>
        <KeyboardAvoidingView
          behavior={isIOS ? 'padding' : 'height'}
          style={{ flex: 1, justifyContent: 'center' }}
        >
          <DismissKeyboard style={{ justifyContent: 'center' }}>
            <Text style={_styles.title}>{'Create\nAccount'}</Text>
            <Formik
              initialValues={{ username: '', email: '' }}
              validationSchema={yup.object().shape({
                username: yup
                  .string()
                  .min(6, 'Minimum 6 characters')
                  // .matches(
                  //   !/^(([a-z\d]+[\-])[a-z\d]+\.)([a-z\d]+[\-])*[a-z\d]+$/,
                  //   'Lowercase alphanumeric symbols separated by either _ or -',
                  // )
                  .required('Username is required'),
                email: yup.string().email('Not a valid e-mail').required('E-mail is required'),
              })}
              onSubmit={this.registerUser}
            >
              {this.registForm}
            </Formik>
            <Text style={_styles.loginText}>
              {'Already have an account? '}
              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.navigate(RoutesName.Login)}
              >
                <Text style={{ fontFamily: 'Inconsolata-Bold' }}>Login</Text>
              </TouchableWithoutFeedback>
            </Text>
          </DismissKeyboard>
        </KeyboardAvoidingView>
      </Screen>
    );
  }
}

export default RegistrationScreen;

const _styles = StyleSheet.create({
  title: {
    fontSize: ResponsiveFont(36),
    color: Colors['white-1'],
    fontFamily: 'Inconsolata-Bold',
    marginBottom: 16,
  },
  textInput: {
    fontFamily: 'Inconsolata-Regular',
    color: Colors['white-1'],
    borderRadius: 4,
    fontSize: ResponsiveFont(16),
    padding: 12,
    backgroundColor: Colors['dark-8'],
  },
  errorText: {
    fontFamily: 'Inconsolata-Regular',
    fontSize: ResponsiveFont(12),
    color: 'red',
    marginBottom: 2,
    marginLeft: 4,
  },
  loginText: {
    fontFamily: 'Inconsolata-Regular',
    color: Colors['white-1'],
    fontSize: ResponsiveFont(13),
    marginTop: 32,
  },
});
