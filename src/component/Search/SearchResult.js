import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

import { getImageUrl } from '../../utils/image';
import Colors from '../../utils/color';
import { useNavigation } from '@react-navigation/native';
import RoutesName from '../../utils/RoutesName';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

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
  const navigation = useNavigation();

  const isTypeUser = item.type === 'user';
  const navigationRoutes = isTypeUser ? RoutesName.UserProfile : RoutesName.Memento;
  const navigationParams = isTypeUser ? { user: item } : { memento: item };

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate(navigationRoutes, navigationParams)}
    >
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
              fontSize: ResponsiveFont(15),
              color: Colors['white-1'],
              marginLeft: 8,
            }}
          >
            {item.id}
          </Text>
        </View>
        <View />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchResultList;
