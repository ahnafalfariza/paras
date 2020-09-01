import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Modal from 'react-native-modal';
import { SvgXml } from 'react-native-svg';

import Colors from '../../../utils/color';
import MainTextInput from '../../Common/MainTextInput';
import assetSvg from '../../../assets/svg/svg';
import { SCREEN_WIDTH } from '../../../utils/constant';
import Confirmation from '../../Common/Confimation';

const ContentLinkModal = () => {
  const [showDiscard, setShowDiscard] = useState(false);

  return (
    <View>
      <Modal isVisible={true} backdropOpacity={showDiscard ? 0.9 : 0.7}>
        <View style={_styles.containerModalView}>
          {showDiscard ? (
            <Confirmation
              titleText={'Discard current text?'}
              onPressLeft={() => setShowDiscard(false)}
            />
          ) : (
            <View style={_styles.modalView}>
              <View style={_styles.headerView}>
                <TouchableNativeFeedback onPress={() => setShowDiscard(true)}>
                  <SvgXml xml={assetSvg.header.close} width="28" height="28" />
                </TouchableNativeFeedback>
                <Text style={_styles.headerText}>Add Link</Text>
                <TouchableNativeFeedback onPress={() => console.log('done')}>
                  <SvgXml xml={assetSvg.header.check} width="28" height="28" />
                </TouchableNativeFeedback>
              </View>
              <View style={_styles.contentView}>
                <MainTextInput style={_styles.contentTextInput} placeholder={'https://'} />
              </View>
            </View>
          )}
        </View>
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
    fontSize: 18,
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
