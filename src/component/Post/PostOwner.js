import React from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';

import Colors from '../../utils/color';
import { getImageUrl } from '../../utils/image';

const PostOwner = ({ user }) => {
  return (
    <TouchableNativeFeedback onPress={() => console.log('go to profile')}>
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
    </TouchableNativeFeedback>
  );
};

export default PostOwner;
