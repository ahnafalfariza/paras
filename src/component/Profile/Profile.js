import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';

import { getImageUrl } from '../../utils/image';
import Colors from '../../utils/color';
import MainButton from '../Common/MainButton';
import RoutesName from '../../utils/RoutesName';
import { ResponsiveFont } from '../../utils/ResponsiveFont';
import { FOLLOW, UNFOLLOW } from '../../utils/api';
import { toggleFollow } from '../../actions/user';

const Profile = ({ data, type = 'user', currentUser = false }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const followingList = useSelector((state) => state.user.followingList);
  const [isFollowing, setIsFollowing] = useState(followingList.includes(data.id));
  const [isLoading, setIsLoading] = useState(false);

  const img = type === 'user' ? data.imgAvatar : data.img;
  const desc = type === 'user' ? data.bio : data.desc;

  const editProfile = () => {
    navigation.navigate('EditProfile');
  };

  const pressRelation = () => {
    setIsLoading(true);
    Axios.post(isFollowing ? UNFOLLOW : FOLLOW, {
      targetId: data.id,
      targetType: type,
    })
      .then(() => {
        dispatch(toggleFollow(data.id));
        setIsLoading(false);
        setIsFollowing(!isFollowing);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <View style={{ marginVertical: 8 }}>
      <View style={_styles.imageContainer}>
        <FastImage
          source={{ uri: getImageUrl(img) }}
          style={[_styles.image, { borderRadius: type === 'user' ? 90 : 0 }]}
        />
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
      {!currentUser && (
        <MainButton
          title={!currentUser ? (isFollowing ? 'UNFOLLOW' : 'FOLLOW') : 'EDIT PROFILE'}
          secondary={!currentUser && isFollowing}
          loading={isLoading}
          loadingColor={isFollowing ? Colors['primary-5'] : Colors['white-1']}
          containerStyle={{ alignSelf: 'center', width: 150 }}
          onPress={currentUser ? editProfile : pressRelation}
        />
      )}
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
    fontSize: ResponsiveFont(18),
    margin: 16,
    marginBottom: 0,
    textAlign: 'center',
  },
  ownerText: {
    fontFamily: 'Inconsolata-Regular',
    color: Colors['white-1'],
    fontSize: ResponsiveFont(14),
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
});
