import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

import Screen from '../../component/Common/Screen';
import Colors from '../../utils/color';
import MainButton from '../../component/Common/MainButton';
import RoutesName from '../../utils/RoutesName';
import FeatureDetail from '../../component/Landing/FeatureDetail';

const featureData = [
  {
    img: null,
    textTitle: 'No Vanity Metrics',
    textSubTitle: "vanity - inflated pride in oneself or one's appearance",
    textDesc:
      'We believe social media should be the place to share anything without the fear of being compared or validated. No likes, no follower count, no vanity metrics. We let you exercise your creativity to its potential; no pressure.',
  },
  {
    img: null,
    textTitle: 'Your Own Space',
    textSubTitle: 'own - belonging to oneself or itself',
    textDesc:
      'The ability to freely think and impart ideas is essential to who we are as human beings. We respect the rights of freedom and privacy by using strong cryptography and decentralized technology that ensures each user has their own data store that cannot be modified or seen by others without their permission (even us!).',
  },
  {
    img: null,
    textTitle: 'No Gimmick',
    textSubTitle: 'gimmick - a trick or device intended to attract attention',
    textDesc:
      'Instead of posting what content your audience might like, focus on sharing the content that you like. No need to think about how aesthetic your feed is or the best time to post on social media. Social media should be the place to be yourself, be authentic.',
  },
  {
    img: null,
    textTitle: 'Healthier Platform',
    textSubTitle: 'healthy - good for your health',
    textDesc:
      'The mental pressure regarding generating likes and high followers count is a borderline health risk. Behind the numbers on the screen, there are biases ready to be challenged and discourses to be dissected. We believe that creativity and critical thinking require a balanced state of mind.',
  },
];

const LandingDetailScreen = ({ navigation }) => {
  const [swiperIndex, setSwiperIndex] = useState(0);
  const swiperRef = useRef(null);

  const onPressNext = () => {
    if (swiperIndex < 3) {
      setSwiperIndex(swiperIndex + 1);
      swiperRef.current.scrollBy(1, true);
    } else {
      navigation.reset({ index: 0, routes: [{ name: RoutesName.AuthNavigator }] });
    }
  };

  return (
    <Screen style={{ flex: 1 }}>
      <Swiper
        ref={swiperRef}
        loop={false}
        scrollEnabled={false}
        dotStyle={_styles.dotStyle}
        activeDotStyle={_styles.activeDotStyle}
      >
        {featureData.map(({ textTitle, textSubTitle, textDesc, img }, index) => (
          <FeatureDetail
            key={index}
            image={img}
            textTitle={textTitle}
            textSubTitle={textSubTitle}
            textDesc={textDesc}
          />
        ))}
      </Swiper>
      <View style={{ justifyContent: 'flex-end' }}>
        <MainButton buttonStyle={_styles.button} title={'NEXT'} onPress={onPressNext} />
      </View>
    </Screen>
  );
};

export default LandingDetailScreen;

const _styles = StyleSheet.create({
  dotStyle: {
    width: 10,
    height: 3,
    borderRadius: 0,
    backgroundColor: Colors['white-2'],
  },
  activeDotStyle: {
    width: 12,
    height: 4,
    borderRadius: 0,
    backgroundColor: Colors['white-1'],
  },
  button: {
    width: 'auto',
    marginVertical: 0,
    marginHorizontal: 32,
    marginBottom: 32,
  },
});
