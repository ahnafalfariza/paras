import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { getImageUrl } from '../../utils/image';
import Colors from '../../utils/color';
import MainButton from '../Common/MainButton';
import RoutesName from '../../utils/RoutesName';

const Profile = ({ data, type = 'user', currentUser = false }) => {
  const img = type === 'user' ? data.imgAvatar : data.img;
  const desc = type === 'user' ? data.bio : data.desc;

  const navigation = useNavigation();

  const editProfile = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <View style={{ marginVertical: 8 }}>
      <View style={_styles.imageContainer}>
        <FastImage source={{ uri: getImageUrl(img) }} style={_styles.image} />
      </View>
      <Text style={_styles.idText}>{data.id}</Text>
      {type === 'memento' && (
        <TouchableWithoutFeedback
          onPress={() => navigation.push(RoutesName.UserProfile, { user: { id: data.owner } })}
        >
          <Text style={_styles.ownerText}>
            by <Text style={{ fontFamily: 'Inconsolata-Bold' }}>{data.owner}</Text>
          </Text>
        </TouchableWithoutFeedback>
      )}
      {desc !== '' && <Text style={_styles.descText}>{desc}</Text>}
      <MainButton
        title={currentUser ? 'EDIT PROFILE' : 'FOLLOW'}
        containerStyle={{ alignSelf: 'center', width: 150 }}
        onPress={currentUser ? editProfile : null}
      />
    </View>
  );
};

export default Profile;

const _styles = StyleSheet.create({
  imageContainer: {
    alignSelf: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    height: 180,
    width: 180,
  },
  idText: {
    fontFamily: 'Inconsolata-Bold',
    color: Colors['white-1'],
    fontSize: 24,
    margin: 16,
    marginBottom: 0,
    textAlign: 'center',
  },
  ownerText: {
    fontFamily: 'Inconsolata-Regular',
    color: Colors['white-1'],
    fontSize: 16,
    textAlign: 'center',
  },
  descText: {
    fontFamily: 'Inconsolata-Regular',
    color: Colors['white-1'],
    paddingHorizontal: 12,
    fontSize: 18,
    margin: 8,
    textAlign: 'center',
  },
});
