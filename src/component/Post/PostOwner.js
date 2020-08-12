import React from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';

import Colors from '../../utils/color';
import { getImageUrl } from '../../utils/image';
import assetSvg from '../../assets/svg/svg';

const PostOwner = ({ user }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
      }}
    >
      <TouchableWithoutFeedback onPress={() => console.log('go to profile')}>
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
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => console.log('more')}>
        <View style={{ padding: 16 }}>
          <SvgXml
            xml={assetSvg.common.more}
            width="24"
            height="24"
            style={{ justifyContent: 'flex-end' }}
            fill={Colors['white-1']}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default PostOwner;
