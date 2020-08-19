import React from 'react';
import Screen from '../../component/Common/Screen';
import { Text, View, ImageBackground } from 'react-native';
import FastImage from 'react-native-fast-image';
import Colors from '../../utils/color';
import MainButton from '../../component/Common/MainButton';
import RoutesName from '../../utils/RoutesName';

const LandingScreen = ({ navigation }) => {
  return (
    <Screen style={{ flex: 1, justifyContent: 'center', backgroundColor: '#000000' }}>
      <ImageBackground
        source={require('../../assets/png/Background.png')}
        style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center', padding: 48 }}
        imageStyle={{ opacity: 0.1 }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FastImage
            source={require('../../assets/png/ParasLogo.png')}
            style={{ width: 75, aspectRatio: 1, borderRadius: 15 }}
          />
          <Text
            style={{
              fontFamily: 'Inconsolata-Bold',
              fontSize: 32,
              color: Colors['white-1'],
              marginLeft: 16,
            }}
          >
            Paras
          </Text>
        </View>
        <Text
          style={{
            fontFamily: 'Inconsolata-Regular',
            fontSize: 16,
            color: Colors['white-1'],
            marginTop: 16,
            marginHorizontal: 8,
            lineHeight: 20,
          }}
        >
          PARAS (pɑ. rɑs, \ˈpär-äs\) is both a noun and an adjective derived from Bahasa.
          {/* {'\n\n'} */}
          {/* Paras defined as a face or an appearance. It suits our platform since ours is dedicated to
          everyone to let themselves shines.{'\n\n'}
          As an adjective, Paras means equal or balanced-the effort is commensurate with the result. */}
        </Text>
        <MainButton
          title={'Get Started'}
          buttonStyle={{ width: 'auto', margin: 8, marginTop: 24 }}
          onPress={() => navigation.navigate(RoutesName.LandingDetail)}
        />
      </ImageBackground>
    </Screen>
  );
};

export default LandingScreen;
