import React from 'react';
import MainHeader from '../../component/Header/MainHeader';
import Screen from '../../component/Common/Screen';

const EditProfileScreen = () => {
  return (
    <>
      <MainHeader title={'Edit Profile'} leftComponent={'back'} />
      <Screen />
    </>
  );
};

export default EditProfileScreen;
