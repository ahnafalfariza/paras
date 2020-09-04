import React from 'react';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import Colors from '../../utils/color';
import { getImageUrl } from '../../utils/image';
import RoutesName from '../../utils/RoutesName';
import { SCREEN_WIDTH } from '../../utils/constant';

const Memento = ({ data }) => {
  const navigation = useNavigation();
  return (
    <View style={{ marginVertical: 4 }}>
      <TouchableNativeFeedback
        onPress={() => navigation.navigate(RoutesName.NewPost, { mementoData: data })}
      >
        <View>
          <FastImage source={{ uri: getImageUrl(data.img) }} style={_styles.mementoImage} />
          <Text style={_styles.mementoText}>{data.id}</Text>
          <Text style={_styles.typeText}>{data.type.toUpperCase()}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const MementoListSquare = ({ list, header }) => {
  return (
    <FlatList
      data={list}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Memento data={item} />}
      numColumns={2}
      ListHeaderComponent={header}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      keyboardShouldPersistTaps={'always'}
      contentContainerStyle={{ marginVertical: 4 }}
      style={{ marginTop: 4 }}
    />
  );
};

export default MementoListSquare;

const _styles = StyleSheet.create({
  mementoImage: {
    height: SCREEN_WIDTH / 2 - 24,
    width: SCREEN_WIDTH / 2 - 24,
    borderRadius: 12,
  },
  mementoText: {
    fontFamily: 'Inconsolata-Bold',
    color: Colors['white-1'],
    fontSize: 18,
    marginTop: 8,
    width: SCREEN_WIDTH / 2 - 24,
  },
  typeText: {
    fontFamily: 'Inconsolata-Regular',
    color: Colors['primary-5'],
    fontSize: 16,
    marginBottom: 16,
  },
});
