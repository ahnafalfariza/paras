import React, { useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { View, TouchableNativeFeedback, Text, StyleSheet, RefreshControl } from 'react-native';
import TimeAgo from 'javascript-time-ago';
import FastImage from 'react-native-fast-image';
import en from 'javascript-time-ago/locale/en';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

import Colors from '../../utils/color';
import { getImageUrl } from '../../utils/image';
import assetSvg from '../../assets/svg/svg';
import RoutesName from '../../utils/RoutesName';
import MoreCommentModal from '../Modal/Common/MoreCommentModal';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

const Comment = ({ data, onPressMore }) => {
  const navigation = useNavigation();

  const onPressProfile = () => {
    navigation.navigate('TabNavigator', {
      screen: RoutesName.ExploreTab,
      params: {
        screen: RoutesName.UserProfile,
        params: {
          user: data.user,
        },
      },
    });
  };

  return (
    <View style={_styles.containerView}>
      <View style={_styles.profileContainerView}>
        <TouchableNativeFeedback onPress={onPressProfile}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FastImage
              source={{ uri: getImageUrl(data.user.imgAvatar) }}
              style={{ height: 48, width: 48 }}
            />
            <View style={{ marginLeft: 12 }}>
              <Text style={_styles.userText}>{data.user.id}</Text>
              <Text style={_styles.dateText}>
                {timeAgo.format(new Date(data.createdAt / 10 ** 6))}
              </Text>
            </View>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => onPressMore(data)}>
          <View style={{ paddingVertical: 8 }}>
            <SvgXml xml={assetSvg.common.more} width="24" height="24" />
          </View>
        </TouchableNativeFeedback>
      </View>
      <Text style={_styles.commentText}>{data.body}</Text>
    </View>
  );
};

const CommentList = ({ data, onRefresh, emptyComponent }) => {
  const [refreshing, setRefresh] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [commentData, setCommentData] = useState(null);

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const refreshComment = async () => {
    setRefresh(true);
    await wait(2000).then(() => onRefresh());
    setRefresh(false);
  };

  const onPressMore = (item) => {
    setModalVisible(true);
    setCommentData(item);
    console.log(item);
  };

  const onCloseModal = () => {
    setModalVisible(false);
    setCommentData(null);
  };

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => <Comment data={item} onPressMore={onPressMore} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            tintColor={'#ffffff'}
            onRefresh={refreshComment}
          />
        }
        ListEmptyComponent={emptyComponent}
        keyExtractor={(item) => item.id}
      />
      {commentData !== null && (
        <MoreCommentModal
          isVisible={isModalVisible}
          onClose={onCloseModal}
          commentData={commentData}
          refreshComment={refreshComment}
        />
      )}
    </>
  );
};

export default CommentList;

const _styles = StyleSheet.create({
  containerView: {
    padding: 12,
    backgroundColor: Colors['dark-4'],
    borderRadius: 6,
    marginBottom: 16,
  },
  profileContainerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userText: {
    fontFamily: 'Inconsolata-Bold',
    color: Colors['white-1'],
    fontSize: 18,
  },
  dateText: {
    fontFamily: 'Inconsolata-Regular',
    color: Colors['white-2'],
    fontSize: 14,
    marginTop: 4,
  },
  commentText: {
    marginTop: 16,
    fontFamily: 'Inconsolata-Bold',
    color: Colors['white-1'],
    fontSize: 18,
  },
});
