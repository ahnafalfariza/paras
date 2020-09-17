import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

import { getImageUrl } from '../../utils/image';
import Colors from '../../utils/color';
import MainButton from '../Common/MainButton';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

const ProfilePoint = ({ data, point }) => {
  const navigation = useNavigation();

  const editProfile = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <View style={{ marginVertical: 8 }}>
      <View style={_styles.imageContainer}>
        <FastImage source={{ uri: getImageUrl(data.imgAvatar) }} style={_styles.image} />
      </View>
      <Text style={_styles.idText}>{data.id}</Text>
      {data.bio !== '' && <Text style={_styles.descText}>{data.bio}</Text>}
      <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center' }}>
        <View style={_styles.pointContainer}>
          <Text style={_styles.pointNumber}>{point}</Text>
          <Text style={_styles.pointText}>{'Activity\nPoint'}</Text>
        </View>
        <MainButton
          title={'EDIT PROFILE'}
          containerStyle={{ width: 150, height: 50 }}
          buttonStyle={{ height: 50 }}
          onPress={editProfile}
        />
      </View>
    </View>
  );
};

export default ProfilePoint;

const _styles = StyleSheet.create({
  imageContainer: {
    alignSelf: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    height: 180,
    width: 180,
    borderRadius: 90,
  },
  idText: {
    fontFamily: 'Inconsolata-Bold',
    color: Colors['white-1'],
    fontSize: ResponsiveFont(18),
    margin: 16,
    marginBottom: 0,
    textAlign: 'center',
  },
  descText: {
    fontFamily: 'Inconsolata-Regular',
    color: Colors['white-1'],
    paddingHorizontal: 12,
    fontSize: ResponsiveFont(15),
    margin: 8,
    textAlign: 'center',
  },
  pointContainer: {
    backgroundColor: Colors['dark-2'],
    height: 50,
    width: 150,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  pointNumber: {
    fontFamily: 'Inconsolata-Bold',
    color: Colors['white-1'],
    fontSize: ResponsiveFont(24),
    marginRight: 8,
    textAlign: 'center',
  },
  pointText: {
    fontFamily: 'Inconsolata-Regular',
    color: Colors['white-1'],
    fontSize: ResponsiveFont(12),
  },
});
