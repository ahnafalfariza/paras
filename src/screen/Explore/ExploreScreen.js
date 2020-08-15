import React, { Component } from 'react';
import Axios from 'axios';
import { SvgXml } from 'react-native-svg';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import Screen from '../../component/Common/Screen';
import MainHeader from '../../component/Header/MainHeader';
import PostList from '../../component/Post/Post';
import MemoryGrant from '../../component/MemoryGrant';
import { EXPLORE_URL, MEMORY_GRANTS_URL } from '../../utils/api';
import assetSvg from '../../assets/svg/svg';
import Colors from '../../utils/color';
import { postLimit } from '../../utils/constant';

class ExploreScreen extends Component {
  state = {
    data: [],
    page: 1,
    isLoaded: false,
    memoryGrants: {},
    hasMore: false,
  };

  componentDidMount() {
    this.getExploreData(this.state.page);
  }

  getExploreData = (page, onRefresh = false) => {
    Axios.all([Axios.get(EXPLORE_URL(page)), Axios.get(MEMORY_GRANTS_URL)])
      .then(
        Axios.spread((explore, memoryGrants) => {
          this.setState((prevState) => ({
            data: onRefresh ? explore.data.data : [...prevState.data, ...explore.data.data],
            memoryGrants: memoryGrants.data.data[0],
            hasMore: explore.data.data.length < postLimit ? false : true,
            isLoaded: true,
          }));
        }),
      )
      .catch((err) => console.log(err));
  };

  onRefreshExplore = () => {
    this.getExploreData(1, true);
    this.setState({ page: 1 });
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
            onRefresh={this.onRefreshExplore}
            header={() =>
              this.state.isLoaded && this.state.memoryGrants ? (
                <MemoryGrant
                  mementoId={this.state.memoryGrants.mementoId}
                  img={this.state.memoryGrants.memento.img}
                />
              ) : null
            }
            hasMore={this.state.hasMore}
          />
        </Screen>
      </>
    );
  }
}

export default ExploreScreen;
