import React, { useState } from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';

import MainTextInput from './MainTextInput';
import { SCREEN_WIDTH } from '../../utils/constant';
import Colors from '../../utils/color';

const DropDownInput = ({ options, onChange, placeholder, searchable }) => {
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
          typeof choosenOpt !== 'undefined' ? setText(choosenOpt) : setText('');
          setShowOptions(false);
        }}
      />
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
    fontSize: 18,
    padding: 10,
  },
});
