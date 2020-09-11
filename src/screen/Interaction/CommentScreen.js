/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import Axios from 'axios';
import { SvgXml } from 'react-native-svg';

import MainHeader from '../../component/Header/MainHeader';
import Screen from '../../component/Common/Screen';
import Colors from '../../utils/color';
import assetSvg from '../../assets/svg/svg';
import { COMMENT } from '../../utils/api';
import CommentList from '../../component/Common/CommentList';
import NewCommentModal from '../../component/Modal/Comment/NewCommentModal';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

const CommentScreen = ({ route }) => {
  const { id } = route.params;

  const [isLoading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    getCommentList();
  }, []);

  const getCommentList = () => {
    Axios.get(COMMENT(id))
      .then((res) => {
        setCommentList(res.data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err.response.message));
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <MainHeader
        leftComponent={'back'}
        title={'Comment'}
        rightComponent={
          <TouchableWithoutFeedback onPress={toggleModal}>
            <SvgXml xml={assetSvg.bottomTab.NewPostTab} width="24" height="24" />
          </TouchableWithoutFeedback>
        }
      />
      <Screen style={{ padding: 16 }}>
        {isLoading ? (
          <ActivityIndicator size={'large'} color={Colors['white-1']} />
        ) : (
          <CommentList
            data={commentList}
            onRefresh={getCommentList}
            emptyComponent={
              <>
                <Text style={_styles.textEmptyCommentTitle}>Write a Comment</Text>
                <Text style={_styles.textEmptyCommentDesc}>
                  Click on button at top right to add a comment
                </Text>
              </>
            }
          />
        )}
        <NewCommentModal
          isVisible={isModalVisible}
          onDismiss={toggleModal}
          postId={id}
          onComplete={() => {
            toggleModal();
            setTimeout(() => {
              getCommentList();
            }, 3000);
          }}
        />
      </Screen>
    </>
  );
};

export default CommentScreen;

const _styles = StyleSheet.create({
  textEmptyCommentTitle: {
    fontFamily: 'Inconsolata-Bold',
    color: Colors['white-1'],
    fontSize: ResponsiveFont(20),
    textAlign: 'center',
    marginVertical: 16,
  },
  textEmptyCommentDesc: {
    fontFamily: 'Inconsolata-Regular',
    color: Colors['white-1'],
    fontSize: ResponsiveFont(15),
    textAlign: 'center',
    lineHeight: 24,
  },
});
