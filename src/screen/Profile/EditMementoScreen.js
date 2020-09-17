import React, { useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import FastImage from 'react-native-fast-image';

import MainHeader from '../../component/Header/MainHeader';
import Screen from '../../component/Common/Screen';
import Colors from '../../utils/color';
import { ResponsiveFont } from '../../utils/ResponsiveFont';
import { getImageUrl } from '../../utils/image';
import assetSvg from '../../assets/svg/svg';
import MainTextInput from '../../component/Common/MainTextInput';
import DismissKeyboard from '../../component/Common/DismissKeyboard';
import ContentImageModal from '../../component/Modal/NewPost/ContentImageModal';
import Axios from 'axios';
import { EDIT_MEMENTO } from '../../utils/api';
import RoutesName from '../../utils/RoutesName';

const EditMementoScreen = ({ route, navigation }) => {
  const { mementoData } = route.params;

  const [value, setValue] = useState(mementoData.desc);
  const [image, setImage] = useState(mementoData.img);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onCompleteUpload = (newAvatar) => {
    toggleModal();
    setImage(JSON.parse(newAvatar.body));
  };

  const updateMemento = () => {
    setLoading(true);
    Keyboard.dismiss();
    Axios.put(EDIT_MEMENTO(mementoData.id), { img: image, desc: value })
      .then((res) => {
        setLoading(false);
        navigation.navigate(RoutesName.ProfileTab, {
          screen: RoutesName.Memento,
          params: { memento: res.data.data },
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <MainHeader
        title={'Edit Memento'}
        leftComponent={'back'}
        rightComponent={() => {
          return isLoading ? (
            <ActivityIndicator size="small" color={Colors['white-1']} />
          ) : (
            <TouchableWithoutFeedback onPress={updateMemento}>
              <SvgXml xml={assetSvg.header.check} width="24" height="24" />
            </TouchableWithoutFeedback>
          );
        }}
      />
      <Screen style={{ margin: 16 }}>
        <DismissKeyboard>
          <Text style={[_styles.textSubTitle, { textAlign: 'center' }]}>Edit Memento</Text>
          <Text style={_styles.textTitle}>{mementoData.id}</Text>
          <Text style={_styles.textSubTitle}>Image</Text>
          <TouchableWithoutFeedback onPress={toggleModal}>
            <View style={_styles.imageContainer}>
              <FastImage source={{ uri: getImageUrl(image) }} style={_styles.image} />
              <View style={_styles.cameraIcon}>
                <SvgXml xml={assetSvg.newPost.image} width="36" height="36" />
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={_styles.textSubTitle}>Desc</Text>
            <Text style={_styles.textSubTitle}>{`${value.length}/150`}</Text>
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
            onComplete={onCompleteUpload}
          />
        </DismissKeyboard>
      </Screen>
    </>
  );
};

export default EditMementoScreen;

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
    fontSize: ResponsiveFont(18),
    textAlign: 'center',
    marginVertical: 8,
  },
  textSubTitle: {
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
