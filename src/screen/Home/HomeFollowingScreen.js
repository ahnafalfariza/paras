import React, { Component } from 'react';

import HomeHeader from '../../component/Header/HomeHeader';

import Screen from '../../component/Screen';

class HomeFollowing extends Component {
  render() {
    return (
      <>
        <HomeHeader active={'following'} />
        <Screen />
      </>
    );
  }
}

export default HomeFollowing;
