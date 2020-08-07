import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

import Colors from '../helper/color';

const data = {
  id: '2HyZFET3Fdw',
  originalId: 'WAyY3uvHFTF',
  contentList: [
    {
      type: 'img',
      body: '{"url":"QmafLWchF5pSxyk5tuSsQxFE8Yvm4hNMa25Jcy37Y4fCir","type":"ipfs"}',
    },
    {
      type: 'text',
      body:
        'In Greek mythology, Persephone was the daughter of Zeus and Demeter, goddess of harvest and fertility. She was very beautiful and lovely, which led to her mother protecting her very much to keep all men away from her.\n\nHades, god of the underworld was very attracted to Persephone. When he asked Demeter if he could marry Persephone, Demeter refused.',
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

const Post = () => {
  return (
    <View style={{ margin: 16, borderRadius: 10, backgroundColor: Colors['dark-8'] }}>
      <View>
        <View style={{ backgroundColor: Colors['dark-2'], padding: 8 }}>
          <Text style={_styles.momento}>{data.mementoId}</Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: 'Inconsolata-Bold',
              fontSize: 18,
              color: Colors['white-1'],
              textAlign: 'center',
              padding: 16,
            }}
          >
            {data.user.id}
          </Text>
        </View>
      </View>

      <View style={{ height: Dimensions.get('window').width }}>
        <Swiper showsButtons={true} loop={false} showsPagination={true}>
          <View style={_styles.slide1}>
            <Text style={_styles.text}>Hello Swiper</Text>
          </View>
          <View style={_styles.slide2}>
            <Text style={_styles.text}>Beautiful</Text>
          </View>
          <View style={_styles.slide3}>
            <Text style={_styles.text}>And simple</Text>
          </View>
        </Swiper>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 16 }}>
        <Text style={_styles.momento}>Piece</Text>
        <Text style={_styles.momento}>Comment</Text>
        <Text style={_styles.momento}>Share</Text>
      </View>
    </View>
  );
};

export default Post;

const _styles = StyleSheet.create({
  momento: {
    fontFamily: 'Inconsolata-Bold',
    fontSize: 16,
    color: Colors['white-1'],
    textAlign: 'center',
  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },

  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },

  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
