import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import Colors from '../../utils/color';
import { getImageUrl } from '../../utils/image';
import RoutesName from '../../utils/RoutesName';
import { SCREEN_WIDTH } from '../../utils/constant';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

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
    fontSize: ResponsiveFont(15),
    marginTop: 8,
    width: SCREEN_WIDTH / 2 - 24,
  },
  typeText: {
    fontFamily: 'Inconsolata-Regular',
    color: Colors['primary-5'],
    fontSize: ResponsiveFont(14),
    marginBottom: 16,
  },
});
