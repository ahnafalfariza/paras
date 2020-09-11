import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../utils/color';
import FastImage from 'react-native-fast-image';
import { SCREEN_HEIGHT } from '../../utils/constant';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

const FeatureDetail = ({ textTitle, textSubTitle, textDesc, image }) => {
  return (
    <View style={_styles.container}>
      <Text style={_styles.textTitle}>{textTitle}</Text>
      <Text style={_styles.textSubTitle}>{textSubTitle}</Text>
      <View style={_styles.imageContainer}>
        <FastImage source={require('../../assets/png/gimmick2.png')} style={_styles.image} />
      </View>
      <Text style={_styles.textDesc}>{textDesc}</Text>
    </View>
  );
};

export default FeatureDetail;

const _styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  textTitle: {
    color: Colors['white-1'],
    fontFamily: 'Inconsolata-ExtraBold',
    fontSize: ResponsiveFont(28),
  },
  textSubTitle: {
    color: Colors['white-1'],
    fontFamily: 'Inconsolata-Regular',
    fontSize: ResponsiveFont(12),
    textAlign: 'center',
    marginHorizontal: 64,
    marginVertical: 8,
  },
  textDesc: {
    color: Colors['white-1'],
    fontFamily: 'Inconsolata-Regular',
    fontSize: ResponsiveFont(14),
    margin: 16,
    marginTop: 0,
    marginHorizontal: 32,
    textAlign: 'center',
  },
  imageContainer: {
    margin: 16,
    borderRadius: 8,
    backgroundColor: Colors['dark-1'],
  },
  image: {
    width: SCREEN_HEIGHT / 3,
    aspectRatio: 1,
    margin: 16,
  },
});
