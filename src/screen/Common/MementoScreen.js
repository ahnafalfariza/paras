import React, { Component } from 'react';
import { SvgXml } from 'react-native-svg';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import Axios from 'axios';

import Screen from '../../component/Common/Screen';
import MainHeader from '../../component/Header/MainHeader';
import Profile from '../../component/Profile/Profile';
import { MEMENTO_POST_URL, MEMENTO_URL } from '../../utils/api';
import PostList from '../../component/Post/Post';
import { postLimit } from '../../utils/constant';
import assetSvg from '../../assets/svg/svg';
import MementoOptionModal from '../../component/Modal/Profile/MementoOptionModal';

class MementoScreen extends Component {
  state = {
    page: 1,
    postList: [],
    memento: this.props.route.params.memento,
    hasMore: true,
    mementoOptionModal: false,
  };

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getPostData(this.state.page, true);
      this.getMementoData();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
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

  getMementoData = () => {
    const { id } = this.props.route.params.memento;
    Axios.get(MEMENTO_URL(id))
      .then((res) => {
        this.setState({ memento: res.data.data[0] });
      })
      .catch((err) => console.log(err));
  };

  onRefresh = () => {
    this.getPostData(1, true);
    this.getMementoData();
    this.setState({ page: 1 });
  };

  loadMorePost = () => {
    const page = this.state.page + 1;
    this.getPostData(page);
    this.setState({ page });
  };

  toggleModal = () => {
    console.log('tglmdl');
    this.setState((prevState) => ({ mementoOptionModal: !prevState.mementoOptionModal }));
  };

  render() {
    const { postList, hasMore, memento, mementoOptionModal } = this.state;
    const { id } = this.props.profileData;

    return (
      <>
        <MainHeader
          title={memento.id}
          leftComponent={'back'}
          rightComponent={() => (
            <TouchableWithoutFeedback onPress={this.toggleModal}>
              <SvgXml
                xml={assetSvg.common.more}
                width="28"
                height="28"
                style={{ justifyContent: 'flex-end' }}
              />
            </TouchableWithoutFeedback>
          )}
        />
        <Screen>
          <PostList
            list={postList}
            header={<Profile data={memento} type={'memento'} />}
            onLoadMore={this.loadMorePost}
            onRefresh={this.onRefresh}
            hasMore={hasMore}
          />
          <MementoOptionModal
            isVisible={mementoOptionModal}
            isUserOwner={memento.owner === id}
            onClose={this.toggleModal}
            mementoData={memento}
          />
        </Screen>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  profileData: state.user.profile,
});

export default connect(mapStateToProps)(MementoScreen);
