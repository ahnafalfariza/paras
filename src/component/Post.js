import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import Colors from '../utils/color';
import PostContent from './PostContent';
import { useScrollToTop } from '@react-navigation/native';

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
        <PostMomento memento={memento} />
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

const PostList = ({ list, onLoadMore }) => {
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
        onEndReachedThreshold={0.9}
        onEndReached={onLoadMore}
      />
    </View>
  );
};

const PostMomento = ({ memento }) => {
  return (
    <View style={{ backgroundColor: Colors['dark-2'], padding: 6 }}>
      <Text style={_styles.memento}>{memento.id}</Text>
    </View>
  );
};

const PostOwner = ({ user }) => {
  return (
    <View>
      <Text
        style={{
          fontFamily: 'Inconsolata-Bold',
          fontSize: 18,
          color: Colors['white-1'],
          textAlign: 'center',
          padding: 14,
        }}
      >
        {user.id}
      </Text>
    </View>
  );
};

export default PostList;

const _styles = StyleSheet.create({
  memento: {
    fontFamily: 'Inconsolata-SemiBold',
    fontSize: 16,
    color: Colors['white-1'],
    textAlign: 'center',
  },
});
