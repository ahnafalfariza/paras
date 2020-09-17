import React, { Component } from 'react';
import Axios from 'axios';

import Screen from '../../component/Common/Screen';
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
    this.getNotifications(this.state.page);
  }

  getNotifications = (page, onRefresh = false) => {
    Axios.get(HOME_NOTIFICATION(page))
      .then((res) => {
        this.setState((prevState) => ({
          data: onRefresh ? res.data.data : [...prevState.data, ...res.data.data],
          hasMore: res.data.data.length < postLimit ? false : true,
        }));
      })
      .catch((err) => console.log(err));
  };

  onRefreshNotifications = () => {
    this.getNotifications(1, true);
    this.setState({ page: 1 });
  };

  loadMoreNotifications = () => {
    const page = this.state.page + 1;
    this.getNotifications(page);
    this.setState({ page });
  };

  render() {
    return (
      <>
        <MainHeader leftComponent="close" title="Notification" />
        <Screen>
          <NotificationList
            list={this.state.data}
            onLoadMore={this.loadMoreNotifications}
            onRefresh={this.onRefreshNotifications}
            hasMore={this.state.hasMore}
          />
        </Screen>
      </>
    );
  }
}

export default HomeNotification;
