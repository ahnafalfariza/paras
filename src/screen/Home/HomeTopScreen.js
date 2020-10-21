import React, { Component } from 'react';

import HomeHeader from '../../component/Header/HomeHeader';
import Screen from '../../component/Common/Screen';
import PostList from '../../component/Post/Post';
import Axios from 'axios';
import { HOME_TOP } from '../../utils/api';
import { postLimit } from '../../utils/constant';

class HomeTop extends Component {
  state = {
    data: [],
    page: 1,
    hasMore: true,
  };

  componentDidMount() {
    this.getFeeds(this.state.page);
  }

  getFeeds = (page, onRefresh = false) => {
    Axios.get(HOME_TOP(page))
      .then((res) => {
        const newData = res.data.data.filter((data) => data != null);
        this.setState((prevState) => ({
          data: onRefresh ? newData : [...prevState.data, ...newData],
          hasMore: res.data.data.length < postLimit ? false : true,
        }));
      })
      .catch((err) => console.log(err));
  };

  onRefreshFeeds = () => {
    this.getFeeds(1, true);
    this.setState({ page: 1 });
  };

  loadMoreFeeds = () => {
    const page = this.state.page + 1;
    this.getFeeds(page);
    this.setState({ page });
  };

  render() {
    return (
      <>
        <HomeHeader active="top" />
        <Screen>
          <PostList
            list={this.state.data}
            onLoadMore={this.loadMoreFeeds}
            onRefresh={this.onRefreshFeeds}
            hasMore={this.state.hasMore}
          />
        </Screen>
      </>
    );
  }
}

export default HomeTop;
