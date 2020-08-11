import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

import { getImageUrl } from '../../utils/image';
import Colors from '../../utils/color';

const PostMemento = ({ memento }) => {
  return (
    <TouchableNativeFeedback onPress={() => console.log('go to memento')}>
      <View
        style={{
          backgroundColor: Colors['dark-2'],
          padding: 6,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FastImage
          source={{ uri: getImageUrl(memento.img) }}
          style={{ height: 18, width: 18, margin: 6 }}
        />
        <Text style={_styles.memento}>{memento.id}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default PostMemento;

const _styles = StyleSheet.create({
  memento: {
    fontFamily: 'Inconsolata-SemiBold',
    fontSize: 16,
    color: Colors['white-1'],
  },
});
