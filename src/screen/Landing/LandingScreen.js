import React from 'react';
import Screen from '../../component/Common/Screen';
import { Text, View, ImageBackground } from 'react-native';
import FastImage from 'react-native-fast-image';
import Colors from '../../utils/color';
import MainButton from '../../component/Common/MainButton';
import RoutesName from '../../utils/RoutesName';

const LandingScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/png/Background.png')}
      style={_styles.imageBacgroundView}
      imageStyle={_styles.imageBackground}
    >
      <Screen style={{ flex: 1, justifyContent: 'center' }} transparent>
        <View style={_styles.imageContainerView}>
          <FastImage source={require('../../assets/png/ParasLogo.png')} style={_styles.imageLogo} />
          <Text style={_styles.textTitle}>Paras</Text>
        </View>
        <Text style={_styles.textDesc}>
          PARAS (pɑ. rɑs, \ˈpär-äs\) is both a noun and an adjective derived from Bahasa.
        </Text>
        <MainButton
          title={'Get Started'}
          buttonStyle={{ width: 'auto', margin: 8, marginTop: 24 }}
          onPress={() => navigation.navigate(RoutesName.LandingDetail)}
        />
      </Screen>
    </ImageBackground>
  );
};

export default LandingScreen;

const _styles = {
  imageContainerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageLogo: {
    width: 75,
    aspectRatio: 1,
    borderRadius: 15,
  },
  imageBackground: {
    opacity: 0.09,
  },
  imageBacgroundView: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    padding: 48,
    backgroundColor: '#000000',
  },
  textTitle: {
    fontFamily: 'Inconsolata-Bold',
    fontSize: 32,
    color: Colors['white-1'],
    marginLeft: 16,
  },
  textDesc: {
    fontFamily: 'Inconsolata-Regular',
    fontSize: 16,
    color: Colors['white-1'],
    marginTop: 16,
    marginHorizontal: 8,
    lineHeight: 20,
  },
};
