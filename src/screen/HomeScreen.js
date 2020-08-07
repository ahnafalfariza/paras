import React, { Component } from 'react';
import HomeHeader from '../component/HomeHeader';
import Screen from '../component/Screen';
import Post from '../component/Post';

class HomeScreen extends Component {
  render() {
    return (
      <>
        <HomeHeader />
        <Screen>
          <Post />
          {/* <Text
            style={{
              fontFamily: 'Inconsolata-Regular',
              color: Colors['white-1'],
              fontSize: 24,
            }}
          >
            HomeScreen
          </Text> */}
        </Screen>
      </>
    );
  }
}

export default HomeScreen;
