import React, { Component } from 'react';
import Axios from 'axios';

import Screen from '../component/Screen';
import MainHeader from '../component/MainHeader';
import PostList from '../component/Post';
import { EXPLORE_URL } from '../utils/api';

class ExploreScreen extends Component {
  state = {
    data: [],
    page: 1,
  };

  componentDidMount() {
    this.getExploreData(this.state.page);
  }

  getExploreData = (page) => {
    Axios.get(EXPLORE_URL(page))
      .then((res) => {
        this.setState((prevState) => ({ data: [...prevState.data, ...res.data.data] }));
      })
      .catch((err) => console.log(err));
  };

  loadMorePost = () => {
    const page = this.state.page + 1;
    this.getExploreData(page);
    this.setState({ page });
  };

  render() {
    return (
      <>
        <MainHeader title={'Explore'} />
        <Screen>
          <PostList list={this.state.data} onLoadMore={this.loadMorePost} />
        </Screen>
      </>
    );
  }
}

export default ExploreScreen;
