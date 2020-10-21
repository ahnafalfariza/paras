import React, { useCallback, useEffect, useState } from 'react';
import MainHeader from '../../component/Header/MainHeader';
import Screen from '../../component/Common/Screen';
import FollowingList from '../../component/Profile/FollowingList';
import { FOLLOWING_LIST } from '../../utils/api';
import Axios from 'axios';
import { defaultLimit } from '../../utils/constant';
import { useNavigation } from '@react-navigation/native';

const ProfileFollowingScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFollowing(1, true);
    });
    getFollowing(1, true);

    return unsubscribe;
  }, [navigation, getFollowing]);

  const getFollowing = useCallback(
    (pageNum, onRefresh = false) => {
      Axios.get(FOLLOWING_LIST(pageNum)).then((res) => {
        const newData = onRefresh ? res.data.data : [...data, ...res.data.data];
        setData(newData);
        setHasMore(res.data.data.length < defaultLimit ? false : true);
      });
    },
    [data],
  );

  const onRefreshFeeds = () => {
    getFollowing(1, true);
    setPage(1);
  };

  const loadMoreFeeds = () => {
    getFollowing(page + 1);
    setPage(page + 1);
  };
  return (
    <>
      <MainHeader title={'Following'} leftComponent={'back'} />
      <Screen>
        <FollowingList
          list={data}
          onLoadMore={loadMoreFeeds}
          onRefresh={onRefreshFeeds}
          hasMore={hasMore}
        />
      </Screen>
    </>
  );
};

export default ProfileFollowingScreen;
