import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableNativeFeedback,
} from 'react-native';
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
import { CREATE_USER, VERIFY_USER } from '../../utils/api';
import DismissKeyboard from '../../component/Common/DismissKeyboard';
import { ResponsiveFont } from '../../utils/ResponsiveFont';
import { CustomToast } from '../../utils/CustomToast';

const CELL_COUNT = 6;

const VerificationScreen = ({ navigation, route }) => {
  const [value, setValue] = useState('');
  const [isLoading, setLoading] = useState(false);

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  const { email, username } = route.params;

  const resendVerification = () => {
    Axios.post(CREATE_USER, { username, email })
      .then(() => {
        CustomToast('Verification code sent, check your email', 0, 'default', 1000);
      })
      .catch((err) => {
        CustomToast(err.response.data.message, 0, 'error', 1000);
      });
  };

  const onPressVerify = () => {
    Keyboard.dismiss();
    setLoading(true);
    Axios.post(VERIFY_USER, { pin: value, email })
      .then((res) => {
        const params = { data: { seedPassword: res.data.data.seedPassword, username: username } };
        navigation.reset({
          index: 0,
          routes: [
            { name: RoutesName.Registration },
            { name: RoutesName.SeedPassword, params: params },
          ],
        });
        setLoading(false);
      })
      .catch((err) => {
        CustomToast(err.response.data.message, 0, 'error', 1000);
        setLoading(false);
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
            {"Didn't receive email? "}
            <TouchableNativeFeedback onPress={resendVerification}>
              <Text style={{ fontFamily: 'Inconsolata-Bold' }}>Resend</Text>
            </TouchableNativeFeedback>
          </Text>
        </DismissKeyboard>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default VerificationScreen;

const _styles = StyleSheet.create({
  title: {
    fontSize: ResponsiveFont(28),
    color: Colors['white-1'],
    fontFamily: 'Inconsolata-Bold',
    marginBottom: 12,
  },
  subTitle: {
    fontSize: ResponsiveFont(14),
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
    fontSize: ResponsiveFont(20),
    textAlign: 'center',
    color: Colors['white-1'],
  },
  focusCell: {
    borderColor: Colors['white-1'],
  },
});
