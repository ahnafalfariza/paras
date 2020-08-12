import React from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { getImageUrl } from '../../utils/image';
import Colors from '../../utils/color';

const Profile = ({ data, type = 'user' }) => {
  const img = type === 'user' ? data.imgAvatar : data.img;
  const desc = type === 'user' ? data.bio : data.desc;

  return (
    <>
      <View style={{ alignSelf: 'center', borderRadius: 8, overflow: 'hidden' }}>
        <FastImage source={{ uri: getImageUrl(img) }} style={{ height: 180, width: 180 }} />
      </View>
      <Text
        style={{
          fontFamily: 'Inconsolata-Bold',
          color: Colors['white-1'],
          fontSize: 24,
          margin: 16,
          marginBottom: 0,
          textAlign: 'center',
        }}
      >
        {data.id}
      </Text>
      {type === 'memento' && (
        <TouchableWithoutFeedback onPress={() => console.log('go to memento owner')}>
          <Text
            style={{
              fontFamily: 'Inconsolata-Regular',
              color: Colors['white-1'],
              fontSize: 16,
              textAlign: 'center',
            }}
          >
            by <Text style={{ fontFamily: 'Inconsolata-Bold' }}>{data.owner}</Text>
          </Text>
        </TouchableWithoutFeedback>
      )}
      <Text
        style={{
          fontFamily: 'Inconsolata-Regular',
          color: Colors['white-1'],
          fontSize: 18,
          margin: 8,
          textAlign: 'center',
        }}
      >
        {desc}
      </Text>
    </>
  );
};

export default Profile;
