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
import { logoutUser } from '../../actions/user';
import { PROFILE_POST_URL } from '../../utils/api';
import { postLimit } from '../../utils/constant';
import PostList from '../../component/Post/Post';
import MoreProfileModal from '../../component/Modal/Profile/MoreProfileModal';

class ProfileScreen extends Component {
  state = {
    page: 1,
    postList: [],
    hasMore: true,
    optionModal: false,
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

  toggleModal = () => {
    this.setState((prevState) => ({ optionModal: !prevState.optionModal }));
  };

  render() {
    const { postList, hasMore, optionModal } = this.state;
    const { profileData } = this.props;

    if (this.props.profileData === null && !this.props.isLoggedIn) {
      return null;
    }

    return (
      <>
        <MainHeader
          title={'Profile'}
          rightComponent={() => (
            <TouchableWithoutFeedback onPress={this.toggleModal}>
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
          <PostList
            list={postList}
            header={<Profile data={profileData} type={'user'} currentUser />}
            onLoadMore={this.loadMorePost}
            onRefresh={this.onRefresh}
            hasMore={hasMore}
          />
          <MoreProfileModal
            isVisible={optionModal}
            onClose={this.toggleModal}
            logoutUser={this.props.logoutUser}
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
