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
import Axios from 'axios';
import { SvgXml } from 'react-native-svg';

import Colors from '../../../utils/color';
import MainTextInput from '../../Common/MainTextInput';
import assetSvg from '../../../assets/svg/svg';
import { SCREEN_WIDTH, isIOS } from '../../../utils/constant';
import Confirmation from '../../Common/Confimation';
import DismissKeyboard from '../../Common/DismissKeyboard';
import { META_URL } from '../../../utils/api';
import { ResponsiveFont } from '../../../utils/ResponsiveFont';

const ContentLinkModal = ({ onDismiss, onComplete, body }) => {
  const initialValue = body ? JSON.parse(body).url : '';
  const [showDiscard, setShowDiscard] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [isLoading, setLoading] = useState(false);

  const onPressClose = () => {
    value === initialValue ? onDismiss() : setShowDiscard(true);
  };

  const validateLink = () => {
    // eslint-disable-next-line no-useless-escape
    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    return value.match(regex) || isLoading;
  };

  const onPressComplete = () => {
    setLoading(true);
    Axios.get(META_URL(value))
      .then((res) => {
        const meta = res.data.data;
        const linkData = {
          img: meta.image,
          title: meta.title,
          desc: meta.description,
          url: meta.url,
        };
        setLoading(false);
        onComplete({
          type: 'url',
          body: JSON.stringify(linkData),
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <View>
      <Modal isVisible={true} backdropOpacity={showDiscard ? 1 : 0.7} useNativeDriver>
        <DismissKeyboard>
          <View style={_styles.containerModalView}>
            {showDiscard ? (
              <Confirmation
                titleText={'Discard current link?'}
                onPressLeft={() => setShowDiscard(false)}
                onPressRight={onDismiss}
              />
            ) : (
              <KeyboardAvoidingView
                behavior={isIOS ? 'padding' : 'height'}
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <View style={_styles.modalView}>
                  <View style={_styles.headerView}>
                    <TouchableNativeFeedback onPress={onPressClose}>
                      <SvgXml xml={assetSvg.header.close} width="28" height="28" />
                    </TouchableNativeFeedback>
                    <Text style={_styles.headerText}>{body ? 'Edit Link' : 'Add Link'}</Text>
                    <TouchableNativeFeedback onPress={onPressComplete} disabled={!validateLink()}>
                      {isLoading ? (
                        <ActivityIndicator size="small" color={Colors['white-1']} />
                      ) : (
                        <SvgXml
                          xml={assetSvg.header.check}
                          width="28"
                          height="28"
                          style={{ opacity: validateLink() ? 1 : 0.7 }}
                        />
                      )}
                    </TouchableNativeFeedback>
                  </View>
                  <View style={_styles.contentView}>
                    <MainTextInput
                      value={value}
                      onChangeText={setValue}
                      style={_styles.contentTextInput}
                      placeholder={'https://'}
                    />
                  </View>
                </View>
              </KeyboardAvoidingView>
            )}
          </View>
        </DismissKeyboard>
      </Modal>
    </View>
  );
};

export default ContentLinkModal;

const _styles = StyleSheet.create({
  containerModalView: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  modalView: {
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
    fontSize: ResponsiveFont(15),
  },
  contentView: {
    padding: 12,
    paddingVertical: 16,
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
