import React, { useState, useEffect } from 'react';
import { View, Text, TouchableNativeFeedback, StyleSheet, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';

import Colors from '../../../utils/color';
import { ResponsiveFont } from '../../../utils/ResponsiveFont';
import { WALLET_BALANCE, WALLET_PIECE } from '../../../utils/api';
import { prettyBalance } from '../../../utils/utils';
import { CustomToast } from '../../../utils/CustomToast';
import { setWalletBalance } from '../../../actions/user';

const PostPieceModal = ({ isVisible, postId, onClose }) => {
  const dispatch = useDispatch();
  const walletBalance = useSelector((state) => state.user.walletBalance);
  const userId = useSelector((state) => state.user.profile.id);

  const [pieceValue, setPieceValue] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const listPieceValue = [5, 10, 15, 20];

  useEffect(() => {
    if (isVisible) {
      Axios.get(WALLET_BALANCE(userId))
        .then((res) => {
          if (res.data.data !== walletBalance) {
            dispatch(setWalletBalance({ walletBalance: res.data.data }));
          }
        })
        .catch((err) => console.log(err));
    }
  }, [userId, walletBalance, isVisible, dispatch]);

  const sendPiece = () => {
    const valueSend = pieceValue * 10 ** 18;
    if (walletBalance < valueSend) {
      onClose();
      CustomToast('You dont have enough coins', 0, 'error');
    } else {
      setIsLoading(true);
      Axios.post(WALLET_PIECE, {
        postId: postId,
        value: valueSend,
      })
        .then((res) => {
          setIsLoading(false);
          onClose();
          CustomToast('Your piece has been sent successfully', 1000, 'success');
        })
        .catch(() => {
          CustomToast('Something went wrong, try again later', 1000, 'error');
          setIsLoading(false);
        });
    }
  };

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
          <Text style={_styles.balanceNumberText}>{prettyBalance(walletBalance)}</Text>
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
          {isLoading ? (
            <ActivityIndicator
              size={'small'}
              color={Colors['white-1']}
              style={{
                alignSelf: 'center',
                flex: 1,
                paddingVertical: 12,
                backgroundColor: Colors['primary-5'],
              }}
            />
          ) : (
            <>
              <TouchableNativeFeedback onPress={onClose}>
                <View style={_styles.subTitleView}>
                  <Text style={_styles.subTitleText}>Cancel</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={sendPiece}>
                <View style={[_styles.subTitleView, { backgroundColor: Colors['primary-5'] }]}>
                  <Text style={_styles.subTitleText}>Send</Text>
                </View>
              </TouchableNativeFeedback>
            </>
          )}
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
