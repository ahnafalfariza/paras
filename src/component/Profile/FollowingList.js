import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { ResponsiveFont } from '../../utils/ResponsiveFont';
import Colors from '../../utils/color';
import FastImage from 'react-native-fast-image';
import { getImageUrl } from '../../utils/image';
import MainButton from '../Common/MainButton';
import Axios from 'axios';
import { FOLLOW, UNFOLLOW } from '../../utils/api';
import { toggleFollow } from '../../actions/user';
import RoutesName from '../../utils/RoutesName';

const Following = ({ data, navigation }) => {
  const dispatch = useDispatch();
  const [isFollowing, setIsFollowing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsFollowing(true);
  }, [data.targetId]);

  const pressRelation = () => {
    setIsLoading(true);
    Axios.post(isFollowing ? UNFOLLOW : FOLLOW, {
      targetId: data.targetId,
      targetType: data.targetType,
    })
      .then(() => {
        dispatch(toggleFollow(data.targetId));
        setIsLoading(false);
        setIsFollowing(!isFollowing);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const img = data.targetType === 'user' ? data.user.imgAvatar : data.memento.img;

  const navigateTo = () => {
    if (data.targetType === 'memento') {
      navigation.push(RoutesName.Memento, { memento: { id: data.targetId } });
    } else {
      navigation.push(RoutesName.UserProfile, { user: { id: data.targetId } });
    }
  };

  return (
    <View style={_styles.containerView}>
      <TouchableWithoutFeedback onPress={navigateTo}>
        <View style={_styles.followingData}>
          <FastImage
            source={{ uri: getImageUrl(img) }}
            style={[_styles.followingImage, { borderRadius: data.targetType === 'user' ? 14 : 0 }]}
          />
          <Text
            style={{
              fontFamily: 'Inconsolata-Bold',
              fontSize: ResponsiveFont(14),
              color: Colors['white-1'],
            }}
          >
            {data.targetId}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <MainButton
        title={isFollowing ? 'UNFOLLOW' : 'FOLLOW'}
        secondary={isFollowing}
        loading={isLoading}
        loadingColor={isFollowing ? Colors['primary-5'] : Colors['white-1']}
        loadingSize={16}
        textStyle={{
          fontFamily: 'Inconsolata-Bold',
          fontSize: ResponsiveFont(12),
        }}
        buttonStyle={{
          padding: 0,
        }}
        containerStyle={{ width: 80, height: 24, marginVertical: 0 }}
        onPress={pressRelation}
      />
    </View>
  );
};

const FollowingList = ({ list, hasMore = false, onLoadMore = () => {}, onRefresh = () => {} }) => {
  const navigation = useNavigation();
  const [refreshing, setRefresh] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const refreshFlatlist = async () => {
    setRefresh(true);
    await wait(2000).then(() => onRefresh());
    setRefresh(false);
  };

  const renderItem = ({ item }) => <Following data={item} navigation={navigation} />;

  return (
    <FlatList
      data={list}
      refreshControl={
        <RefreshControl refreshing={refreshing} tintColor={'#ffffff'} onRefresh={refreshFlatlist} />
      }
      keyExtractor={(item, idx) => idx.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ paddingVertical: 6, paddingHorizontal: 12 }}
      onEndReachedThreshold={0.9}
      onEndReached={hasMore ? onLoadMore : null}
      ListFooterComponent={() => {
        return hasMore ? (
          <ActivityIndicator color={Colors['white-1']} style={{ marginBottom: 16 }} />
        ) : null;
      }}
    />
  );
};

export default FollowingList;

const _styles = StyleSheet.create({
  containerView: {
    flexDirection: 'row',
    backgroundColor: Colors['dark-8'],
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 6,
    padding: 8,
    marginTop: 16,
  },
  followingData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followingImage: {
    height: 28,
    width: 28,
    marginRight: 8,
  },
  followingText: {
    fontFamily: 'Inconsolata-Bold',
    color: Colors['white-1'],
    fontSize: ResponsiveFont(15),
  },
  typeText: {
    fontFamily: 'Inconsolata-Regular',
    color: Colors['primary-5'],
    fontSize: ResponsiveFont(14),
  },
});
