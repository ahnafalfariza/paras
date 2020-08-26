import React, { useState } from 'react';
import Axios from 'axios';

import MainHeader from '../../component/Header/MainHeader';
import Screen from '../../component/Common/Screen';
import { View, TextInput } from 'react-native';
import Colors from '../../utils/color';
import { SEARCH_URL } from '../../utils/api';
import SearchResultList from '../../component/Search/SearchResult';

const ExploreSearchScreen = () => {
  const [data, setData] = useState([]);

  const getSearchData = (query) => {
    if (query === '') {
      setData([]);
    } else {
      Axios.get(SEARCH_URL(query))
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <MainHeader
        centerComponent={() => <Search onChange={getSearchData} />}
        leftComponent={'back'}
      />
      <Screen>
        <SearchResultList result={data} />
      </Screen>
    </>
  );
};

const Search = ({ onChange }) => {
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
        autoCorrect={false}
        autoCapitalize={'none'}
        selectionColor={Colors['white-1']}
        onChangeText={(text) => onChange(text.toLowerCase())}
        autoFocus={true}
        returnKeyType={'search'}
      />
    </View>
  );
};

export default ExploreSearchScreen;
