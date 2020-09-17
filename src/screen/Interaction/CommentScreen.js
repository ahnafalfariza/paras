import React, { Component } from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Axios from 'axios';
import { SvgXml } from 'react-native-svg';

import MainHeader from '../../component/Header/MainHeader';
import Screen from '../../component/Common/Screen';
import Colors from '../../utils/color';
import assetSvg from '../../assets/svg/svg';
import { COMMENT } from '../../utils/api';
import CommentList from '../../component/Common/CommentList';
import NewCommentModal from '../../component/Modal/Comment/NewCommentModal';
import { ResponsiveFont } from '../../utils/ResponsiveFont';
import { commentLimit } from '../../utils/constant';

class CommentScreen extends Component {
  state = {
    commentList: [],
    page: 1,
    hasMore: true,
    isModalVisible: false,
  };

  componentDidMount() {
    this.getCommentList(this.state.page);
  }

  getCommentList = (page, onRefresh = false) => {
    const { id } = this.props.route.params;
    Axios.get(COMMENT(id, page))
      .then((res) => {
        this.setState((prevState) => ({
          commentList: onRefresh ? res.data.data : [...prevState.commentList, ...res.data.data],
          hasMore: res.data.data.length < commentLimit ? false : true,
        }));
      })
      .catch((err) => console.log(err));
  };

  onRefreshComment = () => {
    this.getCommentList(1, true);
    this.setState({ page: 1 });
  };

  loadMoreComment = () => {
    const page = this.state.page + 1;
    this.getCommentList(page);
    this.setState({ page });
  };

  toggleModal = () => {
    this.setState((prevState) => ({ isModalVisible: !prevState.isModalVisible }));
  };

  render() {
    const { id } = this.props.route.params;
    const { commentList, isModalVisible, hasMore } = this.state;
    return (
      <>
        <MainHeader
          leftComponent={'back'}
          title={'Comment'}
          rightComponent={
            <TouchableWithoutFeedback onPress={this.toggleModal}>
              <SvgXml xml={assetSvg.bottomTab.NewPostTab} width="24" height="24" />
            </TouchableWithoutFeedback>
          }
        />
        <Screen>
          <CommentList
            data={commentList}
            onRefresh={this.onRefreshComment}
            onLoadMore={this.loadMoreComment}
            hasMore={hasMore}
            emptyComponent={
              <View
                style={{
                  transform: [{ scaleY: -1 }],
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <Text style={_styles.textEmptyCommentTitle}>Write a Comment</Text>
                <Text style={_styles.textEmptyCommentDesc}>
                  Click on button at top right to add a comment
                </Text>
              </View>
            }
          />
          <NewCommentModal
            isVisible={isModalVisible}
            onDismiss={this.toggleModal}
            postId={id}
            onComplete={() => {
              this.toggleModal();
              setTimeout(() => {
                this.onRefreshComment();
              }, 3000);
            }}
          />
        </Screen>
      </>
    );
  }
}

export default CommentScreen;

const _styles = StyleSheet.create({
  textEmptyCommentTitle: {
    fontFamily: 'Inconsolata-Bold',
    color: Colors['white-1'],
    fontSize: ResponsiveFont(20),
    textAlign: 'center',
    marginBottom: 16,
  },
  textEmptyCommentDesc: {
    fontFamily: 'Inconsolata-Regular',
    color: Colors['white-1'],
    fontSize: ResponsiveFont(15),
    textAlign: 'center',
    lineHeight: 24,
  },
});
