import React, { useState } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ListMoreOption from '../../Common/ListMoreOption';
import Clipboard from '@react-native-community/clipboard';
import Confirmation from '../../Common/Confimation';
import { DELETE_POST, REDACT_POST } from '../../../utils/api';
import Axios from 'axios';

const PostOptionModal = ({ isVisible, onClose, postId, userIdPost, refreshTimeline }) => {
  const navigation = useNavigation();
  const profile = useSelector((state) => state.user.profile);
  const [confirmType, setConfirmType] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  let listOptionsModal = [
    {
      title: 'Copy Link',
      onPress: () => {
        copyToClipboard(postId);
        onClose();
      },
    },
  ];

  if (!isVisible) {
    return null;
  }

  if (userIdPost === profile.id) {
    listOptionsModal = [
      ...listOptionsModal,
      ...[
        {
          title: 'Edit',
          onPress: () => console.log('edit'),
        },
        {
          title: 'Forget',
          onPress: () => {
            setConfirmType('delete');
            setShowConfirm(true);
          },
        },
        {
          title: 'Remove from Memento',
          onPress: () => {
            setConfirmType('redact');
            setShowConfirm(true);
          },
        },
      ],
    ];
  }

  const deletePost = () => {
    setLoading(true);
    Axios.delete(DELETE_POST(postId))
      .then(() => {
        refreshTimeline();
        setLoading(false);
        setShowConfirm(false);
        onClose();
      })
      .catch((err) => console.log(err));
  };

  const redactPost = () => {
    setLoading(true);
    Axios.put(REDACT_POST(postId))
      .then(() => {
        refreshTimeline();
        setLoading(false);
        setShowConfirm(false);
        onClose();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={!showConfirm ? onClose : null}
      onBackButtonPress={!showConfirm ? onClose : null}
      backdropOpacity={showConfirm ? 1 : 0.7}
      useNativeDriver
    >
      {showConfirm ? (
        <ConfirmationHelper
          type={confirmType}
          onPressLeft={() => setShowConfirm(false)}
          onPressDelete={deletePost}
          onPressRedact={redactPost}
          loading={loading}
        />
      ) : (
        <ListMoreOption data={listOptionsModal} />
      )}
    </Modal>
  );
};

export default PostOptionModal;

const ConfirmationHelper = ({ type, onPressLeft, onPressDelete, onPressRedact, loading }) => {
  const isDeletePost = type === 'delete';
  return (
    <Confirmation
      titleText={isDeletePost ? 'Forget this memory?' : 'Remove this memory \nfrom Memento?'}
      leftText={'Cancel'}
      rightText={isDeletePost ? 'Forget' : 'Redact'}
      onPressLeft={onPressLeft}
      onPressRight={isDeletePost ? onPressDelete : onPressRedact}
      loading={loading}
    />
  );
};

const copyToClipboard = (postId) => {
  Clipboard.setString(`https://alpha.paras.id/post/${postId}`);
};
