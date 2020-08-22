import React, { useState } from 'react';
import { Text, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';

import Screen from '../../component/Common/Screen';
import Colors from '../../utils/color';
import { TextInput } from 'react-native-gesture-handler';
import MainButton from '../../component/Common/MainButton';
import DismissKeyboard from '../../component/Common/DismissKeyboard';
import { initUser } from '../../actions/user';

const numb = Math.floor(Math.random() * 12 + 1);

const SeedConfirmationScreen = ({ navigation, route, dispatchInitUser }) => {
  const { data } = route.params;
  const seedPassword = data.seedPassword.split(' ');

  const [confirmText, setConfirmText] = useState(null);
  const onChangeText = (text) => setConfirmText(text);

  const onPress = () => {
    const isCorrect = seedPassword[numb - 1] === confirmText;
    if (isCorrect) {
      dispatchInitUser(data);
    } else {
      Alert.alert(
        'Error',
        'Please enter the correct word',
        [{ text: 'OK', onPress: () => navigation.goBack() }],
        { cancelable: false },
      );
    }
  };

  return (
    <Screen style={{ margin: 32, flex: 1 }}>
      <DismissKeyboard style={{ justifyContent: 'center' }}>
        <Text style={_styles.textDesc}>{`Whats the ${numb} word?`}</Text>
        <TextInput
          style={_styles.textInput}
          value={confirmText}
          autoCapitalize={'none'}
          selectionColor={Colors['white-1']}
          onChangeText={onChangeText}
        />
        <MainButton title={'Confirm'} onPress={onPress} />
      </DismissKeyboard>
    </Screen>
  );
};

const mapDispatchToProps = {
  dispatchInitUser: initUser,
};

export default connect(null, mapDispatchToProps)(SeedConfirmationScreen);

const _styles = StyleSheet.create({
  textDesc: {
    fontFamily: 'Inconsolata-SemiBold',
    fontSize: 20,
    color: Colors['white-1'],
  },
  textInput: {
    marginTop: 8,
    fontFamily: 'Inconsolata-Regular',
    color: Colors['white-1'],
    borderRadius: 4,
    fontSize: 20,
    padding: 12,
    backgroundColor: Colors['dark-8'],
  },
});