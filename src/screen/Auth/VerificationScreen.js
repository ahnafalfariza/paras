import React, { useState } from 'react';
import { Text, StyleSheet, View, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Axios from 'axios';

import Screen from '../../component/Common/Screen';
import Colors from '../../utils/color';
import MainButton from '../../component/Common/MainButton';
import RoutesName from '../../utils/RoutesName';
import { VERIFY_USER } from '../../utils/api';
import DismissKeyboard from '../../component/Common/DismissKeyboard';

const CELL_COUNT = 6;

const VerificationScreen = ({ navigation, route }) => {
  const [value, setValue] = useState('');
  const [isLoading, setLoading] = useState(false);

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  const { email, username } = route.params;

  const onPressVerify = () => {
    setLoading(true);
    Axios.post(VERIFY_USER, { pin: value, email })
      .then((res) => {
        navigation.navigate(RoutesName.SeedPassword, {
          data: {
            seedPassword: res.data.data.seedPassword,
            username: username,
          },
        });
        setLoading(false);
      })
      .catch((err) => {
        Alert.alert(
          'Error',
          err.response.data.message,
          [{ text: 'OK', onPress: () => setLoading(false) }],
          { cancelable: false },
        );
      });
  };

  return (
    <Screen style={{ margin: 24, flex: 1, justifyContent: 'center' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, justifyContent: 'center' }}
      >
        <DismissKeyboard style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={_styles.title}>{'Verification'}</Text>
          <Text style={_styles.subTitle}>{"We've just sent you an email to"}</Text>
          <Text style={[_styles.subTitle, { fontFamily: 'Inconsolata-Bold' }]}>{email}</Text>
          <CodeField
            ref={ref}
            {...props}
            autoFocus
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={_styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View
                onLayout={getCellOnLayoutHandler(index)}
                key={index}
                style={[_styles.cellRoot, isFocused && _styles.focusCell]}
              >
                <Text style={_styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
              </View>
            )}
          />
          <MainButton
            title={'VERIFY'}
            loading={isLoading}
            containerStyle={{ marginTop: 32 }}
            onPress={onPressVerify}
          />
          <Text style={[_styles.subTitle, { marginTop: 32 }]}>
            {"Didn't receive email? resend"}
          </Text>
        </DismissKeyboard>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default VerificationScreen;

const _styles = StyleSheet.create({
  title: {
    fontSize: 32,
    color: Colors['white-1'],
    fontFamily: 'Inconsolata-Bold',
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 16,
    color: Colors['white-1'],
    fontFamily: 'Inconsolata-Regular',
  },
  codeFieldRoot: {
    marginTop: 24,
  },
  cellRoot: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
  },
  cellText: {
    lineHeight: 48,
    fontSize: 24,
    textAlign: 'center',
    color: Colors['white-1'],
  },
  focusCell: {
    borderColor: Colors['white-1'],
  },
});
