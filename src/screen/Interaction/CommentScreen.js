import React, { Component } from 'react';
import { Text, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import Axios from 'axios';

import MainHeader from '../../component/Header/MainHeader';
import Screen from '../../component/Common/Screen';
import Colors from '../../utils/color';
import { COMMENT } from '../../utils/api';
import CommentList from '../../component/Common/CommentList';
import { ResponsiveFont } from '../../utils/ResponsiveFont';
import { commentLimit, isIOS } from '../../utils/constant';
import CommentTextInput from '../../component/Common/CommentTextInput';

class CommentScreen extends Component {
  commentListRef = React.createRef();
  state = {
    commentList: [],
    page: 1,
    hasMore: true,
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
    const { commentList, hasMore } = this.state;
    return (
      <>
        <MainHeader leftComponent={'back'} title={'Comment'} />
        <Screen
          transparent
          containerStyle={{ backgroundColor: Colors['dark-4'] }}
          style={{ backgroundColor: Colors['dark-0'] }}
        >
          <KeyboardAvoidingView
            behavior={isIOS ? 'padding' : null}
            style={{ flex: 1, justifyContent: 'center' }}
            keyboardVerticalOffset={isIOS ? 90 : 0}
          >
            <CommentList
              ref={this.commentListRef}
              data={commentList}
              onRefresh={this.onRefreshComment}
              onLoadMore={this.loadMoreComment}
              hasMore={hasMore}
              emptyComponent={
                <View style={{ transform: [{ scaleY: -1 }], alignItems: 'center', flex: 1 }}>
                  <Text style={_styles.textEmptyCommentTitle}>Write a Comment</Text>
                  <Text style={_styles.textEmptyCommentDesc}>
                    Click on button at top right to add a comment
                  </Text>
                </View>
              }
            />
            <CommentTextInput
              postId={id}
              onComplete={() => {
                this.commentListRef.current.toggleRefresh();
                setTimeout(() => {
                  this.onRefreshComment();
                }, 3000);
              }}
            />
          </KeyboardAvoidingView>
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
    marginTop: 8,
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
