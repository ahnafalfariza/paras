import React, { useState } from 'react';
import {
  View,
  TouchableNativeFeedback,
  Text,
  StyleSheet,
  RefreshControl,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import TimeAgo from 'javascript-time-ago';
import FastImage from 'react-native-fast-image';
import en from 'javascript-time-ago/locale/en';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

import Colors from '../../utils/color';
import { getImageUrl } from '../../utils/image';
import assetSvg from '../../assets/svg/svg';
import RoutesName from '../../utils/RoutesName';
import CommentOptionModal from '../Modal/Common/CommentOptionModal';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

const Comment = ({ data, onRefresh }) => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

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
    <>
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
                <Text style={_styles.dateText}>{timeAgo.format(new Date(data.createdAt))}</Text>
              </View>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => setModalVisible(true)}>
            <View style={{ paddingVertical: 8 }}>
              <SvgXml xml={assetSvg.common.more} width="24" height="24" />
            </View>
          </TouchableNativeFeedback>
        </View>
        <Text style={_styles.commentText}>{data.body}</Text>
      </View>
      <CommentOptionModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        commentData={data}
        refreshComment={onRefresh}
      />
    </>
  );
};

const CommentList = ({ data, onRefresh, emptyComponent, hasMore, onLoadMore }) => {
  const [refreshing, setRefresh] = useState(false);

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

  return (
    <FlatList
      data={data}
      inverted={true}
      renderItem={({ item }) => <Comment data={item} onRefresh={onRefresh} />}
      refreshControl={
        <RefreshControl refreshing={refreshing} tintColor={'#ffffff'} onRefresh={refreshComment} />
      }
      contentContainerStyle={{
        paddingVertical: 8,
        marginHorizontal: 16,
        flexGrow: 1,
        justifyContent: 'flex-end',
      }}
      ListEmptyComponent={hasMore ? null : emptyComponent}
      ListFooterComponent={() => {
        return hasMore ? (
          <ActivityIndicator color={Colors['white-1']} style={{ marginTop: 16 }} />
        ) : null;
      }}
      onEndReachedThreshold={0.9}
      onEndReached={hasMore ? onLoadMore : null}
      keyExtractor={(item) => item.id}
    />
  );
};

export default CommentList;

const _styles = StyleSheet.create({
  containerView: {
    padding: 12,
    backgroundColor: Colors['dark-4'],
    borderRadius: 6,
    marginVertical: 8,
  },
  profileContainerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userText: {
    fontFamily: 'Inconsolata-Bold',
    color: Colors['white-1'],
    fontSize: ResponsiveFont(15),
  },
  dateText: {
    fontFamily: 'Inconsolata-Regular',
    color: Colors['white-2'],
    fontSize: ResponsiveFont(12),
    marginTop: 4,
  },
  commentText: {
    marginTop: 16,
    fontFamily: 'Inconsolata-Bold',
    color: Colors['white-1'],
    fontSize: ResponsiveFont(15),
  },
});
