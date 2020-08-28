import React, { Component } from 'react';

import HomeHeader from '../../component/Header/HomeHeader';
import Screen from '../../component/Common/Screen';
import PostList from '../../component/Post/Post';
import Axios from 'axios';
import { HOME_FEED } from '../../utils/api';

class HomeFollowing extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    Axios.get(HOME_FEED)
      .then((res) => this.setState({ data: res.data.data }))
      .catch((err) => console.log(err.response.data));
  }

  render() {
    return (
      <>
        <HomeHeader active={'following'} />
        <Screen>
          <PostList
            list={this.state.data}
            // onLoadMore={this.loadMorePost}
            // onRefresh={this.onRefreshExplore}
            // hasMore={this.state.hasMore}
          />
        </Screen>
      </>
    );
  }
}

export default HomeFollowing;
