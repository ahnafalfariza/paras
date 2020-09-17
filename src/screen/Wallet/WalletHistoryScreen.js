import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useSelector } from 'react-redux';

import MainHeader from '../../component/Header/MainHeader';
import Screen from '../../component/Common/Screen';
import TransactionList from '../../component/Wallet/TransactionList';
import { WALLET_HISTORY } from '../../utils/api';
import { txLimit } from '../../utils/constant';

const WalletHistory = ({ navigation }) => {
  const userId = useSelector((state) => state.user.profile.id);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getWalletHistory();
    });

    getWalletHistory(1);

    return unsubscribe;
  }, [navigation, userId]);

  const getWalletHistory = (page, onRefresh = false) => {
    Axios.get(WALLET_HISTORY(userId, page)).then((res) => {
      const newData = onRefresh ? res.data.data : [...data, ...res.data.data];
      setData(newData);
      setHasMore(res.data.data.length < txLimit ? false : true);
    });
  };

  const onRefreshFeeds = () => {
    getWalletHistory(1, true);
    setPage(1);
  };

  const loadMoreFeeds = () => {
    getWalletHistory(page + 1);
    setPage(page + 1);
  };

  return (
    <>
      <MainHeader title={'Transaction History'} leftComponent={'back'} />
      <Screen>
        <TransactionList
          list={data}
          onLoadMore={loadMoreFeeds}
          onRefresh={onRefreshFeeds}
          hasMore={hasMore}
        />
      </Screen>
    </>
  );
};

export default WalletHistory;
