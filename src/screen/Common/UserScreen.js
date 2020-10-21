import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';

import Screen from '../../component/Common/Screen';
import MainHeader from '../../component/Header/MainHeader';
import Profile from '../../component/Profile/Profile';
import { PROFILE_POST_URL, PROFILE_URL } from '../../utils/api';
import PostList from '../../component/Post/Post';
import { postLimit } from '../../utils/constant';
import assetSvg from '../../assets/svg/svg';
import UserOptionModal from '../../component/Modal/Profile/UserOptionModal';

class UserScreen extends Component {
  state = {
    page: 1,
    postList: [],
    user: this.props.route.params.user,
    userOptionModal: false,
    hasMore: true,
  };

  componentDidMount() {
    this.getPostData(this.state.page);
    this.getUserData();
  }

  getPostData = (page, onRefresh = false) => {
    const { id } = this.props.route.params.user;
    Axios.get(PROFILE_POST_URL(id, page))
      .then((res) => {
        this.setState((prevState) => ({
          postList: onRefresh ? res.data.data : [...prevState.postList, ...res.data.data],
          hasMore: res.data.data.length < postLimit ? false : true,
        }));
      })
      .catch((err) => console.log(err));
  };

  getUserData = () => {
    const { id } = this.props.route.params.user;
    Axios.get(PROFILE_URL(id))
      .then((res) => {
        this.setState({ user: res.data.data[0] });
      })
      .catch((err) => console.log(err));
  };

  onRefresh = () => {
    this.getPostData(1, true);
    this.getUserData();
    this.setState({ page: 1 });
  };

  loadMorePost = () => {
    const page = this.state.page + 1;
    this.getPostData(page);
    this.setState({ page });
  };

  toggleModal = () => {
    this.setState((prevState) => ({ userOptionModal: !prevState.userOptionModal }));
  };

  render() {
    const { postList, hasMore, user, userOptionModal } = this.state;
    const { id } = this.props.profileData;

    return (
      <>
        <MainHeader
          title={user.id}
          leftComponent={'back'}
          rightComponent={() =>
            user.id === id ? null : (
              <TouchableWithoutFeedback onPress={this.toggleModal}>
                <SvgXml
                  xml={assetSvg.common.more}
                  width="28"
                  height="28"
                  style={{ justifyContent: 'flex-end' }}
                />
              </TouchableWithoutFeedback>
            )
          }
        />
        <Screen>
          <PostList
            list={postList}
            header={<Profile data={user} type={'user'} currentUser={user.id === id} />}
            onLoadMore={this.loadMorePost}
            onRefresh={this.onRefresh}
            hasMore={hasMore}
          />
          <UserOptionModal
            isVisible={userOptionModal}
            profileId={user.id}
            onClose={this.toggleModal}
          />
        </Screen>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  profileData: state.user.profile,
});

export default connect(mapStateToProps)(UserScreen);
