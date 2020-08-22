import React, { Component } from 'react';
import { Text, StyleSheet, TextInput, TouchableWithoutFeedback, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import Screen from '../../component/Common/Screen';
import Colors from '../../utils/color';
import MainButton from '../../component/Common/MainButton';
import DismissKeyboard from '../../component/Common/DismissKeyboard';
import Axios from 'axios';
import { CREATE_USER } from '../../utils/api';
import RoutesName from '../../utils/RoutesName';

class RegistrationScreen extends Component {
  state = {
    isLoading: false,
  };

  registerUser = ({ username, email }) => {
    this.setState({ isLoading: true });
    Axios.post(CREATE_USER, { username, email })
      .then(() => {
        setTimeout(() => {
          this.props.navigation.navigate(RoutesName.Verification, { username, email });
          this.setState({ isLoading: false });
        }, 1000);
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
        <Text style={{ fontSize: 10, color: 'red' }}>
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
        <Text style={{ fontSize: 10, color: 'red' }}>
          {touched.email && errors.email ? errors.email : ' '}
        </Text>
        <MainButton
          title={'Register'}
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
          <Text style={{ color: '#ffffff', fontSize: 55 }}>Registration</Text>
          <Formik
            initialValues={{ username: '', email: '' }}
            validationSchema={yup.object().shape({
              username: yup
                .string()
                .min(6, 'Minimum 6 characters')
                .required('Username is required'),
              email: yup.string().email('Not a valid e-mail').required('E-mail is required'),
            })}
            onSubmit={this.registerUser}
          >
            {this.registForm}
          </Formik>
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.navigate(RoutesName.Login)}
          >
            <Text style={{ fontFamily: 'Inconsolata-Regular', color: Colors['white-1'] }}>
              Already have an account? Login
            </Text>
          </TouchableWithoutFeedback>
        </DismissKeyboard>
      </Screen>
    );
  }
}

export default RegistrationScreen;

const _styles = StyleSheet.create({
  textInput: {
    fontFamily: 'Inconsolata-Regular',
    color: Colors['white-1'],
    borderRadius: 4,
    fontSize: 20,
    padding: 12,
    backgroundColor: Colors['dark-8'],
  },
});