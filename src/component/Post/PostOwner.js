import React from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';

import Colors from '../../utils/color';
import { getImageUrl } from '../../utils/image';

const PostOwner = ({ user }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <FastImage
        source={{ uri: getImageUrl(user.imgAvatar) }}
        style={{ height: 36, width: 36, margin: 10 }}
      />
      <Text
        style={{
          fontFamily: 'Inconsolata-Bold',
          fontSize: 18,
          color: Colors['white-1'],
        }}
      >
        {user.id}
      </Text>
    </View>
  );
};

export default PostOwner;
