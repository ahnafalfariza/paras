import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import Screen from '../../component/Common/Screen';
import Colors from '../../utils/color';
import MainButton from '../../component/Common/MainButton';
import DismissKeyboard from '../../component/Common/DismissKeyboard';
import Axios from 'axios';
import { CREATE_USER } from '../../utils/api';
import RoutesName from '../../utils/RoutesName';

class RegistrationScreen extends Component {
  registerUser = () => {
    console.log('masuk register');
    Axios.post(CREATE_USER, { username: 'test-11', email: 'riqi.asdf@gmail.com' })
      .then((res) => console.log('res', res))
      .catch((err) => console.log('err', err.response.data));
    this.props.navigation.navigate(RoutesName.Verification);
  };

  render() {
    return (
      <Screen style={{ margin: 16 }}>
        <DismissKeyboard>
          <Text style={{ color: '#ffffff', fontSize: 55 }}>Registration</Text>
          <TextInput
            style={_styles.textInput}
            autoCorrect={false}
            autoCapitalize={'none'}
            selectionColor={Colors['white-1']}
            placeholder={'Username'}
            placeholderTextColor={Colors['white-3']}
          />
          <TextInput
            style={_styles.textInput}
            autoCorrect={false}
            autoCapitalize={'none'}
            selectionColor={Colors['white-1']}
            placeholder={'Email'}
            placeholderTextColor={Colors['white-3']}
            keyboardType={'email-address'}
          />
          <MainButton title={'Register'} onPress={this.registerUser} />
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
