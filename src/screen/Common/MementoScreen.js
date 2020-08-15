import React, { Component } from 'react';
import Axios from 'axios';

import Screen from '../../component/Common/Screen';
import MainHeader from '../../component/Header/MainHeader';
import Profile from '../../component/Profile/Profile';
import { MEMENTO_POST_URL } from '../../utils/api';
import PostList from '../../component/Post/Post';
import { postLimit } from '../../utils/constant';

class MementoScreen extends Component {
  state = {
    page: 1,
    postList: [],
    hasMore: true,
  };

  componentDidMount() {
    this.getPostData(this.state.page);
  }

  getPostData = (page, onRefresh = false) => {
    const { id } = this.props.route.params.memento;
    Axios.get(MEMENTO_POST_URL(id, page))
      .then((res) => {
        this.setState((prevState) => ({
          postList: onRefresh ? res.data.data : [...prevState.postList, ...res.data.data],
          hasMore: res.data.data.length < postLimit ? false : true,
        }));
      })
      .catch((err) => console.log(err));
  };

  onRefresh = () => {
    this.getPostData(1, true);
    this.setState({ page: 1 });
  };

  loadMorePost = () => {
    const page = this.state.page + 1;
    this.getPostData(page);
    this.setState({ page });
  };

  render() {
    const { memento } = this.props.route.params;
    const { postList, hasMore } = this.state;

    return (
      <>
        <MainHeader title={memento.id} withBack />
        <Screen>
          <PostList
            list={postList}
            header={<Profile data={memento} type={'memento'} />}
            onLoadMore={this.loadMorePost}
            onRefresh={this.onRefresh}
            hasMore={hasMore}
          />
        </Screen>
      </>
    );
  }
}

export default MementoScreen;
