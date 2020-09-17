import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import { SvgXml } from 'react-native-svg';

import Colors from '../../../utils/color';
import assetSvg from '../../../assets/svg/svg';
import { ResponsiveFont } from '../../../utils/ResponsiveFont';
import MainButton from '../../Common/MainButton';
import Axios from 'axios';
import { UPLOAD } from '../../../utils/api';

const ContentImageModal = ({ isVisible = true, onDismiss, onComplete, isCircle = false }) => {
  const [isUploading, setIsUploading] = useState(false);
  const pickerOptions = {
    width: 400,
    height: 400,
    cropping: true,
    mediaType: 'photo',
    cropperCircleOverlay: isCircle,
    forceJpg: true,
  };

  const onPressCamera = () => {
    ImagePicker.openCamera(pickerOptions).then((image) => {
      console.log('image', image);
      uploadImage(image);
    });
  };

  const onPressGallery = () => {
    ImagePicker.openPicker(pickerOptions).then((image) => {
      console.log(image);
      uploadImage(image);
    });
  };

  const uploadImage = (image) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const file = { name: 'photo.jpg', type: image.mime, uri: image.path };
    const formData = new FormData();

    formData.append('file', file);

    setIsUploading(true);
    Axios.post(UPLOAD, formData, config)
      .then((res) => {
        setIsUploading(false);
        onComplete({
          type: 'img',
          body: JSON.stringify(res.data.data),
        });
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        setIsUploading(false);
      });
  };

  return (
    <View>
      <Modal isVisible={isVisible} useNativeDriver onBackButtonPress={onDismiss}>
        <View style={{ borderRadius: 8, overflow: 'hidden' }}>
          <View style={_styles.headerView}>
            <TouchableNativeFeedback onPress={onDismiss}>
              <SvgXml xml={assetSvg.header.close} width="28" height="28" />
            </TouchableNativeFeedback>
            <Text style={_styles.headerText}>{'Upload Image'}</Text>
          </View>
          <View style={{ backgroundColor: Colors['dark-4'], padding: 16 }}>
            {isUploading ? (
              <>
                <ActivityIndicator
                  color={Colors['white-1']}
                  size={'small'}
                  style={{ padding: 16 }}
                />
                <Text
                  style={{
                    fontFamily: 'Inconsolata-Bold',
                    color: Colors['white-1'],
                    textAlign: 'center',
                  }}
                >
                  Uploading your image...
                </Text>
              </>
            ) : (
              <>
                <MainButton
                  title={'Take Photo'}
                  onPress={onPressCamera}
                  containerStyle={{ marginTop: 0, width: 'auto' }}
                />
                <MainButton
                  title={'Choose from Library'}
                  onPress={onPressGallery}
                  containerStyle={{ marginVertical: 0, width: 'auto' }}
                />
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ContentImageModal;

const _styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors['dark-24'],
  },
  headerText: {
    color: Colors['white-1'],
    flex: 1,
    marginLeft: 12,
    fontFamily: 'Inconsolata-SemiBold',
    fontSize: ResponsiveFont(15),
  },
});
