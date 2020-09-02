import React from 'react';
import { TouchableNativeFeedback, View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

import RoutesName from '../../utils/RoutesName';
import { getImageUrl } from '../../utils/image';
import Colors from '../../utils/color';

const ChooseMemento = ({ mementoData }) => {
  const navigation = useNavigation();

  return (
    <TouchableNativeFeedback onPress={() => navigation.navigate(RoutesName.ChooseMemento)}>
      <View>
        <Text style={_styles.defaultText}>Choose a memento</Text>
        {mementoData ? (
          <View style={_styles.containerView}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FastImage
                source={{ uri: getImageUrl(mementoData.img) }}
                style={_styles.mementoImage}
              />
              <Text style={_styles.mementoText}>{mementoData.id}</Text>
            </View>
          </View>
        ) : (
          <View style={_styles.defaultMementoView}>
            <Text style={_styles.defaultText}>{'Memento...'}</Text>
          </View>
        )}
      </View>
    </TouchableNativeFeedback>
  );
};

export default ChooseMemento;

const _styles = StyleSheet.create({
  defaultText: {
    fontFamily: 'Inconsolata-Bold',
    color: Colors['white-1'],
    fontSize: 18,
  },
  defaultMementoView: {
    backgroundColor: Colors['dark-8'],
    padding: 14,
    marginVertical: 16,
    borderRadius: 8,
  },
  containerView: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: Colors['dark-8'],
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    marginVertical: 16,
  },
  mementoImage: {
    height: 28,
    width: 28,
    marginRight: 8,
  },
  mementoText: {
    fontFamily: 'Inconsolata-Bold',
    color: Colors['white-1'],
    fontSize: 18,
  },
});
