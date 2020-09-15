import React from 'react';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import Clipboard from '@react-native-community/clipboard';

import ListMoreOption from '../../Common/ListMoreOption';
import RoutesName from '../../../utils/RoutesName';

const UserOptionModal = ({ isVisible, onClose, profileId }) => {
  const navigation = useNavigation();
  const listOptionsModal = [
    {
      title: 'Copy Link',
      onPress: () => {
        copyToClipboard(profileId);
        onClose();
      },
    },
    {
      title: 'View Memento',
      onPress: () => {
        onClose();
        navigation.navigate(RoutesName.ProfileMemento);
      },
    },
  ];

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

export default UserOptionModal;

const copyToClipboard = (userId) => {
  Clipboard.setString(`https://alpha.paras.id/${userId}`);
};
