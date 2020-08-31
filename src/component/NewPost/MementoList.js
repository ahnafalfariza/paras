import React from 'react';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { View, Text, FlatList } from 'react-native';
import Colors from '../../utils/color';
import FastImage from 'react-native-fast-image';
import { getImageUrl } from '../../utils/image';

const Memento = ({ data }) => {
  return (
    <View style={{ marginVertical: 4 }}>
      <TouchableNativeFeedback onPress={() => console.log('pressed', data.id)}>
        <View
          style={{
            flexDirection: 'row',
            padding: 8,
            backgroundColor: Colors['dark-8'],
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 6,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FastImage
              source={{ uri: getImageUrl(data.img) }}
              style={{ height: 28, width: 28, marginRight: 8 }}
            />
            <Text
              style={{ fontFamily: 'Inconsolata-Bold', color: Colors['white-1'], fontSize: 18 }}
            >
              {data.id}
            </Text>
          </View>
          <Text
            style={{ fontFamily: 'Inconsolata-Regular', color: Colors['primary-5'], fontSize: 16 }}
          >
            {data.type.toUpperCase()}
          </Text>
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
      contentContainerStyle={{ marginVertical: 4 }}
    />
  );
};

export default MementoList;
