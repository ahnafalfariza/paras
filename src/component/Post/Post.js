import React, { PureComponent, useState } from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';

import PostContent from './PostContent';
import PostOwner from './PostOwner';
import PostMemento from './PostMemento';
import PostAction from './PostAction';

import Colors from '../../utils/color';
import PostDate from './PostDate';

class Post extends PureComponent {
  render() {
    const { contentList, user, memento, createdAt } = this.props.post;
    return (
      <View
        style={{
          marginVertical: 16,
          marginHorizontal: 8,
          borderRadius: 10,
          backgroundColor: Colors['dark-8'],
          overflow: 'hidden',
        }}
      >
        <PostMemento memento={memento} />
        <PostOwner user={user} />
        <PostContent contentList={contentList} />
        <PostDate date={createdAt} />
        <PostAction />
      </View>
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

  const renderItem = ({ item }) => <Post post={item} />;

  useScrollToTop(ref);

  return (
    <View>
      <FlatList
        ref={ref}
        data={list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            tintColor={'#ffffff'}
            onRefresh={refreshFlatlist}
          />
        }
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ margin: 8, paddingBottom: 16 }}
        ListHeaderComponent={header}
        ListFooterComponent={() => {
          return hasMore ? (
            <ActivityIndicator color="#ffffff" style={{ marginBottom: 16 }} />
          ) : null;
        }}
        onEndReachedThreshold={0.9}
        onEndReached={hasMore ? onLoadMore : null}
      />
    </View>
  );
};

export default PostList;
