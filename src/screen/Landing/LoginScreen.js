import React, { Component } from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback, TextInput } from 'react-native';

import Screen from '../../component/Common/Screen';
import Colors from '../../utils/color';
import MainButton from '../../component/Common/MainButton';
import DismissKeyboard from '../../component/Common/DismissKeyboard';
import RoutesName from '../../utils/RoutesName';

class LoginScreen extends Component {
  state = {
    username: null,
    seedPassword: null,
    isLoading: false,
  };

  onChangeTextUsername = (username) => {
    this.setState({ username });
  };

  onChangeTextSeedPassword = (seedPassword) => {
    this.setState({ seedPassword });
  };

  onPressLogin = () => {
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 3000);
  };

  render() {
    const { username, seedPassword, isLoading } = this.state;

    return (
      <Screen style={{ margin: 16 }}>
        <DismissKeyboard>
          <Text style={{ color: '#ffffff', fontSize: 55 }}>Login</Text>
          <TextInput
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={this.onChangeTextUsername}
            placeholder={'Username'}
            placeholderTextColor={Colors['white-3']}
            selectionColor={Colors['white-1']}
            style={_styles.textInput}
            value={username}
          />
          <TextInput
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={this.onChangeTextSeedPassword}
            placeholder={'Seed Password'}
            placeholderTextColor={Colors['white-3']}
            selectionColor={Colors['white-1']}
            style={_styles.textInput}
            value={seedPassword}
          />
          <MainButton title={'Login'} loading={isLoading} onPress={this.onPressLogin} />
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

export default LoginScreen;

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
