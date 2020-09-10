import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';

import { getImageUrl } from '../../utils/image';
import Colors from '../../utils/color';
import RoutesName from '../../utils/RoutesName';

const PostMemento = ({ memento }) => {
  const navigation = useNavigation();
  const route = useRoute();

  let isSameRoute = false;
  if (route.name === 'Memento') {
    isSameRoute = memento.id === route.params.memento.id;
  }

  if (memento === null) {
    return null;
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => (isSameRoute ? null : navigation.push(RoutesName.Memento, { memento }))}
    >
      <View style={_styles.mementoView}>
        <FastImage source={{ uri: getImageUrl(memento.img) }} style={_styles.mementoImage} />
        <Text style={_styles.mementoText}>{memento.id}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PostMemento;

const _styles = StyleSheet.create({
  mementoText: {
    fontFamily: 'Inconsolata-Regular',
    fontSize: 14,
    color: Colors['white-1'],
  },
  mementoImage: {
    height: 18,
    width: 18,
    margin: 6,
  },
  mementoView: {
    backgroundColor: Colors['dark-2'],
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
