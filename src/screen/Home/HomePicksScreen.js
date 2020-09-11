import React, { Component } from 'react';
import { Text } from 'react-native';

import HomeHeader from '../../component/Header/HomeHeader';
import Screen from '../../component/Common/Screen';
import Colors from '../../utils/color';
import Axios from 'axios';
import { HOME_PICKS } from '../../utils/api';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

class HomePicks extends Component {
  componentDidMount() {
    Axios.get(HOME_PICKS)
      .then((res) => console.log('berhasil', res.data))
      .catch((err) => console.log(err.response.data));
  }

  render() {
    return (
      <>
        <HomeHeader active={'picks'} />
        <Screen>
          <Text
            style={{
              fontFamily: 'Inconsolata-Regular',
              color: Colors['white-1'],
              fontSize: ResponsiveFont(20),
            }}
          >
            Picks
          </Text>
        </Screen>
      </>
    );
  }
}

export default HomePicks;
