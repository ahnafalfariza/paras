import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native';

import Colors from '../../../utils/color';
import { ResponsiveFont } from '../../../utils/ResponsiveFont';

const PostPieceModal = ({ isVisible, postId, onClose }) => {
  const [pieceValue, setPieceValue] = useState(5);
  const listPieceValue = [5, 10, 15, 20];

  if (!isVisible) {
    return null;
  }

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      useNativeDriver
    >
      <View style={_styles.modalContainer}>
        <Text style={_styles.headerText}>Send Piece</Text>
        <View style={_styles.balanceView}>
          <Text style={_styles.balanceDescText}>Available balance</Text>
          <Text style={_styles.balanceNumberText}>0.00000000</Text>
        </View>
        <View style={_styles.pieceChooseView}>
          {listPieceValue.map((val) => {
            const backgroundColor = pieceValue === val ? Colors['primary-5'] : 'transparent';
            const color = pieceValue === val ? Colors['white-1'] : Colors['primary-5'];
            return (
              <TouchableNativeFeedback key={val} onPress={() => setPieceValue(val)}>
                <View style={[_styles.pieceAmountView, { backgroundColor: backgroundColor }]}>
                  <Text style={[_styles.pieceAmountText, { color: color }]}>{val}</Text>
                </View>
              </TouchableNativeFeedback>
            );
          })}
        </View>
        <Text style={_styles.amountSendText}>Send {pieceValue}</Text>
        <View style={_styles.subTitleContainer}>
          <TouchableNativeFeedback onPress={onClose}>
            <View style={_styles.subTitleView}>
              <Text style={_styles.subTitleText}>Cancel</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback>
            <View style={[_styles.subTitleView, { backgroundColor: Colors['primary-5'] }]}>
              <Text style={_styles.subTitleText}>Send</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </Modal>
  );
};

export default PostPieceModal;

const _styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors['dark-2'],
    overflow: 'hidden',
    borderRadius: 8,
  },
  headerText: {
    backgroundColor: Colors['dark-6'],
    fontFamily: 'Inconsolata-Bold',
    color: Colors['white-1'],
    padding: 12,
    fontSize: ResponsiveFont(16),
  },
  balanceView: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  balanceDescText: {
    fontFamily: 'Inconsolata-Regular',
    color: Colors['white-1'],
    fontSize: ResponsiveFont(16),
  },
  balanceNumberText: {
    fontFamily: 'Inconsolata-Bold',
    color: Colors['white-1'],
    fontSize: ResponsiveFont(28),
  },
  pieceChooseView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  pieceAmountView: {
    height: 54,
    width: 54,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors['primary-5'],
  },
  pieceAmountText: {
    fontFamily: 'Inconsolata-SemiBold',
    color: Colors['white-1'],
    fontSize: ResponsiveFont(24),
  },
  amountSendText: {
    fontFamily: 'Inconsolata-Bold',
    color: Colors['white-1'],
    textAlign: 'center',
    marginVertical: 16,
    fontSize: ResponsiveFont(18),
  },
  subTitleContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: Colors['black-1'],
  },
  subTitleView: {
    flex: 1,
    borderRightWidth: 0.5,
    borderColor: Colors['black-1'],
    padding: 12,
  },
  subTitleText: {
    fontFamily: 'Inconsolata-Bold',
    fontSize: ResponsiveFont(13),
    color: Colors['white-1'],
    textAlign: 'center',
  },
});
