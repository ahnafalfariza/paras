import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import { SvgXml } from 'react-native-svg';

import Colors from '../../../utils/color';
import MainTextInput from '../../Common/MainTextInput';
import assetSvg from '../../../assets/svg/svg';
import { SCREEN_HEIGHT, SCREEN_WIDTH, isIOS } from '../../../utils/constant';
import DismissKeyboard from '../../Common/DismissKeyboard';
import Axios from 'axios';
import { POST_COMMENT } from '../../../utils/api';

const MaximumCharacter = 400;

const NewCommentModal = ({ onDismiss, onComplete, isVisible, postId }) => {
  const [value, setValue] = useState('');
  const [isLoading, setLoading] = useState(false);
  const lineWidth = (value.length / MaximumCharacter) * 100;

  const postComment = () => {
    setLoading(true);
    Axios.post(POST_COMMENT, { postId: postId, body: value })
      .then((res) => {
        setLoading(false);
        console.log(res.data.data);
        onComplete(res.data.data);
        setValue('');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <View>
      <Modal isVisible={isVisible} useNativeDriver>
        <DismissKeyboard>
          <View style={_styles.containerModalView}>
            <KeyboardAvoidingView
              behavior={isIOS ? 'padding' : 'height'}
              style={{ flex: 1, justifyContent: 'center' }}
            >
              <View style={_styles.modalView}>
                <View style={_styles.headerView}>
                  <TouchableNativeFeedback onPress={onDismiss}>
                    <SvgXml xml={assetSvg.header.close} width="28" height="28" />
                  </TouchableNativeFeedback>
                  <Text style={_styles.headerText}>Add Comment</Text>
                  <TouchableNativeFeedback disabled={value === ''} onPress={postComment}>
                    {isLoading ? (
                      <ActivityIndicator size={'small'} color={Colors['white-1']} />
                    ) : (
                      <SvgXml
                        xml={assetSvg.header.check}
                        width="28"
                        height="28"
                        style={{ opacity: value === '' ? 0.7 : 1 }}
                      />
                    )}
                  </TouchableNativeFeedback>
                </View>
                <View
                  style={{
                    width: `${lineWidth}%`,
                    height: 3,
                    backgroundColor: Colors['primary-5'],
                  }}
                />
                <View style={_styles.contentView}>
                  <MainTextInput
                    value={value}
                    onChangeText={setValue}
                    maxLength={MaximumCharacter}
                    style={_styles.contentTextInput}
                    placeholder={'Write a comment ...'}
                    multiline={true}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </DismissKeyboard>
      </Modal>
    </View>
  );
};

export default NewCommentModal;

const _styles = StyleSheet.create({
  containerModalView: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  modalView: {
    height: SCREEN_HEIGHT / 2,
    width: SCREEN_WIDTH - 32,
    backgroundColor: Colors['dark-4'],
    borderRadius: 8,
    overflow: 'hidden',
  },
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
    fontSize: 18,
  },
  contentView: {
    padding: 12,
    flex: 1,
    justifyContent: 'center',
  },
  contentTextInput: {
    backgroundColor: 'transparent',
    padding: 0,
    justifyContent: 'center',
    paddingTop: 0,
    paddingBottom: 0,
  },
});
