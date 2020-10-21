import React, { useState } from 'react';
import {
  View,
  Text,
  Keyboard,
  StyleSheet,
  FlatList as RNFlatlist,
  TouchableWithoutFeedback as RNTouchable,
} from 'react-native';
import {
  FlatList as RNGHFlatList,
  TouchableWithoutFeedback as RNGHTouchable,
} from 'react-native-gesture-handler';

import MainTextInput from './MainTextInput';
import { isIOS, SCREEN_WIDTH } from '../../utils/constant';
import Colors from '../../utils/color';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

const FlatList = (props) => {
  return isIOS ? <RNFlatlist {...props} /> : <RNGHFlatList {...props} />;
};

const TouchableWithoutFeedback = (props) => {
  return isIOS ? <RNTouchable {...props} /> : <RNGHTouchable {...props} />;
};

const DropDownInput = ({ options, onChange, placeholder, searchable = true, children }) => {
  const [text, setText] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const filteredOptions = options.filter((opt) => opt.toLowerCase().includes(text.toLowerCase()));

  return (
    <View style={{ zIndex: showOptions ? 1 : 0, marginBottom: 12 }}>
      <MainTextInput
        value={text}
        onChangeText={(value) => {
          setText(value);
          onChange(value);
        }}
        placeholder={placeholder}
        onFocus={() => setShowOptions(true)}
        onBlur={() => {
          const choosenOpt = filteredOptions.find(
            (opt) => opt.toLowerCase() === text.toLowerCase(),
          );
          if (typeof choosenOpt !== 'undefined') {
            setText(choosenOpt);
          } else {
            setText('');
            onChange(null);
          }
          setShowOptions(false);
        }}
      />
      {children}
      {showOptions && (
        <View style={_styles.optionsView}>
          <FlatList
            data={searchable ? filteredOptions : options}
            bounces={false}
            keyboardShouldPersistTaps={'always'}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  setText(item);
                  setShowOptions(false);
                  onChange(item);
                  Keyboard.dismiss();
                }}
              >
                <View>
                  <Text style={_styles.optionsText}>{item}</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default DropDownInput;

const _styles = StyleSheet.create({
  optionsView: {
    backgroundColor: Colors['dark-16'],
    width: SCREEN_WIDTH - 32,
    maxHeight: 180,
    position: 'absolute',
    top: 50,
    marginTop: 4,
    borderRadius: 4,
  },
  optionsText: {
    fontFamily: 'Inconsolata-Regular',
    color: Colors['white-1'],
    fontSize: ResponsiveFont(15),
    padding: 10,
  },
});
