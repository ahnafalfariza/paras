import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import Modal from 'react-native-modal';
import { SvgXml } from 'react-native-svg';

import Colors from '../../../utils/color';
import MainTextInput from '../../Common/MainTextInput';
import assetSvg from '../../../assets/svg/svg';
import { SCREEN_HEIGHT, SCREEN_WIDTH, isIOS } from '../../../utils/constant';
import Confirmation from '../../Common/Confimation';
import DismissKeyboard from '../../Common/DismissKeyboard';

const MaximumCharacter = 400;

const ContentTextModal = ({ onDismiss, onComplete, body }) => {
  const initialValue = body ? body : '';
  const [showDiscard, setShowDiscard] = useState(false);
  const [value, setValue] = useState(initialValue);

  const lineWidth = (value.length / MaximumCharacter) * 100;

  const onPressClose = () => {
    value === initialValue ? onDismiss() : setShowDiscard(true);
  };

  return (
    <View>
      <Modal isVisible={true} backdropOpacity={showDiscard ? 1 : 0.7} useNativeDriver>
        <DismissKeyboard>
          <View style={_styles.containerModalView}>
            {showDiscard ? (
              <Confirmation
                titleText={'Discard current text?'}
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
                    <Text style={_styles.headerText}>{body ? 'Edit Text' : 'Add Text'}</Text>
                    <TouchableNativeFeedback
                      disabled={value === ''}
                      onPress={() => onComplete({ type: 'text', body: value })}
                    >
                      <SvgXml
                        xml={assetSvg.header.check}
                        width="28"
                        height="28"
                        style={{ opacity: value === '' ? 0.7 : 1 }}
                      />
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
                      placeholder={'Share your ideas and thought'}
                      multiline={true}
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

export default ContentTextModal;

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
