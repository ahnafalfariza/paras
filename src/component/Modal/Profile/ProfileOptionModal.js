import React from 'react';
import Modal from 'react-native-modal';
import ListMoreOption from '../../Common/ListMoreOption';
import { useNavigation } from '@react-navigation/native';
import RoutesName from '../../../utils/RoutesName';
import Clipboard from '@react-native-community/clipboard';

const ProfileOptionModal = ({ isVisible, onClose, logoutUser, profileId }) => {
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
