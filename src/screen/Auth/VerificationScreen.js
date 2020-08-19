import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import Screen from '../../component/Common/Screen';
import Colors from '../../utils/color';
import MainButton from '../../component/Common/MainButton';
import RoutesName from '../../utils/RoutesName';

const CELL_COUNT = 6;

const VerificationScreen = ({ navigation }) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  return (
    <Screen style={{ margin: 24, flex: 1, justifyContent: 'center' }}>
      <Text style={_styles.title}>{'Verification'}</Text>
      <Text style={_styles.subTitle}>{"We've just sent you email verification"}</Text>
      <CodeField
        ref={ref}
        {...props}
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
        title={'Verify'}
        buttonStyle={{ marginTop: 32 }}
        onPress={() => navigation.navigate(RoutesName.SeedPassword)}
      />
    </Screen>
  );
};

export default VerificationScreen;

const _styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: Colors['white-1'],
    fontFamily: 'Inconsolata-Bold',
  },

  subTitle: {
    fontSize: 16,
    color: Colors['white-1'],
    fontFamily: 'Inconsolata-Regular',
  },

  codeFieldRoot: {
    marginTop: 20,
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
