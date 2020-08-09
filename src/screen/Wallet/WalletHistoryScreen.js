import React from 'react';

import MainHeader from '../../component/Header/MainHeader';
import Screen from '../../component/Screen';

const WalletHistory = () => {
  return (
    <>
      <MainHeader title={'Transaction History'} withBack />
      <Screen />
    </>
  );
};

export default WalletHistory;
