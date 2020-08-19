import React from 'react';
import Screen from '../../component/Common/Screen';
import { Text, View } from 'react-native';
import Colors from '../../utils/color';
import FastImage from 'react-native-fast-image';
import { SCREEN_WIDTH } from '../../utils/constant';
import MainButton from '../../component/Common/MainButton';
import RoutesName from '../../utils/RoutesName';

const LandingScreen = ({ navigation }) => {
  return (
    <Screen style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        <View style={{ margin: 16, borderRadius: 8, backgroundColor: Colors['dark-1'] }}>
          <FastImage
            source={require('../../assets/png/gimmick2.png')}
            style={{ width: SCREEN_WIDTH - 96, aspectRatio: 1, margin: 16 }}
          />
        </View>
        <Text style={{ color: Colors['white-1'], fontFamily: 'Inconsolata-Bold', fontSize: 32 }}>
          No Gimmick
        </Text>
        <Text
          style={{
            color: Colors['white-2'],
            fontFamily: 'Inconsolata-Regular',
            fontSize: 14,
            margin: 16,
            marginHorizontal: 32,
            textAlign: 'center',
          }}
        >
          Instead of posting what content your audience might like, focus on sharing the content
          that you like. No need to think about how aesthetic your feed is or the best time to post
          on social media. Social media should be the place to be yourself, be authentic.
        </Text>
        <View style={{ justifyContent: 'center', paddingTop: 4, flexDirection: 'row' }}>
          <View style={{ width: 10, height: 3, backgroundColor: Colors['white-2'], margin: 3 }} />
          <View style={{ width: 10, height: 3, backgroundColor: Colors['white-2'], margin: 3 }} />
          <View style={{ width: 12, height: 4, backgroundColor: Colors['white-1'], margin: 3 }} />
          <View style={{ width: 10, height: 3, backgroundColor: Colors['white-2'], margin: 3 }} />
        </View>
      </View>
      <View style={{ justifyContent: 'flex-end', marginBottom: 16 }}>
        <MainButton
          buttonStyle={{
            width: SCREEN_WIDTH - 64,
            alignSelf: 'center',
          }}
          title={'NEXT'}
          onPress={() => navigation.navigate(RoutesName.Login)}
        />
      </View>
    </Screen>
  );
};

export default LandingScreen;
