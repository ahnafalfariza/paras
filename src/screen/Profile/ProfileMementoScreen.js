import React, { useCallback, useEffect, useState } from 'react';
import MainHeader from '../../component/Header/MainHeader';
import Screen from '../../component/Common/Screen';
import Axios from 'axios';
import { USER_MEMENTO } from '../../utils/api';
import { useSelector } from 'react-redux';
import MementoListSquare from '../../component/NewPost/MementoListSquare';

const ProfileMementoScreen = () => {
  const userId = useSelector((state) => state.user.profile.id);
  const [userMemento, setUserMemento] = useState([]);

  useEffect(() => {
    getUserMemento();
  }, [getUserMemento]);

  const getUserMemento = useCallback(() => {
    Axios.get(USER_MEMENTO(userId))
      .then((res) => setUserMemento(res.data.data))
      .catch((err) => console.log(err));
  }, [userId]);

  return (
    <>
      <MainHeader title={'My Memento'} leftComponent={'back'} />
      <Screen>
        <MementoListSquare list={userMemento} isNewPost={false} />
      </Screen>
    </>
  );
};

export default ProfileMementoScreen;
