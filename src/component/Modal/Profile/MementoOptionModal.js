import React from 'react';
import Modal from 'react-native-modal';
import Clipboard from '@react-native-community/clipboard';
import Axios from 'axios';

import ListMoreOption from '../../Common/ListMoreOption';
import { useNavigation } from '@react-navigation/native';
import { ARCHIEVE_MEMENTO, UNARCHIEVE_MEMENTO } from '../../../utils/api';
import { CustomToast } from '../../../utils/CustomToast';

const MementoOptionModal = ({
  isVisible,
  onClose,
  mementoData,
  isUserOwner,
  refreshMementoData,
}) => {
  const navigation = useNavigation();
  let listOptionsModal = [
    {
      title: 'Copy Link',
      onPress: () => {
        onClose();
        copyToClipboard(mementoData.id);
        CustomToast('Link copied!', 0, 'default', 1000);
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
        title: mementoData.isArchive ? 'Unarchive' : 'Archive',
        onPress: () => {
          const url = mementoData.isArchive
            ? UNARCHIEVE_MEMENTO(mementoData.id)
            : ARCHIEVE_MEMENTO(mementoData.id);

          Axios.put(url)
            .then(() => {
              refreshMementoData();
              CustomToast(
                `Memento ${mementoData.isArchive ? 'unarchived' : 'archived'}`,
                0,
                'default',
                1000,
              );
            })
            .catch((err) => console.log(err));
          onClose();
        },
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
  Clipboard.setString(`https://beta.paras.id/m/${mementoId}`);
};
