import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';

import Colors from '../../utils/color';
import PostContent from './PostContent';
import PostOwner from './PostOwner';
import PostMemento from './PostMemento';

class Post extends PureComponent {
  render() {
    const { contentList, user, memento } = this.props.post;

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

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 16 }}>
          <Text style={_styles.memento}>Piece</Text>
          <Text style={_styles.memento}>Comment</Text>
          <Text style={_styles.memento}>Share</Text>
        </View>
      </View>
    );
  }
}

const PostList = ({ list, onLoadMore, header }) => {
  const ref = React.useRef(null);

  useScrollToTop(ref);

  return (
    <View>
      <FlatList
        ref={ref}
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Post post={item} />}
        contentContainerStyle={{ margin: 8, paddingBottom: 16 }}
        ListHeaderComponent={header}
        onEndReachedThreshold={0.9}
        onEndReached={onLoadMore}
      />
    </View>
  );
};

export default PostList;

const _styles = StyleSheet.create({
  memento: {
    fontFamily: 'Inconsolata-SemiBold',
    fontSize: 16,
    color: Colors['white-1'],
  },
});
