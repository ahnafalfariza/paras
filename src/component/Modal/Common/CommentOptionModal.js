import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Axios from 'axios';

import RoutesName from '../../../utils/RoutesName';
import { DELETE_COMMENT } from '../../../utils/api';
import Confirmation from '../../Common/Confimation';
import ListMoreOption from '../../Common/ListMoreOption';

const CommentOptionModal = ({ isVisible, onClose, commentData, refreshComment }) => {
  const navigation = useNavigation();
  const userId = useSelector((state) => state.user.profile.id);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  let listOptionsModal = [
    {
      title: 'View Profile',
      onPress: () => viewProfile(),
    },
  ];

  const viewProfile = () => {
    onClose();
    navigation.navigate('TabNavigator', {
      screen: RoutesName.ExploreTab,
      params: {
        screen: RoutesName.UserProfile,
        params: {
          user: commentData.user,
        },
      },
    });
  };

  const deleteComment = () => {
    setLoadingDelete(true);
    Axios.delete(DELETE_COMMENT(commentData.id))
      .then(() => {
        refreshComment();
        setLoadingDelete(false);
        setShowConfirm(false);
        onClose();
      })
      .catch((err) => console.log(err));
  };

  if (commentData.user.id === userId) {
    listOptionsModal = [
      ...listOptionsModal,
      {
        title: 'Forget',
        onPress: () => setShowConfirm(true),
      },
    ];
  }

  if (!isVisible) {
    return null;
  }

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={!showConfirm ? onClose : null}
      onBackButtonPress={!showConfirm ? onClose : null}
      backdropOpacity={showConfirm ? 1 : 0.7}
      useNativeDriver
    >
      {showConfirm ? (
        <Confirmation
          titleText={'Remove this comment?'}
          leftText={'Cancel'}
          rightText={'Remove'}
          onPressLeft={() => setShowConfirm(false)}
          onPressRight={deleteComment}
          loading={loadingDelete}
        />
      ) : (
        <ListMoreOption data={listOptionsModal} />
      )}
    </Modal>
  );
};

export default CommentOptionModal;
