import React from 'react';
import Modal from 'react-native-modal';
import Clipboard from '@react-native-community/clipboard';
import { useNavigation } from '@react-navigation/native';

import ListMoreOption from '../../Common/ListMoreOption';
import RoutesName from '../../../utils/RoutesName';
import { CustomToast } from '../../../utils/CustomToast';

const ProfileOptionModal = ({ isVisible, onClose, logoutUser, profileId }) => {
  const navigation = useNavigation();
  const listOptionsModal = [
    {
      title: 'Copy Link',
      onPress: () => {
        onClose();
        copyToClipboard(profileId);
        CustomToast('Link copied!', 0, 'default', 1000);
      },
    },
    {
      title: 'View Memento',
      onPress: () => {
        onClose();
        navigation.navigate(RoutesName.ProfileMemento);
      },
    },
    {
      title: 'View Following',
      onPress: () => {
        onClose();
        navigation.navigate(RoutesName.ProfileFollowing);
      },
    },
    {
      title: 'Edit Profile',
      onPress: () => {
        onClose();
        navigation.navigate('EditProfile');
      },
    },
    {
      title: 'Log Out',
      onPress: () => {
        onClose();
        logoutUser();
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

export default ProfileOptionModal;

const copyToClipboard = (userId) => {
  Clipboard.setString(`https://alpha.paras.id/${userId}`);
};
