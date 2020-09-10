import React from 'react';
import MainHeader from '../../component/Header/MainHeader';
import Screen from '../../component/Common/Screen';

const UserMementoScreen = () => {
  return (
    <>
      <MainHeader title={'My Memento'} leftComponent={'back'} />
      <Screen />
    </>
  );
};

export default UserMementoScreen;
