import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';

import Colors from '../../../utils/color';
import { getImageUrl } from '../../../utils/image';
import { ResponsiveFont } from '../../../utils/ResponsiveFont';

const LinkContent = ({ body, disabled = false }) => {
  const link = JSON.parse(body);
  return (
    <TouchableNativeFeedback onPress={() => console.log('go to', link.url)} disabled={disabled}>
      <View style={_styles.container}>
        <View style={_styles.imageView}>
          <FastImage style={_styles.image} source={{ uri: getImageUrl(link.img) }} />
          <View style={_styles.imageTextContainer}>
            <Text style={_styles.imageText}>{link.title}</Text>
          </View>
        </View>
        <View style={_styles.descView}>
          <Text style={_styles.descText} numberOfLines={4}>
            {link.desc}
          </Text>
        </View>
        <View style={_styles.linkView}>
          <Text numberOfLines={1} style={_styles.linkText}>
            {link.url}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default LinkContent;

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 6,
    backgroundColor: Colors['dark-2'],
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageView: {
    height: '60%',
  },
  imageTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  imageText: {
    fontFamily: 'Inconsolata-ExtraBold',
    fontSize: ResponsiveFont(24),
    color: Colors['white-1'],
    textAlign: 'center',
    width: '70%',
  },
  descView: {
    height: '30%',
    padding: 12,
    justifyContent: 'center',
  },
  descText: {
    fontFamily: 'Inconsolata-SemiBold',
    fontSize: ResponsiveFont(15),
    color: Colors['white-1'],
  },
  linkView: {
    height: '10%',
    paddingHorizontal: 12,
    paddingBottom: 12,
    justifyContent: 'center',
  },
  linkText: {
    fontFamily: 'Inconsolata-SemiBold',
    fontSize: ResponsiveFont(15),
    color: Colors['white-1'],
  },
});
