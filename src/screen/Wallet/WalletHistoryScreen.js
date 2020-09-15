import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useSelector } from 'react-redux';

import MainHeader from '../../component/Header/MainHeader';
import Screen from '../../component/Common/Screen';
import TransactionList from '../../component/Wallet/TransactionList';
import { WALLET_HISTORY } from '../../utils/api';

const WalletHistory = ({ navigation, route }) => {
  const userId = useSelector((state) => state.user.profile.id);
  const [history, setHistory] = useState(route.params.transactionHistory);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getWalletHistory();
    });

    const getWalletHistory = () => {
      Axios.get(WALLET_HISTORY(userId)).then((res) => {
        setHistory(res.data.data);
      });
    };

    return unsubscribe;
  }, [navigation, userId]);

  const refreshWalletHistory = () => {
    Axios.get(WALLET_HISTORY(userId)).then((res) => {
      setHistory(res.data.data);
    });
  };

  return (
    <>
      <MainHeader title={'Transaction History'} leftComponent={'back'} />
      <Screen>
        <TransactionList transactionList={history} onRefresh={refreshWalletHistory} />
      </Screen>
    </>
  );
};

export default WalletHistory;
