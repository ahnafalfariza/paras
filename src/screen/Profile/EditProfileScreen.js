import React, { useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SvgXml } from 'react-native-svg';
import FastImage from 'react-native-fast-image';
import Axios from 'axios';

import MainHeader from '../../component/Header/MainHeader';
import Screen from '../../component/Common/Screen';
import Colors from '../../utils/color';
import { ResponsiveFont } from '../../utils/ResponsiveFont';
import { getImageUrl } from '../../utils/image';
import assetSvg from '../../assets/svg/svg';
import MainTextInput from '../../component/Common/MainTextInput';
import DismissKeyboard from '../../component/Common/DismissKeyboard';
import ContentImageModal from '../../component/Modal/NewPost/ContentImageModal';
import { UPDATE_PROFILE } from '../../utils/api';
import RoutesName from '../../utils/RoutesName';
import { updateUser } from '../../actions/user';

const EditProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.user.profile);
  const [value, setValue] = useState(profileData.bio);
  const [avatar, setAvatar] = useState(profileData.imgAvatar);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onCompleteUpload = (newAvatar) => {
    toggleModal();
    setAvatar(JSON.parse(newAvatar.body));
  };

  const updateProfile = () => {
    setLoading(true);
    Keyboard.dismiss();
    Axios.put(UPDATE_PROFILE(profileData.id), { imgAvatar: avatar, bio: value })
      .then((res) => {
        setLoading(false);
        dispatch(updateUser({ profile: res.data.data }));
        navigation.navigate(RoutesName.ProfileTab, {
          screen: RoutesName.Profile,
          params: { needToRefresh: true },
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <MainHeader
        title={'Update Profile'}
        leftComponent={'back'}
        rightComponent={() => {
          return isLoading ? (
            <ActivityIndicator size="small" color={Colors['white-1']} />
          ) : (
            <TouchableWithoutFeedback onPress={updateProfile}>
              <SvgXml xml={assetSvg.header.check} width="24" height="24" />
            </TouchableWithoutFeedback>
          );
        }}
      />
      <Screen style={{ margin: 16 }}>
        <DismissKeyboard>
          <Text style={_styles.textTitle}>Avatar</Text>
          <TouchableWithoutFeedback onPress={toggleModal}>
            <View style={_styles.imageContainer}>
              <FastImage source={{ uri: getImageUrl(avatar) }} style={_styles.image} />
              <View style={_styles.cameraIcon}>
                <SvgXml xml={assetSvg.newPost.image} width="36" height="36" />
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={_styles.textTitle}>Bio</Text>
            <Text style={_styles.textTitle}>{`${value.length}/150`}</Text>
          </View>
          <MainTextInput
            value={value}
            onChangeText={setValue}
            maxLength={150}
            style={_styles.contentTextInput}
            placeholder={'Description'}
            multiline={true}
          />
          <ContentImageModal
            onDismiss={toggleModal}
            isVisible={showModal}
            isCircle={true}
            onComplete={onCompleteUpload}
          />
        </DismissKeyboard>
      </Screen>
    </>
  );
};

export default EditProfileScreen;

const _styles = StyleSheet.create({
  image: {
    height: 180,
    width: 180,
    opacity: 0.5,
  },
  imageContainer: {
    height: 180,
    width: 180,
    marginBottom: 16,
    borderRadius: 90,
    overflow: 'hidden',

    marginTop: 8,
  },
  cameraIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    fontFamily: 'Inconsolata-Bold',
    color: Colors['white-1'],
    fontSize: ResponsiveFont(15),
  },
  contentTextInput: {
    marginTop: 8,
    height: 130,
    textAlignVertical: 'top',
  },
});
