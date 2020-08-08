import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import Colors from '../utils/color';
import PostContent from './PostContent';

const data = {
  id: '2HyZFET3Fdw',
  originalId: 'WAyY3uvHFTF',
  contentList: [
    {
      type: 'img',
      body: '{"url":"QmafLWchF5pSxyk5tuSsQxFE8Yvm4hNMa25Jcy37Y4fCir","type":"ipfs"}',
    },
    {
      type: 'url',
      body:
        '{"img":"https://i.scdn.co/image/ab67616d0000b27330ba0e3ed0e1db48cd3b94a8","title":"Marooned","desc":"Marooned, a song by Pink Floyd on Spotify","url":"https://open.spotify.com/track/3SOAyMhaukOvGS9PMvoQ1b"}',
    },
    {
      type: 'text',
      body:
        'In Greek mythology, Persephone was the daughter of Zeus and Demeter, goddess of harvest and fertility. She was very beautiful and lovely, which led to her mother protecting her very much to keep all men away from her.\n\nHades, god of the underworld was very attracted to Persephone. When he asked Demeter if he could marry Persephone, Demeter refused.In Greek mythology, Persephone was the daughter of Zeus and Demeter, goddess of harvest and fertility. She was very beautiful and lovely, which led to her mother protecting her very much to keep all men away from her.\n\nHades, god of the underworld was very attracted to Persephone. When he asked Demeter if he could marry Persephone, Demeter refused.',
    },
    {
      type: 'text',
      body:
        'One day, Persephone was playing in a flower field when suddenly the earth beneath her opened and Hades came out with his chariot and abducted her. This abduction was witnessed by Zeus and Helios, the all-seeing Sun god.\n\nDemeter came looking for Persephone but was devastated when no one knew where her daughter was.',
    },
    {
      type: 'img',
      body: '{"url":"QmaVXwtL6n5t8Ka6bChrBoQ9NPDG3vY8FxgCbwg122CoTN","type":"ipfs"}',
    },
    {
      type: 'text',
      body:
        'Helios finally told Demeter that Persephone was taken to the Underworld by Hades. Demeter was furious at the Gods for not telling her right away and punished the world by leaving her duties behind. The earth began to dry up, followed with deaths of animals and famine.',
    },
    {
      type: 'text',
      body:
        "Zeus heard the cry of people for help. He decided that Persephone would spend half of the year with her mother and the other half with Hades, his husband. Both parties weren't excited, but they accepted the deal.\n",
    },
    {
      type: 'text',
      body:
        "According to ancient Greeks, this explains why in Autumn and Winter the earth isn't fertile because Demeter is waiting for her daughter's return. And when they reunite, the earth is fertile in Spring and Summer.\n",
    },
  ],
  owner: 'zilalvs.testnet',
  mementoId: 'philosophy.life',
  createdAt: '1596684808928483630',
  user: {
    _id: '5f003c8d6572a44ed17f00d6',
    id: 'zilalvs.testnet',
    imgAvatar: {
      url: 'QmUMKPXyPogETNyJvZCPdgd6qDSeEdLWK5nmdZtbkzGVra',
      type: 'ipfs',
    },
    bio: 'written thoughts; constantly educating myself.',
    createdAt: '1593851018660737775',
  },
  memento: {
    _id: '5f016415ed18f87b249b3254',
    id: 'philosophy.life',
    name: 'philosophy',
    category: 'life',
    img: {
      url: 'QmXxkZqyj54Nmf6bbYe2jZ9D2TacxnRKqikuWkMJiQLpZ4',
      type: 'ipfs',
    },
    desc: 'something good to keep in mind.\nor at least something good to know.',
    type: 'public',
    owner: 'tulismelanie.testnet',
    createdAt: '1593926677147394333',
    user: null,
    isArchive: false,
  },
};

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
  return (
    <View>
      <FlatList
        data={list}
        keyExtractor={(item) => item.id.toString()}
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
