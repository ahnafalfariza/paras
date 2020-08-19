import React, { useState } from 'react';
import Screen from '../../component/Common/Screen';
import { Text, StyleSheet } from 'react-native';
import Colors from '../../utils/color';
import { TextInput } from 'react-native-gesture-handler';
import MainButton from '../../component/Common/MainButton';
import DismissKeyboard from '../../component/Common/DismissKeyboard';

const numb = Math.floor(Math.random() * 12 + 1);

const SeedConfirmationScreen = ({ route }) => {
  const seedPassword = route.params.seedPassword.split(' ');

  const [confirmText, setConfirmText] = useState(null);
  const onChangeText = (text) => setConfirmText(text);

  const onPress = () => {
    seedPassword[numb - 1] === confirmText ? console.log('true') : console.log('false');
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

export default SeedConfirmationScreen;

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
