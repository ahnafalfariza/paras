import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Axios from 'axios';

import Screen from '../../component/Screen';
import MainHeader from '../../component/Header/MainHeader';
import PostList from '../../component/Post/Post';
import MemoryGrant from '../../component/MemoryGrant';
import { EXPLORE_URL } from '../../utils/api';
import assetSvg from '../../assets/svg/svg';
import Colors from '../../utils/color';

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
        <MainHeader
          title={'Explore'}
          rightComponent={() => (
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Search')}>
              <SvgXml
                xml={assetSvg.header.search}
                width="24"
                height="24"
                fill={Colors['white-1']}
              />
            </TouchableWithoutFeedback>
          )}
        />
        <Screen>
          <PostList
            list={this.state.data}
            onLoadMore={this.loadMorePost}
            header={() => <MemoryGrant />}
          />
        </Screen>
      </>
    );
  }
}

export default ExploreScreen;
