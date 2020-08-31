import React from 'react';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import Colors from '../../utils/color';
import { getImageUrl } from '../../utils/image';
import RoutesName from '../../utils/RoutesName';

const Memento = ({ data }) => {
  const navigation = useNavigation();
  return (
    <View style={{ marginVertical: 4 }}>
      <TouchableNativeFeedback
        onPress={() => navigation.navigate(RoutesName.NewPost, { mementoData: data })}
      >
        <View style={_styles.containerView}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FastImage source={{ uri: getImageUrl(data.img) }} style={_styles.mementoImage} />
            <Text style={_styles.mementoText}>{data.id}</Text>
          </View>
          <Text style={_styles.typeText}>{data.type.toUpperCase()}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const MementoList = ({ list }) => {
  return (
    <FlatList
      data={list}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Memento data={item} />}
      keyboardShouldPersistTaps={'always'}
      contentContainerStyle={{ marginVertical: 4 }}
    />
  );
};

export default MementoList;

const _styles = StyleSheet.create({
  containerView: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: Colors['dark-8'],
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 6,
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
  typeText: {
    fontFamily: 'Inconsolata-Regular',
    color: Colors['primary-5'],
    fontSize: 16,
  },
});
