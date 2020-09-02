import React, { Component } from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import Axios from 'axios';

import Screen from '../../component/Common/Screen';
import MainHeader from '../../component/Header/MainHeader';
import Profile from '../../component/Profile/Profile';
import assetSvg from '../../assets/svg/svg';
import Colors from '../../utils/color';
import MainButton from '../../component/Common/MainButton';
import { logoutUser } from '../../actions/user';
import { PROFILE_POST_URL } from '../../utils/api';
import { postLimit } from '../../utils/constant';
import PostList from '../../component/Post/Post';

class ProfileScreen extends Component {
  state = {
    page: 1,
    postList: [],
    hasMore: true,
  };

  componentDidMount() {
    this.getPostData(this.state.page);
  }

  getPostData = (page, onRefresh = false) => {
    const { id } = this.props.profileData;
    Axios.get(PROFILE_POST_URL(id, page))
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
    const { postList, hasMore } = this.state;
    const { profileData } = this.props;

    if (this.props.profileData === null && !this.props.isLoggedIn) {
      return null;
    }

    return (
      <>
        <MainHeader
          title={'Profile'}
          rightComponent={() => (
            <TouchableWithoutFeedback onPress={() => console.log('more profile')}>
              <View style={{ paddingRight: 4 }}>
                <SvgXml
                  xml={assetSvg.common.more}
                  width="28"
                  height="28"
                  style={{ justifyContent: 'flex-end' }}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
        />
        <Screen>
          {/* <MainButton title={'Logout'} onPress={this.props.logoutUser} /> */}
          <PostList
            list={postList}
            header={<Profile data={profileData} type={'user'} />}
            onLoadMore={this.loadMorePost}
            onRefresh={this.onRefresh}
            hasMore={hasMore}
          />
        </Screen>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  profileData: state.user.profile,
  isLoggedIn: state.user.isLoggedIn,
});

const mapDispatchToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
