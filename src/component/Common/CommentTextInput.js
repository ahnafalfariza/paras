import React, { useState } from 'react';
import {
  View,
  ActivityIndicator,
  TouchableNativeFeedback,
  StyleSheet,
  Keyboard,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { SvgXml } from 'react-native-svg';
import { useSelector } from 'react-redux';
import Axios from 'axios';

import MainTextInput from './MainTextInput';
import assetSvg from '../../assets/svg/svg';
import { getImageUrl } from '../../utils/image';
import Colors from '../../utils/color';
import { POST_COMMENT } from '../../utils/api';

const CommentTextInput = ({ postId, onComplete }) => {
  const profileData = useSelector((state) => state.user.profile);
  const [value, setValue] = useState('');
  const [isLoading, setLoading] = useState(false);

  const postComment = () => {
    setLoading(true);
    Keyboard.dismiss();
    Axios.post(POST_COMMENT, { postId: postId, body: value })
      .then((res) => {
        setLoading(false);
        console.log(res.data.data);
        onComplete();
        setValue('');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <View style={_styles.container}>
      <FastImage
        source={{ uri: getImageUrl(profileData.imgAvatar) }}
        style={{ width: 32, height: 32 }}
      />
      <MainTextInput
        value={value}
        onChangeText={setValue}
        multiline={true}
        maxLength={200}
        placeholder={'Write a comment ...'}
        style={{ flex: 1, backgroundColor: 'transparent' }}
      />
      {isLoading ? (
        <ActivityIndicator size={'small'} color={Colors['white-1']} />
      ) : (
        <TouchableNativeFeedback disabled={value === ''} onPress={postComment}>
          <SvgXml
            xml={assetSvg.header.check}
            width="28"
            height="28"
            style={{ opacity: value === '' ? 0 : 1 }}
          />
        </TouchableNativeFeedback>
      )}
    </View>
  );
};

export default CommentTextInput;

const _styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors['dark-4'],
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
});
