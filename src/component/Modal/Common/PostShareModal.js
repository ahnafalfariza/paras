import React from 'react';
import Modal from 'react-native-modal';
import Share from 'react-native-share';
import Clipboard from '@react-native-community/clipboard';
import RNFetchBlob from 'rn-fetch-blob';

import ListMoreOption from '../../Common/ListMoreOption';
import { getImageUrl } from '../../../utils/image';
import { PermissionsAndroid } from 'react-native';

const PostShareModal = ({ isVisible, onClose, postData }) => {
  const { id, contentList, user, memento } = postData;
  const postId = postData.id;

  let listOptionsModal = [
    // {
    //   title: 'Instagram Stories',
    //   onPress: () => {
    //     onPressShareIGStories()
    //     onClose();
    //   },
    // },
    {
      title: 'Twitter',
      onPress: () => {
        onPressShareTwitter();
        onClose();
      },
    },
    {
      title: 'Facebook',
      onPress: () => {
        onPressShareFacebook();
        onClose();
      },
    },
    {
      title: 'Copy Link',
      onPress: () => {
        copyToClipboard(postId);
        onClose();
      },
    },
    {
      title: 'More',
      onPress: () => {
        onPressShareMore();
        onClose();
      },
    },
  ];

  if (!isVisible) {
    return null;
  }

  const onPressShareIGStories = async () => {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

    const contentImg = contentList.filter((content) => content.type === 'img');

    const imgUrl = contentImg.length > 0 ? getImageUrl(JSON.parse(contentImg[0].body)) : null;

    const mementoImgUrl = getImageUrl(memento.img);

    const stickerImg = await RNFetchBlob.config({
      fileCache: true,
    }).fetch('GET', imgUrl || mementoImgUrl);

    const stickerPath = stickerImg.path();

    const shareOptions = {
      method: Share.InstagramStories.SHARE_STICKER_IMAGE,
      stickerImage: `file://${stickerPath}`,
      social: Share.Social.INSTAGRAM_STORIES,
    };

    try {
      Share.shareSingle(shareOptions);
    } catch (err) {
      console.log(err);
    }
  };

  const onPressShareTwitter = () => {
    const shareOptions = {
      message: `Here's a post by ${user.id}`,
      url: `http://beta.paras.id/post/${id}`,
      social: Share.Social.TWITTER,
    };

    try {
      Share.shareSingle(shareOptions);
    } catch (err) {
      console.log(err);
    }
  };

  const onPressShareFacebook = () => {
    const shareOptions = {
      message: '',
      url: `http://beta.paras.id/post/${id}`,
      social: Share.Social.FACEBOOK,
    };

    try {
      Share.shareSingle(shareOptions);
    } catch (err) {
      console.log(err);
    }
  };

  const onPressShareMore = () => {
    const options = {
      message: '',
      title: 'Share post to',
      url: `https://beta.paras.id/post/${id}`,
    };

    Share.open(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      useNativeDriver
    >
      <ListMoreOption data={listOptionsModal} />
    </Modal>
  );
};

const copyToClipboard = (postId) => {
  Clipboard.setString(`https://beta.paras.id/post/${postId}`);
};

export default PostShareModal;
