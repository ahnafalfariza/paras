import React, { Component } from 'react';

import Screen from '../../component/Common/Screen';
import Axios from 'axios';
import { HOME_NOTIFICATION } from '../../utils/api';
import { postLimit } from '../../utils/constant';
import NotificationList from '../../component/Notification/NotificationList';
import MainHeader from '../../component/Header/MainHeader';

class HomeNotification extends Component {
  state = {
    data: [],
    page: 1,
    hasMore: true,
  };

  componentDidMount() {
    this.getFeeds(this.state.page);
  }

  getFeeds = (page, onRefresh = false) => {
    Axios.get(HOME_NOTIFICATION(page))
      .then((res) => {
        this.setState((prevState) => ({
          data: onRefresh ? res.data.data : [...prevState.data, ...res.data.data],
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
        <MainHeader leftComponent="close" title="Notification" />
        <Screen>
          <NotificationList
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

export default HomeNotification;
