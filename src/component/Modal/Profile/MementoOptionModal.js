import React from 'react';
import Modal from 'react-native-modal';
import Clipboard from '@react-native-community/clipboard';

import ListMoreOption from '../../Common/ListMoreOption';
import { useNavigation } from '@react-navigation/native';

const MementoOptionModal = ({ isVisible, onClose, mementoData, isUserOwner }) => {
  const navigation = useNavigation();
  let listOptionsModal = [
    {
      title: 'Copy Link',
      onPress: () => {
        onClose();
        copyToClipboard(mementoData.id);
      },
    },
  ];

  if (isUserOwner) {
    listOptionsModal = [
      ...listOptionsModal,
      {
        title: 'Edit',
        onPress: () => {
          onClose();
          navigation.navigate('EditMemento', { mementoData: mementoData });
        },
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
