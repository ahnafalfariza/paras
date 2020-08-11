import React from 'react';
import { View, Text } from 'react-native';
import { TouchableNativeFeedback, FlatList } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

import { getImageUrl } from '../../utils/image';
import Colors from '../../utils/color';

const SearchResultList = ({ result }) => {
  const renderItem = ({ item }) => <SearchResult item={item} />;

  return (
    <FlatList
      data={result}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ margin: 8, paddingBottom: 16 }}
    />
  );
};

const SearchResult = ({ item }) => {
  return (
    <TouchableNativeFeedback onPress={() => console.log('go to search result')}>
      <View style={{ margin: 8, borderRadius: 4, overflow: 'hidden' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 8,
            backgroundColor: Colors['dark-4'],
          }}
        >
          <FastImage
            source={{ uri: getImageUrl(item.img) }}
            style={{ height: 28, width: 28, margin: 4 }}
          />
          <Text
            style={{
              fontFamily: 'Inconsolata-Bold',
              fontSize: 18,
              color: Colors['white-1'],
              marginLeft: 8,
            }}
          >
            {item.id}
          </Text>
        </View>
        <View></View>
      </View>
    </TouchableNativeFeedback>
  );
};

const smallPost = () => {
  return (
    <FastImage
      source={{ uri: getImageUrl(data.postList[0]) }}
      style={{ height: 28, width: 28, margin: 4 }}
    />
  );
};

export default SearchResultList;
