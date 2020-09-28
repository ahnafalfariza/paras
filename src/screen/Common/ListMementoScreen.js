import React, { useCallback, useEffect, useState } from 'react';
import Axios from 'axios';

import MainHeader from '../../component/Header/MainHeader';
import Screen from '../../component/Common/Screen';
import { LIST_MEMENTO } from '../../utils/api';
import MementoListSquare from '../../component/NewPost/MementoListSquare';

const ListMementoScreen = ({ route }) => {
  const [userMemento, setUserMemento] = useState([]);
  const { userId } = route.params;

  useEffect(() => {
    getUserMemento();
  }, [getUserMemento]);

  const getUserMemento = useCallback(() => {
    Axios.get(LIST_MEMENTO(userId))
      .then((res) => setUserMemento(res.data.data))
      .catch((err) => console.log(err));
  }, [userId]);

  return (
    <>
      <MainHeader title={'Memento'} leftComponent={'back'} />
      <Screen>
        <MementoListSquare list={userMemento} isNewPost={false} />
      </Screen>
    </>
  );
};

export default ListMementoScreen;
