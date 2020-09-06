import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';

import Colors from '../../utils/color';
import { SCREEN_WIDTH } from '../../utils/constant';

const ListMoreOption = ({ data }) => {
  return (
    <View style={_styles.containerView}>
      {data.map((item) => (
        <TouchableNativeFeedback key={item.title} onPress={item.onPress}>
          <View style={_styles.itemView}>
            <Text style={_styles.itemText}>{item.title}</Text>
          </View>
        </TouchableNativeFeedback>
      ))}
    </View>
  );
};

export default ListMoreOption;

const _styles = StyleSheet.create({
  containerView: {
    backgroundColor: 'white',
    justifyContent: 'center',
    marginHorizontal: 42,
    borderRadius: 6,
    width: SCREEN_WIDTH - 120,
    overflow: 'hidden',
  },
  itemView: {
    padding: 16,
    width: '100%',
    backgroundColor: Colors['dark-4'],
  },
  itemText: {
    fontFamily: 'Inconsolata-Bold',
    color: Colors['white-1'],
    fontSize: 18,
  },
});
