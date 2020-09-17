import React from 'react';
import Modal from 'react-native-modal';
import Clipboard from '@react-native-community/clipboard';

import ListMoreOption from '../../Common/ListMoreOption';

const MementoOptionModal = ({ isVisible, onClose, mementoId, isUserOwner }) => {
  let listOptionsModal = [
    {
      title: 'Copy Link',
      onPress: () => {
        copyToClipboard(mementoId);
        onClose();
      },
    },
  ];

  if (isUserOwner) {
    listOptionsModal = [
      ...listOptionsModal,
      {
        title: 'Edit',
        onPress: () => console.log('edit'),
      },
      {
        title: 'Archive',
        onPress: () => console.log('archive'),
      },
    ];
  }

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      useNativeDriver
    >
      <ListMoreOption data={listOptionsModal} />
    </Modal>
  );
};

export default MementoOptionModal;

const copyToClipboard = (mementoId) => {
  Clipboard.setString(`https://alpha.paras.id/m/${mementoId}`);
};
