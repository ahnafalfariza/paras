import React from 'react';

import MainHeader from '../../component/Header/MainHeader';
import Screen from '../../component/Common/Screen';

const WalletHistory = () => {
  return (
    <>
      <MainHeader title={'Transaction History'} leftComponent={'back'} />
      <Screen />
    </>
  );
};

export default WalletHistory;
