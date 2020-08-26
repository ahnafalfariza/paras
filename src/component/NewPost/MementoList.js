import React from 'react';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { View, Text, FlatList } from 'react-native';
import Colors from '../../utils/color';
import FastImage from 'react-native-fast-image';
import { getImageUrl } from '../../utils/image';

const data = {
  category: 'info',
  createdAt: '1598275027406388744',
  desc: 'My Timeline',
  id: 'timeline.userparas',
  img: { type: 'ipfs', url: 'QmYqaLrzfy5q36kphw3CCzLgkcpfPfGkZCQ326oKYde9to' },
  isArchive: false,
  name: 'timeline',
  owner: 'userparas.paras.testnet',
  type: 'personal',
  user: {
    _id: '5f43bdbf1c16141953324357',
    bio: '',
    createdAt: '1598275005976265013',
    id: 'userparas.paras.testnet',
    imgAvatar: [Object],
  },
};

const Memento = () => {
  return (
    <View style={{ marginVertical: 4 }}>
      <TouchableNativeFeedback onPress={() => console.log('object')}>
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

const MementoList = () => {
  return (
    <FlatList
      data={[1, 2, 3, 4]}
      renderItem={Memento}
      contentContainerStyle={{ marginVertical: 4 }}
    />
  );
};

export default MementoList;
