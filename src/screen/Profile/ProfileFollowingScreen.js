import React, { useEffect, useState } from 'react';
import MainHeader from '../../component/Header/MainHeader';
import Screen from '../../component/Common/Screen';
import Axios from 'axios';
import { FOLLOWING_LIST } from '../../utils/api';
import { FlatList, Text, View } from 'react-native';
import Colors from '../../utils/color';

const ProfileFollowingScreen = () => {
  const [listFollowing, setListFollowing] = useState([]);

  useEffect(() => {
    Axios.get(FOLLOWING_LIST)
      .then((res) => setListFollowing(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <MainHeader title={'Following'} leftComponent={'back'} />
      <Screen style={{ padding: 12 }}>
        <FlatList
          data={listFollowing}
          keyExtractor={(item) => item.targetId}
          renderItem={({ item }) => <Following data={item} />}
        />
      </Screen>
    </>
  );
};

const Following = ({ data }) => {
  return (
    <View style={{ paddingVertical: 6 }}>
      <Text style={{ fontFamily: 'Inconsolata-Bold', fontSize: 16, color: Colors['white-1'] }}>
        {data.targetId}
      </Text>
    </View>
  );
};

export default ProfileFollowingScreen;
