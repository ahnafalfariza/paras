import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { getImageUrl } from '../../../utils/image';

const ImageContent = ({ body }) => {
  const img = JSON.parse(body);
  return (
    <View style={{ flex: 1 }}>
      <FastImage style={{ width: '100%', height: '100%' }} source={{ uri: getImageUrl(img) }} />
    </View>
  );
};

export default ImageContent;
