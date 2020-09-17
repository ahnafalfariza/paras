import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import Colors from '../../utils/color';
import { getImageUrl } from '../../utils/image';
import RoutesName from '../../utils/RoutesName';
import { SCREEN_WIDTH } from '../../utils/constant';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

const Memento = ({ data, isNewPost }) => {
  const navigation = useNavigation();

  const onPressMemento = () => {
    if (isNewPost) {
      navigation.navigate(RoutesName.NewPost, { mementoData: data });
    } else {
      navigation.navigate(RoutesName.Memento, { memento: data });
    }
  };

  return (
    <View style={{ marginVertical: 4 }}>
      <TouchableNativeFeedback onPress={onPressMemento}>
        <View>
          <FastImage source={{ uri: getImageUrl(data.img) }} style={_styles.mementoImage} />
          <Text style={_styles.mementoText}>{data.id}</Text>
          <Text style={_styles.typeText}>{data.type.toUpperCase()}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const MementoListSquare = ({ list, header, isNewPost = true }) => {
  return (
    <FlatList
      data={list}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Memento isNewPost={isNewPost} data={item} />}
      numColumns={2}
      ListHeaderComponent={header}
      ListHeaderComponentStyle={{ marginTop: 4 }}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      contentContainerStyle={{ padding: 16 }}
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
