import React from 'react';
import { View, Text } from 'react-native';
import Colors from '../../../utils/color';
import FastImage from 'react-native-fast-image';
import { getImageUrl } from '../../../utils/image';

const LinkContent = ({ body }) => {
  const link = JSON.parse(body);
  return (
    <View
      style={{
        flex: 1,
        margin: 6,
        backgroundColor: Colors['dark-2'],
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      <View style={{ height: '60%' }}>
        <FastImage
          style={{ width: '100%', height: '100%', opacity: 0.5 }}
          source={{ uri: getImageUrl(link.img) }}
        />
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{ fontFamily: 'Inconsolata-ExtraBold', fontSize: 28, color: Colors['white-1'] }}
          >
            {link.title}
          </Text>
        </View>
      </View>
      <View style={{ height: '30%', padding: 12, justifyContent: 'center' }}>
        <Text
          style={{
            fontFamily: 'Inconsolata-SemiBold',
            fontSize: 18,
            color: Colors['white-1'],
          }}
        >
          {link.desc}
        </Text>
      </View>
      <View
        style={{
          height: '10%',
          paddingHorizontal: 12,
          paddingBottom: 12,
          justifyContent: 'center',
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            fontFamily: 'Inconsolata-SemiBold',
            fontSize: 18,
            color: Colors['white-1'],
            justifyContent: 'center',
          }}
        >
          {link.url}
        </Text>
      </View>
    </View>
  );
};

export default LinkContent;
