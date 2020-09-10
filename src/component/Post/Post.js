import React, { PureComponent, useState } from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl, StyleSheet } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';

import PostContent from './PostContent';
import PostOwner from './PostOwner';
import PostMemento from './PostMemento';
import PostAction from './PostAction';
import PostDate from './PostDate';
import PostOptionModal from '../Modal/Common/PostOptionModal';

import Colors from '../../utils/color';

class Post extends PureComponent {
  state = {
    showOption: false,
  };

  onPressOptionPost = () => {
    this.setState((prevState) => ({ showOption: !prevState.showOption }));
  };

  render() {
    const { showOption } = this.state;
    const { refreshTimeline } = this.props;
    const { contentList, user, memento, createdAt, id } = this.props.post;

    return (
      <>
        <View style={_styles.postContainer}>
          <PostMemento memento={memento} />
          <PostOwner user={user} onPressOption={this.onPressOptionPost} />
          <PostContent contentList={contentList} />
          <PostDate date={createdAt} />
          <PostAction id={id} />
        </View>
        <PostOptionModal
          isVisible={showOption}
          onClose={this.onPressOptionPost}
          postId={id}
          userIdPost={user.id}
          refreshTimeline={refreshTimeline}
        />
      </>
    );
  }
}

const PostList = ({ list, onLoadMore = () => {}, header, onRefresh = () => {}, hasMore }) => {
  const [refreshing, setRefresh] = useState(false);
  const ref = React.useRef(null);

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const refreshFlatlist = async () => {
    setRefresh(true);
    await wait(2000).then(() => onRefresh());
    setRefresh(false);
  };

  const renderItem = ({ item }) => <Post post={item} refreshTimeline={refreshFlatlist} />;

  useScrollToTop(ref);

  return (
    <FlatList
      ref={ref}
      data={list}
      refreshControl={
        <RefreshControl refreshing={refreshing} tintColor={'#ffffff'} onRefresh={refreshFlatlist} />
      }
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ marginVertical: 8, marginHorizontal: 12, paddingBottom: 16 }}
      ListHeaderComponent={header}
      ListFooterComponent={() => {
        return hasMore ? (
          <ActivityIndicator color={Colors['white-1']} style={{ marginBottom: 16 }} />
        ) : null;
      }}
      onEndReachedThreshold={0.9}
      onEndReached={hasMore ? onLoadMore : null}
    />
  );
};

export default PostList;

const _styles = StyleSheet.create({
  postContainer: {
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: Colors['dark-8'],
    overflow: 'hidden',
  },
});
