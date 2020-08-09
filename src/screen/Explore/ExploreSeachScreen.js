import React from 'react';
import MainHeader from '../../component/Header/MainHeader';
import Screen from '../../component/Screen';
import { View, TextInput } from 'react-native';
import Colors from '../../utils/color';

const ExploreSearchScreen = () => {
  return (
    <>
      <MainHeader centerComponent={() => <Search />} withBack />
      <Screen />
    </>
  );
};

const Search = () => {
  return (
    <View
      style={{ backgroundColor: Colors['dark-4'], width: '100%', padding: 10, borderRadius: 4 }}
    >
      <TextInput
        style={{
          fontFamily: 'Inconsolata-Regular',
          color: Colors['white-1'],
          fontSize: 18,
          padding: 0,
        }}
      />
    </View>
  );
};

export default ExploreSearchScreen;
