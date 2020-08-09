import React from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';

import { getImageUrl } from '../utils/image';
import Colors from '../utils/color';

const MemoryGrant = () => {
  return (
    <>
      <View
        style={{
          marginVertical: 8,
          marginHorizontal: 8,
          paddingHorizontal: 8,
          paddingVertical: 12,
          backgroundColor: Colors['dark-2'],
          borderRadius: 6,
          flexDirection: 'row',
        }}
      >
        <View style={{ flex: 1 }}>
          <FastImage
            source={{
              uri: getImageUrl({
                url: 'QmfWxedXqfhDMDeRZCSecD7YUr7LZkG5iNDHcvj1ytPx59',
                type: 'ipfs',
              }),
            }}
            style={{ width: 48, height: 48, borderRadius: 8 }}
          />
        </View>
        <Text
          style={{
            fontFamily: 'Inconsolata-Regular',
            fontSize: 16,
            color: Colors['white-1'],
            lineHeight: 24,
            flex: 5,
          }}
        >
          <Text>Contribute to </Text>
          <Text style={{ fontFamily: 'Inconsolata-Bold' }}>90nostalgia.music</Text>
          <Text>And get a chance to win $10 for 5 users</Text>
        </Text>
      </View>
      <Text
        style={{
          fontFamily: 'Inconsolata-Bold',
          color: Colors['white-1'],
          padding: 8,
          paddingTop: 0,
          paddingBottom: 16,
          fontSize: 15,
          textAlign: 'right',
        }}
      >
        Learn more about Memory Grant program
      </Text>
    </>
  );
};

export default MemoryGrant;
